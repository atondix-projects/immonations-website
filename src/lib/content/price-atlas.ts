import { PRICE_ATLAS_ROWS } from './price-atlas-data'
import { DISTRICTS } from '@/lib/routing/route-catalog'

/**
 * Preisatlas — Stadtteilwerte je Quadratmeter für die Metropolregion Nürnberg.
 *
 * Reine Ableitungslogik über `price-atlas-data.ts`. Alles hier ist deterministisch
 * und ohne Locale-Abhängigkeit, damit Server- und Client-Rendering identische
 * Ergebnisse liefern (Formatierung passiert erst in der Ansicht).
 */

/** [Stadtteil, PLZ, Objektzahl, von, bis, Median, Mittelwert] */
export type PriceAtlasRow = readonly [string, string, number, number, number, number, number]

export type PriceAtlasCategory = 'apartment' | 'house'

export type PriceAtlasCityId =
  'nuernberg' | 'fuerth' | 'erlangen' | 'zirndorf' | 'forchheim' | 'schwabach'

export const PRICE_ATLAS_CITIES: readonly PriceAtlasCityId[] = [
  'nuernberg',
  'fuerth',
  'erlangen',
  'zirndorf',
  'forchheim',
  'schwabach',
]

export const PRICE_ATLAS_CATEGORIES: readonly PriceAtlasCategory[] = ['apartment', 'house']

export const CITY_NAMES: Record<PriceAtlasCityId, string> = {
  nuernberg: 'Nürnberg',
  fuerth: 'Fürth',
  erlangen: 'Erlangen',
  zirndorf: 'Zirndorf',
  forchheim: 'Forchheim',
  schwabach: 'Schwabach',
}

/**
 * Ab wie vielen ausgewerteten Objekten eine Spanne als belastbar gilt.
 * Unterhalb der Schwelle wird die Zeile als dünne Datenlage gekennzeichnet.
 */
const RELIABLE_SAMPLE_SIZE = 5

/** Anteil der Spanne, ab dem eine Lage als oberes bzw. mittleres Preisband gilt. */
const UPPER_TIER_THRESHOLD = 0.62
const MID_TIER_THRESHOLD = 0.34

export type PriceTier = 'upper' | 'mid' | 'lower'

export type PriceAtlasEntry = {
  city: PriceAtlasCityId
  district: string
  postalCode: string
  category: PriceAtlasCategory
  sampleSize: number
  low: number
  high: number
  median: number
  average: number
  /** Genügend Objekte für eine belastbare Spanne. */
  reliable: boolean
  /** Slug und Name einer bestehenden Stadtteilseite, falls vorhanden. */
  districtLink: { slug: string; name: string } | null
}

export type PriceAtlasBand = {
  /** Startpunkt der Spanne auf der Stadtskala, in Prozent. */
  left: number
  /** Breite der Spanne auf der Stadtskala, in Prozent. */
  width: number
  /** Position des Medians auf der Stadtskala, in Prozent. */
  median: number
  tier: PriceTier
}

export type PriceAtlasGroup = {
  city: PriceAtlasCityId
  cityName: string
  category: PriceAtlasCategory
  /** Nach Median absteigend sortiert — teuerste Lage zuerst. */
  entries: readonly PriceAtlasEntry[]
  scale: { low: number; high: number } | null
  /** Median über alle Stadtteil-Mediane. */
  cityMedian: number | null
  top: PriceAtlasEntry | null
  bottom: PriceAtlasEntry | null
}

type DistrictLinkOverride = {
  slug: string
  /**
   * Name der Zielseite, falls er vom Atlas-Namen abweicht. Nötig, weil mehrere
   * Atlas-Lagen auf dieselbe Stadtteilseite zeigen (Langwasser Nord/Süd) — der
   * Link darf keine Seite versprechen, die es unter diesem Namen nicht gibt.
   */
  name: string
}

/**
 * Abweichende Schreibweisen zwischen Atlas-Daten und Stadtteil-Routen.
 * Nur Einträge, für die tatsächlich eine Stadtteilseite existiert — der
 * Abgleich gegen `DISTRICTS` verhindert Links auf nicht erzeugte Routen.
 */
const DISTRICT_LINK_OVERRIDES: Partial<
  Record<PriceAtlasCityId, Record<string, DistrictLinkOverride>>
