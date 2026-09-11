import type { Metadata } from 'next'
import { cache } from 'react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CatalogPage } from '@/components/site/templates/catalog-page'
import { RelatedReferenceBlock } from '@/components/site/references/related-reference-block'
import { routing } from '@/i18n/routing'
import { listReferencesForListing } from '@/lib/content/references'
import { createOnOfficeProvider } from '@/lib/onoffice/provider'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

const euro = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export const dynamic = 'force-dynamic'

const getListing = cache(async (slug: string) => {
  const provider = createOnOfficeProvider()
  if (!provider) return null
  const listings = await provider.listEstates().catch(() => [])
  return listings.find((listing) => listing.slug === slug) ?? null
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const listing = await getListing(slug)
  if (!listing) notFound()
  const title =
    locale === 'de'
      ? `${listing.title} in ${listing.location}`
      : `${listing.title} in ${listing.location}`
  return buildMetadata({
    locale,
    path: `/properties/${slug}`,
    title: `${title} | Immonation`,
    description:
      listing.description || `${listing.title}, ${listing.postalCode} ${listing.location}`.trim(),
  })
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('PropertyDetailPage')
  const listing = await getListing(slug)
  if (!listing) notFound()
  const isGerman = locale === 'de'
  const status =
    listing.status === 'available'
      ? isGerman
        ? 'Verfügbar'
        : 'Available'
      : isGerman
        ? 'Verkauft / nicht verfügbar'
        : 'Sold / unavailable'
  const url = `${SITE.url}/${locale}${localizePath(`/properties/${slug}`, locale)}`
  const relatedReferences = listReferencesForListing({
    location: listing.location,
    type: listing.propertyType,
  })

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: isGerman ? 'Start' : 'Home', url: `${SITE.url}/${locale}` },
          {
            name: isGerman ? 'Angebote' : 'Properties',
            url: `${SITE.url}/${locale}${localizePath('/buy', locale)}`,
          },
          { name: listing.title, url },
        ])}
      />
      <CatalogPage
        eyebrow={`${status} · ${listing.propertyType}`}
        title={listing.title}
        lede={`${listing.location} · ${listing.postalCode}`}
        answer={listing.description || (isGerman ? 'Details auf Anfrage.' : 'Details on request.')}
        sections={[
          {
            title: isGerman ? 'Eckdaten' : 'Key facts',
            text: [
              listing.livingArea ? `${listing.livingArea} m²` : null,
              listing.rooms ? `${listing.rooms} ${isGerman ? 'Zimmer' : 'rooms'}` : null,
              listing.price
                ? euro.format(listing.price)
                : isGerman
                  ? 'Preis auf Anfrage'
                  : 'Price on request',
            ]
              .filter(Boolean)
              .join(' · '),
          },
          {
            title: isGerman ? 'Besichtigung' : 'Viewing',
            text: isGerman
              ? 'Besichtigungen werden nach Prüfung des Suchprofils und der Finanzierung koordiniert.'
              : 'Viewings are coordinated after reviewing the search profile and financing.',
          },
          {
            title: isGerman ? 'Objektstatus' : 'Property status',
            text:
              listing.status === 'available'
                ? isGerman
                  ? 'Das Objekt wird aktuell angeboten. Verfügbarkeit bitte vor einer Anreise bestätigen.'
                  : 'The property is currently offered. Confirm availability before travelling.'
                : isGerman
                  ? 'Die Seite bleibt als Verkaufsarchiv erreichbar. Aktuelle Angebote finden Sie in der Objektübersicht.'
                  : 'This page remains available as a sales archive. Current properties are listed in the overview.',
          },
        ]}
        cta={{
          title: isGerman ? 'Interesse an diesem Objekt?' : 'Interested in this property?',
          text: isGerman
            ? 'Wir prüfen Verfügbarkeit und Finanzierung vor dem Termin.'
            : 'We confirm availability and financing before an appointment.',
          label: isGerman ? 'Kontakt aufnehmen' : 'Contact us',
          href: listing.status === 'available' ? '/contact' : '/buy',
        }}
      />
      <RelatedReferenceBlock
        references={relatedReferences}
        locale={locale}
        eyebrow={t('relatedEyebrow')}
        title={t('relatedTitle')}
        text={t('relatedText')}
        referenceLabel={t('referenceLabel')}
      />
    </>
  )
}
