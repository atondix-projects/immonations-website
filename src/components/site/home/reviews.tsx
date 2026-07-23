import { ArrowUpRight, Star } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { ReviewRotator } from './review-rotator'
import { CONTAINER, SectionHeader } from './section-shell'

type ReviewItem = { quote: string; source: string }
type PrimaryProfile = { id: string; name: string; rating: string; count: string; link: string }
type Screenshot = { src: string; alt: string }

const GOOGLE_PROFILE =
  'https://www.google.com/maps/place/Immonation%2BGmbH/@49.440539,10.9597745,17z'

export async function Reviews() {
  const t = await getTranslations('Home.reviews')
  const items = t.raw('items') as ReviewItem[]
  const profiles = t.raw('primaryProfiles') as PrimaryProfile[]
  const screenshots = t.raw('screenshots') as Screenshot[]
  const google = profiles.find((profile) => profile.id === 'google') ?? profiles[0]

  return (
    <section
      id="bewertungen"
      className="border-border bg-muted/65 scroll-mt-24 border-y py-18 md:py-28"
    >
      <div className={CONTAINER}>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div className="flex flex-col justify-between border-y border-neutral-300 py-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase">{google?.name}</p>
              <div className="mt-7 flex items-end gap-3">
                <span className="font-serif text-7xl leading-none font-medium tracking-[-0.04em] tabular-nums">
                  {google?.rating}
                </span>
                <span className="pb-2 text-sm text-neutral-600">{t('ratingSuffix')}</span>
              </div>
              <div
                className="text-brand-700 mt-5 flex gap-1"
                aria-label={`${google?.rating} ${t('ratingSuffix')}`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-muted-foreground mt-5 text-sm">{google?.count}</p>
            </div>
            <a
              href={GOOGLE_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 border-brand-700/30 mt-12 inline-flex w-fit items-center gap-2 border-b pb-1 text-sm font-semibold"
            >
              {google?.link}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-8">
            <figure className="border-brand-700 flex flex-col justify-between border-l-2 py-2 pl-6">
              <blockquote className="max-w-[44ch] font-serif text-2xl leading-[1.4] font-medium md:text-[2rem]">
                {items[0]?.quote}
              </blockquote>
              <figcaption className="text-muted-foreground mt-5 text-sm">
                {items[0]?.source}
              </figcaption>
            </figure>
            <ReviewRotator screenshots={screenshots} />
          </div>
        </div>
        <p className="text-muted-foreground mt-5 text-xs leading-relaxed">{t('screenshotNote')}</p>
      </div>
    </section>
  )
}
