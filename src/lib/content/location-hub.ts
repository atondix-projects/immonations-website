import type { Locale } from '@/i18n/routing'
import { isDistrictCity, listCityDistricts, type DistrictLink } from '@/lib/content/districts'
import { listLocations, type LocationGuide } from '@/lib/content/locations'
import { listLocalizedReferences, type ReferenceItem } from '@/lib/content/references'

/** Unternehmenssitz — die Stadtübersicht stellt ihn als erste, große Karte heraus. */
export const HEADQUARTERS_SLUG = 'zirndorf'

export type LocationHubCity = {
  location: LocationGuide
  districts: DistrictLink[]
  references: ReferenceItem[]
  isHeadquarters: boolean
}

/**
 * Alles, was die Stadtübersicht zeigt, aus den bestehenden Registern abgeleitet:
 * Regionsseiten, Stadtteilseiten und Verkaufsreferenzen. Keine gepflegten Zahlen,
 * damit die Kennzahlen nie hinter dem Inhalt zurückbleiben.
 */
export function getLocationHub(locale: Locale) {
  const references = listLocalizedReferences(locale)
  const locations = listLocations(locale)
  const hubSlugs = new Set(locations.map((location) => location.slug))

  const cities: LocationHubCity[] = locations.map((location) => ({
    location,
    districts: isDistrictCity(location.slug) ? listCityDistricts(location.slug, locale) : [],
    references: references.filter((item) => item.citySlug === location.slug),
    isHeadquarters: location.slug === HEADQUARTERS_SLUG,
  }))

  // Verkäufe außerhalb der fünf Städte — belegen die Reichweite ins Umland.
  const outerReferences = references
    .filter((item) => !hubSlugs.has(item.citySlug))
    .sort((a, b) => a.city.localeCompare(b.city, locale))

  return {
    cities,
    outerReferences,
    stats: {
      cities: locations.length,
      districts: cities.reduce((sum, city) => sum + city.districts.length, 0),
      references: references.length,
      towns: new Set(references.map((item) => item.citySlug)).size,
    },
  }
}
