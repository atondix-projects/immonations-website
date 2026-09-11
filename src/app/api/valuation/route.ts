import { leadResponse, readGuardedJson } from '@/lib/forms/request-guard'
import { createOnOfficeProvider } from '@/lib/onoffice/provider'
import type { OnOfficeProvider } from '@/lib/onoffice/types'
import { CONTACT_FIELDS, LOCATION_FIELDS, PROPERTY_FIELDS } from '@/lib/valuation/fields'
import { toOnOfficeLead } from '@/lib/valuation/onoffice'
import { visibleFields } from '@/lib/valuation/steps'
import { isPropertyTypeId, type Answers } from '@/lib/valuation/types'
import { hasErrors, validateFields } from '@/lib/valuation/validation'

export async function handleValuation(request: Request, provider: OnOfficeProvider | null) {
  const guarded = await readGuardedJson(request, 'valuation')
  if ('error' in guarded) return leadResponse(guarded.error)
  const propertyType = guarded.data.propertyType
  const rawAnswers = guarded.data.answers
  if (!isPropertyTypeId(propertyType) || !rawAnswers || typeof rawAnswers !== 'object') {
    return leadResponse('invalid')
  }
  const answers = rawAnswers as Answers
  const requiredFields = [
    ...LOCATION_FIELDS,
    ...visibleFields(PROPERTY_FIELDS[propertyType], answers),
    ...visibleFields(CONTACT_FIELDS, answers),
  ]
  if (hasErrors(validateFields(requiredFields, answers))) return leadResponse('invalid')
  if (!provider) return leadResponse('not_configured')

  const mapped = toOnOfficeLead(propertyType, answers)
  try {
    const receipt = await provider.submitLead({
      kind: 'valuation',
      locale: guarded.data.locale === 'en' ? 'en' : 'de',
      address: mapped.address,
      estate: mapped.estate,
      notes: mapped.notes,
      consent: mapped.consent,
    })
    return Response.json({ ok: true, receiptId: receipt.recordId }, { status: 201 })
  } catch {
    return leadResponse('provider_error')
  }
}

export async function POST(request: Request) {
  return handleValuation(request, createOnOfficeProvider())
}
