import Image from 'next/image'
import { Clock3, Play } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'

type VideoItem = {
  id: 'viktor-emter' | 'markus-burkhard' | 'sandra-boerschlein'
  name: string
  title: string
  alt: string
  available: boolean
}

const VIDEO_MEDIA = {
  'viktor-emter': {
    poster: '/images/testimonials/viktor-emter.webp',
    video: '/videos/testimonials/viktor-emter.mp4',
  },
  'markus-burkhard': {
    poster: '/images/testimonials/markus-burkhard.webp',
  },
  'sandra-boerschlein': {
    poster: '/images/testimonials/sandra-boerschlein.webp',
  },
} as const

export async function FeedbackVideos() {
  const t = await getTranslations('Home.feedback')
  const items = t.raw('items') as VideoItem[]

  return (
    <section id="kundenstimmen" className="bg-background scroll-mt-24 py-16 md:py-24">
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
            const media = VIDEO_MEDIA[item.id]
            const videoSource = 'video' in media ? media.video : undefined

            return (
              <article key={item.id} className="group flex flex-col gap-4">
                <div className="bg-surface-dark relative aspect-[9/12] overflow-hidden">
                  {item.available && videoSource ? (
                    <video
                      className="size-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      poster={media.poster}
                      aria-label={`${item.name}: ${item.title}`}
                    >
                      <source src={videoSource} type="video/mp4" />
                      {t('videoFallback')}
                    </video>
                  ) : (
                    <>
                      <Image
                        src={media.poster}
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
