export const PAIR_SLUGS = [
  'bedroom-entenberg',
  'living-room-nuremberg',
  'office-wiesenstrasse',
  'bedroom-nuremberg',
  'terrace-entenberg',
  'entrance-nuremberg',
  'plot-schwabach',
] as const

export type PairSlug = (typeof PAIR_SLUGS)[number]

export const LEAD_PAIR_COUNT = 1

/**
 * Das Paar im Startseiten-Teaser. Nicht `plot-schwabach` — dasselbe Grundstück
 * läuft im selben Kapitel schon als Film in der Marketing-Kachel — und nichts aus
 * „Entenberg“, dessen Ortsname der Kunde noch nicht bestätigt hat.
 */
export const HOME_TEASER_PAIR: PairSlug = 'living-room-nuremberg'

export type VisualizationPair = {
  slug: PairSlug
  title: string
  text: string
  beforeAlt: string
  afterAlt: string
}
