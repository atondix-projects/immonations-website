import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CatalogPage } from '@/components/site/templates/catalog-page'
import { routing } from '@/i18n/routing'
import { findEntriesByDistrictSlug } from '@/lib/content/price-atlas'
import { DISTRICTS, getRouteById, isRouteNoindex } from '@/lib/routing/route-catalog'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

type CitySlug = keyof typeof DISTRICTS

const CITY_NAMES: Record<CitySlug, string> = {
  nuernberg: 'Nürnberg',
  fuerth: 'Fürth',
  erlangen: 'Erlangen',
  zirndorf: 'Zirndorf',
  schwabach: 'Schwabach',
}

const DISPLAY_NAMES: Record<string, string> = {
  baerenschanze: 'Bärenschanze',
  buchenbuehl: 'Buchenbühl',
  buechenbach: 'Büchenbach',
  fuerth: 'Fürth',
  gleisshammer: 'Gleißhammer',
  grossgruendlach: 'Großgründlach',
  hoefen: 'Höfen',
  moegeldorf: 'Mögeldorf',
  oberfuerberg: 'Oberfürberg',
  roethenbach: 'Röthenbach',
  roethelheimpark: 'Röthelheimpark',
  stadtteil: 'Stadtteil',
  steinbuehl: 'Steinbühl',
  suedstadt: 'Südstadt',
  suendersbuehl: 'Sündersbühl',
  woehrd: 'Wöhrd',
}

function displayName(slug: string) {
  if (DISPLAY_NAMES[slug]) return DISPLAY_NAMES[slug]
  return slug
    .split('-')
    .map((part) => (part === 'st' ? 'St.' : `${part.charAt(0).toUpperCase()}${part.slice(1)}`))
    .join(' ')
}

function isCity(value: string): value is CitySlug {
  return value in DISTRICTS
}

function hasDistrict(city: CitySlug, slug: string) {
  return (DISTRICTS[city] as readonly string[]).includes(slug)
}

function getDistrictContext(city: CitySlug, slug: string, locale: 'de' | 'en') {
  const districts = DISTRICTS[city] as readonly string[]
  const index = districts.indexOf(slug)
  const previous = districts[(index - 1 + districts.length) % districts.length]
  const next = districts[(index + 1) % districts.length]
  const district = displayName(slug)
  const cityName = CITY_NAMES[city]
  const priceEntries = findEntriesByDistrictSlug(city, slug)
  const formatPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })

  if (locale === 'de') {
    return {
      title: `Immobilienpreise in ${cityName}-${district}`,
      description: `Immobilienbewertung und Verkauf in ${district}: Mikrolage, Objektzustand und Nachfrage im Kontext von ${cityName}.`,
      lede: `Für eine Immobilie in ${district} reicht ein Durchschnittswert für ${cityName} nicht aus. Straße, unmittelbares Umfeld, Objektart, Baujahr und Modernisierung bestimmen die belastbare Einordnung.`,
      answer: `Immonation bewertet Immobilien in ${district} vor Ort und vergleicht sie mit passenden Verkäufen in ${cityName}. Die Stadtteilseite liefert Orientierung; die konkrete Preisstrategie entsteht erst aus Objekt und Mikrolage.`,
      sections: [
        {
          title: `Mikrolage in ${district}`,
          text: `Wir prüfen die konkrete Straße, das direkte Umfeld und die für Käufer relevanten Wege. Benachbarte Lagen wie ${displayName(previous ?? '')} und ${displayName(next ?? '')} werden nur dann verglichen, wenn Objektart und Lagequalität tatsächlich passen.`,
        },
        {
          title: 'Objektmerkmale richtig gewichten',
          text: 'Wohnfläche, Grundstück, Etage, Zustand, Energie, Stellplätze und nutzbare Außenflächen erklären, warum zwei Immobilien im selben Stadtteil unterschiedliche Werte erzielen.',
        },
        {
          title: 'Vom Lagewert zur Verkaufsstrategie',
          text: `Für ${district} verbinden wir Bewertung, vollständige Unterlagen, Zielgruppenansprache und einen abgestimmten Vermarktungsstart. Allgemeine Quadratmeterpreise bleiben dabei nur ein Ausgangspunkt.`,
        },
        ...districtPriceSections(priceEntries, 'de', district, formatPrice),
      ],
      faq: [
        {
          question: `Was kostet eine Immobilie in ${district}?`,
          answer: `Das hängt von Straße, Objektart, Zustand und Ausstattung ab. Eine belastbare Spanne entsteht nach Prüfung des konkreten Objekts; Stadtteilwerte allein reichen nicht.`,
        },
        {
          question: `Verkauft Immonation Immobilien in ${district}?`,
          answer: `Ja. Immonation begleitet Häuser, Wohnungen, Grundstücke und Mehrfamilienhäuser in ${cityName} und ordnet die jeweilige Mikrolage ein.`,
        },
        {
          question: 'Ist die Immobilienbewertung kostenlos?',
          answer:
            'Die Ersteinschätzung für Eigentümer mit Verkaufsinteresse ist kostenlos und unverbindlich.',
        },
      ],
    }
  }

  return {
    title: `Property prices in ${district}, ${cityName}`,
    description: `Property valuation and sales in ${district}: micro-location, condition, and demand in the context of ${cityName}.`,
    lede: `A city-wide average for ${cityName} is not enough for a property in ${district}. Street, immediate surroundings, property type, age, and modernisation determine a reliable assessment.`,
    answer: `Immonation values property in ${district} on site and compares it with relevant sales in ${cityName}. This district page provides context; the final pricing strategy starts with the property and its micro-location.`,
    sections: [
      {
        title: `Micro-location in ${district}`,
        text: `We review the specific street, immediate setting, and routes relevant to buyers. Nearby areas such as ${displayName(previous ?? '')} and ${displayName(next ?? '')} are compared only where property type and location quality genuinely match.`,
      },
      {
        title: 'Weighting property characteristics',
        text: 'Living area, land, floor, condition, energy performance, parking, and usable outside space explain why two properties in the same district achieve different outcomes.',
      },
      {
        title: 'From location context to sales strategy',
        text: `For ${district}, valuation, complete documents, target audiences, and launch timing are coordinated. General square-metre figures remain only a starting point.`,
      },
      ...districtPriceSections(priceEntries, 'en', district, formatPrice),
    ],
    faq: [
      {
        question: `What does property cost in ${district}?`,
        answer:
          'It depends on the street, property type, condition, and specification. A reliable range requires review of the specific property.',
      },
      {
        question: `Does Immonation sell property in ${district}?`,
        answer: `Yes. Immonation supports sales of houses, apartments, land, and apartment buildings across ${cityName}, including micro-location assessment.`,
      },
      {
        question: 'Is the property valuation free?',
        answer: 'The initial assessment for owners considering a sale is free and non-binding.',
      },
    ],
  }
}

