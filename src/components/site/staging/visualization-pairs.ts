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

export type VisualizationPair = {
  slug: PairSlug
  title: string
  text: string
  beforeAlt: string
  afterAlt: string
}
