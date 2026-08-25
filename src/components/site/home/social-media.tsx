import Image from 'next/image'
import { Play } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { VideoDialog } from '@/components/site/video-dialog'
import { SITE } from '@/lib/seo/site'
import { getSoldVideo } from '@/lib/content/sold-videos'
import { CONTAINER, EYEBROW } from './section-shell'
import { cn } from '@/lib/utils'

const FEATURED_REELS = [
  {
    id: 'deining-etw',
    copyKey: 'deining',
    poster: '/images/references/deining-neubauwohnung.webp',
  },
  {
    id: 'nuernberg-efh',
    copyKey: 'nuernberg',
    poster: '/images/references/nuernberg-einfamilienhaus.webp',
  },
] as const

/** Dunkles Küchenmotiv, ohne die Grafik der Verkaufs-Clips. */
const TIKTOK_GUIDE_POSTER = '/images/process/step-01.webp'

const REEL_ITEM = 'w-[min(13.75rem,72vw)] shrink-0 snap-start sm:w-auto sm:min-w-0'
const REEL_SURFACE = 'aspect-[9/16] w-full overflow-hidden rounded-2xl'

/**
 * Social-Media-Teaser der Startseite: zwei echte Objekt-Reels plus der Einstieg
 * zum TikTok-Kanal. Der CTA führt zur Katalogseite `/social`.
 */
export async function SocialMedia() {
  const t = await getTranslations('Home.social')
  const tVideo = await getTranslations('VideoDialog')
  const videoLabels = { play: tVideo('play'), close: tVideo('close') }

  return (
    <section
      id="social"
      aria-labelledby="social-title"
      className="bg-background scroll-mt-24 py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] lg:gap-16 xl:gap-24">
          <div>
            <p className={EYEBROW}>{t('eyebrow')}</p>
            <h2
              id="social-title"
              className="mt-5 max-w-[14ch] font-serif text-[2rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[2.35rem] md:text-[3.35rem]"
            >
              {t('title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-[42ch] text-[17px] leading-[1.75] text-pretty">
              {t('text')}
            </p>
            <Link
              href="/social"
              className="focus-visible:ring-brand-500 mt-9 inline-flex min-h-12 items-center justify-center bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('cta')}
            </Link>
          </div>

          <ul className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-4 [&::-webkit-scrollbar]:hidden">
            {FEATURED_REELS.map(({ id, copyKey, poster }) => {
              const video = getSoldVideo(id)
              if (!video) return null

              return (
                <li key={id} className={REEL_ITEM}>
                  <VideoDialog
                    src={video.video}
                    poster={poster}
                    width={video.width}
                    height={video.height}
                    title={`${t(`items.${copyKey}.title`)} ${t(`items.${copyKey}.location`)}`}
                    fallback={t('videoFallback')}
                    labels={videoLabels}
                    playAppearance="reel"
                    className={REEL_SURFACE}
                    posterClassName="absolute inset-0"
                    posterSizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 70vw"
                    overlay={
                      <ReelCaption
                        badge={t(`items.${copyKey}.badge`)}
                        title={t(`items.${copyKey}.title`)}
                        location={t(`items.${copyKey}.location`)}
                      />
                    }
                  />
                </li>
              )
            })}

            <li className={REEL_ITEM}>
              <a
                href={SITE.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t('openOnTikTok')}: ${t('items.guide.title')}`}
                className={cn(
                  REEL_SURFACE,
                  'group focus-visible:ring-brand-400 relative block cursor-pointer bg-black focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
                )}
              >
                <Image
                  src={TIKTOK_GUIDE_POSTER}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 70vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
                  aria-hidden="true"
                />
                <span className="absolute inset-0 z-20 flex items-center justify-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none">
                    <Play
                      className="text-brand-600 ml-0.5 size-5 fill-current"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <ReelCaption
                  badge={t('items.guide.badge')}
                  title={t('items.guide.title')}
                  meta={t('items.guide.meta')}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function ReelCaption({
  badge,
  title,
  location,
  meta,
}: {
  badge: string
  title: string
  location?: string
  meta?: string
}) {
  return (
    <span className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3.5 sm:p-4">
      <span className="absolute inset-0 bg-black/25" />
      <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />
      <span className="relative self-start rounded-full border border-white/15 bg-white/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
        {badge}
      </span>
      <span className="relative flex items-end justify-between gap-2">
        <span
          className={cn(
            'min-w-0 text-[15px] leading-snug text-white sm:text-base',
            location && 'sm:whitespace-nowrap',
          )}
        >
          <span className="font-semibold">{title}</span>
          {location ? <span className="font-medium text-white/75"> {location}</span> : null}
        </span>
        {meta ? (
          <span className="mb-0.5 shrink-0 text-[12px] leading-none font-medium text-white/80">
            {meta}
          </span>
        ) : null}
      </span>
    </span>
  )
}
