import { describe, expect, it } from 'vitest'
import {
  CLAIM_REGISTRY,
  DATA_AS_OF,
  isStale,
  listClaimsNeedingAttention,
  needsAttention,
  type Provenance,
} from '@/lib/content/provenance'

/**
 * These tests assert that governance metadata is *present and coherent* — never that a
 * claim is true. `owner: 'unassigned'` and `state: 'unverified'` are legal values that
 * pass here on purpose.
 *
 * If this suite failed on unverified claims it would go red the moment an honest gap was
 * recorded, and the only ways to green would be to weaken the test or to invent a source.
 * Surfacing the gap is `scripts/content-governance-report.py`'s job.
 */
describe('content provenance contract', () => {
  const entries = Object.entries(CLAIM_REGISTRY) as Array<[string, Provenance]>

  it('gives every claim an owner and a verification state', () => {
    expect(entries.length).toBeGreaterThan(0)

    for (const [claimId, provenance] of entries) {
      expect(claimId, `${claimId} must declare an owner`).toBeTruthy()
      expect(['unassigned', 'content', 'legal', 'engineering', 'management']).toContain(
        provenance.owner,
      )
      expect(['verified', 'provisional', 'unverified']).toContain(provenance.state)
    }
  })

  it('requires a source and a check date once a claim is verified', () => {
    for (const [claimId, provenance] of entries) {
      if (provenance.state !== 'verified') continue
      expect(provenance.source, `${claimId} is verified but names no source`).toBeTruthy()
      expect(provenance.checkedAt, `${claimId} is verified but has no check date`).toMatch(
        /^\d{4}-\d{2}-\d{2}$/,
      )
    }
  })

  it('explains why a claim is unverified rather than leaving it bare', () => {
    for (const [claimId, provenance] of entries) {
      if (provenance.state === 'verified') continue
      expect(provenance.note, `${claimId} is not verified and must say why`).toBeTruthy()
    }
  })

  it('keeps every date field parseable and expiry after the check date', () => {
    for (const [claimId, provenance] of entries) {
      for (const field of ['checkedAt', 'expiresAt'] as const) {
        const value = provenance[field]
        if (!value) continue
        expect(value, `${claimId}.${field} must be an ISO date`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(Number.isNaN(Date.parse(value)), `${claimId}.${field} must parse`).toBe(false)
      }

      if (provenance.checkedAt && provenance.expiresAt) {
        expect(
          Date.parse(provenance.expiresAt),
          `${claimId} expires before it was checked`,
        ).toBeGreaterThan(Date.parse(provenance.checkedAt))
      }
    }
  })

  it('treats an entry as stale only after its expiry has passed', () => {
    const dated: Provenance = { owner: 'content', state: 'verified', expiresAt: '2026-06-30' }

    expect(isStale(dated, new Date('2026-06-01T00:00:00Z'))).toBe(false)
    expect(isStale(dated, new Date('2026-06-30T12:00:00Z'))).toBe(false)
    expect(isStale(dated, new Date('2026-07-05T00:00:00Z'))).toBe(true)
    expect(isStale({ owner: 'content', state: 'verified' })).toBe(false)
  })

  it('flags unassigned owners, unverified claims and stale entries for attention', () => {
    expect(needsAttention({ owner: 'unassigned', state: 'verified' })).toBe(true)
    expect(needsAttention({ owner: 'content', state: 'unverified' })).toBe(true)
    expect(
      needsAttention(
        { owner: 'content', state: 'verified', expiresAt: '2020-01-01' },
        new Date('2026-09-03T00:00:00Z'),
      ),
    ).toBe(true)
    expect(needsAttention({ owner: 'content', state: 'verified' })).toBe(false)
  })

  it('reports the open P0 claims rather than hiding them', () => {
    const open = listClaimsNeedingAttention(new Date('2026-09-03T00:00:00Z')).map(([id]) => id)

    // These stay open deliberately: TODO.md P0 keeps the numeric-claims reconciliation
    // outstanding. The registry records that honestly instead of inventing a source.
    expect(open).toContain('trust:buyer-network')
    expect(open).toContain('trust:annual-sales')
    expect(open).toContain('trust:transaction-volume')
  })

  it('publishes one as-of date for every locale the site serves', () => {
    expect(DATA_AS_OF.de).toContain('2026')
    expect(DATA_AS_OF.en).toContain('2026')
    expect(DATA_AS_OF.iso).toMatch(/^\d{4}-\d{2}$/)
  })
})
