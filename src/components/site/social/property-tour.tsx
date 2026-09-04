import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { VideoDialog } from '@/components/site/video-dialog'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'
import { formatVideoDuration, listPropertyVideos } from '@/lib/content/property-videos'

/**
 * Ein vollständiges Objektvideo auf der Social-Seite: die Reels daneben zeigen
 * Ausschnitte und Abschlüsse, hier läuft der komplette Schnitt.
 *
 * Objektart und Ort stammen aus dem Referenzfall (`referenceId`), nicht aus der
 * Übersetzung — eine Beschriftung, die der Referenzakte widerspricht, ist damit
 * ausgeschlossen. Der Clip trägt nur eine Musikspur, deshalb keine Untertitel.
 */
export async function PropertyTourSection({ locale }: { locale: Locale }) {
  const video = listPropertyVideos()[0]
  if (!video) return null

  const t = await getTranslations('PropertyTour')
  const tVideo = await getTranslations('VideoDialog')

  const { reference } = video
  const typeLabel = reference.typeLabel[locale]
  const areaLabel = reference.area[locale]
  const title = `${typeLabel} · ${areaLabel}`
  const duration = formatVideoDuration(video.durationSeconds)

  const facts = [
    [t('facts.type'), typeLabel],
    [t('facts.location'), areaLabel],
    [t('facts.format'), t('facts.formatValue')],
    [t('facts.length'), t('facts.lengthValue', { seconds: video.durationSeconds })],
  ] as const

  return (
    <section
      id="objektvideo"
      aria-labelledby="objektvideo-title"
      className="border-border bg-muted/45 scroll-mt-24 border-y py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)] lg:gap-16 xl:gap-20">
          <div>
            <p className={EYEBROW}>{t('eyebrow')}</p>
            <h2
              id="objektvideo-title"
              className={`${SECTION_TITLE} mt-5 max-w-[18ch] text-balance`}
            >
              {t('title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-[52ch] text-[17px] leading-[1.75] text-pretty">
              {t('text')}
            </p>

            <dl className="border-border mt-9 grid max-w-[34rem] grid-cols-2 gap-px border bg-neutral-900/10">
              {facts.map(([label, value]) => (
                <div key={label} className="bg-background p-4 sm:p-5">
                  <dt className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
                    {label}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-snug font-semibold">{value}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={{ pathname: '/references/[slug]', params: { slug: reference.slug } }}
              className="text-brand-700 hover:text-brand-800 mt-8 inline-flex min-h-11 items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold transition-colors"
            >
              {t('caseLink')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mx-auto w-full max-w-[19rem] lg:mx-0 lg:ml-auto">
            <VideoDialog
              src={video.src}
              poster={video.poster}
              width={video.width}
              height={video.height}
              title={`${t('videoTitle')}: ${title}`}
              fallback={t('videoFallback')}
              labels={{ play: tVideo('play'), close: tVideo('close') }}
              className="aspect-[9/16] w-full rounded-2xl"
              posterSizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
              playAppearance="reel"
              overlay={
                <span className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3.5 sm:p-4">
                  <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="relative self-start rounded-full border border-white/15 bg-white/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
                    {t('badge')}
                  </span>
                  <span className="relative flex items-end justify-between gap-2">
                    <span className="min-w-0 text-[15px] leading-snug text-white sm:text-base">
                      <span className="font-semibold">{typeLabel}</span>
                      <span className="font-medium text-white/75"> {areaLabel}</span>
                    </span>
                    <span className="mb-0.5 shrink-0 text-[12px] leading-none font-medium text-white/80 tabular-nums">
                      {duration}
                    </span>
                  </span>
                </span>
              }
            />
            <p className="text-muted-foreground mt-3 text-[13px] leading-snug">{t('caption')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
