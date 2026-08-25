import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { CONTAINER, EYEBROW } from './section-shell'

type WarningSignPreview = {
  title: string
  text: string
}

function asPreviews(value: unknown): WarningSignPreview[] {
  if (!Array.isArray(value)) return []
  return value.filter(
    (item): item is WarningSignPreview =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as WarningSignPreview).title === 'string' &&
      typeof (item as WarningSignPreview).text === 'string',
  )
}

/**
 * Teaser der Ratgeberseite `/sale-warning-signs`: drei der neun Warnsignale
 * aus dem Homepage-Prototyp, mit CTA zur vollständigen Liste.
 */
export async function WarningSigns() {
  const t = await getTranslations('Home.warningSigns')
  const items = asPreviews(t.raw('items'))

  return (
    <section
      id="warnsignale"
      aria-labelledby="warnsignale-title"
      className="bg-background scroll-mt-24 py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20 xl:gap-28">
          <div>
            <p className={EYEBROW}>{t('eyebrow')}</p>
            <h2
              id="warnsignale-title"
              className="mt-5 max-w-[16ch] font-serif text-[2rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[2.35rem] md:text-[3.35rem]"
            >
              {t('title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-[46ch] text-[17px] leading-[1.75] text-pretty">
              {t('lede')}
            </p>
            <Link
              href="/sale-warning-signs"
              className="focus-visible:ring-brand-500 mt-9 inline-flex min-h-12 items-center justify-center bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-px"
            >
              {t('cta')}
            </Link>
          </div>

          {items.length > 0 ? (
            <ul className="flex flex-col gap-3.5">
              {items.map((item) => (
                <li
                  key={item.title}
                  className="border-border border-l-brand-500 bg-card border border-l-2 px-6 py-5 md:px-7 md:py-6"
                >
                  <h3 className="font-serif text-[1.2rem] leading-tight font-semibold tracking-[-0.015em] md:text-[1.35rem]">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-[42ch] text-[15px] leading-[1.65] text-pretty">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  )
}
