import { PATHNAMES } from '@/i18n/pathnames'
import { REFERENCE_IDS } from '@/lib/content/references'

export type CatalogLocale = 'de' | 'en'
type RoutePhase = 1 | 2 | 3 | 4
type RouteStatus = 'published' | 'noindex' | 'phased' | 'reserved'
type IndexingState = 'index' | 'noindex' | 'excluded'
type ContentStatus = 'substantive' | 'draft' | 'reserved'

export type RouteRecord = {
  id: string
  internal: string
  paths: Record<CatalogLocale, string>
  phase: RoutePhase
  status: RouteStatus
  indexing: IndexingState
  contentStatus: ContentStatus
  priority: number
  changefreq: 'weekly' | 'monthly' | 'yearly'
}

type StaticRouteDefinition = Omit<RouteRecord, 'paths' | 'indexing' | 'contentStatus'> & {
  internal: keyof typeof PATHNAMES
}

const STATIC_ROUTES: StaticRouteDefinition[] = [
  route('home', '/', 1, 'published', 1, 'weekly'),
  route('valuation', '/property-valuation', 1, 'published', 0.9, 'monthly'),
  route('price-atlas', '/price-atlas', 1, 'published', 0.8, 'monthly'),
  route('sell', '/sell', 1, 'published', 0.9, 'monthly'),
  route('selling-situations', '/selling-situations', 1, 'published', 0.8, 'monthly'),
  route('living-area', '/floor-plans', 1, 'published', 0.7, 'monthly'),
  route('buyer-search', '/buyer-search', 1, 'published', 0.7, 'monthly'),
  route('virtual-tour', '/virtual-tour', 1, 'published', 0.7, 'monthly'),
  route('ai', '/ai', 1, 'published', 0.5, 'monthly'),
  route('warning-signs', '/sale-warning-signs', 1, 'published', 0.7, 'monthly'),
  route('referrers', '/referrers', 1, 'published', 0.5, 'monthly'),
  route('appointment', '/appointment', 1, 'published', 0.7, 'monthly'),
  route('properties', '/buy', 1, 'published', 0.8, 'weekly'),
  route('financing', '/financing', 1, 'published', 0.6, 'monthly'),
  route('market-data', '/market-data', 1, 'published', 0.8, 'monthly'),
  route('market', '/market', 1, 'published', 0.7, 'monthly'),
  route('cities', '/locations', 1, 'published', 0.8, 'monthly'),
  route('land-value', '/land-value', 1, 'published', 0.7, 'monthly'),
  route('news', '/blog', 1, 'published', 0.7, 'weekly'),
  route('glossary', '/glossary', 1, 'published', 0.6, 'monthly'),
  route('faq', '/faq', 1, 'published', 0.7, 'monthly'),
  route('downloads', '/downloads', 1, 'published', 0.5, 'monthly'),
  route('about', '/about', 1, 'published', 0.6, 'monthly'),
  route('magazine', '/magazine', 1, 'published', 0.6, 'monthly'),
  route('references', '/references', 1, 'published', 0.8, 'monthly'),
  route('sold', '/sold', 1, 'published', 0.7, 'monthly'),
  route('reviews', '/reviews', 1, 'published', 0.7, 'monthly'),
  route('testimonials', '/testimonials', 1, 'published', 0.7, 'monthly'),
  route('awards', '/awards', 1, 'published', 0.6, 'yearly'),
  route('engagement', '/engagement', 1, 'published', 0.5, 'yearly'),
  route('group', '/group', 1, 'published', 0.5, 'yearly'),
  route('careers', '/careers', 1, 'published', 0.5, 'monthly'),
  route('partners', '/partners', 1, 'published', 0.5, 'monthly'),
  route('contact', '/contact', 1, 'published', 0.7, 'yearly'),
  route('imprint', '/imprint', 1, 'published', 0.3, 'yearly'),
  route('privacy', '/privacy', 1, 'published', 0.3, 'yearly'),
  route('terms', '/terms', 1, 'published', 0.3, 'yearly'),
  route('directions', '/directions', 4, 'published', 0.4, 'yearly'),
  route('staging', '/staging', 1, 'published', 0.7, 'monthly'),
  route('video', '/video', 4, 'published', 0.5, 'monthly'),
  route('social', '/social', 4, 'published', 0.4, 'monthly'),
  route('html-sitemap', '/html-sitemap', 4, 'published', 0.3, 'monthly'),
  route('seo', '/seo', 4, 'noindex', 0, 'yearly'),
]

