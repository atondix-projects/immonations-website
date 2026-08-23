import Image from 'next/image'
import { Star } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { testimonialReview } from '@/lib/content/testimonials'
import type { FeedbackVoice } from './feedback-videos'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'

/**
 * Schriftliche Kundenstimmen — die Google-Bewertungen im unveränderten
 * Original. Gegenstück zu `feedback-videos.tsx`: beide lesen dieselbe Liste
 * (`Home.feedback.items`), zeigen aber je einen Belegtyp. In der eigenen
 * Sektion dürfen die Screenshots vollständig stehen statt auf feste Höhe
 * beschnitten zu werden.
 */
export async function FeedbackReviews({
  anchorId = 'kundenstimmen-bewertungen',
  className,
}: {
  anchorId?: string
  className?: string
} = {}) {
  const t = await getTranslations('Home.feedbackReviews')
  const tVoices = await getTranslations('Home.feedback')
  const locale = await getLocale()
  const language = locale === 'en' ? 'en' : 'de'
  const voices = tVoices.raw('items') as FeedbackVoice[]

  const reviews = voices.flatMap((voice) => {
    const review = testimonialReview(voice.id)
    return review ? [{ voice, review }] : []
  })

  if (reviews.length === 0) return null

  return (
    <section id={anchorId} className={cn('bg-background scroll-mt-24 py-16 md:py-24', className)}>
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map(({ voice, review }) => (
            <figure
              key={voice.id}
              className="flex flex-col border border-neutral-200 bg-white p-5 sm:p-6"
            >
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-neutral-200 pb-4">
                <span className="font-serif text-xl font-semibold">{review.reviewer}</span>
                <span className="text-brand-700 flex gap-0.5" aria-label={`${review.rating}/5`}>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} className="size-3.5 fill-current" aria-hidden="true" />
                  ))}
                </span>
              </figcaption>
              <Image
                src={review.screenshot.src}
                alt={review.screenshot.alt[language]}
                width={review.screenshot.width}
                height={review.screenshot.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="mt-5 h-auto w-full"
              />
              <p className="text-muted-foreground mt-5 text-[10px] font-semibold tracking-[0.16em] uppercase">
                {t('reviewLabel')}
              </p>
            </figure>
          ))}
        </div>

        <p className="text-muted-foreground mt-5 max-w-[76ch] text-xs leading-relaxed text-pretty">
          {t('note')}
        </p>
      </div>
    </section>
  )
}
