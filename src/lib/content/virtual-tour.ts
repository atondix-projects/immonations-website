import type { ReferenceId } from './references'

export type VirtualTour = {
  /** Öffentlich geteilte Rundgang-URL des Anbieters. */
  readonly url: string
  /** Anbietername für Consent-Hinweis und Datenschutzangaben. */
  readonly provider: string
  /** Verkaufsreferenz, zu der der Rundgang gehört — liefert Titelbild und Kennzahlen. */
  readonly referenceId: ReferenceId
}

/**
 * Verifizierter 360°-Rundgang von Immonation (Ogulo, Referenzobjekt Hagenbüchach).
 *
 * Der Wert ist bewusst als `VirtualTour | null` typisiert: Ist keine geprüfte URL
 * hinterlegt, fällt die Vermarktungs-Sektion auf das Präsentationsvideo zurück.
 * So wird nie ein toter oder erfundener Rundgang-Link ausgeliefert.
 */
export const VIRTUAL_TOUR: VirtualTour | null = {
  url: 'https://tour.ogulo.com/a4mC',
  provider: 'Ogulo',
  referenceId: 'hagenbuechach-hausaeckern',
}

/**
 * Google-Bewertungen, in denen Eigentümer den virtuellen Rundgang ausdrücklich
 * erwähnen. `/virtuell` zitiert sie; `tests/contracts/virtual-tour.test.ts` hält
 * die Behauptung „erwähnen den Rundgang“ wahr.
 */
export const VIRTUAL_TOUR_REVIEW_IDS = ['ella-stoss', 'viktor-emter'] as const
