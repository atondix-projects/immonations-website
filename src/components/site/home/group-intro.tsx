import { getTranslations } from 'next-intl/server'
import { CONTAINER, SectionHeader } from './section-shell'

type GroupCompany = { name: string; role: string; text: string }

export async function GroupIntro() {
  const t = await getTranslations('Home.group')
  const companies = t.raw('companies') as GroupCompany[]

  return (
    <section id="unternehmensgruppe" className="bg-background scroll-mt-24 py-16 md:py-24">
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          link={{ label: t('link'), href: '/about' }}
        />
        <p className="text-muted-foreground -mt-6 mb-12 max-w-[68ch] text-[17px] leading-[1.6]">
          {t('intro')}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company.name}
              className="border-border border-t-accent flex flex-col gap-3.5 border border-t-2 bg-white p-7"
            >
              <span className="text-[13px] font-semibold tracking-[0.14em] text-neutral-600 uppercase">
                {company.role}
              </span>
              <h3 className="font-serif text-xl leading-tight font-semibold">{company.name}</h3>
              <p className="text-muted-foreground text-[15px] leading-[1.55]">{company.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
