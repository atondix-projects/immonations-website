import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'
import { listSocialChannels } from '@/lib/content/social-channels'

/**
 * „Folgen & ansehen" — alle betriebenen Kanäle mit ihrer Rolle im
 * Vermarktungssystem. Reine Links, keine Plattform-Embeds: Ein eingebetteter
 * Feed würde Skripte und Cookies der Plattform vor jeder Einwilligung laden.
 */
export async function SocialChannelRow({ locale }: { locale: Locale }) {
  const t = await getTranslations('SocialPage.channels')
  const channels = listSocialChannels(locale)

  return (
    <section
      id="folgen"
      aria-labelledby="social-channels-title"
      className="border-border bg-muted/45 scroll-mt-24 border-y py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="max-w-[52rem]">
          <p className={EYEBROW}>{t('eyebrow')}</p>
          <h2
            id="social-channels-title"
            className={`${SECTION_TITLE} mt-5 max-w-[20ch] text-balance`}
          >
            {t('title')}
          </h2>
        </div>

        <ul className="border-border mt-12 grid gap-px border bg-neutral-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <li key={channel.platform} className="bg-background">
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-brand-500 group flex h-full flex-col p-7 transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset md:p-8"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-serif text-xl leading-tight font-semibold">
                    {channel.name}
                  </span>
                  <ArrowUpRight
                    className="text-brand-700 size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-muted-foreground mt-1 text-[13px]">{channel.handle}</span>
                <span className="text-muted-foreground mt-4 text-[15px] leading-[1.7]">
                  {channel.purpose}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
