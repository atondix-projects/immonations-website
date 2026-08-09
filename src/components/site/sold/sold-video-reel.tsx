import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/marquee'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'
import type { SoldVideo } from '@/lib/content/sold-videos'
import { SoldVideoTile } from './sold-video-tile'

const RAIL_SIZES = '(min-width: 640px) 268px, 232px'
const GRID_SIZES = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw'

/**
 * Verkauft-Clips als endlose Marquee-Leiste (Startseite, Referenzen) oder als
 * Raster (Standortseiten mit wenigen Objekten). Ort und Objektart stehen unter
 * jeder Kachel als echter Text — Crawler und Antwortmaschinen sehen die Fakten,
 * nicht nur bewegte Bilder.
 */
export async function SoldVideoReel({
  items,
  eyebrow,
  title,
  text,
  layout = 'rail',
  id = 'verkauft',
  className,
}: {
  items: SoldVideo[]
  eyebrow?: string
  title: string
  text?: string
  layout?: 'rail' | 'grid'
  id?: string
  className?: string
}) {
  const t = await getTranslations('SoldVideos')
  if (items.length === 0) return null

  const tiles = items.map((item, index) => {
    const typeLabel = t(`types.${item.type}`)

    return (
      <SoldVideoTile
        key={item.id}
        item={item}
        index={index}
        soldLabel={t('soldLabel')}
        typeLabel={typeLabel}
        alt={t('alt', { town: item.town, type: typeLabel })}
        sizes={layout === 'rail' ? RAIL_SIZES : GRID_SIZES}
        // Beide Layouts teilen sich denselben Maßstab — im Raster würde eine
        // 9:16-Kachel über die volle Spaltenbreite sonst rund 700 px hoch.
        className={layout === 'rail' ? 'w-[232px] shrink-0 sm:w-[268px]' : 'w-full max-w-[268px]'}
      />
    )
  })

  return (
    <section id={id} className={cn('bg-background scroll-mt-24 py-16 md:py-24', className)}>
      <div className={CONTAINER}>
        <div className="mb-10 flex flex-col gap-3.5">
          {eyebrow ? <span className={EYEBROW}>{eyebrow}</span> : null}
          <h2 className={`${SECTION_TITLE} max-w-[24ch] text-balance`}>{title}</h2>
          {text ? (
            <p className="text-muted-foreground mt-1.5 max-w-[68ch] text-[17px] leading-[1.65]">
              {text}
            </p>
          ) : null}
        </div>
      </div>

      {layout === 'rail' ? (
        <Marquee
          repeat={2}
          className={cn(
            'p-0 [--duration:80s] [--gap:2rem] md:[--gap:2.75rem] lg:[--gap:3.5rem]',
            // Weiche Kanten statt harter Abschnitt — unabhängig vom Hintergrund.
            '[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]',
            // Ohne Bewegung steht die Leiste still und wird manuell scrollbar.
            'motion-reduce:overflow-x-auto motion-reduce:*:[animation-play-state:paused]',
          )}
        >
          {tiles}
        </Marquee>
      ) : (
        <div className={CONTAINER}>
          <div className="grid justify-items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {tiles}
          </div>
        </div>
      )}
    </section>
  )
}
