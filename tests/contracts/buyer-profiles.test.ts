import { describe, expect, it } from 'vitest'
import {
  listBuyerDistrictOptions,
  listBuyerProfileRecords,
  listBuyerProfiles,
  listBuyerProfilesForDistrict,
  listDistrictDemand,
  type BuyerProfileRecord,
} from '@/lib/content/buyer-profiles'
import {
  findEntriesByDistrictSlug,
  PRICE_ATLAS_CITIES,
  type PriceAtlasCityId,
} from '@/lib/content/price-atlas'
import { CLAIM_REGISTRY } from '@/lib/content/provenance'
import { DISTRICTS } from '@/lib/routing/route-catalog'

const records = listBuyerProfileRecords()

describe('buyer profile contract', () => {
  it('holds 36 profiles with unique ids', () => {
    const ids = records.map((record) => record.id)
    expect(ids).toHaveLength(36)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('links every district to a published district route', () => {
    for (const record of records) {
      expect(record.districts.length, `${record.id} names no district`).toBeGreaterThan(0)
      for (const district of record.districts) {
        expect(
          DISTRICTS[record.city] as readonly string[],
          `${record.id} → ${district.slug}`,
        ).toContain(district.slug)
        expect(district.name.trim()).not.toBe('')
      }
    }
  })

  /** „Gut findbar für alle Stadtteile“: Jede Stadtteilseite zeigt mindestens ein Profil. */
  it('covers every district page with at least one profile', () => {
    for (const [city, slugs] of Object.entries(DISTRICTS)) {
      for (const slug of slugs) {
        expect(
          listBuyerProfilesForDistrict('de', city, slug).length,
          `${city}/${slug} has no search profile`,
        ).toBeGreaterThan(0)
      }
    }
  })

  it('spreads profiles evenly instead of stacking them in a few districts', () => {
    const perDistrict = records
      .flatMap((record) => record.districts.map((district) => `${record.city}:${district.slug}`))
      .reduce<Record<string, number>>((acc, key) => ({ ...acc, [key]: (acc[key] ?? 0) + 1 }), {})
    for (const [district, count] of Object.entries(perDistrict)) {
      expect(count, `${district} is over-represented`).toBeLessThanOrEqual(2)
    }
  })

  it('offers every district in the search suggestions', () => {
    const names = new Set(listBuyerDistrictOptions('de').map((option) => option.name))
    for (const record of records) {
      for (const district of record.districts) expect(names).toContain(district.name)
    }
  })

  it('includes the three examples from the client brief', () => {
    const has = (match: (record: BuyerProfileRecord) => boolean) => records.some(match)

    expect(
      has(
        (r) =>
          r.segment === 'family' &&
          r.propertyType === 'house' &&
          r.city === 'nuernberg' &&
          r.budgetMax === 870_000,
      ),
    ).toBe(true)
    expect(
      has(
        (r) => r.segment === 'single' && r.propertyType === 'apartment' && r.budgetMax === 120_000,
      ),
    ).toBe(true)
    expect(has((r) => r.segment === 'investor' && r.budgetMax === 2_000_000)).toBe(true)
  })

  it('keeps budgets plausible against the price atlas', () => {
    let checked = 0

    for (const record of records) {
      if (!record.areaMin) continue
      if (record.propertyType !== 'house' && record.propertyType !== 'apartment') continue
      const perSquareMetre = record.budgetMax / record.areaMin
      let checkedForRecord = 0

      for (const district of record.districts) {
        const entries = findEntriesByDistrictSlug(record.city, district.slug).filter(
          (entry) => entry.category === record.propertyType,
        )
        for (const entry of entries) {
          checkedForRecord += 1
          expect(
            perSquareMetre,
            `${record.id}: budget per m² is below the ${district.name} median`,
          ).toBeGreaterThanOrEqual(entry.median)
        }
      }

      // `findEntriesByDistrictSlug` überspringt stumm, wenn kein Atlas-Stadtteil passt. Ohne
      // diese Untergrenze bliebe ein Profil ungeprüft grün, sobald alle Slugs danebenliegen.
      if (PRICE_ATLAS_CITIES.includes(record.city as PriceAtlasCityId)) {
        expect(
          checkedForRecord,
          `${record.id} was not checked against any district`,
        ).toBeGreaterThan(0)
      }
      checked += checkedForRecord
    }

    expect(checked, `only ${checked} district medians were checked`).toBeGreaterThanOrEqual(50)
  })

  it.each(['de', 'en'] as const)('fills every visible field in %s', (locale) => {
    for (const profile of listBuyerProfiles(locale)) {
      expect(profile.headline.trim(), `${profile.id} headline`).not.toBe('')
      expect(profile.brief.trim(), `${profile.id} brief`).not.toBe('')
      expect(profile.wishes.length, `${profile.id} wishes`).toBeGreaterThan(0)
      expect(profile.budget.amount).toMatch(/\d/)
    }
    expect(listDistrictDemand(locale).length).toBe(Object.keys(DISTRICTS).length)
  })

  it('records the publication decision in the claim registry', () => {
    const entry = CLAIM_REGISTRY['buyer-search:profiles']
    expect(entry.note).toBeTruthy()
    expect(entry.expiresAt, 'search profiles must be refreshed on a schedule').toMatch(
      /^\d{4}-\d{2}-\d{2}$/,
    )
  })
})
