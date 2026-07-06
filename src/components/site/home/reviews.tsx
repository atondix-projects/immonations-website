import { getTranslations } from 'next-intl/server'
import { Star } from 'lucide-react'
import { CONTAINER, SectionHeader } from './section-shell'

type ReviewItem = { quote: string; source: string }

const REVIEW_PROFILES = {
  google: 'https://www.google.com/maps/search/?api=1&query=Immonation+GmbH+Zirndorf',
  trustpilot: 'https://de.trustpilot.com/review/immonationgmbh.de',
} as const

function RatingCard({
  name,
  rating,
  count,
  linkLabel,
  suffix,
  href,
}: {
  name: string
  rating: string
  count: string
  linkLabel: string
  suffix: string
  href: string
}) {
  return (
    <div className="border-border flex flex-col gap-4 border bg-white p-7">
      <span className="text-[13px] font-semibold uppercase tracking-[0.14em]">{name}</span>
      <div className="flex items-end gap-3">
        <span className="font-serif text-5xl font-semibold leading-none">{rating}</span>
        <span className="text-neutral-600 pb-1 text-sm">{suffix}</span>
      </div>
      <div className="text-brand-600 flex gap-1" aria-hidden>
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="size-4 fill-current" />
        ))}
      </div>
      <span className="text-neutral-600 text-[15px]">{count}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary mt-auto text-sm font-medium tracking-[0.04em] hover:underline"
      >
        {linkLabel}
      </a>
    </div>
  )
}

export async function Reviews() {
  const t = await getTranslations('Home.reviews')
  const items = t.raw('items') as ReviewItem[]

  return (
    <section id="bewertungen" className="bg-muted border-border scroll-mt-24 border-y py-16 md:py-24">
      <div className={CONTAINER}>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1.6fr]">
          <RatingCard
            name={t('google.name')}
            rating={t('google.rating')}
            count={t('google.count')}
            linkLabel={t('google.link')}
            suffix={t('ratingSuffix')}
            href={REVIEW_PROFILES.google}
          />
          <RatingCard
            name={t('trustpilot.name')}
            rating={t('trustpilot.rating')}
            count={t('trustpilot.count')}
            linkLabel={t('trustpilot.link')}
            suffix={t('ratingSuffix')}
            href={REVIEW_PROFILES.trustpilot}
          />
          <div className="flex flex-col justify-between gap-6">
            {items.map((item) => (
              <figure
                key={item.source}
                className="border-accent flex flex-col gap-2 border-l-2 pl-6"
              >
                <blockquote className="font-serif text-lg italic leading-[1.45] md:text-xl">
                  {item.quote}
                </blockquote>
                <figcaption className="text-neutral-600 text-sm">{item.source}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
