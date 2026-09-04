import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { MarketOverviewPage } from '@/components/site/market/market-pages'
import { ReferenceProofRail } from '@/components/site/references/reference-proof-rail'
import { JsonLd } from '@/components/site/json-ld'
import { routing, type Locale } from '@/i18n/routing'
import { getMarketOverviewCopy } from '@/lib/content/market-insights'
import { listReferencesForSellerGuide } from '@/lib/content/references'
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
  const copy = getMarketOverviewCopy(locale)

  return buildMetadata({
    locale,
    path: '/market',
    localizedPaths: { de: '/markt', en: '/property-market' },
    title: copy.metadata.title,
    description: copy.metadata.description,
  })
}

export default async function MarketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const copy = getMarketOverviewCopy(locale)
  const pageUrl = `${SITE.url}/${locale}${localizePath('/market', locale)}`
  const nav = await getTranslations('Nav')
  const referencesT = await getTranslations('ReferencesPage')

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
      <MarketOverviewPage locale={locale as Locale} />
      <ReferenceProofRail
        references={listReferencesForSellerGuide('sell-apartment-building')}
        locale={locale as Locale}
        eyebrow={referencesT('gallery.eyebrow')}
        title={referencesT('proof.title')}
        text={referencesT('proof.text')}
        referenceLabel={referencesT('gallery.referenceLabel')}
      />
    </>
  )
}
