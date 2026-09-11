import { ArrowUpRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import {
  ReviewSlideshow,
  type SlideshowReview,
} from '@/components/site/testimonials/review-slideshow'
import {
  formatReviewDate,
  GOOGLE_PROFILE,
  listTestimonialReviews,
} from '@/lib/content/google-reviews'
import { cn } from '@/lib/utils'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'

/**
 * Schriftliche Kundenstimmen aus demselben serverseitigen Review-Feed wie die
 * Bewertungsseiten. Bei Feed-Ausfällen bleiben dokumentierte Originalzitate
 * verfügbar und der Zustand wird transparent gekennzeichnet.
 */
export async function FeedbackReviews({
  anchorId = 'kundenstimmen-bewertungen',
  className,
}: {
  anchorId?: string
  className?: string
} = {}) {
  const t = await getTranslations('Home.feedbackReviews')
  const testimonialsT = await getTranslations('TestimonialsPage')
  const locale = await getLocale()
  const language = locale === 'en' ? 'en' : 'de'
  const { reviews, live } = await listTestimonialReviews()
  const slides = reviews.map((item): SlideshowReview => ({
    id: item.id,
    author: item.author,
    quote: item.quote,
    rating: item.rating,
    source:
      item.source === 'google' ? testimonialsT('source.google') : testimonialsT('source.golocal'),
    sourceUrl: item.sourceUrl,
    authorUrl: item.authorUrl,
    authorPhotoUrl: item.authorPhotoUrl,
    isLiveGoogle: item.isLiveGoogle,
    date: item.relativePublished ?? formatReviewDate(item, language),
  }))

  return (
    <section
      id={anchorId}
      data-review-source={live ? 'review-feed' : 'curated-fallback'}
      className={cn('bg-background scroll-mt-24 py-16 md:py-24', className)}
    >
      <div className={CONTAINER}>
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="flex flex-col gap-3.5">
            <span className={EYEBROW}>{t('eyebrow')}</span>
            <h2 className={`${SECTION_TITLE} max-w-[18ch] text-balance`}>{t('title')}</h2>
          </div>
          <p className="text-muted-foreground max-w-[62ch] text-[17px] leading-[1.65] lg:justify-self-end">
            {t('text')}
          </p>
        </div>

        <ReviewSlideshow
          reviews={slides}
          locale={language}
          showGoogleAttribution={live}
          labels={{
            carousel: testimonialsT('carousel.label'),
            previous: testimonialsT('carousel.previous'),
            next: testimonialsT('carousel.next'),
            slide: testimonialsT('carousel.slide'),
            expand: testimonialsT('carousel.expand'),
            collapse: testimonialsT('carousel.collapse'),
            openSource: testimonialsT('carousel.openSource'),
          }}
        />

        <div className="mt-10 flex flex-wrap items-start justify-between gap-5 border-t border-neutral-200 pt-6">
          <p className="text-muted-foreground max-w-[70ch] text-xs leading-relaxed text-pretty">
            {testimonialsT(live ? 'attribution.live' : 'attribution.curated')}
          </p>
          <a
            href={GOOGLE_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 inline-flex shrink-0 items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
          >
            {testimonialsT('allLink')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
