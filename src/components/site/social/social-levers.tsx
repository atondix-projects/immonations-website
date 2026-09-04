import { getTranslations } from 'next-intl/server'
import { CONTAINER } from '@/components/site/home/section-shell'

const LEVERS = ['network', 'follower', 'algorithm'] as const

/**
 * „Die drei Hebel" — was ein einzelner Clip auslöst. Dunkles Band, damit der
 * Mechanismus optisch vom Nutzenversprechen darüber getrennt bleibt.
 */
export async function SocialLevers() {
  const t = await getTranslations('SocialPage.levers')

  return (
    <section
      aria-labelledby="social-levers-title"
      className="bg-surface-dark scroll-mt-24 py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="max-w-[52rem]">
          <p className="text-brand-200 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
            {t('eyebrow')}
          </p>
          <h2
            id="social-levers-title"
            className="mt-5 max-w-[20ch] font-serif text-[2rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance text-white sm:text-[2.35rem] md:text-[3.35rem]"
          >
            {t('title')}
          </h2>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.75] text-pretty text-neutral-400">
            {t('text')}
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {LEVERS.map((key, index) => (
            <li
              key={key}
              className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.05] p-7 md:p-8"
            >
              <span className="text-brand-200 font-serif text-3xl leading-none font-medium tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-serif text-xl leading-tight font-semibold text-balance text-white">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-neutral-400">
                {t(`items.${key}.text`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
