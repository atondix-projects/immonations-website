import Image from 'next/image'
import { Clock3, Play } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { VideoDialog } from '@/components/site/video-dialog'
import {
  testimonialImage,
  testimonialReview,
  testimonialVideo,
  type TestimonialId,
} from '@/lib/content/testimonials'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'

type VideoItem = {
  id: TestimonialId
  name: string
  title: string
  alt: string
  available: boolean
}

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
  const locale = await getLocale()
  const language = locale === 'en' ? 'en' : 'de'
  const items = t.raw('items') as VideoItem[]
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const poster = testimonialImage(item.id)
            const video = item.available ? testimonialVideo(item.id) : null
            const review = testimonialReview(item.id)

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
                      posterSizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <>
                      <Image
                        src={poster}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
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
                {review ? (
                  <figure className="border-t border-neutral-200 pt-4">
                    <figcaption className="text-muted-foreground flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[10px] font-semibold tracking-[0.16em] uppercase">
                      <span>{t('reviewLabel')}</span>
                      <span className="tracking-normal normal-case">
                        {item.name} · {review.rating}/5
                      </span>
                    </figcaption>
                    <div className="mt-3 h-44 overflow-hidden bg-white sm:h-52">
                      <Image
                        src={review.screenshot.src}
                        alt={review.screenshot.alt[language]}
                        width={review.screenshot.width}
                        height={review.screenshot.height}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="size-full object-contain object-top"
                      />
                    </div>
                  </figure>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
