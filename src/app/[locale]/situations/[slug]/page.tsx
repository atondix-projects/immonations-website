import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CatalogPage } from '@/components/site/templates/catalog-page'
import { routing } from '@/i18n/routing'
import { getSituationGuide, listAllSituationGuides } from '@/lib/content/situations'
import { getRouteById } from '@/lib/routing/route-catalog'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

export function generateStaticParams() {
  return listAllSituationGuides().map((guide) => ({ locale: guide.locale, slug: guide.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const guide = getSituationGuide(locale, slug)
  if (!guide) notFound()
  const routeRecord = getRouteById(`situation:${guide.translationKey}`)
  if (!routeRecord) notFound()
  return buildMetadata({
    locale,
    path: routeRecord.internal,
    localizedPaths: routeRecord.paths,
    title: `${guide.title} | Immonation`,
    description: guide.description,
  })
}

export default async function SituationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const guide = getSituationGuide(locale, slug)
  if (!guide) notFound()
  const routeRecord = getRouteById(`situation:${guide.translationKey}`)
  if (!routeRecord) notFound()
  const url = `${SITE.url}/${locale}${routeRecord.paths[locale]}`
  const isGerman = locale === 'de'

  return (
    <>
      <JsonLd
        data={[
          breadcrumbList([
            { name: isGerman ? 'Start' : 'Home', url: `${SITE.url}/${locale}` },
            { name: guide.title, url },
          ]),
          service({
            locale,
            url,
            name: guide.title,
            description: guide.description,
            areaServed: 'Metropolregion Nürnberg',
          }),
          faqPage(guide.faq),
        ]}
      />
      <CatalogPage
        eyebrow={isGerman ? 'Verkaufsanlass' : 'Selling situation'}
        title={guide.title}
        lede={guide.lede}
        answer={
          isGerman
            ? 'Immonation verbindet eine neutrale Wertbasis mit einem Ablauf, der zur persönlichen, rechtlichen und zeitlichen Situation passt.'
            : 'Immonation combines a neutral valuation with a process suited to the personal, legal, and timing context.'
        }
        sections={guide.factors.map((title) => ({
          title,
          text: isGerman
            ? 'Dieser Schritt wird vor dem Vermarktungsstart konkret geklärt und mit allen Beteiligten nachvollziehbar dokumentiert.'
            : 'This step is clarified before marketing and documented transparently for everyone involved.',
        }))}
        faq={guide.faq}
        cta={{
          title: isGerman
            ? 'Ihre Situation vertraulich besprechen'
            : 'Discuss your situation confidentially',
          text: isGerman
            ? 'Kostenlos, diskret und ohne Verkaufsdruck.'
            : 'Free, discreet, and without sales pressure.',
          label: isGerman ? 'Bewertung starten' : 'Start valuation',
          href: '/property-valuation',
        }}
      />
    </>
  )
}