function districtPriceSections(
  entries: ReturnType<typeof findEntriesByDistrictSlug>,
  locale: 'de' | 'en',
  district: string,
  formatPrice: Intl.NumberFormat,
) {
  if (entries.length === 0) return []

  const text = entries
    .map((entry) => {
      const category =
        locale === 'de'
          ? entry.category === 'apartment'
            ? 'Eigentumswohnungen'
            : 'Häuser'
          : entry.category === 'apartment'
            ? 'Apartments'
            : 'Houses'
      const range = `${formatPrice.format(entry.low)}–${formatPrice.format(entry.high)} pro m²`
      const median = formatPrice.format(entry.median)

      return locale === 'de'
        ? `${category}: ${range}, Median ${median}, ausgewertet aus ${entry.sampleSize} Vermittlungsfällen.`
        : `${category}: ${range}, median ${median}, evaluated from ${entry.sampleSize} brokerage cases.`
    })
    .join(' ')

  return [
    {
      title: locale === 'de' ? `Preisspannen in ${district}` : `Price ranges in ${district}`,
      text:
        locale === 'de'
          ? `${text} Quelle: basierend auf Vermittlungsdaten der Immonation. Die Werte dienen der Orientierung und ersetzen keine Objektbewertung.`
          : `${text} Source: based on Immonation brokerage data. These figures provide context and do not replace a property valuation.`,
    },
  ]
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.entries(DISTRICTS).flatMap(([city, districts]) =>
      districts.map((slug) => ({ locale, city, slug })),
    ),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string }>
}): Promise<Metadata> {
  const { locale, city, slug } = await params
  if (!hasLocale(routing.locales, locale) || !isCity(city) || !hasDistrict(city, slug)) notFound()
  const content = getDistrictContext(city, slug, locale)
  const routeRecord = getRouteById(`district:${city}:${slug}`)
  if (!routeRecord) notFound()
  return buildMetadata({
    locale,
    path: routeRecord.internal,
    localizedPaths: routeRecord.paths,
    title: `${content.title} | Immonation`,
    description: content.description,
    noindex: isRouteNoindex(routeRecord),
  })
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ locale: string; city: string; slug: string }>
}) {
  const { locale, city, slug } = await params
  if (!hasLocale(routing.locales, locale) || !isCity(city) || !hasDistrict(city, slug)) notFound()
  setRequestLocale(locale)
  const content = getDistrictContext(city, slug, locale)
  const routeRecord = getRouteById(`district:${city}:${slug}`)
  if (!routeRecord) notFound()
  const url = `${SITE.url}/${locale}${routeRecord.paths[locale]}`

  return (
    <>
      <JsonLd
        data={[
          breadcrumbList([
            { name: locale === 'de' ? 'Start' : 'Home', url: `${SITE.url}/${locale}` },
            {
              name: CITY_NAMES[city],
              url: `${SITE.url}/${locale}${getRouteById(`city:${city}`)?.paths[locale] ?? ''}`,
            },
            { name: displayName(slug), url },
          ]),
          service({
            locale,
            url,
            name: content.title,
            description: content.description,
            areaServed: `${displayName(slug)}, ${CITY_NAMES[city]}`,
          }),
          faqPage(content.faq),
        ]}
      />
      <CatalogPage
        eyebrow={
          locale === 'de' ? `Stadtteil · ${CITY_NAMES[city]}` : `District · ${CITY_NAMES[city]}`
        }
        title={content.title}
        lede={content.lede}
        answer={content.answer}
        sections={content.sections}
        faq={content.faq}
        cta={{
          title:
            locale === 'de'
              ? `Immobilie in ${displayName(slug)} bewerten`
              : `Value property in ${displayName(slug)}`,
          text:
            locale === 'de'
              ? 'Kostenlos und unverbindlich starten.'
              : 'Start free and without obligation.',
          label: locale === 'de' ? 'Bewertung starten' : 'Start valuation',
          href: '/property-valuation',
        }}
      />
    </>
  )
}
