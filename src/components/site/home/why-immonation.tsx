import { getTranslations } from 'next-intl/server'
import { CONTAINER } from './section-shell'

type DifferenceItem = {
  title: string
  text: string
}

export async function WhyImmonation() {
  const t = await getTranslations('Home.difference')
  const items = t.raw('items') as DifferenceItem[]

  return (
    <section
      id="darum-immonation"
      className="bg-surface-dark relative scroll-mt-24 overflow-hidden py-18 text-white md:py-26"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-[size:72px_72px]"
      />
      <div
        aria-hidden="true"
        className="bg-brand-400/70 absolute top-0 left-0 h-1 w-[28vw] min-w-28"
      />

      <div className={`${CONTAINER} relative`}>
        <div className="grid gap-14 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:gap-20 xl:gap-28">
          <header className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-brand-200 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
              {t('eyebrow')}
            </p>
            <h2 className="mt-5 max-w-[15ch] font-serif text-[2.2rem] leading-[1.03] font-medium tracking-[-0.03em] text-balance sm:text-[2.7rem] md:text-[3.55rem]">
              {t('title')}
            </h2>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.75] text-pretty text-neutral-300">
              {t('lede')}
            </p>

            <div className="mt-9 flex items-center gap-3 border-t border-white/15 pt-5">
              <span className="bg-brand-300 size-2 shrink-0" aria-hidden="true" />
              <p className="text-sm leading-6 font-medium text-neutral-100">{t('principle')}</p>
            </div>
          </header>

          <ol className="border-t border-white/18">
            {items.map((item, index) => (
              <li
                key={item.title}
                className="group grid gap-4 border-b border-white/18 py-7 transition-colors duration-300 hover:border-white/35 sm:grid-cols-[3.5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6 sm:py-8 md:grid-cols-[4.5rem_minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8"
              >
                <span className="text-brand-200 pt-1 font-mono text-xs tracking-[0.16em] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="group-hover:text-brand-200 max-w-[18ch] font-serif text-[1.6rem] leading-[1.12] font-medium tracking-[-0.02em] text-balance transition-colors duration-300 md:text-[1.8rem]">
                  {item.title}
                </h3>
                <p className="max-w-[48ch] text-[15px] leading-[1.7] text-pretty text-neutral-300 sm:pt-0.5 md:text-[16px]">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
