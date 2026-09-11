import { createHmac } from 'node:crypto'
import type {
  EstateListing,
  EstateStatus,
  LeadReceipt,
  OnOfficeLeadInput,
  OnOfficeProvider,
} from './types'

const READ_ACTION = 'urn:onoffice-de-ns:smart:2.5:smartml:action:read'
const CREATE_ACTION = 'urn:onoffice-de-ns:smart:2.5:smartml:action:create'
const GET_ACTION = 'urn:onoffice-de-ns:smart:2.5:smartml:action:get'

type ProviderConfig = {
  token: string
  secret: string
  apiUrl: string
}

type RawRecord = {
  id: string | number
  elements?: Record<string, unknown>
}

type ApiResult = {
  status?: { errorcode?: number; message?: string }
  data?: { records?: RawRecord[] }
}

type ApiResponse = {
  status?: { errorcode?: number; message?: string }
  response?: { results?: ApiResult[] }
}

export class OnOfficeProviderError extends Error {
  constructor(
    readonly code: 'not_configured' | 'provider_error',
    message: string,
  ) {
    super(message)
    this.name = 'OnOfficeProviderError'
  }
}

export function createOnOfficeHmac(input: {
  timestamp: number
  token: string
  secret: string
  resourceType: string
  actionId: string
}) {
  return createHmac('sha256', input.secret)
    .update(`${input.timestamp}${input.token}${input.resourceType}${input.actionId}`)
    .digest('base64')
}

function text(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number') return String(value)
  return ''
}

function number(value: unknown): number | undefined {
  const normalized = text(value).replace(',', '.')
  if (!normalized) return undefined
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : undefined
}

function slugPart(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function estateStatus(elements: Record<string, unknown>): EstateStatus | null {
  const status = text(elements.status).toLowerCase()
  if (!['1', 'aktiv', 'active', 'veroeffentlicht', 'veröffentlicht'].includes(status)) return null
  const reserved = text(elements.reserviert).toLowerCase()
  return ['1', 'true', 'ja', 'yes'].includes(reserved) ? 'reserved' : 'available'
}

export function mapOnOfficeEstate(record: RawRecord): EstateListing | null {
  const elements = record.elements ?? {}
  const status = estateStatus(elements)
  if (!status) return null

  const id = String(record.id)
  const externalId = text(elements.objektnr_extern) || id
  const title = text(elements.objekttitel) || text(elements.objekttitel_lang) || 'Immobilienangebot'
  const location = text(elements.ort)

  return {
    id,
    externalId,
    slug: `${slugPart(externalId) || 'objekt'}-${id}`,
    title,
    location,
    postalCode: text(elements.plz),
    propertyType: text(elements.objektart) || text(elements.objekttyp) || 'Immobilie',
    livingArea: number(elements.wohnflaeche),
    rooms: number(elements.anzahl_zimmer),
    price: number(elements.kaufpreis),
    status,
    description: text(elements.freitext) || text(elements.objektbeschreibung),
    images: [],
    updatedAt: text(elements.geaendert_am) || undefined,
  }
}

export class OnOfficeApiProvider implements OnOfficeProvider {
  constructor(
    private readonly config: ProviderConfig,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  private async action(
    resourceType: string,
    actionId: string,
    parameters: Record<string, unknown>,
    resourceId = '',
  ) {
    const timestamp = Math.floor(Date.now() / 1000)
    const action = {
      timestamp,
      hmac_version: 2,
      hmac: createOnOfficeHmac({
        timestamp,
        token: this.config.token,
        secret: this.config.secret,
        resourceType,
        actionId,
      }),
      actionid: actionId,
      resourceid: resourceId,
      identifier: '',
      resourcetype: resourceType,
      parameters,
    }
    const response = await this.fetcher(this.config.apiUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ token: this.config.token, request: { actions: [action] } }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) {
      throw new OnOfficeProviderError('provider_error', `onOffice HTTP ${response.status}`)
    }
    const payload = (await response.json()) as ApiResponse
    const result = payload.response?.results?.[0]
    const errorCode = result?.status?.errorcode ?? payload.status?.errorcode ?? -1
    if (errorCode !== 0 || !result) {
      throw new OnOfficeProviderError(
        'provider_error',
        result?.status?.message ?? payload.status?.message ?? 'onOffice rejected the request',
      )
    }
    return result
  }

  async listEstates(): Promise<readonly EstateListing[]> {
    const result = await this.action('estate', READ_ACTION, {
      data: [
        'Id',
        'objektnr_extern',
        'objekttitel',
        'objekttitel_lang',
        'ort',
        'plz',
        'objektart',
        'objekttyp',
        'wohnflaeche',
        'anzahl_zimmer',
        'kaufpreis',
        'freitext',
        'objektbeschreibung',
        'status',
        'reserviert',
        'geaendert_am',
      ],
      filter: { status: [{ op: '=', val: 1 }] },
      listlimit: 24,
      listoffset: 0,
      sortby: { geaendert_am: 'DESC' },
    })

    const estates = (result.data?.records ?? [])
      .map(mapOnOfficeEstate)
      .filter((estate): estate is EstateListing => estate !== null)

    return Promise.all(
      estates.map(async (estate) => {
        try {
          const fileResult = await this.action(
            'file',
            GET_ACTION,
            { estateid: Number(estate.id), includeImageUrl: 'original' },
            'estate',
          )
          const images = (fileResult.data?.records ?? [])
            .filter((record) => {
              const published = text(record.elements?.ispublishedonhomepage).toLowerCase()
              return !published || ['1', 'true', 'ja', 'yes'].includes(published)
            })
            .map((record) => {
              const elements = record.elements ?? {}
              return (
                text(elements.url) ||
                text(elements.urloriginal) ||
                text(elements.downloadUrl) ||
                text(elements.downloadurl)
              )
            })
            .filter((url) => /^https:\/\//.test(url))
          return { ...estate, images }
        } catch {
          return estate
        }
      }),
    )
  }

  async submitLead(input: OnOfficeLeadInput): Promise<LeadReceipt> {
    const note = [
      `Website-Lead: ${input.kind}`,
      `Sprache: ${input.locale}`,
      ...Object.entries(input.notes).map(([key, value]) => `${key}: ${value}`),
      input.estate ? `Objektdaten: ${JSON.stringify(input.estate)}` : '',
      `Einwilligungen: ${JSON.stringify(input.consent)}`,
    ]
      .filter(Boolean)
      .join('\n')
    const result = await this.action('address', CREATE_ACTION, {
      data: { ...input.address, Bemerkung: note, HerkunftKontakt: 'Website Immonation' },
    })
    const id = result.data?.records?.[0]?.id
    if (id === undefined) {
      throw new OnOfficeProviderError('provider_error', 'onOffice returned no address record id')
    }
    return { provider: 'onoffice', recordId: String(id) }
  }
}

export function createOnOfficeProvider(
  env: NodeJS.ProcessEnv = process.env,
  fetcher: typeof fetch = fetch,
): OnOfficeProvider | null {
  const token = env.ONOFFICE_API_TOKEN?.trim()
  const secret = env.ONOFFICE_API_SECRET?.trim()
  if (!token || !secret) return null
  return new OnOfficeApiProvider(
    {
      token,
      secret,
      apiUrl: env.ONOFFICE_API_URL?.trim() || 'https://api.onoffice.de/api/stable/api.php',
    },
    fetcher,
  )
}
