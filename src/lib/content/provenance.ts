/**
 * Content governance surface.
 *
 * Every user-facing numeric or factual claim on the site should be answerable with:
 * who owns it, where it came from, when it was last checked, and when it goes stale.
 * This module is that answer.
 *
 * Deliberate design notes:
 *
 * - The registry is keyed by claim id rather than embedded as a field on each content
 *   record. Some claim-bearing data (the land-value rows) lives in `messages/{de,en}.json`
 *   rather than in a TypeScript registry, so a per-record field would force a data
 *   migration out of the message files. A central registry covers every surface uniformly.
 *
 * - `state: 'unverified'` and `owner: 'unassigned'` are legal values that pass the contract
 *   test. The point of this module is to make an unverified claim *visible*, not to block
 *   the build. Claims still open in TODO.md P0 are recorded here honestly rather than being
 *   given an invented source.
 */

/** Who is accountable for keeping a claim correct. Real names are filled in later. */
export type ContentOwner = 'unassigned' | 'content' | 'legal' | 'engineering' | 'management'

/**
 * How well evidenced a claim currently is.
 *
 * - `verified`   — traced to a named source and checked on `checkedAt`.
 * - `provisional`— published deliberately, but the underlying content is templated,
 *                  first-party-only, or otherwise not independently sourced.
 * - `unverified` — no source established yet. Surfaced by the governance report.
 */
export type VerificationState = 'verified' | 'provisional' | 'unverified'

export type Provenance = {
  owner: ContentOwner
  state: VerificationState
  /** Human-readable attribution, as rendered to the user where applicable. */
  source?: string
  sourceUrl?: string
  /** ISO date (YYYY-MM-DD) the claim was last checked against its source. */
  checkedAt?: string
  /** ISO date (YYYY-MM-DD) after which the claim must be re-checked before it is trusted. */
  expiresAt?: string
  /** Why this entry is in the state it is. Read by the governance report. */
  note?: string
}

/**
 * The as-of date rendered alongside published market figures.
 *
 * Single source of truth for `<DataProvenance>`; month precision is deliberate, because
 * daily precision would overstate how often the underlying figures are refreshed.
 */
export const DATA_AS_OF = {
  iso: '2026-09',
  de: 'Stand: September 2026',
  en: 'As of: September 2026',
} as const

const DAY_MS = 24 * 60 * 60 * 1000

/** True when `expiresAt` is set and has passed. Entries with no expiry never go stale. */
export function isStale(provenance: Provenance, now: Date = new Date()): boolean {
  if (!provenance.expiresAt) return false
  const expiry = Date.parse(`${provenance.expiresAt}T00:00:00Z`)
  if (Number.isNaN(expiry)) return false
  return now.getTime() >= expiry + DAY_MS
}

/** True when the entry needs a human decision before launch. */
export function needsAttention(provenance: Provenance, now: Date = new Date()): boolean {
  return (
    provenance.owner === 'unassigned' ||
    provenance.state === 'unverified' ||
    isStale(provenance, now)
  )
}

export type ClaimId =
  // Market and valuation data surfaces
  | 'market:city-prices'
  | 'market-data:notarised-sales'
  | 'price-atlas:rows'
  | 'land-value:rows'
  | 'locations:city-hubs'
  // Trust and volume claims (several remain open under TODO.md P0)
  | 'trust:google-rating'
  | 'trust:buyer-network'
  | 'trust:annual-sales'
  | 'trust:transaction-volume'
  | 'trust:floor-area-statistic'

export const CLAIM_REGISTRY: Record<ClaimId, Provenance> = {
  'market:city-prices': {
    owner: 'content',
    state: 'verified',
    source: 'immowelt / PriceHubble',
    checkedAt: '2026-09-03',
    expiresAt: '2027-03-31',
  },
  'market-data:notarised-sales': {
    owner: 'management',
    state: 'verified',
    source: 'basierend auf Vermittlungsdaten der Immonation',
    checkedAt: '2026-09-03',
    expiresAt: '2027-03-31',
    note: 'First-party transaction records; not independently auditable from outside the firm.',
  },
  'price-atlas:rows': {
    owner: 'content',
    state: 'verified',
    source: 'basierend auf Vermittlungsdaten der Immonation',
    checkedAt: '2026-09-03',
    expiresAt: '2027-03-31',
  },
  'land-value:rows': {
    owner: 'content',
    state: 'verified',
    source: 'Gutachterausschüsse der jeweiligen Städte / BORIS Bayern',
    sourceUrl: 'https://www.boris.bayern.de/',
    checkedAt: '2026-09-03',
    expiresAt: '2027-03-31',
  },
  'locations:city-hubs': {
    owner: 'content',
    state: 'provisional',
    checkedAt: '2026-09-03',
    note:
      'Only the per-city context and focuses are hand-written; titles, sections and FAQs are one ' +
      'template with the city name interpolated. Pages remain indexed pending real local content.',
  },
  'trust:google-rating': {
    owner: 'content',
    state: 'verified',
    source: 'Google Business Profile',
    checkedAt: '2026-07-06',
    expiresAt: '2026-12-31',
  },
  'trust:buyer-network': {
    owner: 'unassigned',
    state: 'unverified',
    note: 'TODO.md P0: the 8,000+ figure conflicts with the 5,000+ recorded during research.',
  },
  'trust:annual-sales': {
    owner: 'unassigned',
    state: 'unverified',
    note: 'TODO.md P0: 40 versus 60+ annual sales is unreconciled across the site.',
  },
  'trust:transaction-volume': {
    owner: 'unassigned',
    state: 'unverified',
    note: 'TODO.md P0: the 30 million euro transaction volume has no dated source on file.',
  },
  'trust:floor-area-statistic': {
    owner: 'unassigned',
    state: 'unverified',
    note:
      'The "fast jede zweite Immobilie" floor-area claim is drawn from the client brief and has ' +
      'no external source. Left in place; flagged for the P0 claims pass.',
  },
}

/** Every claim needing a human decision, for the governance report. */
export function listClaimsNeedingAttention(now: Date = new Date()) {
  return (Object.entries(CLAIM_REGISTRY) as Array<[ClaimId, Provenance]>).filter(([, provenance]) =>
    needsAttention(provenance, now),
  )
}
