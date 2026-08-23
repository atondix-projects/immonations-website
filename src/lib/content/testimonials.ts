/**
 * Einzige Quelle für die Medien der Kundenstimmen.
 *
 * Vorher lag die Zuordnung von Poster- und Videopfaden doppelt in
 * `home/customer-stories.tsx` und `home/feedback-videos.tsx`. Mit der Ausspielung
 * auf Verkaufs-, Standort- und Kontaktseiten wäre daraus eine dritte Kopie
 * geworden — die Maße des Hochformat-Videos (720x1280) hätten dann an drei
 * Stellen gepflegt werden müssen. Aufbau analog zu `references.ts` und
 * `sold-videos.ts`.
 *
 * Die Texte selbst bleiben in `messages/{de,en}.json` unter `Testimonials.items`,
 * damit der bilinguale Vertrag des Projekts gewahrt bleibt.
 */

type TestimonialVideo = {
  src: string
  /** Echte Pixelmaße — ohne sie kennt das Overlay das Seitenverhältnis erst nach dem Laden. */
  width: number
  height: number
}

export type TestimonialReview = {
  reviewer: string
  rating: 5
  screenshot: {
    src: string
    width: number
    height: number
    alt: { de: string; en: string }
  }
}

type TestimonialMedia = {
  image: string
  video?: TestimonialVideo
  review?: TestimonialReview
}

const TESTIMONIAL_MEDIA = {
  'viktor-emter': {
    image: '/images/testimonials/viktor-emter.webp',
    video: { src: '/videos/testimonials/viktor-emter.mp4', width: 720, height: 1280 },
    review: {
      reviewer: 'Viktor Emter',
      rating: 5,
      screenshot: {
        src: '/images/reviews/google-viktor-emter.png',
        width: 522,
        height: 749,
        alt: {
          de: 'Originale Google-Bewertung von Viktor Emter',
          en: 'Original Google review by Viktor Emter',
        },
      },
    },
  },
  'markus-burkhard': {
    image: '/images/testimonials/markus-burkhard.webp',
    review: {
      reviewer: 'Markus Burkhardt',
      rating: 5,
      screenshot: {
        src: '/images/reviews/google-markus-burkhardt.png',
        width: 518,
        height: 315,
        alt: {
          de: 'Originale Google-Bewertung von Markus Burkhardt',
          en: 'Original Google review by Markus Burkhardt',
        },
      },
    },
  },
  'sandra-boerschlein': {
    image: '/images/testimonials/sandra-boerschlein.webp',
    review: {
      reviewer: 'Cyber 86',
      rating: 5,
      screenshot: {
        src: '/images/reviews/google-customer-review.png',
        width: 509,
        height: 513,
        alt: {
          de: 'Originale Google-Bewertung zur Kundenstimme von Sandra Börschlein',
          en: "Original Google review attached to Sandra Börschlein's customer story",
        },
      },
    },
  },
  'herr-sippel': { image: '/images/testimonials/herr-sippel-property.jpg' },
  'frau-hartmann': { image: '/images/testimonials/frau-hartmann-property.jpg' },
} as const satisfies Record<string, TestimonialMedia>

export type TestimonialId = keyof typeof TESTIMONIAL_MEDIA

/**
 * Kundenstimmen mit vollständiger Verkaufsgeschichte (Zitat, Kontext, Ergebnis).
 * Sandra Börschlein ist aus der freigegebenen Google-Bewertung ergänzt; ein
 * Video ist für sie weiterhin nicht hinterlegt.
 */
export type StoryId =
  'viktor-emter' | 'sandra-boerschlein' | 'markus-burkhard' | 'herr-sippel' | 'frau-hartmann'

/** Textinhalt einer Verkaufsgeschichte, gelesen aus `Testimonials.items`. */
export type TestimonialStory = {
  id: StoryId
  name: string
  context: string
  quote: string
  result: string
  alt: string
  video: boolean
}

export function testimonialImage(id: TestimonialId) {
  return TESTIMONIAL_MEDIA[id].image
}

/**
 * Liefert die Videodaten einer Kundenstimme oder `null`. Die Einschränkung auf
 * das ganze Objekt hält die Maße typisiert — ein direkter `.video`-Zugriff
 * verlöre sie über die Union der Einträge.
 */
export function testimonialVideo(id: TestimonialId): TestimonialVideo | null {
  const media: TestimonialMedia = TESTIMONIAL_MEDIA[id]
  return media.video ?? null
}

export function testimonialReview(id: TestimonialId): TestimonialReview | null {
  const media: TestimonialMedia = TESTIMONIAL_MEDIA[id]
  return media.review ?? null
}

/**
 * Verkaufsgeschichte passend zur Objektart einer Ratgeberseite.
 * Verschlüsselt über `translationKey` aus `seller-guides.ts`, nicht über den
 * Slug — der Slug ist je Sprache verschieden (`haus` / `house`), der Key nicht.
 *
 * Alle vier Ratgeber stehen ausdrücklich in der Tabelle: `null` sagt „hierzu
 * liegt keine passende Geschichte vor" und ist damit vom Tippfehler
 * unterscheidbar. Fällt eine Seite unerwartet ohne Sektion aus, fehlt der Key.
 */
const SELLER_GUIDE_STORIES: Record<string, StoryId | null> = {
  'sell-house': 'herr-sippel',
  'sell-apartment': 'frau-hartmann',
  'sell-land': null,
  'sell-apartment-building': null,
}

export function storyForSellerGuide(translationKey: string): StoryId | null {
  return SELLER_GUIDE_STORIES[translationKey] ?? null
}

/**
 * Verkaufsgeschichte zur Stadt einer Standortseite — jeweils ein tatsächlich
 * dort verkauftes Objekt. Fürth steht bewusst auf `null`: Das einzige Fürther
 * Material (Frau Berthold) besteht aus einem Foto ohne freigegebenen Text.
 */
const LOCATION_STORIES: Record<string, StoryId | null> = {
  zirndorf: 'markus-burkhard',
  nuernberg: 'frau-hartmann',
  erlangen: 'herr-sippel',
  fuerth: null,
}

export function storyForLocation(slug: string): StoryId | null {
  return LOCATION_STORIES[slug] ?? null
}
