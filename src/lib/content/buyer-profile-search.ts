import type { BuyerProfile } from './buyer-profiles'

/**
 * Stadtteilsuche der Suchkunden-Seite. Liegt außerhalb der Client-Komponente, damit die
 * Vergleichslogik testbar bleibt (`tests/contracts/buyer-profile-search.test.ts`).
 */

// Kombinierende diakritische Zeichen (U+0300–U+036F), die `normalize('NFD')` abspaltet. Per
// Codepunkt gebaut, damit weder unsichtbare Zeichen noch leicht verlorene Escapes im Quelltext stehen.
const COMBINING_MARKS = new RegExp(
  `[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`,
  'g',
)

/** Vergleichsform: „Röthenbach“, „roethenbach“ und „rothenbach“ ergeben dasselbe. */
export function normalizeSearchTerm(value: string): string {
  return value
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u')
    .trim()
}

/** Trifft, wenn ein gesuchter Stadtteil oder die Stadt den normalisierten Suchbegriff enthält. */
export function profileMatchesQuery(
  profile: Pick<BuyerProfile, 'districts' | 'cityName'>,
  normalizedQuery: string,
): boolean {
  if (!normalizedQuery) return true
  return (
    profile.districts.some((district) =>
      normalizeSearchTerm(district.name).includes(normalizedQuery),
    ) || normalizeSearchTerm(profile.cityName).includes(normalizedQuery)
  )
}
