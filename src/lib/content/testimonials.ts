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

import type { VideoCaptionTrack } from '@/components/site/video-dialog'

type TestimonialVideo = {
  src: string
  /** Echte Pixelmaße — ohne sie kennt das Overlay das Seitenverhältnis erst nach dem Laden. */
  width: number
  height: number
  /**
   * Untertitelspuren zum gesprochenen Inhalt. Alle vier Kundenvideos haben Ton und
   * brauchen daher Untertitel (WCAG 1.2.2); die WebVTT-Dateien stehen noch aus.
   * Sobald eine Datei unter `public/videos/testimonials/` liegt, genügt der Eintrag
   * hier — `VideoDialog` rendert die Spur ohne weitere Codeänderung.
   */
  captions?: readonly VideoCaptionTrack[]
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
  /**
   * `object-position` in Querformat-Kacheln. Der Play-Button bleibt zentriert;
   * der Anker schiebt das Gesicht nach oben, damit der Button auf der Brust
   * landet. Höheres Y zeigt weiter unten im Hochformat — Gesicht steigt.
   * Markus (3:4, Mitte) ist die Referenz; nicht anfassen.
   */
  coverClass?: string
}

const PORTRAIT_VIDEO = { width: 720, height: 1280 } as const

const TESTIMONIAL_MEDIA = {
  'viktor-emter': {
    image: '/images/testimonials/viktor-emter.webp',
    video: { src: '/videos/testimonials/viktor-emter.mp4', ...PORTRAIT_VIDEO },
    coverClass: 'object-[center_72%] scale-110',
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
    video: { src: '/videos/testimonials/markus-burkhard.mp4', ...PORTRAIT_VIDEO },
    review: {
      reviewer: 'Markus Burkhard',
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
    video: { src: '/videos/testimonials/sandra-boerschlein.mp4', ...PORTRAIT_VIDEO },
    coverClass: 'object-[center_42%]',
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
  'andres-gugel': {
    image: '/images/testimonials/andres-gugel.webp',
    video: { src: '/videos/testimonials/andres-gugel.mp4', ...PORTRAIT_VIDEO },
    coverClass: 'object-[center_38%]',
  },
  'herr-sippel': { image: '/images/testimonials/herr-sippel-property.jpg' },
  'frau-hartmann': { image: '/images/testimonials/frau-hartmann-property.jpg' },
} as const satisfies Record<string, TestimonialMedia>

export type TestimonialId = keyof typeof TESTIMONIAL_MEDIA

export const TESTIMONIAL_IDS = Object.keys(TESTIMONIAL_MEDIA) as TestimonialId[]

/**
 * Kundenstimmen mit vollständiger Verkaufsgeschichte (Zitat, Kontext, Ergebnis).
 * Die vier Video-Interviews aus `assets/Verkäufer Feedback Videos` stehen auf der
 * Startseite; Sippel und Hartmann bleiben für Ratgeber- und Standortseiten.
 */
export type StoryId =
  | 'viktor-emter'
  | 'sandra-boerschlein'
  | 'markus-burkhard'
  | 'andres-gugel'
  | 'herr-sippel'
  | 'frau-hartmann'

/** Die vier Feedback-Videos der Startseite, in der Reihenfolge der Sektion. */
export const HOME_STORY_IDS = [
  'viktor-emter',
  'sandra-boerschlein',
  'markus-burkhard',
  'andres-gugel',
] as const satisfies readonly StoryId[]

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

/** `object-position` für Kacheln, die das Hochformat-Poster quer beschneiden. */
export function testimonialCoverClass(id: TestimonialId) {
  const media: TestimonialMedia = TESTIMONIAL_MEDIA[id]
  return media.coverClass ?? 'object-center'
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

/** Startseiten-Geschichten in fester Reihenfolge, ohne Sippel/Hartmann. */
export function homeStories(items: TestimonialStory[]): TestimonialStory[] {
  const byId = new Map(items.map((item) => [item.id, item]))
  return HOME_STORY_IDS.flatMap((id) => {
    const item = byId.get(id)
    return item ? [item] : []
  })
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
  'sell-apartment': 'sandra-boerschlein',
  'sell-land': 'andres-gugel',
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
  schwabach: 'sandra-boerschlein',
}

export function storyForLocation(slug: string): StoryId | null {
  return LOCATION_STORIES[slug] ?? null
}
