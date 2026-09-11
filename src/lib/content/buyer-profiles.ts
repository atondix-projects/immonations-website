import type { Locale } from '@/i18n/routing'
import { DISTRICTS } from '@/lib/routing/route-catalog'
import { BUYER_PROFILE_RECORDS } from './buyer-profiles-data'

/**
 * Suchprofile für die Seite „Aktive Suchkunden“.
 *
 * Die Einträge in `buyer-profiles-data.ts` sind anonymisierte Suchprofile; die Freigabe hält
 * `buyer-search:profiles` in `provenance.ts` fest. Werden sie später aus OnOffice gespeist,
 * ändern sich nur die Datensätze, keine Komponente. Deshalb trennt dieses Modul Rohdaten
 * (`BuyerProfileRecord`) von der lokalisierten Darstellung (`BuyerProfile`).
 */

/** Städte mit eigenen Stadtteilseiten — nur dorthin kann ein Profil verlinken. */
export type BuyerProfileCity = keyof typeof DISTRICTS
export type BuyerSegment = 'family' | 'single' | 'couple' | 'investor' | 'retirees' | 'developer'
export type BuyerPropertyType = 'house' | 'apartment' | 'multi-family' | 'land'
export type BuyerFinancing = 'checked' | 'equity' | 'cash'

type Localized = Readonly<Record<Locale, string>>

export type BuyerProfileRecord = {
  readonly id: string
  readonly city: BuyerProfileCity
  /**
   * Slug aus `DISTRICTS` plus Anzeigename. Beides steht explizit da, weil sich der eine
   * nicht verlässlich aus dem anderen ableiten lässt (`zirndorf-stadt`, `hardhoehe`).
   */
  readonly districts: ReadonlyArray<{ readonly slug: string; readonly name: string }>
  readonly segment: BuyerSegment
  readonly propertyType: BuyerPropertyType
  readonly budgetMax: number
  readonly roomsMin?: number
  /** Mindestwohnfläche in m², bei Grundstücken die Mindestgrundstücksfläche. */
  readonly areaMin?: number
  readonly financing: BuyerFinancing
  readonly headline: Localized
  readonly brief: Localized
  readonly wishes: ReadonlyArray<Localized>
}

export type BuyerProfile = {
  id: string
  code: string
  city: BuyerProfileCity
  cityName: string
  segment: BuyerSegment
  segmentLabel: string
  propertyType: BuyerPropertyType
  propertyTypeLabel: string
  budget: { prefix: string; amount: string }
  facts: string[]
  financingLabel: string
  headline: string
  brief: string
  wishes: string[]
  districts: Array<{ slug: string; name: string }>
}

export type DistrictDemand = {
  city: BuyerProfileCity
  cityName: string
  districts: Array<{ slug: string; name: string; propertyTypes: string[] }>
}

export type FilterOption<T extends string> = { value: T; label: string }

export const BUYER_CITY_NAMES: Record<BuyerProfileCity, Localized> = {
  nuernberg: { de: 'Nürnberg', en: 'Nuremberg' },
  fuerth: { de: 'Fürth', en: 'Fürth' },
  erlangen: { de: 'Erlangen', en: 'Erlangen' },
  zirndorf: { de: 'Zirndorf', en: 'Zirndorf' },
  schwabach: { de: 'Schwabach', en: 'Schwabach' },
}

const CITY_ORDER = Object.keys(DISTRICTS) as BuyerProfileCity[]

export const BUYER_PROPERTY_TYPES: readonly BuyerPropertyType[] = [
  'house',
  'apartment',
  'multi-family',
  'land',
]

const SEGMENT_LABELS: Record<BuyerSegment, Localized> = {
  family: { de: 'Familie', en: 'Family' },
  single: { de: 'Single', en: 'Single buyer' },
  couple: { de: 'Paar', en: 'Couple' },
  investor: { de: 'Kapitalanlage', en: 'Investor' },
  retirees: { de: 'Ruhestand', en: 'Retirees' },
  developer: { de: 'Bauträger', en: 'Developer' },
}

const PROPERTY_TYPE_LABELS: Record<BuyerPropertyType, Localized> = {
  house: { de: 'Haus', en: 'House' },
  apartment: { de: 'Wohnung', en: 'Apartment' },
  'multi-family': { de: 'Mehrfamilienhaus', en: 'Apartment building' },
  land: { de: 'Grundstück', en: 'Building land' },
}

const FINANCING_LABELS: Record<BuyerFinancing, Localized> = {
  checked: { de: 'Finanzierung geprüft', en: 'Financing checked' },
  equity: { de: 'Eigenkapital vorhanden', en: 'Equity in place' },
  cash: { de: 'Kauf ohne Finanzierung', en: 'Cash purchase' },
}

const NUMBER_LOCALE: Record<Locale, string> = { de: 'de-DE', en: 'en-GB' }

function formatBudget(value: number, locale: Locale): BuyerProfile['budget'] {
  const isMillion = value >= 1_000_000
  const amount = new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    style: 'currency',
    currency: 'EUR',
    notation: isMillion ? 'compact' : 'standard',
    maximumFractionDigits: isMillion ? 1 : 0,
  }).format(value)

  return { prefix: locale === 'de' ? 'bis' : 'up to', amount }
}

