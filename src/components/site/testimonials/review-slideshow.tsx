'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export type SlideshowReview = {
  id: string
  author: string
  quote: string
  rating: 4 | 5
  source: string
  sourceUrl: string
  date: string
  authorUrl?: string
  authorPhotoUrl?: string
  isLiveGoogle?: boolean
}

type ReviewSlideshowProps = {
  reviews: SlideshowReview[]
  locale: 'de' | 'en'
  showGoogleAttribution: boolean
  labels: {
    carousel: string
    previous: string
    next: string
    slide: string
    expand: string
    collapse: string
    openSource: string
  }
}

const ROTATION_INTERVAL = 7000
const QUOTE_LIMIT = 420

function Stars({ rating }: { rating: 4 | 5 }) {
  return (
    <div className="text-brand-500 flex justify-center gap-1" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn('size-5', index < rating ? 'fill-current' : 'text-neutral-300')}
        />
      ))}
    </div>
  )
}

function QuotedText({
  quote,
  locale,
  active,
  expandLabel,
  collapseLabel,
}: {
  quote: string
  locale: 'de' | 'en'
  active: boolean
  expandLabel: string
  collapseLabel: string
}) {
  const [expanded, setExpanded] = useState(false)
  const needsClamp = quote.length > QUOTE_LIMIT
  const showFull = active && expanded
  const visible = needsClamp && !showFull ? `${quote.slice(0, QUOTE_LIMIT).trimEnd()}…` : quote
  const open = locale === 'de' ? '„' : '“'
  const close = locale === 'de' ? '“' : '”'

  return (
    <div className="mx-auto max-w-[46rem]">
      <blockquote className="font-serif text-[1.35rem] leading-[1.55] font-medium text-pretty md:text-[1.7rem] md:leading-[1.5]">
        {open}
        {visible}
        {close}
      </blockquote>
      {needsClamp ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="text-brand-700 mt-4 text-sm font-semibold underline-offset-4 hover:underline"
        >
          {showFull ? collapseLabel : expandLabel}
        </button>
      ) : null}
    </div>
  )
}

export function ReviewSlideshow({
  reviews,
  locale,
  showGoogleAttribution,
  labels,
}: ReviewSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)

  useEffect(() => {
    if (reviews.length < 2 || isPaused) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveIndex((current) => (current + 1) % reviews.length)
      }
    }, ROTATION_INTERVAL)

    return () => window.clearInterval(interval)
  }, [interactionCount, isPaused, reviews.length])

  if (reviews.length === 0) return null

  const selectSlide = (index: number) => {
    setActiveIndex((index + reviews.length) % reviews.length)
    setInteractionCount((count) => count + 1)
  }

  return (
    <div
      role="region"
      aria-roledescription={labels.carousel}
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {reviews.length > 1 ? (
        <button
          type="button"
          aria-label={labels.previous}
          onClick={() => selectSlide(activeIndex - 1)}
          className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 absolute top-[42%] left-0 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:flex"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
      ) : null}

      <div className="mx-auto max-w-[46rem] px-2 text-center md:px-16">
        <div className="grid" aria-live="off">
          {reviews.map((item, index) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription={labels.slide}
              aria-label={`${index + 1} / ${reviews.length}`}
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex ? true : undefined}
              className={cn(
                'col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none',
                index === activeIndex
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-3 opacity-0',
              )}
            >
              <Stars rating={item.rating} />
              <div className="mt-8">
                <QuotedText
                  quote={item.quote}
                  locale={locale}
                  active={index === activeIndex}
                  expandLabel={labels.expand}
                  collapseLabel={labels.collapse}
                />
              </div>
              <div className="text-muted-foreground mt-8 flex items-center justify-center gap-3 text-sm">
                {item.authorPhotoUrl ? (
                  <Image
                    src={item.authorPhotoUrl}
                    alt=""
                    width={32}
                    height={32}
                    unoptimized
                    className="size-8 rounded-full object-cover"
                  />
                ) : null}
                <p>
                  {item.authorUrl ? (
                    <a
                      href={item.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground underline-offset-4 hover:underline"
                    >
                      {item.author}
                    </a>
                  ) : (
                    item.author
                  )}{' '}
                  ·{' '}
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground underline-offset-4 hover:underline"
                  >
                    {item.source}
                    <span className="sr-only">. {labels.openSource}</span>
                  </a>{' '}
                  · {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {reviews.length > 1 ? (
        <button
          type="button"
          aria-label={labels.next}
          onClick={() => selectSlide(activeIndex + 1)}
          className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 absolute top-[42%] right-0 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border bg-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:flex"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      ) : null}

      {reviews.length > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label={labels.previous}
            onClick={() => selectSlide(activeIndex - 1)}
            className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 flex size-11 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <div className="flex min-w-[4.5rem] items-center justify-center gap-2">
            {reviews.length <= 7 ? (
              reviews.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`${labels.slide} ${index + 1} / ${reviews.length}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => selectSlide(index)}
                  className={cn(
                    'focus-visible:ring-brand-700 h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none motion-reduce:transition-none',
                    index === activeIndex ? 'bg-brand-500 w-7' : 'w-2 bg-neutral-300',
                  )}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-sm tabular-nums" aria-live="polite">
                {activeIndex + 1} / {reviews.length}
              </p>
            )}
          </div>

          <button
            type="button"
            aria-label={labels.next}
            onClick={() => selectSlide(activeIndex + 1)}
            className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 flex size-11 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {showGoogleAttribution ? (
        <p
          translate="no"
          className="mt-6 text-center font-sans text-xs font-normal tracking-normal whitespace-nowrap text-neutral-600"
        >
          Google Maps
        </p>
      ) : null}
    </div>
  )
}
