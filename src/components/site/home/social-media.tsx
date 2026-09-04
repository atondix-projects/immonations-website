import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ChannelHighlightCard } from '@/components/site/social/channel-highlight-card'
import {
  SOCIAL_METRICS_CAPTURED_ON,
  formatSocialViews,
  getSocialChannel,
  getTopSocialPost,
  type SocialPlatform,
} from '@/lib/content/social-channels'
import type { Locale } from '@/i18n/routing'
import { CONTAINER, EYEBROW } from './section-shell'

/** Ein Kanal pro Kachel, jeweils der reichweitenstärkste Objektclip daraus. */
const PLATFORMS = ['tiktok', 'instagram', 'youtube'] as const satisfies readonly SocialPlatform[]

/**
 * Social-Media-Teaser der Startseite. Die drei Kacheln verlinken auf die real
 * meistgesehenen Objektvideos der Kanäle — keine Beispiel-Clips, keine
 * erfundenen Ratgebertitel. Der CTA führt zur Katalogseite `/social`.
 */
export async function SocialMedia() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('Home.social')

  const cards = PLATFORMS.flatMap((platform) => {
    const channel = getSocialChannel(platform, locale)
    const post = getTopSocialPost(platform, locale)
    return channel && post ? [{ channel, post }] : []
  })

  const capturedOn = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    dateStyle: 'long',
  }).format(new Date(SOCIAL_METRICS_CAPTURED_ON))

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

          {/* min-w-0: ohne das wächst der Grid-Track auf die Breite der drei
              Kacheln und die Startseite scrollt auf dem Telefon horizontal. */}
          <div className="min-w-0">
            <ul className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-4 [&::-webkit-scrollbar]:hidden">
              {cards.map(({ channel, post }) => (
                <li
                  key={channel.platform}
                  className="w-[min(13.75rem,72vw)] shrink-0 snap-start sm:w-auto sm:min-w-0"
                >
                  <ChannelHighlightCard
                    platformName={channel.name}
                    handle={channel.handle}
                    label={post.label}
                    views={formatSocialViews(post.views, locale)}
                    viewsLabel={t('viewsLabel')}
                    href={post.url}
                    linkLabel={t('watchOn', { platform: channel.name })}
                    className="aspect-[9/16] w-full"
                  />
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4 text-[13px] leading-snug">
              {t('metricsNote', { date: capturedOn })}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
