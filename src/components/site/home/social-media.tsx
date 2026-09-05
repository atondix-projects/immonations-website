import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SocialEmbedTile } from '@/components/site/social/social-embed-tile'
import { buildSocialEmbedItems } from '@/components/site/social/social-embed-data'
import {
  SOCIAL_METRICS_CAPTURED_ON,
  getTopSocialPost,
  type SocialPlatform,
} from '@/lib/content/social-channels'
import type { Locale } from '@/i18n/routing'
import { CONTAINER, EYEBROW } from './section-shell'

/** Ein Kanal pro Kachel, jeweils dessen reichweitenstärkster Objektbeitrag. */
const PLATFORMS = ['tiktok', 'instagram', 'youtube'] as const satisfies readonly SocialPlatform[]

// Nur vw/px-Angaben: eine `rem`-Breite kann Next.js nicht in eine Kandidatenbreite
// auflösen und liefert dann das größte Derivat (3840 px) in eine 250-px-Kachel.
const TILE_SIZES = '(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 72vw'

/**
 * Social-Media-Teaser der Startseite.
 *
 * Rechts stehen drei echte Beiträge — je Kanal der meistgesehene. Jede Kachel
 * zeigt das **echte Standbild des Beitrags** (lokal ausgeliefert, siehe
 * `scripts/fetch-social-thumbnails.mjs`) und startet auf Klick den **echten
 * Player** der Plattform in der Seite.
 *
 * Der Player lädt erst nach dem Klick: Vorher geht keine IP-Adresse an TikTok,
 * Instagram oder YouTube. Begründung und Rechtsgrundlage in `SocialEmbedTile`.
 */
export async function SocialMedia() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('Home.social')

  const posts = PLATFORMS.flatMap((platform) => {
    const post = getTopSocialPost(platform, locale)
    return post ? [post] : []
  })
  const items = await buildSocialEmbedItems(posts, locale)

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
            <ul className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-4 [&::-webkit-scrollbar]:hidden">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="w-[min(13.75rem,72vw)] shrink-0 snap-start sm:w-auto sm:min-w-0"
                >
                  <SocialEmbedTile
                    embed={item.embed}
                    href={item.href}
                    thumbnail={item.thumbnail}
                    platformName={item.platformName}
                    label={item.label}
                    views={item.views}
                    labels={item.labels}
                    sizes={TILE_SIZES}
                    className="aspect-[9/16] w-full"
                  />
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4 text-[13px] leading-snug">
              {t('clipNote', { date: capturedOn })}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
