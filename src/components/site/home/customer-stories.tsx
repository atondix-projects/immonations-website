import Image from 'next/image'
import { Play } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'

type Story = {
  id: 'viktor-emter' | 'markus-burkhard' | 'herr-sippel' | 'frau-hartmann'
  name: string
  context: string
  quote: string
  result: string
  alt: string
  video: boolean
}

const STORY_MEDIA = {
  'viktor-emter': {
    image: '/images/testimonials/viktor-emter.webp',
    video: '/videos/testimonials/viktor-emter.mp4',
  },
  'markus-burkhard': { image: '/images/testimonials/markus-burkhard.webp' },
  'herr-sippel': { image: '/images/testimonials/herr-sippel-property.jpg' },
  'frau-hartmann': { image: '/images/testimonials/frau-hartmann-property.jpg' },
} as const

export async function CustomerStories() {
  const t = await getTranslations('Home.stories')
  const items = t.raw('items') as Story[]

  return (
    <section id="kundenstimmen" className="bg-background scroll-mt-24 py-18 md:py-28">
      <div className={CONTAINER}>
        <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <p className={EYEBROW}>{t('eyebrow')}</p>
            <h2 className={`${SECTION_TITLE} mt-4 max-w-[16ch] text-balance`}>{t('title')}</h2>
          </div>
          <p className="text-muted-foreground max-w-[64ch] text-[17px] leading-[1.75] lg:justify-self-end">
            {t('text')}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {items.map((item, index) => {
            const media = STORY_MEDIA[item.id]
            const videoSource = 'video' in media ? media.video : undefined
            const isFirst = index === 0
            const isLast = index === items.length - 1

            return (
              <article
                key={item.id}
                className={cn(
                  'bg-neutral-0 grid min-w-0 overflow-hidden border border-neutral-200',
                  isFirst && 'lg:col-span-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]',
                  isLast && 'lg:col-span-2 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]',
                )}
              >
                <div
                  className={cn(
                    'relative aspect-[16/10] min-h-0 overflow-hidden bg-neutral-100',
                    isFirst && 'lg:aspect-auto lg:min-h-[520px]',
                    isLast && 'lg:aspect-auto lg:min-h-[440px]',
                  )}
                >
                  {item.video && videoSource ? (
                    <video
                      className="size-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                      poster={media.image}
                      aria-label={`${item.name}: ${item.context}`}
                    >
                      <source src={videoSource} type="video/mp4" />
                      {t('videoFallback')}
                    </video>
                  ) : (
                    <Image
                      src={media.image}
                      alt={item.alt}
                      fill
                      loading="eager"
                      sizes={
                        isFirst
                          ? '(min-width: 1024px) 58vw, 100vw'
                          : '(min-width: 1024px) 50vw, 100vw'
                      }
                      className="object-cover transition-transform duration-700 hover:scale-[1.025] motion-reduce:transition-none"
                    />
                  )}
                </div>
                <div className="flex min-h-[330px] min-w-0 flex-col justify-between p-7 sm:p-9 lg:p-11">
                  <div>
                    <p className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase">
                      {item.context}
                    </p>
                    <blockquote className="mt-6 max-w-[30ch] font-serif text-2xl leading-[1.32] font-medium text-pretty md:text-[2rem]">
                      “{item.quote}”
                    </blockquote>
                  </div>
                  <div className="mt-10 flex items-end justify-between gap-6 border-t border-neutral-200 pt-5">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-muted-foreground mt-1 text-sm">{item.result}</p>
                    </div>
                    {item.video ? (
                      <Play className="text-brand-700 size-4 shrink-0" aria-hidden="true" />
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <p className="text-muted-foreground mt-5 max-w-[76ch] text-xs leading-relaxed">
          {t('prototypeNote')}
        </p>
      </div>
    </section>
  )
}
