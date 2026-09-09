import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { DataProvenance } from '@/components/site/data-provenance'
import { JsonLd } from '@/components/site/json-ld'
import { PriceAtlas } from '@/components/site/price-atlas/price-atlas'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { routing } from '@/i18n/routing'
import {
  CITY_NAMES,
  getPriceAtlasCoverage,
  listPriceAtlasGroups,
  PRICE_ATLAS_CITIES,
} from '@/lib/content/price-atlas'
import { breadcrumbList, faqPage, itemList } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'
const EYEBROW = 'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: 'PriceAtlasPage' })

  return buildMetadata({
    locale,
    path: '/price-atlas',
    title: t('metadata.title'),
    description: t('metadata.description', { districts: getPriceAtlasCoverage().districts }),
    localizedPaths: {
      de: localizePath('/price-atlas', 'de'),
      en: localizePath('/price-atlas', 'en'),
    },
  })
}

export default async function PriceAtlasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('PriceAtlasPage')
  const groups = listPriceAtlasGroups()
  const coverage = getPriceAtlasCoverage()
  const methodItems = t.raw('method.items') as Array<{ title: string; text: string }>
  const faqItems = t.raw('faq.items') as FaqItem[]
  const pageUrl = `${SITE.url}/${locale}${localizePath('/price-atlas', locale)}`

  return (
    <>
      <JsonLd
        data={[
          breadcrumbList([
            { name: locale === 'de' ? 'Start' : 'Home', url: `${SITE.url}/${locale}` },
            { name: t('hero.title'), url: pageUrl },
          ]),
          itemList(
            PRICE_ATLAS_CITIES.map((city) => ({
              name: CITY_NAMES[city],
              description: t('jsonLd.cityDescription', { city: CITY_NAMES[city] }),
              url: `${SITE.url}/${locale}${localizePath(`/locations/${city}`, locale)}`,
            })),
          ),
          faqPage(faqItems),
        ]}
      />

      <div className="bg-background">
        <PageHero
          eyebrow={t('hero.eyebrow')}
          title={t('hero.title')}
          lede={t('hero.lede', { districts: coverage.districts, cities: coverage.cities })}
        />

        <section className="border-border bg-muted/45 border-y py-10 md:py-12">
          <div className={CONTAINER}>
            <p className="max-w-[86ch] text-[17px] leading-[1.75] text-pretty">
              {t('answer', { districts: coverage.districts, cities: coverage.cities })}
            </p>
          </div>
        </section>

        <section id="atlas" className="py-14 md:py-20">
          <div className={CONTAINER}>
            <p className={EYEBROW}>{t('atlas.eyebrow')}</p>
            <h2 className="hyphens-headline mt-4 max-w-[20ch] font-serif text-[2.1rem] leading-[1.06] font-medium tracking-[-0.025em] text-balance md:text-[2.9rem]">
              {t('atlas.heading')}
            </h2>

            <div className="mt-10">
              <PriceAtlas groups={groups} />
            </div>

            <p className="border-brand-600 text-muted-foreground mt-12 max-w-[80ch] border-l-2 pl-5 text-[14px] leading-[1.7] text-pretty">
              {t('note')}
            </p>

            <DataProvenance source={t('source')} />
          </div>
        </section>

        <section className="border-border border-t py-16 md:py-24">
          <div className={CONTAINER}>
            <p className={EYEBROW}>{t('method.eyebrow')}</p>
            <h2 className="mt-4 max-w-[22ch] font-serif text-[2.1rem] leading-[1.06] font-medium tracking-[-0.025em] text-balance md:text-[2.9rem]">
              {t('method.title')}
            </h2>
            <div className="mt-12 grid gap-px bg-neutral-900/10 md:grid-cols-2 xl:grid-cols-4">
              {methodItems.map((item, index) => (
                <article key={item.title} className="bg-background p-7 md:p-8">
                  <span className="text-brand-700 font-mono text-xs tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 font-serif text-xl leading-tight font-medium tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3.5 text-[14.5px] leading-[1.7] text-pretty">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FaqSection title={t('faq.title')} items={faqItems} />

        <CtaBand
          title={t('cta.title')}
          text={t('cta.text')}
          primary={{ label: t('cta.label'), href: '/property-valuation' }}
          secondary={{ label: t('cta.secondaryLabel'), href: '/locations' }}
        />
      </div>
    </>
  )
}
