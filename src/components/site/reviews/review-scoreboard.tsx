import Image from 'next/image'
import { ArrowUpRight, Star } from 'lucide-react'
import { AnimatedNumber } from '@/components/site/animated-number'
import { GOOGLE_PROFILE } from '@/lib/content/review-portals'

type Headline = { platform: string; rating: string; count: string; link: string }
type Stat = { value: string; label: string }

export function ReviewScoreboard({
  headline,
  stats,
  ratingSuffix,
  claimTitle,
  claimText,
}: {
  headline: Headline
  stats: Stat[]
  ratingSuffix: string
  claimTitle: string
  claimText: string
}) {
  return (
    <div className="border-border grid gap-px overflow-hidden border bg-neutral-300 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)_minmax(16rem,0.85fr)]">
      <div className="bg-background flex flex-col justify-between gap-8 p-6 sm:p-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/reviews/portals/google.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
              className="size-7 object-contain"
            />
            <span className="text-base font-semibold">{headline.platform}</span>
          </div>
          <div className="mt-7 flex items-end gap-3">
            <AnimatedNumber
              value={headline.rating}
              className="font-serif text-[4.25rem] leading-none font-medium tracking-[-0.04em]"
            />
            <span className="text-muted-foreground pb-2 text-sm">{ratingSuffix}</span>
          </div>
          <div
            className="text-brand-700 mt-4 flex gap-1"
            aria-label={`${headline.rating} ${ratingSuffix}`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="size-4 fill-current" aria-hidden="true" />
            ))}
          </div>
          <p className="text-muted-foreground mt-4 text-sm">{headline.count}</p>
        </div>
        <a
          href={GOOGLE_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-700 border-brand-700/30 hover:border-brand-700 inline-flex w-fit items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors"
        >
          {headline.link}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      <dl className="grid h-full gap-px bg-neutral-300 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-background flex h-full flex-col justify-center gap-1.5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-start lg:gap-5 lg:px-8 lg:py-0"
          >
            <dt className="text-muted-foreground order-2 text-sm">{stat.label}</dt>
            <dd className="order-1 lg:w-24 lg:shrink-0">
              <AnimatedNumber
                value={stat.value}
                delay={index * 0.08}
                className="font-serif text-[2.5rem] leading-none font-medium tracking-[-0.03em]"
              />
            </dd>
          </div>
        ))}
      </dl>

      <div className="bg-brand-800 flex flex-col justify-between gap-8 p-6 text-white sm:p-8">
        <p className="font-serif text-[1.85rem] leading-[1.12] font-medium tracking-[-0.03em] text-balance md:text-[2.15rem]">
          {claimTitle}
        </p>
        <p className="text-sm leading-relaxed text-pretty text-white/75">{claimText}</p>
      </div>
    </div>
  )
}