const PROPERTY_TYPES = [
  ['haus', 'house'],
  ['wohnung', 'apartment'],
  ['grundstueck', 'land'],
  ['mehrfamilienhaus', 'apartment-building'],
] as const

const SITUATIONS = [
  ['trennung', 'separation'],
  ['erbfall', 'inheritance'],
  ['insolvenz', 'insolvency'],
  ['verrentung', 'property-annuity'],
  ['alter-pflege', 'ageing-and-care'],
  ['sanierung', 'renovation'],
  ['kapitalanlage', 'investment-property'],
  ['umzug', 'relocation'],
  ['finanznot', 'financial-distress'],
  ['vollmacht', 'power-of-attorney'],
  ['gewerbe', 'commercial-property'],
  ['leerstand', 'vacancy'],
] as const

const CITIES = ['nuernberg', 'fuerth', 'erlangen', 'zirndorf', 'schwabach'] as const

export const DISTRICTS = {
  nuernberg: [
    'almoshof',
    'altenfurt',
    'baerenschanze',
    'boxdorf',
    'brunn',
    'buch',
    'buchenbuehl',
    'dutzendteich',
    'eberhardshof',
    'eibach',
    'erlenstegen',
    'fischbach',
    'galgenhof',
    'gartenstadt',
    'gebersdorf',
    'gibitzenhof',
    'gleisshammer',
    'gostenhof',
    'grossgruendlach',
    'hasenbuck',
    'hoefen',
    'hohe-marter',
    'katzwang',
    'kornburg',
    'kraftshof',
    'langwasser',
    'laufamholz',
    'leyh',
    'maiach',
    'marienvorstadt',
    'maxfeld',
    'moegeldorf',
    'neunhof',
    'reichelsdorf',
    'rennweg',
    'roethenbach',
    'sandreuth',
    'schafhof',
    'schniegling',
    'schoppershof',
    'st-jobst',
    'st-johannis',
    'st-peter',
    'st-sebald',
    'steinbuehl',
    'suendersbuehl',
    'tafelhof',
    'thon',
    'tullnau',
    'veilhof',
    'werderau',
    'wetzendorf',
    'woehrd',
    'worzeldorf',
    'zabo',
    'zerzabelshof',
    'ziegelstein',
    'zollhaus',
    'suedstadt',
    'kettlersiedlung',
  ],
  fuerth: [
    'altstadt',
    'innenstadt',
    'suedstadt',
    'dambach',
    'burgfarrnbach',
    'poppenreuth',
    'ronhof',
    'stadeln',
    'vach',
    'unterfarrnbach',
    'oberfuerberg',
    'hardhoehe',
    'espan',
    'sack',
    'atzenhof',
  ],
  erlangen: [
    'innenstadt',
    'roethelheimpark',
    'alterlangen',
    'sieglitzhof',
    'bruck',
    'buechenbach',
    'frauenaurach',
    'tennenlohe',
    'eltersdorf',
    'dechsendorf',
    'kosbach',
    'anger',
    'burgberg',
  ],
  zirndorf: [
    'zirndorf-stadt',
    'weiherhof',
    'bronnamberg',
    'wintersdorf',
    'leichendorf',
    'anwanden',
    'banderbach',
    'lind',
  ],
  schwabach: [
    'altstadt',
    'limbach',
    'wolkersdorf',
    'penzendorf',
    'unterreichenbach',
    'dietersdorf',
    'forsthof',
  ],
} as const

const TESTIMONIALS = ['carmen-verwold', 'golocal-nutzer-2022'] as const

function route(
  id: string,
  internal: keyof typeof PATHNAMES,
  phase: RoutePhase,
  status: RouteStatus,
  priority: number,
  changefreq: RouteRecord['changefreq'],
): StaticRouteDefinition {
  return { id, internal, phase, status, priority, changefreq }
}

function localizedTemplate(internal: keyof typeof PATHNAMES, locale: CatalogLocale) {
  const value = PATHNAMES[internal]
  if (typeof value === 'string') return value
  return value[locale]
}

