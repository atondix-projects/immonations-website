const MAX_BODY_BYTES = 64 * 1024
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5

type RateLimitEntry = { count: number; resetsAt: number }
const rateLimits = new Map<string, RateLimitEntry>()

export type GuardFailure = 'blocked' | 'limited' | 'invalid'

function sameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (!origin || !host) return false
  try {
    return new URL(origin).host === host.split(',')[0]?.trim()
  } catch {
    return false
  }
}

function isRateLimited(request: Request, scope: string) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip')?.trim()
  if (!ip) return false

  const key = `${scope}:${ip}`
  const now = Date.now()
  const current = rateLimits.get(key)
  if (!current || current.resetsAt <= now) {
    rateLimits.set(key, { count: 1, resetsAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > RATE_LIMIT_MAX
}

export async function readGuardedJson(
  request: Request,
  scope: string,
): Promise<{ data: Record<string, unknown> } | { error: GuardFailure }> {
  if (!sameOrigin(request)) return { error: 'blocked' }
  if (isRateLimited(request, scope)) return { error: 'limited' }

  const declaredLength = Number(request.headers.get('content-length') ?? 0)
  if (declaredLength > MAX_BODY_BYTES) return { error: 'invalid' }

  const raw = await request.text().catch(() => '')
  if (!raw || new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return { error: 'invalid' }
  }
  try {
    const data = JSON.parse(raw) as unknown
    if (!data || typeof data !== 'object' || Array.isArray(data)) return { error: 'invalid' }
    const record = data as Record<string, unknown>
    if (typeof record.website === 'string' && record.website.trim()) return { error: 'blocked' }
    return { data: record }
  } catch {
    return { error: 'invalid' }
  }
}

export function leadResponse(code: GuardFailure | 'not_configured' | 'provider_error') {
  const status =
    code === 'invalid'
      ? 400
      : code === 'blocked'
        ? 403
        : code === 'limited'
          ? 429
          : code === 'not_configured'
            ? 503
            : 502
  return Response.json({ ok: false, code }, { status })
}
