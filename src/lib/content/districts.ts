import type { Locale } from '@/i18n/routing'
import { DISTRICTS } from '@/lib/routing/route-catalog'

export type DistrictCitySlug = keyof typeof DISTRICTS

export type DistrictLink = { slug: string; name: string }

export const DISTRICT_CITY_NAMES: Record<DistrictCitySlug, string> = {
  nuernberg: 'Nürnberg',
  fuerth: 'Fürth',
  erlangen: 'Erlangen',
  zirndorf: 'Zirndorf',
  schwabach: 'Schwabach',
}

/** Slugs whose display name needs umlauts or ß restored. */
const DISPLAY_NAMES: Record<string, string> = {
  baerenschanze: 'Bärenschanze',
  buchenbuehl: 'Buchenbühl',
  buechenbach: 'Büchenbach',
  fuerth: 'Fürth',
  gleisshammer: 'Gleißhammer',
  grossgruendlach: 'Großgründlach',
  hardhoehe: 'Hardhöhe',
  hoefen: 'Höfen',
  moegeldorf: 'Mögeldorf',
  oberfuerberg: 'Oberfürberg',
  roethenbach: 'Röthenbach',
  roethelheimpark: 'Röthelheimpark',
  stadtteil: 'Stadtteil',
  steinbuehl: 'Steinbühl',
  suedstadt: 'Südstadt',
  suendersbuehl: 'Sündersbühl',
  woehrd: 'Wöhrd',
}

export function districtDisplayName(slug: string) {
  if (DISPLAY_NAMES[slug]) return DISPLAY_NAMES[slug]
  return slug
    .split('-')
    .map((part) => (part === 'st' ? 'St.' : `${part.charAt(0).toUpperCase()}${part.slice(1)}`))
    .join(' ')
}

export function isDistrictCity(value: string): value is DistrictCitySlug {
  return value in DISTRICTS
}

/** All published district pages of a city, alphabetised by display name. */
export function listCityDistricts(city: DistrictCitySlug, locale: Locale): DistrictLink[] {
  return (DISTRICTS[city] as readonly string[])
    .map((slug) => ({ slug, name: districtDisplayName(slug) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))
}
