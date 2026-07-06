import { getTranslations } from 'next-intl/server'
import { ArrowUpRight } from 'lucide-react'
import { CONTAINER, SectionHeader } from './section-shell'

// Verifizierte Profile der Immonation GmbH. Sobald konkrete Post-/Video-IDs
// vorliegen, können die Karten auf Klick-zum-Laden-Embeds umgestellt werden
// (analog zu video-embed.tsx) — bis dahin verlinken sie DSGVO-neutral nach außen.
const PLATFORMS = [
  {
    key: 'instagram',
    name: 'Instagram',
    handle: '@immonationgmbh',
    url: 'https://www.instagram.com/immonationgmbh',
  },
  {
    key: 'tiktok',
    name: 'TikTok',
    handle: '@immonationgmbh',
    url: 'https://www.tiktok.com/@immonationgmbh',
  },
  {
    key: 'youtube',
    name: 'YouTube',
    handle: 'Immonation GmbH',
    url: 'https://www.youtube.com/watch?v=6YEjaovRBFk',
  },
] as const

export async function SocialVideos() {
  const t = await getTranslations('Home.social')

  return (
    <section id="social" className="bg-muted border-border scroll-mt-24 border-y py-16 md:py-24">
      <div className={CONTAINER}>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />
        <p className="text-muted-foreground -mt-6 mb-12 max-w-[68ch] text-[17px] leading-[1.6]">
          {t('text')}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.key}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:border-foreground group flex flex-col border bg-white transition-colors"
            >
              <div className="bg-surface-dark relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                <span className="from-brand-800/40 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent opacity-60" />
                <span className="relative font-serif text-3xl font-semibold text-white">
                  {platform.name}
                </span>
                <span className="bg-brand-500 absolute top-0 left-0 px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.12em] text-white uppercase">
                  {platform.handle}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 pb-6">
                <p className="text-muted-foreground text-[15px] leading-[1.55]">
                  {t(`platforms.${platform.key}`)}
                </p>
                <span className="text-primary mt-auto inline-flex items-center gap-1.5 text-sm font-medium tracking-[0.04em]">
                  {t('followLabel')}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
