import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { VideoDialog } from '@/components/site/video-dialog'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'
import type { BellVideo } from '@/lib/content/bell-videos'

const POSTER_SIZES = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'

/**
 * Wand aus „Glocken"-Videos. Jede Kachel zeigt zunächst nur ein Standbild —
 * die Aufnahmen sind gesprochen und rund 20 s lang, ein stummer Autoplay-Loop
 * würde ihren Inhalt wegnehmen und sechs Dateien ungefragt laden. Ton und
 * Wiedergabe starten erst im Overlay nach Klick.
 *
 * Die Sektion trägt ihre Aussage im Fließtext, nicht in den Kacheln: Zu den
 * einzelnen Clips liegen keine belegten Orts- oder Objektangaben vor (siehe
 * `bell-videos.ts`). Die Kacheln bleiben deshalb unbeschriftet — eine auf allen
 * sechs identische Auszeichnung würde eine Einzelaussage vortäuschen, die es
 * nicht gibt. Liegen Ort und Objektart je Clip vor, gehört die Beschriftung
 * hierher, zusammen mit ItemList-/VideoObject-Auszeichnung.
 */
export async function BellVideoWall({
  items,
  className,
  id = 'verkaufsglocke',
}: {
  items: BellVideo[]
  className?: string
  id?: string
}) {
  const t = await getTranslations('BellVideos')
  const tVideo = await getTranslations('VideoDialog')
  if (items.length === 0) return null

  const labels = { play: tVideo('play'), close: tVideo('close') }

  return (
    <section id={id} className={cn('bg-background scroll-mt-24 py-16 md:py-24', className)}>
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
          {items.map((item, index) => {
            const position = index + 1

            return (
              <VideoDialog
                key={item.id}
                src={item.video}
                poster={item.poster}
                width={item.width}
                height={item.height}
                title={t('videoTitle', { position, total: items.length })}
                fallback={t('videoFallback')}
                labels={labels}
                posterSizes={POSTER_SIZES}
                className="aspect-[3/4] w-full"
              />
            )
          })}
        </div>

        <p className="text-muted-foreground mt-8 max-w-[62ch] text-sm leading-relaxed">
          {t('note')}
        </p>
      </div>
    </section>
  )
}
