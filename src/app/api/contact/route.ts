import { leadResponse, readGuardedJson } from '@/lib/forms/request-guard'
import { createOnOfficeProvider } from '@/lib/onoffice/provider'
import type { OnOfficeProvider } from '@/lib/onoffice/types'

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function handleContact(request: Request, provider: OnOfficeProvider | null) {
  const guarded = await readGuardedJson(request, 'contact')
  if ('error' in guarded) return leadResponse(guarded.error)
  const input = guarded.data
  const locale = input.locale === 'en' ? 'en' : 'de'
  const name = text(input.name, 120)
  const email = text(input.email, 254).toLowerCase()
  const phone = text(input.phone, 40)
  const topic = text(input.topic, 120)
  const message = text(input.message, 4000)
  if (
    name.length < 2 ||
    !validEmail(email) ||
    !topic ||
    message.length < 5 ||
    input.privacy !== true
  ) {
    return leadResponse('invalid')
  }
  if (!provider) return leadResponse('not_configured')

  try {
    const receipt = await provider.submitLead({
      kind: 'contact',
      locale,
      address: { Name: name, Email: email, ...(phone ? { Telefon1: phone } : {}) },
      notes: { Thema: topic, Nachricht: message },
      consent: { contact: true },
    })
    return Response.json({ ok: true, receiptId: receipt.recordId }, { status: 201 })
  } catch {
    return leadResponse('provider_error')
  }
}

export async function POST(request: Request) {
  return handleContact(request, createOnOfficeProvider())
}
