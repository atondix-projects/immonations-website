import { getTranslations } from 'next-intl/server'
import { CONTAINER, EYEBROW } from './section-shell'

type PartnerItem = { name: string; role: string }

export async function Partners() {
  const t = await getTranslations('Home.partners')
  const items = t.raw('items') as PartnerItem[]

  return (
    <section id="partner" className="bg-muted border-border scroll-mt-24 border-y py-14 md:py-18">
      <div className={CONTAINER}>
        <div className="mb-10 flex flex-col gap-3.5">
          <span className={EYEBROW}>{t('eyebrow')}</span>
          <h2 className="font-serif text-2xl font-semibold leading-[1.2] md:text-[30px]">
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-[68ch] text-[16px] leading-[1.6]">
            {t('text')}
          </p>
        </div>
        {/* Wortmarken-Kacheln; durch echte Partner-Logos (SVG/PNG) ersetzen, sobald freigegeben */}
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.name}
              className="border-border flex flex-col items-center gap-2 border bg-white px-6 py-8 text-center"
            >
              <span className="font-serif text-2xl font-semibold tracking-tight">
                {item.name}
              </span>
              <span className="text-neutral-600 text-[13px] leading-snug">{item.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
