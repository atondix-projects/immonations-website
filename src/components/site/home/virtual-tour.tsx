import { getTranslations } from 'next-intl/server'
import { Eye, LineChart, ShieldCheck, View } from 'lucide-react'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'

type TourBullet = { title: string; text: string }
type TourStat = { value: string; label: string }

const BULLET_ICONS = [Eye, LineChart, ShieldCheck, View] as const

export async function VirtualTour() {
  const t = await getTranslations('Home.virtualTour')
  const bullets = t.raw('bullets') as TourBullet[]
  const stats = t.raw('stats') as TourStat[]

  return (
    <section id="virtuelle-besichtigung" className="bg-background scroll-mt-24 py-16 md:py-24">
      <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16`}>
        {/* Medienfläche: Immobilienpräsentation vom Grundstück bis zur fertigen Immobilie */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <div className="bg-surface-dark overflow-hidden">
            <video
              className="aspect-video w-full bg-black object-cover"
              controls
              playsInline
              preload="metadata"
              aria-label={t('demoLabel')}
            >
              <source src="/immonation-presentation-video.mp4" type="video/mp4" />
              {t('videoFallback')}
            </video>
            <div className="border-t border-white/10 p-5">
              <p className="font-medium text-white">{t('demoLabel')}</p>
              <p className="mt-1 text-[13px] leading-snug text-neutral-400">{t('demoNote')}</p>
            </div>
          </div>
          <div className="border-border grid grid-cols-3 divide-x border bg-white">
            {stats.map((stat) => (
              <div key={stat.label} className="divide-border flex flex-col gap-1 p-5">
                <span className="font-serif text-2xl font-semibold md:text-[28px]">
                  {stat.value}
                </span>
                <span className="text-[13px] leading-snug text-neutral-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3.5">
            <span className={EYEBROW}>{t('eyebrow')}</span>
            <h2 className={`${SECTION_TITLE} text-balance`}>{t('title')}</h2>
          </div>
          <p className="text-muted-foreground max-w-[68ch] text-[17px] leading-[1.6]">{t('p1')}</p>
          <div className="flex flex-col gap-6">
            {bullets.map((bullet, index) => {
              const Icon = BULLET_ICONS[index] ?? Eye
              return (
                <div key={bullet.title} className="flex gap-4">
                  <Icon
                    className="text-primary mt-0.5 size-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[17px] font-semibold">{bullet.title}</h3>
                    <p className="text-muted-foreground text-[15px] leading-[1.55]">
                      {bullet.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <a
            href="#bewertung"
            className="bg-primary hover:bg-brand-700 self-start px-8 py-4 text-base font-medium tracking-[0.04em] text-white transition-colors"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
