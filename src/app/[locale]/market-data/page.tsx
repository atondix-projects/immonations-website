import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { MarketDataPage } from '@/components/site/market/market-pages'
import { JsonLd } from '@/components/site/json-ld'
import { routing, type Locale } from '@/i18n/routing'
import { getMarketDataCopy } from '@/lib/content/market-insights'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

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
  const copy = getMarketDataCopy(locale)

  return buildMetadata({
    locale,
    path: '/market-data',
    localizedPaths: { de: '/marktdaten', en: '/market-data' },
    title: copy.metadata.title,
    description: copy.metadata.description,
  })
}

export default async function MarketDataRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const copy = getMarketDataCopy(locale)
  const pageUrl = `${SITE.url}/${locale}${localizePath('/market-data', locale)}`
  const nav = await getTranslations('Nav')

  return (
    <>
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: copy.hero.title, url: pageUrl },
          ]),
          service({
            locale: locale as Locale,
            url: pageUrl,
            name: copy.hero.title,
            description: copy.metadata.description,
            areaServed: 'Metropolregion Nürnberg',
          }),
          faqPage(copy.faq),
        ]}
      />
      <MarketDataPage locale={locale as Locale} />
    </>
  )
}