> = {
  nuernberg: {
    'Altstadt / St. Sebald': { slug: 'st-sebald', name: 'St. Sebald' },
    'Langwasser Nord': { slug: 'langwasser', name: 'Langwasser' },
    'Langwasser Süd': { slug: 'langwasser', name: 'Langwasser' },
  },
  zirndorf: {
    'Zirndorf Zentrum': { slug: 'zirndorf-stadt', name: 'Zirndorf Stadt' },
  },
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Liefert Slug und Namen einer bestehenden Stadtteilseite oder `null`.
 * Der Treffer wird immer gegen den Routen-Katalog geprüft, damit kein Link
 * auf eine Route zeigt, die `generateStaticParams` nicht erzeugt.
 */
function findDistrictLink(city: PriceAtlasCityId, district: string): DistrictLinkOverride | null {
  const known = (DISTRICTS as Partial<Record<string, readonly string[]>>)[city]
  if (!known) return null

  const candidate = DISTRICT_LINK_OVERRIDES[city]?.[district] ?? {
    slug: slugify(district),
    name: district,
  }
  return known.includes(candidate.slug) ? candidate : null
}

function toEntry(
  city: PriceAtlasCityId,
  category: PriceAtlasCategory,
  row: PriceAtlasRow,
): PriceAtlasEntry {
  const [district, postalCode, sampleSize, low, high, median, average] = row

  return {
    city,
    district,
    postalCode,
    category,
    sampleSize,
    low,
    high,
    median,
    average,
    reliable: sampleSize >= RELIABLE_SAMPLE_SIZE,
    districtLink: findDistrictLink(city, district),
  }
}

/** Median einer bereits unsortierten Zahlenliste. */
function medianOf(values: readonly number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 1) return sorted[middle] ?? null

  const lower = sorted[middle - 1]
  const upper = sorted[middle]
  if (lower === undefined || upper === undefined) return null
  return Math.round((lower + upper) / 2)
}

/** Alle Stadtteilwerte einer Stadt und Objektart, teuerste Lage zuerst. */
function getPriceAtlasGroup(city: PriceAtlasCityId, category: PriceAtlasCategory): PriceAtlasGroup {
  const entries = PRICE_ATLAS_ROWS[city][category]
    .map((row) => toEntry(city, category, row))
    .sort((a, b) => b.median - a.median || a.district.localeCompare(b.district, 'de'))

  const first = entries[0]
  const last = entries[entries.length - 1]

  return {
    city,
    cityName: CITY_NAMES[city],
    category,
    entries,
    scale: entries.length
      ? {
          low: Math.min(...entries.map((entry) => entry.low)),
          high: Math.max(...entries.map((entry) => entry.high)),
        }
      : null,
    cityMedian: medianOf(entries.map((entry) => entry.median)),
    top: first ?? null,
    bottom: last ?? null,
  }
}

/** Alle Stadt/Objektart-Kombinationen — Basis für das serverseitige Rendering. */
export function listPriceAtlasGroups(): readonly PriceAtlasGroup[] {
  return PRICE_ATLAS_CITIES.flatMap((city) =>
    PRICE_ATLAS_CATEGORIES.map((category) => getPriceAtlasGroup(city, category)),
  )
}

/**
 * Geometrie eines Preisbands auf der Skala seiner Stadt.
 * Die Prozentwerte sind der einzige Fall, in dem ein Inline-Style zulässig ist:
 * sie kommen aus den Daten und lassen sich nicht als Utility-Klasse ausdrücken.
 */
export function getBand(
  entry: PriceAtlasEntry,
  scale: { low: number; high: number },
): PriceAtlasBand {
  const span = scale.high - scale.low || 1
  const position = (value: number) => ((value - scale.low) / span) * 100
  const left = position(entry.low)
  const relative = (entry.median - scale.low) / span

  return {
    left,
    width: Math.max(position(entry.high) - left, 1.2),
    median: position(entry.median),
    tier:
      relative > UPPER_TIER_THRESHOLD ? 'upper' : relative > MID_TIER_THRESHOLD ? 'mid' : 'lower',
  }
}

/** Freitextsuche über Stadtteilname und Postleitzahl. */
export function matchesQuery(entry: PriceAtlasEntry, query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  return entry.district.toLowerCase().includes(needle) || entry.postalCode.includes(needle)
}

/** Kennzahlen für Lede und Methodik — aus den Daten abgeleitet, nicht gepflegt. */
export function getPriceAtlasCoverage() {
  const cities = PRICE_ATLAS_CITIES.filter(
    (city) =>
      PRICE_ATLAS_ROWS[city].apartment.length > 0 || PRICE_ATLAS_ROWS[city].house.length > 0,
  )

  const districts = new Set(
    cities.flatMap((city) =>
      [...PRICE_ATLAS_ROWS[city].apartment, ...PRICE_ATLAS_ROWS[city].house].map(
        (row) => `${city}|${row[0]}`,
      ),
    ),
  )

  return { cities: cities.length, districts: districts.size }
}

/**
 * Alle Stadtteilwerte zu einer Postleitzahl. Eine PLZ deckt in der Regel
 * mehrere Stadtteile ab (z. B. 90475), deshalb ist das Ergebnis eine Liste.
 */
export function findEntriesByPostalCode(
  postalCode: string,
  category: PriceAtlasCategory,
): readonly PriceAtlasEntry[] {
  const needle = postalCode.trim()
  if (!/^\d{5}$/.test(needle)) return []

  return PRICE_ATLAS_CITIES.flatMap((city) =>
    PRICE_ATLAS_ROWS[city][category]
      .filter((row) => row[1] === needle)
      .map((row) => toEntry(city, category, row)),
  )
}