function formatFacts(record: BuyerProfileRecord, locale: Locale): string[] {
  const number = new Intl.NumberFormat(NUMBER_LOCALE[locale])
  const isGerman = locale === 'de'
  const isLand = record.propertyType === 'land'

  // Ein einzelnes Zimmer beschreibt die Fläche schon; „ab 1 Zimmer“ liest sich nur seltsam.
  const rooms =
    record.roomsMin && record.roomsMin > 1
      ? [isGerman ? `ab ${record.roomsMin} Zimmer` : `${record.roomsMin}+ rooms`]
      : []
  const area = record.areaMin
    ? [
        isGerman
          ? `ab ${number.format(record.areaMin)} m² ${isLand ? 'Grundstück' : 'Wohnfläche'}`
          : `min. ${number.format(record.areaMin)} m² ${isLand ? 'plot' : 'living space'}`,
      ]
    : []

  return [...rooms, ...area]
}

function localizeProfile(record: BuyerProfileRecord, locale: Locale): BuyerProfile {
  return {
    id: record.id,
    code: record.id.toUpperCase(),
    city: record.city,
    cityName: BUYER_CITY_NAMES[record.city][locale],
    segment: record.segment,
    segmentLabel: SEGMENT_LABELS[record.segment][locale],
    propertyType: record.propertyType,
    propertyTypeLabel: PROPERTY_TYPE_LABELS[record.propertyType][locale],
    budget: formatBudget(record.budgetMax, locale),
    facts: formatFacts(record, locale),
    financingLabel: FINANCING_LABELS[record.financing][locale],
    headline: record.headline[locale],
    brief: record.brief[locale],
    wishes: record.wishes.map((wish) => wish[locale]),
    districts: record.districts.map((district) => ({ ...district })),
  }
}

export function listBuyerProfileRecords(): readonly BuyerProfileRecord[] {
  return BUYER_PROFILE_RECORDS
}

export function listBuyerProfiles(locale: Locale): BuyerProfile[] {
  return BUYER_PROFILE_RECORDS.map((record) => localizeProfile(record, locale))
}

/** Alle Profile, die diesen Stadtteil als Wunschlage nennen — für die Stadtteilseiten. */
export function listBuyerProfilesForDistrict(
  locale: Locale,
  city: string,
  slug: string,
): BuyerProfile[] {
  return BUYER_PROFILE_RECORDS.filter(
    (record) => record.city === city && record.districts.some((district) => district.slug === slug),
  ).map((record) => localizeProfile(record, locale))
}

/** Stadtteilnamen für die Suche auf der Suchkunden-Seite, je mit den Städten, in denen es sie gibt. */
export function listBuyerDistrictOptions(locale: Locale): Array<{ name: string; cities: string }> {
  const pairs = BUYER_PROFILE_RECORDS.flatMap((record) =>
    record.districts.map((district) => ({
      name: district.name,
      city: BUYER_CITY_NAMES[record.city][locale],
    })),
  )
  const names = [...new Set(pairs.map((pair) => pair.name))].sort((a, b) =>
    a.localeCompare(b, 'de'),
  )

  return names.map((name) => ({
    name,
    cities: [...new Set(pairs.filter((pair) => pair.name === name).map((pair) => pair.city))].join(
      ' · ',
    ),
  }))
}

/** Städte, für die mindestens ein Profil existiert — in der Reihenfolge von `DISTRICTS`. */
export function listBuyerProfileCities(locale: Locale): FilterOption<BuyerProfileCity>[] {
  return CITY_ORDER.filter((city) => BUYER_PROFILE_RECORDS.some((r) => r.city === city)).map(
    (city) => ({ value: city, label: BUYER_CITY_NAMES[city][locale] }),
  )
}

export function listBuyerProfileTypes(locale: Locale): FilterOption<BuyerPropertyType>[] {
  return BUYER_PROPERTY_TYPES.filter((type) =>
    BUYER_PROFILE_RECORDS.some((r) => r.propertyType === type),
  ).map((type) => ({ value: type, label: PROPERTY_TYPE_LABELS[type][locale] }))
}

/** Gesuchte Stadtteile je Stadt, mit den dort gesuchten Objektarten. Bewusst ohne Zählwerte. */
export function listDistrictDemand(locale: Locale): DistrictDemand[] {
  return CITY_ORDER.map((city) => {
    const entries = BUYER_PROFILE_RECORDS.filter((record) => record.city === city).flatMap(
      (record) => record.districts.map((district) => ({ ...district, type: record.propertyType })),
    )
    const slugs = [...new Set(entries.map((entry) => entry.slug))]
    const districts = slugs
      .map((slug) => {
        const matches = entries.filter((entry) => entry.slug === slug)
        return {
          slug,
          name: matches[0]?.name ?? slug,
          propertyTypes: BUYER_PROPERTY_TYPES.filter((type) =>
            matches.some((entry) => entry.type === type),
          ).map((type) => PROPERTY_TYPE_LABELS[type][locale]),
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'de'))

    return { city, cityName: BUYER_CITY_NAMES[city][locale], districts }
  }).filter((group) => group.districts.length > 0)
}
