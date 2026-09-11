import { ArrowUpRight, Star } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { formatReviewDate, type DisplayReview } from '@/lib/content/google-reviews'

export type TourVoicesLabels = {
  eyebrow: string
  title: string
  intro: string
  rating: string
  fullReview: string
  source: string
  allReviews: string
  stars: (rating: number) => string
}

const TOUR_MENTION = /virtuell/i

/**
 * Der Satz der Bewertung, der den Rundgang erwähnt — wörtlich übernommen,
 * Auslassungen mit „…“ markiert. Eine Kundenstimme wird nie umformuliert oder
 * übersetzt; der vollständige Originaltext steht direkt darunter.
 */
function tourExcerpt(quote: string) {
  const sentences = quote.split(/(?<=[.!?])\s+/)
  const index = sentences.findIndex((sentence) => TOUR_MENTION.test(sentence))
  const sentence = sentences[index]
  if (index < 0 || sentences.length === 1 || !sentence) return quote
  return `${index > 0 ? '… ' : ''}${sentence}${index < sentences.length - 1 ? ' …' : ''}`
}

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <span className="text-brand-600 flex gap-0.5">
      {Array.from({ length: count }, (_, index) => (
        <Star key={index} className="size-4 fill-current" strokeWidth={0} aria-hidden="true" />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
}

/** Google-Bewertungen, in denen Eigentümer den Rundgang ausdrücklich nennen. */
export function TourVoices({
  reviews,
  locale,
  googleUrl,
  labels,
}: {
  reviews: readonly DisplayReview[]
  locale: Locale
  googleUrl: string
  labels: TourVoicesLabels
}) {
  if (reviews.length === 0) return null

  const open = locale === 'de' ? '„' : '“'
  const close = locale === 'de' ? '“' : '”'

  return (
    <section className="border-border bg-muted/45 border-y py-18 md:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs">
              {labels.eyebrow}
            </p>
            <h2 className="hyphens-headline mt-4 max-w-[18ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words md:text-[3.2rem]">
              {labels.title}
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
              {labels.intro}
            </p>
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold underline-offset-4 hover:underline"
            >
              <Stars count={5} label="" />
              {labels.rating}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-px bg-neutral-950/10 md:grid-cols-2">
          {reviews.map((review) => (
            <figure key={review.id} className="bg-background flex flex-col p-6 sm:p-8">
              <Stars count={review.rating} label={labels.stars(review.rating)} />
              <blockquote
                lang="de"
                className="mt-5 max-w-[46ch] font-serif text-xl leading-[1.45] text-pretty md:text-[1.4rem]"
              >
                {open}
                {tourExcerpt(review.quote)}
                {close}
              </blockquote>
              <details className="mt-5">
                <summary className="text-brand-700 w-fit cursor-pointer text-sm font-semibold underline-offset-4 hover:underline">
                  {labels.fullReview}
                </summary>
                <p
                  lang="de"
                  className="text-muted-foreground mt-3 max-w-[68ch] text-[15px] leading-[1.7] text-pretty"
                >
                  {open}
                  {review.quote}
                  {close}
                </p>
              </details>
              <figcaption className="border-border mt-auto border-t pt-5 text-sm">
                <span className="font-semibold">{review.author}</span>
                <span className="text-muted-foreground">
                  {' · '}
                  {labels.source} · {formatReviewDate(review, locale)}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <Link
          href="/reviews"
          className="border-border mt-8 inline-flex min-h-11 items-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px"
        >
          {labels.allReviews}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
