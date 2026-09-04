import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'
import {
  SOCIAL_METRICS_CAPTURED_ON,
  formatSocialViews,
  getSocialChannel,
  listSocialPostsByPlatform,
  type SocialPlatform,
} from '@/lib/content/social-channels'
import { getReference } from '@/lib/content/references'

const PLATFORMS = ['tiktok', 'instagram', 'youtube'] as const satisfies readonly SocialPlatform[]

/**
 * „Aus unseren Kanälen" — die real reichweitenstärksten Objektvideos je Kanal,
 * mit Aufrufzahl und Link auf den Originalbeitrag.
 *
 * Es sind ausschließlich Objektinhalte gelistet. Die absolut meistgesehenen
 * Beiträge sind teils Sponsoring- und Partnerbeiträge; sie stehen hier nicht,
 * weil die Seite eine Aussage über Immobilienvermarktung trifft. Die Auswahl
 * und ihre Begründung liegen in `social-channels.ts`.
 */
export async function SocialTopPosts({ locale }: { locale: Locale }) {
  const t = await getTranslations('SocialPage.topPosts')

  const capturedOn = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    dateStyle: 'long',
  }).format(new Date(SOCIAL_METRICS_CAPTURED_ON))

  const columns = PLATFORMS.flatMap((platform) => {
    const channel = getSocialChannel(platform, locale)
    const posts = listSocialPostsByPlatform(platform, locale)
    return channel && posts.length > 0 ? [{ channel, posts }] : []
  })

  return (
    <section
      id="kanaele"
      aria-labelledby="social-top-posts-title"
      className="bg-background scroll-mt-24 py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="max-w-[52rem]">
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

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {columns.map(({ channel, posts }) => (
            <article
              key={channel.platform}
              className="border-border bg-background flex flex-col border"
            >
              <header className="border-border flex flex-col gap-1 border-b p-6 md:p-7">
                <h3 className="font-serif text-2xl leading-tight font-semibold">{channel.name}</h3>
                <p className="text-muted-foreground text-[13px]">{channel.handle}</p>
                <p className="text-muted-foreground mt-3 text-[15px] leading-[1.7]">
                  {channel.purpose}
                </p>
              </header>

              <ol className="divide-border flex flex-col divide-y">
                {posts.map((post, index) => {
                  // Nur veröffentlichte Referenzfälle verlinken — ein zurückgehaltener
                  // Fall darf über diesen Umweg nicht doch sichtbar werden.
                  const record = post.referenceId ? getReference(post.referenceId) : undefined
                  const reference = record?.publication.state === 'published' ? record : undefined

                  return (
                    <li key={post.id} className="flex flex-col gap-2 p-6 md:px-7">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-visible:ring-brand-500 group flex items-start justify-between gap-4 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                      >
                        <span className="flex min-w-0 items-start gap-3">
                          <span className="text-muted-foreground mt-1 font-mono text-xs tabular-nums">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="group-hover:text-brand-700 min-w-0 text-[15px] leading-snug font-semibold transition-colors">
                            {post.label}
                            <ArrowUpRight
                              className="ml-1.5 inline size-3.5 align-[-0.1em]"
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              {' '}
                              — {t('openOn', { platform: channel.name })}
                            </span>
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="block font-serif text-lg leading-none font-semibold tabular-nums">
                            {formatSocialViews(post.views, locale)}
                          </span>
                          <span className="text-muted-foreground mt-1 block text-[11px] tracking-[0.1em] uppercase">
                            {t('views')}
                          </span>
                        </span>
                      </a>

                      {reference ? (
                        <Link
                          href={{
                            pathname: '/references/[slug]',
                            params: { slug: reference.slug },
                          }}
                          className="text-brand-700 hover:text-brand-800 ml-8 text-[13px] font-semibold transition-colors"
                        >
                          {t('caseLink')}
                        </Link>
                      ) : null}
                    </li>
                  )
                })}
              </ol>

              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 focus-visible:ring-brand-500 border-border mt-auto inline-flex min-h-12 items-center gap-2 border-t px-6 py-4 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none md:px-7"
              >
                {t('channelLink', { platform: channel.name })}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <p className="text-muted-foreground mt-6 max-w-[72ch] text-[13px] leading-[1.7]">
          {t('note', { date: capturedOn })}
        </p>
      </div>
    </section>
  )
}