function dynamicRoute(
  id: string,
  internal: keyof typeof PATHNAMES,
  replacements: Record<string, string>,
  localizedReplacements: Partial<Record<CatalogLocale, Record<string, string>>>,
  phase: RoutePhase,
  priority: number,
  status: RouteStatus = 'published',
): RouteRecord {
  const pathFor = (locale: CatalogLocale) => {
    const values = { ...replacements, ...localizedReplacements[locale] }
    return localizedTemplate(internal, locale).replace(
      /\[([^\]]+)\]/g,
      (_, key: string) => values[key] ?? '',
    )
  }

  return {
    id,
    internal,
    paths: { de: pathFor('de'), en: pathFor('en') },
    phase,
    status,
    indexing: status === 'published' ? 'index' : status === 'reserved' ? 'excluded' : 'noindex',
    contentStatus:
      status === 'phased' ? 'draft' : status === 'reserved' ? 'reserved' : 'substantive',
    priority,
    changefreq: 'monthly',
  }
}

function staticRecord(definition: StaticRouteDefinition): RouteRecord {
  return {
    ...definition,
    indexing:
      definition.status === 'published'
        ? 'index'
        : definition.status === 'noindex'
          ? 'noindex'
          : 'excluded',
    contentStatus:
      definition.status === 'reserved'
        ? 'reserved'
        : definition.status === 'phased'
          ? 'draft'
          : 'substantive',
    paths: {
      de: localizedTemplate(definition.internal, 'de'),
      en: localizedTemplate(definition.internal, 'en'),
    },
  }
}

const DYNAMIC_ROUTES: RouteRecord[] = [
  ...PROPERTY_TYPES.map(([de, en]) =>
    dynamicRoute(`property-type:${de}`, '/sell/[slug]', { slug: de }, { en: { slug: en } }, 1, 0.8),
  ),
  ...SITUATIONS.map(([de, en]) =>
    dynamicRoute(
      `situation:${de}`,
      '/situations/[slug]',
      { slug: de },
      { en: { slug: en } },
      2,
      0.8,
    ),
  ),
  ...CITIES.map((city) =>
    dynamicRoute(`city:${city}`, '/locations/[slug]', { slug: city }, {}, 3, 0.8),
  ),
  ...Object.entries(DISTRICTS).flatMap(([city, districts]) =>
    districts.map((slug) =>
      dynamicRoute(
        `district:${city}:${slug}`,
        '/districts/[city]/[slug]',
        { city, slug },
        {},
        3,
        0.7,
        'phased',
      ),
    ),
  ),
  ...TESTIMONIALS.map((slug) =>
    dynamicRoute(`testimonial:${slug}`, '/testimonials/[slug]', { slug }, {}, 4, 0.6),
  ),
  ...REFERENCE_IDS.map((slug) =>
    dynamicRoute(`reference:${slug}`, '/references/[slug]', { slug }, {}, 1, 0.7),
  ),
]

export const ROUTE_CATALOG: readonly RouteRecord[] = [
  ...STATIC_ROUTES.map(staticRecord),
  ...DYNAMIC_ROUTES,
]

export function getRouteById(id: string) {
  return ROUTE_CATALOG.find((routeRecord) => routeRecord.id === id)
}

export function getRouteByPath(locale: CatalogLocale, path: string) {
  return ROUTE_CATALOG.find((routeRecord) => routeRecord.paths[locale] === path)
}

export function listIndexableRoutes() {
  return ROUTE_CATALOG.filter(
    (routeRecord) => routeRecord.status === 'published' && routeRecord.indexing === 'index',
  )
}

/**
 * Single source of truth for the `noindex` value a page hands to `buildMetadata`.
 *
 * `buildMetadata` takes a plain boolean and never consults this catalog, so a page that
 * forgets to pass this stays indexable no matter what its catalog entry says. Route this
 * through one helper rather than re-deriving it per page: the district route and the
 * generic catalog-page route previously branched on different fields (`indexing` vs
 * `status`), which agreed only by accident of the data.
 */
export function isRouteNoindex(routeRecord: Pick<RouteRecord, 'indexing'>) {
  return routeRecord.indexing !== 'index'
}
