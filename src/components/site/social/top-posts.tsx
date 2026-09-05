import { ArrowDown } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'
import {
  SOCIAL_METRICS_CAPTURED_ON,
  formatSocialViews,
  listSocialChannels,
  listSocialPosts,
  listSocialPostsByPlatform,
  totalFeaturedViews,
} from '@/lib/content/social-channels'
import { buildSocialEmbedItems } from './social-embed-data'
import { SocialConsentBar } from './social-consent-bar'
import { SocialWall, type SocialWallFilter } from './social-wall'

/**
 * „Die meistgesehenen Objektvideos" — die Wand der echten Beiträge.
 *
 * Der frühere Aufbau listete die Beiträge nur als Textrangliste mit Aufrufzahl.
 * Jetzt trägt jede Kachel das echte Standbild des Beitrags, und der Klick startet
 * den echten Player von TikTok, Instagram oder YouTube in der Seite. Die
 * Reihenfolge bleibt die Rangfolge nach Aufrufen, plattformübergreifend.
 *
 * Gelistet sind ausschließlich Objektinhalte. Die absolut meistgesehenen Beiträge
 * sind teils Sponsoring- und Partnerbeiträge; sie stehen hier nicht, weil die Seite
 * eine Aussage über Immobilienvermarktung trifft. Begründung in `social-channels.ts`.
 */
export async function SocialTopPosts({ locale }: { locale: Locale }) {
  const t = await getTranslations('SocialPage.topPosts')

  const posts = listSocialPosts(locale)
  const items = await buildSocialEmbedItems(posts, locale)

  const filters: SocialWallFilter[] = listSocialChannels(locale).flatMap((channel) => {
    const count = listSocialPostsByPlatform(channel.platform, locale).length
    return count > 0 ? [{ value: channel.platform, label: channel.name, count }] : []
  })

  const capturedOn = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    dateStyle: 'long',
  }).format(new Date(SOCIAL_METRICS_CAPTURED_ON))

  return (
    <section
      id="kanaele"
      aria-labelledby="social-top-posts-title"
      className="bg-background scroll-mt-24 py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[46rem]">
            <p className={EYEBROW}>{t('eyebrow')}</p>
            <h2
              id="social-top-posts-title"
              className={`${SECTION_TITLE} mt-5 max-w-[20ch] text-balance`}
            >
              {t('title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-[62ch] text-[17px] leading-[1.75] text-pretty">
              {t('text')}
            </p>
          </div>

          <dl className="flex shrink-0 gap-10">
            <div>
              <dt className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
                {t('statPosts')}
              </dt>
              <dd className="mt-2 font-serif text-4xl font-semibold tabular-nums">
                {posts.length}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
                {t('statViews')}
              </dt>
              <dd className="mt-2 font-serif text-4xl font-semibold tabular-nums">
                {formatSocialViews(totalFeaturedViews(), locale)}
              </dd>
            </div>
          </dl>
        </div>

        <SocialConsentBar className="mt-10" />

        <div className="mt-8">
          <SocialWall
            items={items}
            filters={filters}
            allLabel={t('filterAll')}
            filterGroupLabel={t('filterGroupLabel')}
          />
        </div>

        <div className="border-border mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-muted-foreground max-w-[72ch] text-[13px] leading-[1.7]">
            {t('note', { date: capturedOn })}
          </p>
          {/* Auf die Kanalliste weiter unten, nicht auf eine einzelne Plattform —
              die Auswahl des Kanals gehört dem Besucher. */}
          <a
            href="#folgen"
            className="text-brand-700 hover:text-brand-800 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            {t('allChannels')}
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
