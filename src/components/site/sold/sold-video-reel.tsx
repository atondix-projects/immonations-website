import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'
import type { SoldVideo } from '@/lib/content/sold-videos'
import { SoldVideoTile } from './sold-video-tile'
import { SoldVideoCarousel, type SoldVideoCarouselEntry } from './sold-video-carousel'

const RAIL_SIZES =
  '(min-width: 1280px) 420px, (min-width: 1024px) 380px, (min-width: 640px) 380px, 88vw'
const GRID_SIZES = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw'

function soldVideoHref(item: SoldVideo, currentLocationSlug?: string) {
  // Auf der Standortseite selbst zeigen die eigenen Clips bereits den Kontext —
  // ein Link zurück auf dieselbe Seite wäre kein Click-through, sondern ein Leerlauf.
  if (item.locationSlug && item.locationSlug !== currentLocationSlug) {
    return { pathname: '/locations/[slug]' as const, params: { slug: item.locationSlug } }
  }
  return '/sold' as const
}

/**
 * Verkauft-Clips als Karussell (eine Kachel nach der anderen, Weiter/Zurück
 * statt Scrollen) oder als Raster. Jede Kachel führt zur Verkauft-Übersicht
 * oder zur passenden Standortseite.
 *
 * Im Karussell steht der Text links und der Clip groß rechts daneben — das
 * Hochformat trägt die Sektion, statt als kleine Kachel in der Mitte zu hängen.
 */
export async function SoldVideoReel({
  items,
  eyebrow,
  title,
  text,
  layout = 'rail',
  id = 'verkauft',
  className,
  showCta = true,
  currentLocationSlug,
}: {
  items: SoldVideo[]
  eyebrow?: string
  title: string
  text?: string
  layout?: 'rail' | 'grid'
  id?: string
  className?: string
  /** Footer link to the sold archive — off on pages that already are the archive. */
  showCta?: boolean
  /** Slug of the location page this reel is rendered on, if any — see `soldVideoHref`. */
  currentLocationSlug?: string
}) {
  const t = await getTranslations('SoldVideos')
  if (items.length === 0) return null

  const soldLabel = t('soldLabel')

  const heading = (
    <div className="flex flex-col gap-3.5">
      {eyebrow ? <span className={EYEBROW}>{eyebrow}</span> : null}
      <h2 className={`${SECTION_TITLE} max-w-[24ch] text-balance`}>{title}</h2>
      {text ? (
        <p className="text-muted-foreground mt-1.5 max-w-[54ch] text-[17px] leading-[1.65]">
          {text}
        </p>
      ) : null}
    </div>
  )

  const viewAllLink = showCta ? (
    <Link
      href="/sold"
      className="text-brand-700 hover:text-brand-800 inline-flex min-h-11 items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold transition-colors"
    >
      {t('viewAll')}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  ) : null

  if (layout === 'rail') {
    const carouselEntries: SoldVideoCarouselEntry[] = items.map((item) => {
      const typeLabel = t(`types.${item.type}`)
      return {
        item,
        href: soldVideoHref(item, currentLocationSlug),
        linkLabel: t('tileLink', { town: item.town, type: typeLabel }),
        typeLabel,
        alt: t('alt', { town: item.town, type: typeLabel }),
      }
    })

    return (
      <section id={id} className={cn('bg-background scroll-mt-24 py-16 md:py-24', className)}>
        <div className={CONTAINER}>
          <SoldVideoCarousel
            entries={carouselEntries}
            intro={
              <>
                {heading}
                {viewAllLink}
              </>
            }
            soldLabel={soldLabel}
            sizes={RAIL_SIZES}
            labels={{
              carousel: t('carouselLabel'),
              previous: t('previousVideo'),
              next: t('nextVideo'),
              slide: t('videoSlide'),
            }}
          />
        </div>
      </section>
    )
  }

  const gridTiles = items.map((item, index) => {
    const typeLabel = t(`types.${item.type}`)
    const href = soldVideoHref(item, currentLocationSlug)
    const linkLabel = t('tileLink', { town: item.town, type: typeLabel })

    return (
      <Link
        key={item.id}
        href={href}
        aria-label={linkLabel}
        className="group focus-visible:ring-primary block w-full max-w-[268px] rounded-sm transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <SoldVideoTile
          item={item}
          index={index}
          soldLabel={soldLabel}
          typeLabel={typeLabel}
          alt={t('alt', { town: item.town, type: typeLabel })}
          sizes={GRID_SIZES}
          className="pointer-events-none"
        />
      </Link>
    )
  })

  return (
    <section id={id} className={cn('bg-background scroll-mt-24 py-16 md:py-24', className)}>
      <div className={CONTAINER}>
        <div className="mb-10">{heading}</div>
        <div className="grid justify-items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {gridTiles}
        </div>
        {viewAllLink ? <div className="mt-10">{viewAllLink}</div> : null}
      </div>
    </section>
  )
}
