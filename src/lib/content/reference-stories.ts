/**
 * Curated customer reference stories from the master prototype (#referenzen).
 * Copy lives in `ReferencesPage.stories`; images reuse approved testimonial assets.
 */

export const REFERENCE_STORY_IDS = ['frau-hartmann', 'herr-sippel', 'frau-berthold'] as const

export type ReferenceStoryId = (typeof REFERENCE_STORY_IDS)[number]

const REFERENCE_STORY_MEDIA: Record<
  ReferenceStoryId,
  { propertyImage: string; propertyAlt: { de: string; en: string } }
> = {
  'frau-hartmann': {
    propertyImage: '/images/testimonials/frau-hartmann-property.jpg',
    propertyAlt: {
      de: 'Denkmalgeschützte Altbauwohnung in Nürnberg-St. Johannis',
      en: 'Heritage apartment in Nuremberg-St. Johannis',
    },
  },
  'herr-sippel': {
    propertyImage: '/images/testimonials/herr-sippel-property.jpg',
    propertyAlt: {
      de: 'Geerbte Doppelhaushälfte in Erlangen',
      en: 'Inherited semi-detached home in Erlangen',
    },
  },
  'frau-berthold': {
    propertyImage: '/images/testimonials/frau-berthold-property.jpg',
    propertyAlt: {
      de: 'Terrassenwohnung in Fürth',
      en: 'Terrace apartment in Fürth',
    },
  },
}

export type ReferenceStoryItem = {
  id: ReferenceStoryId
  type: string
  location: string
  name: string
  kpis: { value: string; label: string }[]
  startingPoint: string
  challenge: string
  result: string
  quote: string
}

export function referenceStoryImage(id: ReferenceStoryId) {
  return REFERENCE_STORY_MEDIA[id].propertyImage
}

export function referenceStoryPropertyAlt(id: ReferenceStoryId, locale: 'de' | 'en') {
  return REFERENCE_STORY_MEDIA[id].propertyAlt[locale]
}

export function listReferenceStories(items: ReferenceStoryItem[]): ReferenceStoryItem[] {
  const byId = new Map(items.map((item) => [item.id, item]))
  return REFERENCE_STORY_IDS.flatMap((id) => {
    const item = byId.get(id)
    return item ? [item] : []
  })
}
