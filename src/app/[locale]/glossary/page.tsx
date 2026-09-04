import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { GlossaryFilter } from '@/components/site/glossary/glossary-filter'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { PageHero } from '@/components/site/templates/page-hero'
import { GLOSSARY_ENTRIES } from '@/content/glossary/entries'
import { routing, type Locale } from '@/i18n/routing'
import { listGlossaryEntries } from '@/lib/content/glossary'
import { getRouteById } from '@/lib/routing/route-catalog'
import { breadcrumbList, definedTermSet } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

const COPY = {
  de: {
    eyebrow: 'Immobilienwissen',
    title: 'Immobilienlexikon A–Z',
    lede: 'Fachbegriffe aus Verkauf, Bewertung, Grundbuch und Finanzierung – verständlich, sorgfältig und ohne unnötigen Jargon erklärt.',
    description: `${GLOSSARY_ENTRIES.length} Immobilienbegriffe für Eigentümer und Käufer verständlich erklärt.`,
    all: 'Alle',
    filter: 'Begriffe nach Anfangsbuchstaben filtern',
    filterHint: 'Buchstaben antippen zum Filtern.',
    countSingular: 'Begriff',
    countPlural: 'Begriffe',
    ctaTitle: 'Ein Begriff reicht für Ihre Entscheidung nicht aus?',
    ctaText: 'Wir ordnen Ihre Immobilie und die nächsten Schritte persönlich ein.',
    ctaLabel: 'Kostenlose Bewertung starten',
    home: 'Start',
  },
  en: {
    eyebrow: 'Property knowledge',
    title: 'Property glossary A–Z',
    lede: 'Terms from sales, valuation, land registration, and finance—explained carefully in clear language.',
    description: `${GLOSSARY_ENTRIES.length} property terms explained clearly for owners and buyers.`,
    all: 'All',
    filter: 'Filter terms by first letter',
    filterHint: 'Tap a letter to filter.',
    countSingular: 'term',
    countPlural: 'terms',
    ctaTitle: 'Need more than a definition to make your decision?',
    ctaText: 'We assess your property and next steps personally.',
    ctaLabel: 'Start a free valuation',
    home: 'Home',
  },
} satisfies Record<Locale, object>

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
  const copy = COPY[locale]
  return buildMetadata({
    locale,
    path: '/glossary',
    localizedPaths: { de: '/lexikon', en: '/glossary' },
    title: `${copy.title} | Immonation`,
    description: copy.description,
  })
}

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const copy = COPY[locale]
  const entries = listGlossaryEntries(locale)
  const route = getRouteById('glossary')
  if (!route) notFound()
  const pageUrl = `${SITE.url}/${locale}${route.paths[locale]}`
  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: copy.home, url: `${SITE.url}/${locale}` },
            { name: copy.title, url: pageUrl },
          ]),
          definedTermSet({
            locale,
            url: pageUrl,
            name: copy.title,
            description: copy.description,
            terms: entries.map(({ term, definition }) => ({ name: term, description: definition })),
          }),
        ]}
      />
      <PageHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <GlossaryFilter
        entries={entries}
        allLabel={copy.all}
        filterLabel={copy.filter}
        filterHint={copy.filterHint}
        countSingular={copy.countSingular}
        countPlural={copy.countPlural}
      />
      <CtaBand
        title={copy.ctaTitle}
        text={copy.ctaText}
        primary={{ label: copy.ctaLabel, href: '/property-valuation' }}
      />
    </main>
  )
}
