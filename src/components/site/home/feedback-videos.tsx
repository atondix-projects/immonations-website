import Image from 'next/image'
import { Clock3, Play } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { VideoDialog } from '@/components/site/video-dialog'
import {
  testimonialCoverClass,
  testimonialImage,
  testimonialVideo,
  type TestimonialId,
} from '@/lib/content/testimonials'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'
import { cn } from '@/lib/utils'

export type FeedbackVoice = {
  id: TestimonialId
  name: string
  title: string
  alt: string
  available: boolean
}

/**
 * Kundenstimmen im Video. Die schriftlichen Google-Bewertungen derselben
 * Personen stehen bewusst in einer eigenen Sektion (`feedback-reviews.tsx`):
 * Video und Screenshot sind zwei verschiedene Belege und wurden in einer
 * gemeinsamen Karte gegeneinander um Aufmerksamkeit gedrängt.
 */
export async function FeedbackVideos({
  /**
   * Anker der Sektion. `customer-stories` belegt denselben Namen; landen beide
   * je auf einer Seite, bleibt der Sprung aus der Navigation eindeutig.
   */
  anchorId = 'kundenstimmen',
}: {
  anchorId?: string
} = {}) {
  const t = await getTranslations('Home.feedback')
  const tTestimonials = await getTranslations('Testimonials')
  const tVideo = await getTranslations('VideoDialog')
  const items = t.raw('items') as FeedbackVoice[]
  const videoLabels = { play: tVideo('play'), close: tVideo('close') }

  return (
    <section id={anchorId} className="bg-background scroll-mt-24 py-16 md:py-24">
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

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const poster = testimonialImage(item.id)
            const video = item.available ? testimonialVideo(item.id) : null
            const coverClass = testimonialCoverClass(item.id)

            return (
              <article key={item.id} className="group flex flex-col gap-4">
                <div className="bg-surface-dark relative aspect-[9/12] overflow-hidden">
                  {video ? (
                    <VideoDialog
                      src={video.src}
                      poster={poster}
                      width={video.width}
                      height={video.height}
                      title={`${item.name}: ${item.title}`}
                      fallback={tTestimonials('videoFallback')}
                      labels={videoLabels}
                      className="size-full"
                      posterClassName={coverClass}
                      posterSizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <>
                      <Image
                        src={poster}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className={cn(
                          'object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none',
                          coverClass,
                        )}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 border border-white/40 bg-black/35 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-white uppercase backdrop-blur-sm">
                          <Clock3 aria-hidden="true" className="size-3.5" />
                          {t('comingSoon')}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-neutral-200 pt-4">
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{item.name}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-snug">{item.title}</p>
                  </div>
                  {item.available ? (
                    <Play aria-hidden="true" className="text-primary mt-1 size-4 shrink-0" />
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
