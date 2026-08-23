import { CITY_NAMES, findEntriesByPostalCode } from '@/lib/content/price-atlas'
import type { PriceAtlasCategory } from '@/lib/content/price-atlas'
import type { Answers, PropertyTypeId } from './types'
import { numberAnswer, textAnswer } from './types'

/**
 * Grobe Online-Wertspanne — „hergeleitet, nicht geraten“.
 *
 * Basis sind die veröffentlichten Stadtteilwerte des Preisatlas (€/m², je PLZ).
 * Der belastbare Wert entsteht erst im Vor-Ort-Termin; diese Funktion liefert
 * daher bewusst eine Spanne und niemals einen Punktwert.
 *
 * Der Preisatlas deckt ausschließlich Wohnungen und Häuser in sechs Städten ab.
 * Für Grundstück, Mehrfamilienhaus und Gewerbe — und für jede PLZ außerhalb der
 * Abdeckung — gibt es deshalb keine Spanne. Das Ergebnis ist ein
 * unterschiedener Typ, damit an der Aufrufstelle nichts „0 €“ rendert.
 */

export type ValuationEstimate =
  | {
      readonly kind: 'range'
      readonly low: number
      readonly high: number
      readonly perSqmLow: number
      readonly perSqmHigh: number
      readonly area: number
      readonly cityName: string
      readonly districts: readonly string[]
      /** Genügend ausgewertete Objekte für eine belastbare Spanne. */
      readonly reliable: boolean
    }
  | {
      readonly kind: 'unavailable'
      readonly reason: 'unsupported-type' | 'unknown-location' | 'missing-area'
    }

/** Nur diese beiden Objektarten sind im Preisatlas hinterlegt. */
const ATLAS_CATEGORY: Partial<Record<PropertyTypeId, PriceAtlasCategory>> = {
  apartment: 'apartment',
  house: 'house',
}

/**
 * Zustandsfaktoren auf die €/m²-Spanne. Bewusst flach gehalten — die Spanne
 * soll eine Größenordnung zeigen, keine Bewertung simulieren.
 */
const CONDITION_FACTORS: Record<string, number> = {
  'first-occupancy': 1.1,
  renovated: 1.05,
  maintained: 1.0,
  'needs-renovation': 0.85,
}

/** Aufschlag auf die Spannenbreite, wenn die Datenlage dünn ist. */
const THIN_DATA_WIDENING = 0.1

/** Auf 5.000 € gerundet — die Genauigkeit, die eine Onlinespanne hergibt. */
function roundToStep(value: number, step = 5000): number {
  return Math.max(step, Math.round(value / step) * step)
}

export function estimateValue(
  propertyType: PropertyTypeId | null,
  answers: Answers,
): ValuationEstimate {
  if (!propertyType) return { kind: 'unavailable', reason: 'unsupported-type' }

  const category = ATLAS_CATEGORY[propertyType]
  if (!category) return { kind: 'unavailable', reason: 'unsupported-type' }

  const area = numberAnswer(answers, 'livingArea')
  if (area === null || area <= 0) return { kind: 'unavailable', reason: 'missing-area' }

  const entries = findEntriesByPostalCode(textAnswer(answers, 'postcode'), category)
  const first = entries[0]
  if (!first) return { kind: 'unavailable', reason: 'unknown-location' }

  const factor = CONDITION_FACTORS[textAnswer(answers, 'condition')] ?? 1
  const reliable = entries.every((entry) => entry.reliable)
  const widening = reliable ? 0 : THIN_DATA_WIDENING

  const perSqmLow = Math.round(
    Math.min(...entries.map((entry) => entry.low)) * factor * (1 - widening),
  )
  const perSqmHigh = Math.round(
    Math.max(...entries.map((entry) => entry.high)) * factor * (1 + widening),
  )

  return {
    kind: 'range',
    low: roundToStep(perSqmLow * area),
    high: roundToStep(perSqmHigh * area),
    perSqmLow,
    perSqmHigh,
    area,
    cityName: CITY_NAMES[first.city],
    districts: [...new Set(entries.map((entry) => entry.district))],
    reliable,
  }
}
