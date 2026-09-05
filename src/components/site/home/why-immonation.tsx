import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { DIFFERENCE_ICONS } from './why-immonation-icons'
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
      {/* Anonymisierte Stadtansicht statt des frueheren Linienrasters: die Region, ueber
          die dieser Abschnitt spricht, ohne ein konkretes Kundenobjekt zu zeigen. Das Bild
          laeuft nach unten aus, damit die Liste auf ruhiger Flaeche steht. */}
      {/* Auf schmalen Viewports wird die Sektion sehr hoch; ueber die volle Hoehe
          gezogen bliebe vom Querformat nur ein unlesbarer Ausschnitt. Deshalb dort
          ein Band am oberen Rand, ab `md` die ganze Flaeche. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[460px] md:h-full"
        aria-hidden="true"
      >
        <Image
          src="/images/generic/generic-aerial-townscape.webp"
          alt=""
          fill
          sizes="100vw"
          className="[mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)] object-cover object-top opacity-40 saturate-[0.6] md:object-center"
        />
        <span className="from-surface-dark via-surface-dark/45 absolute inset-0 bg-gradient-to-b to-transparent" />
      </div>
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
            {items.map((item, index) => {
              const Icon = DIFFERENCE_ICONS[index]

              return (
                <li
                  key={item.title}
                  className="group grid gap-4 border-b border-white/18 py-7 transition-colors duration-300 hover:border-white/35 sm:grid-cols-[3.5rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6 sm:py-8 md:grid-cols-[4.5rem_minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8"
                >
                  {/* Optisch auf die erste Zeile der Überschrift gesetzt, nicht auf
                    deren Oberkante — das Icon ist doppelt so hoch wie die Ziffern,
                    die hier vorher standen. */}
                  {Icon ? <Icon className="text-brand-200 mt-0.5 size-6" /> : null}
                  <h3 className="group-hover:text-brand-200 max-w-[18ch] font-serif text-[1.6rem] leading-[1.12] font-medium tracking-[-0.02em] text-balance transition-colors duration-300 md:text-[1.8rem]">
                    {item.title}
                  </h3>
                  <p className="max-w-[48ch] text-[15px] leading-[1.7] text-pretty text-neutral-300 sm:pt-0.5 md:text-[16px]">
                    {item.text}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
