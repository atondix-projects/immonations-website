import { getTranslations } from 'next-intl/server'
import {
  getReferenceDetail,
  referenceImage,
  type ReferenceId,
  type ReferenceItem,
} from '@/lib/content/references'
import { testimonialImage, testimonialReview, type TestimonialId } from '@/lib/content/testimonials'
import { TrustProofGrid, type TrustProofExample } from './trust-proof-grid'
import { CONTAINER } from './section-shell'

type ProofItem = { value: string; label: string }

/** Kundenstimmen-Texte aus `Home.feedback.items` — Name und Anlass der Aufnahme. */
type FeedbackItem = { id: TestimonialId; name: string; title: string }

/**
 * Belegquelle je Kennzahl. Die Bewertungsnote zeigt Bewertungen, Verkaufszahl
 * und Transaktionsvolumen zeigen verkaufte Objekte, die Suchkundenzahl zeigt
 * die Kundinnen und Kunden aus den Bewertungsvideos. Vier Listen statt einer,
 * weil dieselbe Objektkachel unter „4,9 / 5" nichts belegt.
 */

/** Bewertungs-Screenshots: Referenz-Reviews plus die Kundenstimmen-Reviews. */
const REVIEW_SOURCES = [
  { kind: 'reference', id: 'langenzenn-terrassenwohnung' },
  { kind: 'reference', id: 'fuerth-mehrfamilienhaus' },
  { kind: 'reference', id: 'deining-neubauwohnung' },
  { kind: 'testimonial', id: 'viktor-emter' },
] as const satisfies readonly (
  { kind: 'reference'; id: ReferenceId } | { kind: 'testimonial'; id: TestimonialId }
)[]

/** Verkaufte Objekte für „Immobilienverkäufe pro Jahr". */
const SALES_IDS = [
  'forchheim-eigentumswohnung',
  'fuerth-altbauwohnung',
  'nuernberg-reihenendhaus',
  'zirndorf-gartenwohnung',
] as const satisfies readonly ReferenceId[]

/** Größere Objekte für „jährliches Transaktionsvolumen". */
const VOLUME_IDS = [
  'fuerth-versorgungszentrum',
  'fuerth-mehrfamilienhaus',
  'heroldsbach-mehrfamilienhaus',
  'nuernberg-einfamilienhaus',
] as const satisfies readonly ReferenceId[]

/** Kundinnen und Kunden, die vor der Kamera über die Zusammenarbeit berichtet haben. */
const PERSON_IDS = [
  'viktor-emter',
  'markus-burkhard',
  'sandra-boerschlein',
  'andres-gugel',
] as const satisfies readonly TestimonialId[]

export async function TrustProof() {
  const [t, references] = await Promise.all([
    getTranslations('Home'),
    getTranslations('ReferencesPage'),
  ])
  const proof = t.raw('proof.items') as ProofItem[]
  const referenceItems = references.raw('items') as ReferenceItem[]
  const referencesById = new Map(referenceItems.map((item) => [item.id, item]))
  const feedbackById = new Map(
    (t.raw('feedback.items') as FeedbackItem[]).map((item) => [item.id, item]),
  )

  const propertyExamples = (ids: readonly ReferenceId[], badge: string) =>
    ids.flatMap<TrustProofExample>((id) => {
      const reference = referencesById.get(id)
      if (!reference) return []

      return [
        {
          kind: 'property',
          id,
          image: referenceImage(id),
          badge,
          srLabel: reference.title,
          title: reference.title,
          type: reference.type,
          location: reference.location,
        },
      ]
    })

  const reviewExamples = (badge: string) =>
    REVIEW_SOURCES.flatMap<TrustProofExample>((source) => {
      const review =
        source.kind === 'reference'
          ? getReferenceDetail(source.id)?.review
          : testimonialReview(source.id)
      if (!review) return []

      return [
        {
          kind: 'review',
          id: `review-${source.id}`,
          image: review.screenshot.src,
          // Ohne Hover erscheint nur eine 64-px-Kachel. Dort steht das Objekt
          // bzw. die Person zur Bewertung — der Screenshot selbst wäre in
          // dieser Größe ein grauer Streifen.
          thumb:
            source.kind === 'reference' ? referenceImage(source.id) : testimonialImage(source.id),
          badge,
          srLabel: review.reviewer,
          reviewer: review.reviewer,
          width: review.screenshot.width,
          height: review.screenshot.height,
        },
      ]
    })

  const personExamples = (badge: string) =>
    PERSON_IDS.flatMap<TrustProofExample>((id) => {
      const feedback = feedbackById.get(id)
      if (!feedback) return []

      return [
        {
          kind: 'person',
          id: `person-${id}`,
          image: testimonialImage(id),
          badge,
          srLabel: feedback.name,
          name: feedback.name,
          role: feedback.title,
        },
      ]
    })

  const examplesByIndex = [
    reviewExamples(t('proof.trailBadges.reviews')),
    propertyExamples(SALES_IDS, t('proof.trailBadges.sales')),
    propertyExamples(VOLUME_IDS, t('proof.trailBadges.volume')),
    personExamples(t('proof.trailBadges.search')),
  ]

  const exampleLabels = [
    t('proof.exampleLabels.reviews'),
    t('proof.exampleLabels.sales'),
    t('proof.exampleLabels.volume'),
    t('proof.exampleLabels.search'),
  ]

  const proofItems = proof.map((item, index) => ({
    ...item,
    exampleLabel: exampleLabels[index] ?? '',
    examples: examplesByIndex[index] ?? [],
  }))

  return (
    <section className="border-border bg-background border-b py-16 md:py-22">
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
              {t('proof.eyebrow')}
            </p>
            <h2 className="mt-5 max-w-[17ch] font-serif text-[2rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[2.35rem] md:text-[3.35rem]">
              {t('intro.title')}
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:pt-8">
            <p className="text-muted-foreground max-w-[62ch] text-[17px] leading-[1.75]">
              {t('intro.p1')}
            </p>
            <p className="text-muted-foreground max-w-[62ch] text-[17px] leading-[1.75]">
              {t('intro.p2')}
            </p>
          </div>
        </div>

        <TrustProofGrid items={proofItems} />
      </div>
    </section>
  )
}
