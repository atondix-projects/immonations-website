import { createHmac } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { OnOfficeApiProvider, createOnOfficeHmac, mapOnOfficeEstate } from '@/lib/onoffice/provider'

describe('onOffice provider contract', () => {
  it('uses the official HMAC v2 input order', () => {
    const input = {
      timestamp: 1_789_000_000,
      token: 'token',
      secret: 'secret',
      resourceType: 'estate',
      actionId: 'urn:onoffice-de-ns:smart:2.5:smartml:action:read',
    }
    const expected = createHmac('sha256', input.secret)
      .update(`${input.timestamp}${input.token}${input.resourceType}${input.actionId}`)
      .digest('base64')

    expect(createOnOfficeHmac(input)).toBe(expected)
  })

  it('maps public estate fields and never promotes withdrawn records', () => {
    expect(
      mapOnOfficeEstate({
        id: 42,
        elements: {
          objektnr_extern: 'IM-42',
          objekttitel: 'Haus am Stadtpark',
          ort: 'Zirndorf',
          plz: '90513',
          objektart: 'haus',
          wohnflaeche: '145',
          anzahl_zimmer: '5',
          kaufpreis: '749000',
          status: '1',
          reserviert: '1',
        },
      }),
    ).toMatchObject({
      id: '42',
      externalId: 'IM-42',
      slug: 'im-42-42',
      status: 'reserved',
      title: 'Haus am Stadtpark',
      location: 'Zirndorf',
      postalCode: '90513',
      livingArea: 145,
      rooms: 5,
      price: 749000,
    })

    expect(mapOnOfficeEstate({ id: 43, elements: { status: '0' } })).toBeNull()
  })

  it('reads only provider records confirmed by onOffice', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: { errorcode: 0 },
          response: {
            results: [
              {
                status: { errorcode: 0 },
                data: {
                  records: [
                    {
                      id: 7,
                      elements: {
                        objektnr_extern: 'WEB-7',
                        objekttitel: 'Wohnung mit Balkon',
                        ort: 'Fürth',
                        status: '1',
                      },
                    },
                  ],
                },
              },
            ],
          },
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      ),
    )
    const provider = new OnOfficeApiProvider(
      { token: 'token', secret: 'secret', apiUrl: 'https://api.onoffice.de/api/stable/api.php' },
      fetcher,
    )

    await expect(provider.listEstates()).resolves.toMatchObject([
      { id: '7', externalId: 'WEB-7', status: 'available' },
    ])
    expect(fetcher).toHaveBeenCalledTimes(2)
    const imageRequest = JSON.parse(String(fetcher.mock.calls[1]?.[1]?.body)) as {
      request: { actions: Array<{ resourcetype: string; parameters: Record<string, unknown> }> }
    }
    expect(imageRequest.request.actions[0]).toMatchObject({
      resourcetype: 'estatepictures',
      parameters: {
        estateids: [7],
        categories: ['Titelbild', 'Foto', 'Foto_gross'],
        publicationSetting: 'Homepage',
      },
    })
  })
})
