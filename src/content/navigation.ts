import type { ComponentProps } from 'react'
import type { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'

export type NavigationHref = ComponentProps<typeof Link>['href']
export type NavigationIcon =
  | 'award'
  | 'banknote'
  | 'book'
  | 'bot'
  | 'briefcase'
  | 'building'
  | 'calculator'
  | 'calendar'
  | 'chart'
  | 'circle-help'
  | 'download'
  | 'heart'
  | 'home'
  | 'key'
  | 'landmark'
  | 'map'
  | 'newspaper'
  | 'ruler'
  | 'search'
  | 'shield'
  | 'sparkles'
  | 'star'
  | 'users'
  | 'video'

type LocalizedText = Record<Locale, string>
type LocalizedHref = NavigationHref | Record<Locale, NavigationHref>

export type NavigationLink = {
  id: string
  label: string
  description: string
  href: NavigationHref
  icon: NavigationIcon
  hiddenFromList?: boolean
}

export type NavigationGroup = {
  id: string
  label: string
  links: NavigationLink[]
  highlightId: string
  footer: { text: string; label: string; href: NavigationHref }
}

type NavigationLinkDefinition = Omit<NavigationLink, 'label' | 'description' | 'href'> & {
  label: LocalizedText
  description: LocalizedText
  href: LocalizedHref
}

type NavigationGroupDefinition = Omit<NavigationGroup, 'label' | 'links' | 'footer'> & {
  label: LocalizedText
  links: NavigationLinkDefinition[]
  footer: { text: LocalizedText; label: LocalizedText; href: LocalizedHref }
}

const text = (de: string, en: string): LocalizedText => ({ de, en })
const localizedHref = (de: NavigationHref, en: NavigationHref): Record<Locale, NavigationHref> => ({
  de,
  en,
})

const DEFINITIONS: NavigationGroupDefinition[] = [
  {
    id: 'sell',
    label: text('Ich will verkaufen', 'I want to sell'),
    highlightId: 'valuation',
    links: [
      link(
        'valuation',
        'Was ist meine Immobilie wert?',
        'What is my property worth?',
        'Kostenlose Bewertung – in 3 Minuten',
        'Free valuation — in three minutes',
        '/property-valuation',
        'calculator',
      ),
      link(
        'sell',
        'So verkaufen wir',
        'How we sell',
        'Der 10-Schritte-Prozess',
        'Our ten-step process',
        '/sell',
        'home',
      ),
      link(
        'situations',
        'Meine Situation',
        'My situation',
        'Trennung, Erbe, Notlage & mehr',
        'Separation, inheritance, hardship and more',
        '/selling-situations',
        'heart',
      ),
      link(
        'price-atlas',
        'Preisatlas',
        'Price atlas',
        'Preise nach Stadtteil ansehen',
        'Explore prices by district',
        '/price-atlas',
        'chart',
      ),
      link(
        'appointment',
        'Erstgespräch buchen',
        'Book an initial call',
        'Kostenlos & unverbindlich',
        'Free and non-binding',
        '/appointment',
        'calendar',
      ),
      link(
        'house',
        'Haus verkaufen',
        'Sell a house',
        'Grundstück, Energie, Familie',
        'Land, energy and family needs',
        localizedHref(
          { pathname: '/sell/[slug]', params: { slug: 'haus' } },
          { pathname: '/sell/[slug]', params: { slug: 'house' } },
        ),
        'home',
      ),
      link(
        'apartment',
        'Wohnung verkaufen',
        'Sell an apartment',
        'WEG, Teilungserklärung',
        'Owners association and declaration of division',
        localizedHref(
          { pathname: '/sell/[slug]', params: { slug: 'wohnung' } },
          { pathname: '/sell/[slug]', params: { slug: 'apartment' } },
        ),
        'building',
      ),
      link(
        'land',
        'Grundstück verkaufen',
        'Sell land',
        'Baurecht & Bodenrichtwert',
        'Planning law and standard land value',
        localizedHref(
          { pathname: '/sell/[slug]', params: { slug: 'grundstueck' } },
          { pathname: '/sell/[slug]', params: { slug: 'land' } },
        ),
        'map',
      ),
      link(
        'apartment-building',
        'Mehrfamilienhaus verkaufen',
        'Sell an apartment building',
        'Faktor & Rendite',
        'Multiplier and yield',
        localizedHref(
          { pathname: '/sell/[slug]', params: { slug: 'mehrfamilienhaus' } },
          { pathname: '/sell/[slug]', params: { slug: 'apartment-building' } },
        ),
        'landmark',
      ),
      link(
        'living-area',
        'Wohnfläche & Grundrisse',
        'Living area & floor plans',
        'Unser Ingenieur misst auf',
        'Surveyed by our in-house engineer',
        '/floor-plans',
        'ruler',
      ),
      link(
        'active-buyers',
        'Aktive Suchkunden',
        'Active buyers',
        'Sucht jemand Ihre Immobilie?',
        'Is someone looking for your property?',
        '/buyer-search',
        'search',
      ),
      link(
        'virtual',
        'Virtuelle Besichtigung',
        'Virtual viewing',
        '360°-Rundgang für Ihr Objekt',
        'A 360° tour for your property',
        '/virtual-tour',
        'video',
      ),
      link(
        'ai',
        'Immobilien-KI',
        'Property AI',
        'Assistent & Käufer-Matching',
        'Assistant and buyer matching',
        '/ai',
        'bot',
      ),
      link(
        'warning-signs',
        'Warnsignale',
        'Warning signs',
        'Unseriöse Makler erkennen',
        'Recognise unreliable agents',
        '/sale-warning-signs',
        'shield',
      ),
      link(
        'referrers-sell',
        'Tippgeber',
        'Referrers',
        'Jemanden empfehlen, der verkauft',
        'Refer someone who wants to sell',
        '/referrers',
        'users',
      ),
    ],
    footer: {
      text: text(
        'Bewertung, Vorbereitung und Verkauf – klar geführt von einem lokalen Team.',
        'Valuation, preparation and sale — clearly guided by a local team.',
      ),
      label: text('So verkaufen wir', 'How we sell'),
      href: '/sell',
    },
  },
  {
    id: 'buy',
    label: text('Ich will kaufen', 'I want to buy'),
    highlightId: 'properties',
    links: [
      link(
        'properties',
        'Aktuelle Objekte',
        'Current properties',
        'Suche mit PLZ & Filter',
        'Search by postcode and filters',
        '/buy',
        'key',
      ),
      link(
        'financing',
        'Baufinanzierung',
        'Property financing',
        'Dr. Klein · Stefan Vogelsang',
        'Dr. Klein · Stefan Vogelsang',
        '/financing',
        'banknote',
      ),
    ],
    footer: {
      text: text(
        'Angebot und Finanzierung früh zusammenbringen.',
        'Bring the property and financing together early.',
      ),
      label: text('Finanzierung klären', 'Explore financing'),
      href: '/financing',
    },
  },
  {
    id: 'knowledge',
    label: text('Preise & Wissen', 'Prices & knowledge'),
    highlightId: 'price-atlas-knowledge',
    links: [
      link(
        'market-data',
        'Immobilienpreise & Trends',
        'Property prices & trends',
        'Was 2026 wirklich gezahlt wird',
        'What buyers actually pay in 2026',
        '/market-data',
        'chart',
      ),
      link(
        'market',
        'Immobilienpreise',
        'Property prices',
        '€/m² in der Region',
        'Prices per square metre in the region',
        '/market',
        'banknote',
      ),
      link(
        'cities',
        'Städte & Stadtteile',
        'Cities & districts',
        'Alle Orte im Überblick',
        'All locations at a glance',
        '/locations',
        'map',
      ),
      link(
        'land-value',
        'Bodenrichtwert',
        'Standard land value',
        'Amtliche Lagewerte',
        'Official location values',
        '/land-value',
        'landmark',
      ),
      link(
        'news',
        'Ratgeber & News',
        'Guides & news',
        'Wissen für Eigentümer',
        'Knowledge for property owners',
        '/blog',
        'newspaper',
      ),
      link(
        'glossary',
        'Lexikon A–Z',
        'Glossary A–Z',
        '77 Fachbegriffe erklärt',
        '77 specialist terms explained',
        '/glossary',
        'book',
      ),
      link('faq', 'FAQ', 'FAQ', '45 Antworten', '45 answers', '/faq', 'circle-help'),
      link(
        'downloads',
        'Downloads',
        'Downloads',
        'Checklisten & Formulare',
        'Checklists and forms',
        '/downloads',
        'download',
      ),
      link(
        'price-atlas-knowledge',
        'Preisatlas',
        'Price atlas',
        'Preise nach Stadtteil ansehen',
        'Explore prices by district',
        '/price-atlas',
        'chart',
        true,
      ),
    ],
    footer: {
      text: text(
        'Marktdaten, Erklärungen und Unterlagen für fundierte Entscheidungen.',
        'Market data, explanations and documents for informed decisions.',
      ),
      label: text('Downloads ansehen', 'View downloads'),
      href: '/downloads',
    },
  },
  {
    id: 'company',
    label: text('Immonation', 'Immonation'),
    highlightId: 'references',
    links: [
      link(
        'about',
        'Wer wir sind',
        'Who we are',
        'Inhabergeführt seit 2017, kein Franchise',
        'Owner-managed since 2017, not a franchise',
        '/about',
        'users',
      ),
      link(
        'magazine',
        'REVIER Magazin',
        'REVIER magazine',
        'Echte Verkäufe zum Durchblättern',
        'Real sales to browse',
        '/magazine',
        'book',
      ),
      link(
        'references',
        'Referenzen',
        'References',
        'Echte Kundengeschichten',
        'Real client stories',
        '/references',
        'building',
      ),
      link(
        'sold',
        'Verkaufte Objekte',
        'Sold properties',
        'Das Archiv',
        'The archive',
        '/sold',
        'home',
      ),
      link(
        'reviews',
        'Bewertungen',
        'Reviews',
        '4,9 aus 223',
        '4.9 out of 223',
        '/reviews',
        'star',
      ),
      link(
        'testimonials',
        'Kundenstimmen',
        'Testimonials',
        'Einzeln nachlesen',
        'Read individual stories',
        '/testimonials',
        'heart',
      ),
      link(
        'awards',
        'Auszeichnungen',
        'Awards',
        'TOP Makler 2026',
        'TOP Agent 2026',
        '/awards',
        'award',
      ),
      link(
        'engagement',
        'Engagement',
        'Community',
        'TSV Zirndorf & Uganda',
        'TSV Zirndorf and Uganda',
        '/engagement',
        'heart',
      ),
      link(
        'group',
        'Unternehmensgruppe',
        'Company group',
        '4 Gesellschaften',
        'Four companies',
        '/group',
        'building',
      ),
      link(
        'careers',
        'Karriere',
        'Careers',
        'Makler werden',
        'Become an estate agent',
        '/careers',
        'briefcase',
      ),
      link(
        'partners',
        'Partnermakler',
        'Partner agents',
        'Geprüfte Partner – zwei Modelle',
        'Verified partners — two models',
        '/partners',
        'users',
      ),
      link(
        'referrers-company',
        'Tippgeber',
        'Referrers',
        'Empfehlen & profitieren',
        'Refer and benefit',
        '/referrers',
        'sparkles',
      ),
      link(
        'contact',
        'Kontakt & Anfahrt',
        'Contact & directions',
        'Mo–Fr 9–18 · Sa 10:30–14',
        'Mon–Fri 9–18 · Sat 10:30–14',
        '/contact',
        'map',
      ),
    ],
    footer: {
      text: text(
        'Persönlich, regional und nachvollziehbar erreichbar.',
        'Personal, regional and easy to reach.',
      ),
      label: text('Kontakt aufnehmen', 'Contact us'),
      href: '/contact',
    },
  },
]

function link(
  id: string,
  deLabel: string,
  enLabel: string,
  deDescription: string,
  enDescription: string,
  href: LocalizedHref,
  icon: NavigationIcon,
  hiddenFromList = false,
): NavigationLinkDefinition {
  return {
    id,
    label: text(deLabel, enLabel),
    description: text(deDescription, enDescription),
    href,
    icon,
    hiddenFromList,
  }
}

function resolveHref(href: LocalizedHref, locale: Locale): NavigationHref {
  if (typeof href === 'string' || 'pathname' in href) return href
  return href[locale]
}

export function getNavigation(locale: Locale): NavigationGroup[] {
  return DEFINITIONS.map((group) => ({
    id: group.id,
    label: group.label[locale],
    highlightId: group.highlightId,
    links: group.links.map((item) => ({
      id: item.id,
      label: item.label[locale],
      description: item.description[locale],
      href: resolveHref(item.href, locale),
      icon: item.icon,
      hiddenFromList: item.hiddenFromList,
    })),
    footer: {
      text: group.footer.text[locale],
      label: group.footer.label[locale],
      href: resolveHref(group.footer.href, locale),
    },
  }))
}
