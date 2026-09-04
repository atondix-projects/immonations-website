import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CatalogPreview } from '@/components/site/catalog-preview'
import { JsonLd } from '@/components/site/json-ld'
import { CatalogPage } from '@/components/site/templates/catalog-page'
import { getCatalogPage, type CatalogPageId } from '@/content/catalog-pages'
import { routing, type Locale } from '@/i18n/routing'
import { getRouteById, isRouteNoindex } from '@/lib/routing/route-catalog'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

export function getCatalogPageData(id: CatalogPageId, locale: Locale) {
  const routeRecord = getRouteById(id)
  if (!routeRecord || routeRecord.status === 'reserved') notFound()
  return { content: getCatalogPage(id, locale), routeRecord }
}

export function createCatalogMetadata(id: CatalogPageId) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>
  }): Promise<Metadata> {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) notFound()
    const { content, routeRecord } = getCatalogPageData(id, locale)

    return buildMetadata({
      locale,
      path: routeRecord.internal,
      localizedPaths: routeRecord.paths,
      title: `${content.title} | Immonation`,
      description: content.description,
      noindex: isRouteNoindex(routeRecord),
    })
  }
}

/**
 * `renderExtra` hängt einen seitenspezifischen Abschnitt unter die generischen
 * Katalogsektionen — für Seiten wie `/engagement`, die einen belegten Einzelfall
 * ausführlich zeigen, ohne dass dafür eine eigene Route nötig wird.
 */
export function createCatalogPage(id: CatalogPageId, renderExtra?: (locale: Locale) => ReactNode) {
  return async function CatalogRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) notFound()
    setRequestLocale(locale)
    const { content, routeRecord } = getCatalogPageData(id, locale)
    const pageUrl = `${SITE.url}/${locale}${routeRecord.paths[locale]}`

    return (
      <>
        <JsonLd
          data={[
            breadcrumbList([
              { name: locale === 'de' ? 'Start' : 'Home', url: `${SITE.url}/${locale}` },
              { name: content.title, url: pageUrl },
            ]),
            service({
              locale,
              url: pageUrl,
              name: content.title,
              description: content.description,
              areaServed: 'Metropolregion Nürnberg',
            }),
            faqPage(content.faq),
          ]}
        />
        <CatalogPage
          eyebrow={content.eyebrow}
          title={content.title}
          lede={content.lede}
          answer={content.answer}
          sections={content.sectionTitles.map((title, index) => ({
            title,
            text: content.sectionTexts?.[index] ?? '',
            href: content.sectionHrefs?.[index],
          }))}
          faq={content.faq}
          preview={
            content.preview ? <CatalogPreview kind={content.preview} locale={locale} /> : undefined
          }
          cta={{
            title: content.ctaTitle,
            text: content.ctaText,
            label: content.ctaLabel,
            href: content.ctaHref,
          }}
          extra={renderExtra?.(locale)}
        />
      </>
    )
  }
}
