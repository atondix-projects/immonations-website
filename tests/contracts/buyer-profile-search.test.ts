import { describe, expect, it } from 'vitest'
import { normalizeSearchTerm, profileMatchesQuery } from '@/lib/content/buyer-profile-search'
import { listBuyerProfiles } from '@/lib/content/buyer-profiles'

describe('buyer profile district search', () => {
  it.each([
    ['Röthenbach', 'roethenbach'],
    ['Röthenbach', 'rothenbach'],
    ['Großgründlach', 'grossgruendlach'],
    ['Fürth', 'FUERTH'],
  ])('treats %s and %s alike', (a, b) => {
    expect(normalizeSearchTerm(a)).toBe(normalizeSearchTerm(b))
  })

  it('removes only diacritics, never plain letters or digits', () => {
    expect(normalizeSearchTerm('Fischbach 036')).toBe('fischbach 036')
  })

  it.each(['de', 'en'] as const)('finds every profile by each of its districts in %s', (locale) => {
    for (const profile of listBuyerProfiles(locale)) {
      for (const district of profile.districts) {
        expect(
          profileMatchesQuery(profile, normalizeSearchTerm(district.name)),
          `${profile.id} not found by "${district.name}"`,
        ).toBe(true)
      }
    }
  })

  it('matches everything when the search is empty', () => {
    const [profile] = listBuyerProfiles('de')
    expect(profile && profileMatchesQuery(profile, '')).toBe(true)
  })
})
