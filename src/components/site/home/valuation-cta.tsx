import { getTranslations } from 'next-intl/server'
import { ValuationEntryCard } from '@/components/site/valuation/valuation-entry-card'
import { EYEBROW, SECTION_TITLE } from './section-shell'

export async function ValuationCta() {
  const t = await getTranslations('Home.valuation')

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="flex flex-col gap-5">
        <span className={EYEBROW}>{t('eyebrow')}</span>
        <h2 className={`${SECTION_TITLE} text-balance`}>{t('title')}</h2>
        <p className="text-muted-foreground max-w-[56ch] text-[17px] leading-[1.6]">
          {t('subtitle')}
        </p>
        <figure className="border-accent mt-2 flex flex-col gap-2.5 border-l-2 pl-6">
          <blockquote className="text-foreground max-w-[50ch] font-serif text-xl leading-[1.45] italic md:text-[23px]">
            {t('quote')}
          </blockquote>
          <figcaption className="text-muted-foreground text-sm">{t('quoteAuthor')}</figcaption>
        </figure>
      </div>
      <ValuationEntryCard />
    </div>
  )
}
