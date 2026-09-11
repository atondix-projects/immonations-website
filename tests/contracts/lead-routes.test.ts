import { describe, expect, it, vi } from 'vitest'
import { handleContact } from '@/app/api/contact/route'
import { handleValuation } from '@/app/api/valuation/route'
import type { OnOfficeProvider } from '@/lib/onoffice/types'

function request(path: string, body: unknown, ip = crypto.randomUUID()) {
  return new Request(`https://immonationgmbh.de${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://immonationgmbh.de',
      host: 'immonationgmbh.de',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  })
}

function provider(): OnOfficeProvider {
  return {
    listEstates: vi.fn().mockResolvedValue([]),
    submitLead: vi.fn().mockResolvedValue({ provider: 'onoffice', recordId: '4711' }),
  }
}

const contact = {
  locale: 'de',
  name: 'Anna Bauer',
  email: 'anna@example.de',
  phone: '0911 1234567',
  topic: 'Immobilie verkaufen',
  message: 'Bitte rufen Sie mich zu meinem Hausverkauf zurück.',
  privacy: true,
  website: '',
}

const valuation = {
  locale: 'de',
  propertyType: 'apartment',
  website: '',
  answers: {
    postcode: '90475',
    city: 'Nürnberg',
    timing: 'concrete',
    livingArea: '80',
    rooms: '3',
    constructionYear: '1995',
    floorLevel: 'upper-2',
    condition: 'maintained',
    rented: 'no',
    firstName: 'Anna',
    lastName: 'Bauer',
    email: 'anna@example.de',
    consent: 'yes',
  },
}

describe('onOffice lead routes', () => {
  it('confirms contact success only after the provider returns a record id', async () => {
    const target = provider()
    const response = await handleContact(request('/api/contact', contact), target)
    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toEqual({ ok: true, receiptId: '4711' })
    expect(target.submitLead).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: 'contact',
        address: expect.objectContaining({ Email: contact.email }),
      }),
    )
  })

  it('validates, blocks cross-origin and distinguishes missing configuration', async () => {
    expect(
      (await handleContact(request('/api/contact', { ...contact, email: 'bad' }), provider()))
        .status,
    ).toBe(400)
    expect((await handleContact(request('/api/contact', contact), null)).status).toBe(503)
    const blocked = request('/api/contact', contact)
    blocked.headers.set('origin', 'https://attacker.example')
    expect((await handleContact(blocked, provider())).status).toBe(403)
  })

  it('maps a complete valuation only after server-side validation', async () => {
    const target = provider()
    const response = await handleValuation(request('/api/valuation', valuation), target)
    expect(response.status).toBe(201)
    expect(target.submitLead).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: 'valuation',
        estate: expect.objectContaining({ objektart: 'wohnung', wohnflaeche: '80' }),
      }),
    )
    expect(
      (
        await handleValuation(
          request('/api/valuation', {
            ...valuation,
            answers: { ...valuation.answers, consent: '' },
          }),
          target,
        )
      ).status,
    ).toBe(400)
  })

  it('reports provider failure and rate limiting without a false success', async () => {
    const failing = provider()
    vi.mocked(failing.submitLead).mockRejectedValueOnce(new Error('provider unavailable'))
    expect((await handleContact(request('/api/contact', contact), failing)).status).toBe(502)

    const ip = '203.0.113.25'
    const statuses = []
    for (let index = 0; index < 6; index += 1) {
      statuses.push((await handleContact(request('/api/contact', contact, ip), null)).status)
    }
    expect(statuses.at(-1)).toBe(429)
  })
})
