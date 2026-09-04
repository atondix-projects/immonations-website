import { Heart, Lock, Radio, Zap } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { CONTAINER, EYEBROW, SECTION_TITLE } from '@/components/site/home/section-shell'

const REASONS = [
  { key: 'reach', Icon: Radio },
  { key: 'emotion', Icon: Heart },
  { key: 'speed', Icon: Zap },
  { key: 'discretion', Icon: Lock },
] as const

/**
 * „Warum über Social Media?" — die vier Gründe, warum ein Objektvideo Käufer
 * erreicht, die ein Portalinserat nicht erreicht.
 */
export async function SocialReasons() {
  const t = await getTranslations('SocialPage.reasons')

  return (
    <section
      aria-labelledby="social-reasons-title"
      className="border-border bg-muted/45 scroll-mt-24 border-b py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="max-w-[52rem]">
          <p className={EYEBROW}>{t('eyebrow')}</p>
          <h2
            id="social-reasons-title"
            className={`${SECTION_TITLE} mt-5 max-w-[22ch] text-balance`}
          >
            {t('title')}
          </h2>
        </div>

        <ul className="border-border mt-12 grid gap-px border bg-neutral-900/10 sm:grid-cols-2">
          {REASONS.map(({ key, Icon }) => (
            <li key={key} className="bg-background flex flex-col p-7 md:p-9">
              <span className="bg-brand-50 text-brand-700 flex size-11 items-center justify-center rounded-full">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-serif text-2xl leading-tight font-semibold text-balance">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground mt-3 max-w-[52ch] text-[15px] leading-[1.75]">
                {t(`items.${key}.text`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
