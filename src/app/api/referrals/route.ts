import { SITE } from '@/lib/seo/site'

const PROPERTY_TYPES = ['house', 'apartment', 'apartment-building', 'land', 'other'] as const
const TIMELINES = ['now', 'three-months', 'six-months', 'later', 'unknown'] as const
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5

type PropertyType = (typeof PROPERTY_TYPES)[number]
type Timeline = (typeof TIMELINES)[number]
type Locale = 'de' | 'en'

type ReferralPayload = {
  locale: Locale
  name: string
  email: string
  phone: string
  propertyType: PropertyType
  location: string
  timeline: Timeline
  note: string
}

type RateLimitEntry = { count: number; resetsAt: number }

const rateLimits = new Map<string, RateLimitEntry>()

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const forwardedHost = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (!origin || !forwardedHost) return true

  try {
    return new URL(origin).host === forwardedHost.split(',')[0]?.trim()
  } catch {
    return false
  }
}

function isRateLimited(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip')?.trim()
  if (!ip) return false

  const now = Date.now()
  if (rateLimits.size > 1000) {
    for (const [key, entry] of rateLimits) {
      if (entry.resetsAt <= now) rateLimits.delete(key)
    }
  }

  const existing = rateLimits.get(ip)
  if (!existing || existing.resetsAt <= now) {
    rateLimits.set(ip, { count: 1, resetsAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  existing.count += 1
  return existing.count > RATE_LIMIT_MAX
}

function parsePayload(value: unknown): ReferralPayload | null {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  const locale: Locale = input.locale === 'en' ? 'en' : 'de'
  const name = text(input.name, 100)
  const email = text(input.email, 254).toLowerCase()
  const phone = text(input.phone, 40)
  const propertyType = text(input.propertyType, 30)
  const location = text(input.location, 120)
  const timeline = text(input.timeline, 30)
  const note = text(input.note, 1000)

  if (
    name.length < 2 ||
    !isEmail(email) ||
    phone.length < 5 ||
    location.length < 2 ||
    !PROPERTY_TYPES.includes(propertyType as PropertyType) ||
    !TIMELINES.includes(timeline as Timeline) ||
    input.ownerConsent !== 'yes' ||
    input.privacy !== 'yes'
  ) {
    return null
  }

  return {
    locale,
    name,
    email,
    phone,
    propertyType: propertyType as PropertyType,
    location,
    timeline: timeline as Timeline,
    note,
  }
}

function labels(locale: Locale) {
  if (locale === 'en') {
    return {
      propertyTypes: {
        house: 'House',
        apartment: 'Apartment',
        'apartment-building': 'Apartment building',
        land: 'Land',
        other: 'Other',
      },
      timelines: {
        now: 'As soon as possible',
        'three-months': 'Within 3 months',
        'six-months': 'Within 6 months',
        later: 'Later',
        unknown: 'Not known yet',
      },
      internalSubject: 'New referrer tip',
      confirmationSubject: 'We received your tip',
      confirmationHeading: 'Thank you for your tip.',
      confirmationText:
        'We have received your non-binding information and will contact you personally about the next steps. This receipt does not yet confirm eligibility for a referrer fee.',
    }
  }

  return {
    propertyTypes: {
      house: 'Haus',
      apartment: 'Wohnung',
      'apartment-building': 'Mehrfamilienhaus',
      land: 'Grundstück',
      other: 'Sonstiges',
    },
    timelines: {
      now: 'So bald wie möglich',
      'three-months': 'Innerhalb von 3 Monaten',
      'six-months': 'Innerhalb von 6 Monaten',
      later: 'Später',
      unknown: 'Noch nicht bekannt',
    },
    internalSubject: 'Neuer Tippgeber-Hinweis',
    confirmationSubject: 'Wir haben Ihren Tipp erhalten',
    confirmationHeading: 'Vielen Dank für Ihren Tipp.',
    confirmationText:
      'Wir haben Ihren unverbindlichen Hinweis erhalten und melden uns persönlich bei Ihnen, um die nächsten Schritte zu klären. Diese Eingangsbestätigung ist noch keine Zusage einer Tippgeber-Vergütung.',
  }
}

async function sendEmail(input: {
  apiKey: string
  from: string
  to: string
  subject: string
  html: string
  replyTo?: string
}) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: input.from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      reply_to: input.replyTo,
    }),
    cache: 'no-store',
  })

  return response.ok
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ ok: false, error: 'forbidden' }, { status: 403 })
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 20_000) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 413 })
  }

  if (isRateLimited(request)) {
    return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  let rawPayload: unknown
  try {
    rawPayload = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  if (
    rawPayload &&
    typeof rawPayload === 'object' &&
    text((rawPayload as Record<string, unknown>).company, 100)
  ) {
    return Response.json({ ok: true, confirmationSent: true })
  }

  const payload = parsePayload(rawPayload)
  if (!payload) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const recipient = process.env.REFERRAL_TO_EMAIL
  if (!apiKey || !from || !recipient) {
    return Response.json({ ok: false, error: 'unavailable' }, { status: 503 })
  }

  const copy = labels(payload.locale)
  const propertyType = copy.propertyTypes[payload.propertyType]
  const timeline = copy.timelines[payload.timeline]
  const safeNote = payload.note ? escapeHtml(payload.note).replaceAll('\n', '<br>') : '—'
  const internalHtml = `
    <h1>${escapeHtml(copy.internalSubject)}</h1>
    <p><strong>Tippgeber:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Objektart:</strong> ${escapeHtml(propertyType)}</p>
    <p><strong>Ort / PLZ:</strong> ${escapeHtml(payload.location)}</p>
    <p><strong>Zeitrahmen:</strong> ${escapeHtml(timeline)}</p>
    <p><strong>Hinweis:</strong><br>${safeNote}</p>
    <p><strong>Bestätigt:</strong> Eigentümer kennt die Empfehlung und ist mit einer Kontaktaufnahme einverstanden.</p>
  `

  const internalSent = await sendEmail({
    apiKey,
    from,
    to: recipient,
    subject: `${copy.internalSubject}: ${payload.location}`,
    html: internalHtml,
    replyTo: payload.email,
  })

  if (!internalSent) {
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  const confirmationHtml = `
    <h1>${escapeHtml(copy.confirmationHeading)}</h1>
    <p>${escapeHtml(copy.confirmationText)}</p>
    <p><strong>${escapeHtml(propertyType)}</strong> · ${escapeHtml(payload.location)}</p>
    <p>${escapeHtml(SITE.legalName)} · ${escapeHtml(SITE.contact.phone)}</p>
  `
  const confirmationSent = await sendEmail({
    apiKey,
    from,
    to: payload.email,
    subject: copy.confirmationSubject,
    html: confirmationHtml,
  })

  return Response.json({ ok: true, confirmationSent })
}
