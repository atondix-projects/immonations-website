'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export type WallReview = {
  id: string
  author: string
  quote: string
  rating: 4 | 5
  sourceId: 'google' | 'golocal'
  sourceLabel: string
  sourceUrl: string
  date: string
  authorUrl?: string
  authorPhotoUrl?: string
}

type ReviewWallProps = {
  reviews: WallReview[]
  locale: 'de' | 'en'
  filters: { id: 'all' | 'google' | 'golocal'; label: string }[]
  labels: {
    list: string
    expand: string
    collapse: string
    openSource: string
    empty: string
  }
}

const QUOTE_LIMIT = 280

function Stars({ rating }: { rating: 4 | 5 }) {
  return (
    <div className="text-brand-700 flex gap-0.5" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn('size-3.5', index < rating ? 'fill-current' : 'text-neutral-300')}
        />
      ))}
    </div>
  )
}

function QuoteBody({
  quote,
  locale,
  expandLabel,
  collapseLabel,
}: {
  quote: string
  locale: 'de' | 'en'
  expandLabel: string
  collapseLabel: string
}) {
  const [expanded, setExpanded] = useState(false)
  const needsClamp = quote.length > QUOTE_LIMIT
  const visible = needsClamp && !expanded ? `${quote.slice(0, QUOTE_LIMIT).trimEnd()}…` : quote
  const open = locale === 'de' ? '„' : '“'
  const close = locale === 'de' ? '“' : '”'

  return (
    <div>
      <blockquote className="text-[15px] leading-[1.7] text-pretty">
        {open}
        {visible}
        {close}
      </blockquote>
      {needsClamp ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="text-brand-700 mt-3 text-sm font-semibold underline-offset-4 hover:underline"
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      ) : null}
    </div>
  )
}

export function ReviewWall({ reviews, locale, filters, labels }: ReviewWallProps) {
  const [active, setActive] = useState<(typeof filters)[number]['id']>('all')

  const visible = useMemo(
    () => (active === 'all' ? reviews : reviews.filter((item) => item.sourceId === active)),
    [active, reviews],
  )

  return (
    <div>
      <div
        role="group"
        aria-label={labels.list}
        className="border-border flex flex-wrap gap-x-6 gap-y-2 border-b"
      >
        {filters.map((filter) => {
          const isActive = filter.id === active
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(filter.id)}
              className={cn(
                'border-b-2 pb-3 text-sm font-semibold transition-colors',
                isActive
                  ? 'border-brand-700 text-foreground'
                  : 'text-muted-foreground hover:text-foreground border-transparent',
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted-foreground mt-10 max-w-[54ch] text-sm leading-relaxed">
          {labels.empty}
        </p>
      ) : (
        <div className="mt-8 columns-1 gap-5 sm:columns-2 xl:columns-3">
          {visible.map((item) => (
            <article
              key={item.id}
              className="border-border bg-background mb-5 break-inside-avoid border p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <Stars rating={item.rating} />
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-brand-700 text-xs font-semibold transition-colors"
                >
                  {item.sourceLabel}
                  <span className="sr-only">. {labels.openSource}</span>
                </a>
              </div>
              <div className="mt-4">
                <QuoteBody
                  quote={item.quote}
                  locale={locale}
                  expandLabel={labels.expand}
                  collapseLabel={labels.collapse}
                />
              </div>
              <div className="text-muted-foreground mt-5 flex items-center gap-3 text-sm">
                {item.authorPhotoUrl ? (
                  <Image
                    src={item.authorPhotoUrl}
                    alt=""
                    width={32}
                    height={32}
                    unoptimized
                    className="size-8 rounded-[4px] object-cover"
                  />
                ) : null}
                <p>
                  {item.authorUrl ? (
                    <a
                      href={item.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground font-medium underline-offset-4 hover:underline"
                    >
                      {item.author}
                    </a>
                  ) : (
                    <span className="text-foreground font-medium">{item.author}</span>
                  )}
                  <span className="text-muted-foreground"> · {item.date}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
