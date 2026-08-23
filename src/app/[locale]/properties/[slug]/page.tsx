import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CatalogPage } from '@/components/site/templates/catalog-page'
import { routing } from '@/i18n/routing'
import { getPropertyListing, PROPERTY_LISTINGS } from '@/lib/content/property-listings'
import { getRouteById } from '@/lib/routing/route-catalog'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PROPERTY_LISTINGS.map((listing) => ({ locale, slug: listing.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const listing = getPropertyListing(slug)
  const routeRecord = getRouteById(`property:${slug}`)
  if (!listing || !routeRecord) notFound()
  const title = locale === 'de' ? `${listing.title} in ${listing.location}` : `${listing.title} in ${listing.location}`
  return buildMetadata({ locale, path: routeRecord.internal, localizedPaths: routeRecord.paths, title: `${title} | Immonation`, description: listing.description })
}

export default async function PropertyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const listing = getPropertyListing(slug)
  const routeRecord = getRouteById(`property:${slug}`)
  if (!listing || !routeRecord) notFound()
  const isGerman = locale === 'de'
  const status = listing.status === 'available' ? (isGerman ? 'Verfügbar' : 'Available') : isGerman ? 'Verkauft / nicht verfügbar' : 'Sold / unavailable'
  const url = `${SITE.url}/${locale}${routeRecord.paths[locale]}`

  return (
    <>
      <JsonLd data={breadcrumbList([{ name: isGerman ? 'Start' : 'Home', url: `${SITE.url}/${locale}` }, { name: isGerman ? 'Angebote' : 'Properties', url: `${SITE.url}/${locale}${getRouteById('properties')?.paths[locale] ?? ''}` }, { name: listing.title, url }])} />
      <CatalogPage
        eyebrow={`${status} · ${listing.type}`}
        title={listing.title}
        lede={`${listing.location} · ${listing.postalCode}`}
        answer={listing.description}
        sections={[
          { title: isGerman ? 'Eckdaten' : 'Key facts', text: `${listing.livingArea} · ${listing.rooms} ${isGerman ? 'Zimmer' : 'rooms'} · ${euro.format(listing.price)}` },
          { title: isGerman ? 'Besichtigung' : 'Viewing', text: isGerman ? 'Besichtigungen werden nach Prüfung des Suchprofils und der Finanzierung koordiniert.' : 'Viewings are coordinated after reviewing the search profile and financing.' },
          { title: isGerman ? 'Objektstatus' : 'Property status', text: listing.status === 'available' ? (isGerman ? 'Das Objekt wird aktuell angeboten. Verfügbarkeit bitte vor einer Anreise bestätigen.' : 'The property is currently offered. Confirm availability before travelling.') : (isGerman ? 'Die Seite bleibt als Verkaufsarchiv erreichbar. Aktuelle Angebote finden Sie in der Objektübersicht.' : 'This page remains available as a sales archive. Current properties are listed in the overview.') },
        ]}
        cta={{ title: isGerman ? 'Interesse an diesem Objekt?' : 'Interested in this property?', text: isGerman ? 'Wir prüfen Verfügbarkeit und Finanzierung vor dem Termin.' : 'We confirm availability and financing before an appointment.', label: isGerman ? 'Kontakt aufnehmen' : 'Contact us', href: listing.status === 'available' ? '/contact' : '/buy' }}
      />
    </>
  )
}

