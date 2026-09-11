import type { Locale } from '@/i18n/routing'

export type ReferencePropertyType =
  'apartment' | 'house' | 'semi-detached' | 'townhouse' | 'apartment-building' | 'commercial'

export type ReferenceCategory = 'apartment' | 'house' | 'commercial' | 'investment'

export type LocalizedText = Record<Locale, string>

type ReferenceSeed = {
  id: string
  sourceFolder: string
  citySlug: string
  city: LocalizedText
  area: LocalizedText
  type: ReferencePropertyType
  typeLabel: LocalizedText
  title: LocalizedText
  feature: LocalizedText
  tags: readonly string[]
}

type ReferenceNarrative = {
  startingPoint: LocalizedText
  challenge: LocalizedText
  approach: LocalizedText
  outcome: LocalizedText
}

export type ReferenceMetricSet = {
  inquiries?: string
  requests?: string
  viewings?: string
  duration?: string
  resultValue?: string
  approved: boolean
}

export type ReferenceReview = {
  reviewer: string
  rating: 4 | 5
  date: LocalizedText
  quote: LocalizedText
  screenshot: {
    src: string
    width: number
    height: number
    alt: LocalizedText
  }
}

export type ReferenceMediaAsset = {
  src: string
  width: number
  height: number
  alt: LocalizedText
  caption: LocalizedText
}

export type ReferencePublication = {
  state: 'published' | 'held'
  locationPrecision: 'city' | 'city-area'
  copyApproved: boolean
  imagesApproved: boolean
  locationApproved: boolean
  outcomeApproved: boolean
  metricsApproved: boolean
  rightsApproved: boolean
  lastReviewed: string
}

export type ReferenceRecord = Omit<ReferenceSeed, 'id'> & {
  id: ReferenceId
  slug: string
  propertyType: ReferencePropertyType
  category: ReferenceCategory
  categoryLabel: LocalizedText
  region: LocalizedText
  description: LocalizedText
  narrative: ReferenceNarrative
  media: readonly [ReferenceMediaAsset, ReferenceMediaAsset, ReferenceMediaAsset]
  metrics?: ReferenceMetricSet
  review?: ReferenceReview
  provenance: {
    sourceFiles: readonly string[]
    notes: string
    draftedCase?: string
    reviewLabel?: string
  }
  publication: ReferencePublication
}

const REGION = {
  de: 'Metropolregion Nürnberg',
  en: 'Nuremberg metropolitan region',
} satisfies LocalizedText

export const REFERENCE_CATEGORY_LABELS = {
  apartment: { de: 'Wohnung', en: 'Apartment' },
  house: { de: 'Haus', en: 'House' },
  commercial: { de: 'Gewerbe', en: 'Commercial' },
  investment: { de: 'Investment', en: 'Investment' },
} as const satisfies Record<ReferenceCategory, LocalizedText>

function categoryForPropertyType(type: ReferencePropertyType): ReferenceCategory {
  switch (type) {
    case 'apartment':
      return 'apartment'
    case 'house':
    case 'semi-detached':
    case 'townhouse':
      return 'house'
    case 'commercial':
      return 'commercial'
    case 'apartment-building':
      return 'investment'
  }
}

const city = (de: string, en = de): LocalizedText => ({ de, en })

/**
 * Stable public IDs are the compatibility layer. Source folders are kept
 * separately so street addresses never leak into public copy.
 */
const REFERENCE_SEEDS = [
  {
    id: 'deining-neubauwohnung',
    sourceFolder: 'Deining/ETW Bürgermeister Keckl Str',
    citySlug: 'deining',
    city: city('Deining'),
    area: city('Deining'),
    type: 'apartment',
    typeLabel: city('Wohnung', 'Apartment'),
    title: city('Neubauwohnung in Deining', 'New-build apartment in Deining'),
    feature: city('Neubauqualität und Außenbereich', 'New-build quality and outdoor space'),
    tags: ['new-build', 'energy-efficiency', 'terrace'],
  },
  {
    id: 'erlangen-eigentumswohnung',
    sourceFolder: 'Erlangen/ETW Luise Kisselbach Str',
    citySlug: 'erlangen',
    city: city('Erlangen'),
    area: city('Erlangen'),
    type: 'apartment',
    typeLabel: city('Eigentumswohnung', 'Condominium'),
    title: city('Eigentumswohnung in Erlangen', 'Condominium in Erlangen'),
    feature: city('Stadtlage und klare Positionierung', 'Urban location and clear positioning'),
    tags: ['city', 'owner-occupier', 'buyer-qualification'],
  },
  {
    id: 'forchheim-eigentumswohnung',
    sourceFolder: 'Forchheim/ETW Spieläcker Str',
    citySlug: 'forchheim',
    city: city('Forchheim'),
    area: city('Buckenhofen'),
    type: 'apartment',
    typeLabel: city('Eigentumswohnung', 'Condominium'),
    title: city('Eigentumswohnung in Forchheim', 'Condominium in Forchheim'),
    feature: city('Ruhige Wohnlage für Familien', 'Quiet family-friendly setting'),
    tags: ['family', 'regional', 'presentation'],
  },
  {
    id: 'forchheim-reihenhaus',
    sourceFolder: 'Forchheim/Townhouse Katzensteinstraße',
    citySlug: 'forchheim',
    city: city('Forchheim'),
    area: city('Forchheim'),
    type: 'townhouse',
    typeLabel: city('Townhouse'),
    title: city('Townhouse in Forchheim', 'Townhouse in Forchheim'),
    feature: city('Modernes Wohnkonzept', 'Modern living concept'),
    tags: ['family', 'townhouse', 'viewings'],
  },
  {
    id: 'fuerth-altbauwohnung',
    sourceFolder: 'Fürth/ETW Kellermannstraße',
    citySlug: 'fuerth',
    city: city('Fürth'),
    area: city('Fürther Südstadt', 'Fürth Südstadt'),
    type: 'apartment',
    typeLabel: city('Altbauwohnung', 'Period apartment'),
    title: city('Altbauwohnung in Fürth', 'Period apartment in Fürth'),
    feature: city('Historischer Charakter', 'Period character'),
    tags: ['period-property', 'editorial', 'city'],
  },
  {
    id: 'fuerth-renovierte-wohnung',
    sourceFolder: 'Fürth/ETW Ludwigstraße',
    citySlug: 'fuerth',
    city: city('Fürth'),
    area: city('Fürth'),
    type: 'apartment',
    typeLabel: city('Renovierte Wohnung', 'Renovated apartment'),
    title: city('Renovierte Wohnung in Fürth', 'Renovated apartment in Fürth'),
    feature: city('Sanierter Bestand', 'Renovated existing property'),
    tags: ['renovated', 'repositioning', 'apartment'],
  },
  {
    id: 'fuerth-versorgungszentrum',
    sourceFolder: 'Fürth/Medizinisches Versorgungszentrum Fürth',
    citySlug: 'fuerth',
    city: city('Fürth'),
    area: city('Fürth'),
    type: 'commercial',
    typeLabel: city('Medizinisches Versorgungszentrum', 'Medical centre'),
    title: city('Medizinisches Versorgungszentrum in Fürth', 'Medical centre in Fürth'),
    feature: city('Spezialimmobilie für Investoren', 'Specialist investment property'),
    tags: ['investment', 'commercial', 'discreet-marketing'],
  },
  {
    id: 'fuerth-mehrfamilienhaus',
    sourceFolder: 'Fürth/MFH Ottostraße',
    citySlug: 'fuerth',
    city: city('Fürth'),
    area: city('Fürth'),
    type: 'apartment-building',
    typeLabel: city('Mehrfamilienhaus', 'Apartment building'),
    title: city('Mehrfamilienhaus in Fürth', 'Apartment building in Fürth'),
    feature: city(
      'Kapitalanlage mit Entwicklungspotenzial',
      'Investment with development potential',
    ),
    tags: ['investment', 'heritage', 'rental-income'],
  },
  {
    id: 'heroldsbach-mehrfamilienhaus',
    sourceFolder: 'Heroldsbach/ZFH Am Vogelherd',
    citySlug: 'heroldsbach',
    city: city('Heroldsbach'),
    area: city('Heroldsbach'),
    type: 'apartment-building',
    typeLabel: city('Zweifamilienhaus', 'Two-family home'),
    title: city('Zweifamilienhaus in Heroldsbach', 'Two-family home in Heroldsbach'),
    feature: city('Flexible Nutzung für zwei Parteien', 'Flexible use for two households'),
    tags: ['multi-generation', 'owner-occupier', 'investment'],
  },
  {
    id: 'langenzenn-terrassenwohnung',
    sourceFolder: 'Langenzenn/ETW Lenzenstraße',
    citySlug: 'langenzenn',
    city: city('Langenzenn'),
    area: city('Langenzenn'),
    type: 'apartment',
    typeLabel: city('Terrassenwohnung', 'Terrace apartment'),
    title: city('Terrassenwohnung in Langenzenn', 'Terrace apartment in Langenzenn'),
    feature: city('Terrasse und Wohnqualität', 'Terrace and living quality'),
    tags: ['terrace', 'owner-occupier', 'qualified-viewings'],
  },
  {
    id: 'nuernberg-einfamilienhaus',
    sourceFolder: 'Nürnberg/EFH Seidelbastweg',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Nürnberg', 'Nuremberg'),
    type: 'house',
    typeLabel: city('Einfamilienhaus', 'Single-family home'),
    title: city('Einfamilienhaus in Nürnberg', 'Single-family home in Nuremberg'),
    feature: city('Flexibles Raumangebot', 'Flexible space'),
    tags: ['family', 'house', 'presentation'],
  },
  {
    id: 'nuernberg-eigentumswohnung',
    sourceFolder: 'Nürnberg/ETW Stabiusstraße',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Rennweg'),
    type: 'apartment',
    typeLabel: city('Eigentumswohnung', 'Condominium'),
    title: city('Eigentumswohnung in Nürnberg', 'Condominium in Nuremberg'),
    feature: city('Renovierte Stadtwohnung', 'Renovated city apartment'),
    tags: ['city', 'renovated', 'buyer-qualification'],
  },
  {
    id: 'nuernberg-reihenendhaus',
    sourceFolder: 'Nürnberg/REH Siebenbürger Str',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Zerzabelshof'),
    type: 'townhouse',
    typeLabel: city('Reihenendhaus', 'End-of-terrace home'),
    title: city('Reihenendhaus in Nürnberg', 'End-of-terrace home in Nuremberg'),
    feature: city('Kino, Sauna und gehobene Ausstattung', 'Cinema, sauna and elevated finishes'),
    tags: ['family', 'lifestyle', 'video-marketing'],
  },
  {
    id: 'oberasbach-einfamilienhaus',
    sourceFolder: 'Oberasbach/EFH Bucher Straße',
    citySlug: 'oberasbach',
    city: city('Oberasbach'),
    area: city('Petershöhe'),
    type: 'house',
    typeLabel: city('Einfamilienhaus', 'Single-family home'),
    title: city('Einfamilienhaus in Oberasbach', 'Single-family home in Oberasbach'),
    feature: city('Grundstück mit Einliegerwohnung', 'Plot with annex'),
    tags: ['family', 'annex', 'large-plot'],
  },
  {
    id: 'zirndorf-gartenwohnung',
    sourceFolder: 'Zirndorf/Vogelherdstraße',
    citySlug: 'zirndorf',
    city: city('Zirndorf'),
    area: city('Weiherhof'),
    type: 'apartment',
    typeLabel: city('Gartenwohnung', 'Garden apartment'),
    title: city('Gartenwohnung in Zirndorf', 'Garden apartment in Zirndorf'),
    feature: city('Garten und Terrasse', 'Garden and terrace'),
    tags: ['new-build', 'garden', 'terrace'],
  },
  {
    id: 'adelsdorf-reuthseering',
    sourceFolder: 'Adelsdorf/RMH - Reuthseering',
    citySlug: 'adelsdorf',
    city: city('Adelsdorf'),
    area: city('Adelsdorf'),
    type: 'townhouse',
    typeLabel: city('Reihenmittelhaus', 'Mid-terrace home'),
    title: city('Reihenmittelhaus in Adelsdorf', 'Mid-terrace home in Adelsdorf'),
    feature: city('Familiengerechtes Wohnen', 'Family-oriented living'),
    tags: ['family', 'regional', 'house'],
  },
  {
    id: 'nuernberg-willy-wunder',
    sourceFolder: 'Nürnberg/DHH Willy Wunder Str',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Nürnberg', 'Nuremberg'),
    type: 'semi-detached',
    typeLabel: city('Doppelhaushälfte', 'Semi-detached home'),
    title: city('Doppelhaushälfte in Nürnberg', 'Semi-detached home in Nuremberg'),
    feature: city('Hausverkauf mit klarer Zielgruppe', 'House sale with a clear target group'),
    tags: ['family', 'house', 'regional'],
  },
  {
    id: 'nuernberg-neutrograben',
    sourceFolder: 'Nürnberg/ETW Neutrograben',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Nürnberger Altstadt', 'Nuremberg Old Town'),
    type: 'apartment',
    typeLabel: city('Eigentumswohnung', 'Condominium'),
    title: city('Eigentumswohnung in Nürnbergs Altstadt', 'Condominium in Nuremberg Old Town'),
    feature: city('Zentrale Stadtlage', 'Central urban setting'),
    tags: ['city', 'owner-occupier', 'apartment'],
  },
  {
    id: 'nuernberg-zuericher-52',
    sourceFolder: 'Nürnberg/ETW Züricher Str 52',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Nürnberg Südost', 'Nuremberg southeast'),
    type: 'apartment',
    typeLabel: city('Eigentumswohnung', 'Condominium'),
    title: city('Eigentumswohnung in Nürnberg Südost', 'Condominium in southeast Nuremberg'),
    feature: city('Alltagstauglicher Grundriss', 'Practical layout'),
    tags: ['city', 'apartment', 'presentation'],
  },
  {
    id: 'nuernberg-zuericher-40',
    sourceFolder: 'Nürnberg/ETW Züricher Str. 40',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Nürnberg Südost', 'Nuremberg southeast'),
    type: 'apartment',
    typeLabel: city('Eigentumswohnung', 'Condominium'),
    title: city('Eigentumswohnung in Nürnberg Südost', 'Condominium in southeast Nuremberg'),
    feature: city('Wohnung mit klarer Präsentation', 'Apartment with clear presentation'),
    tags: ['city', 'apartment', 'buyer-qualification'],
  },
  {
    id: 'nuernberg-haderastrasse',
    sourceFolder: 'Nürnberg/RMH Haderastraße',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Nürnberg', 'Nuremberg'),
    type: 'townhouse',
    typeLabel: city('Reihenmittelhaus', 'Mid-terrace home'),
    title: city('Reihenmittelhaus in Nürnberg', 'Mid-terrace home in Nuremberg'),
    feature: city('Strukturiert vermarktet', 'Structured marketing'),
    tags: ['family', 'house', 'regional'],
  },
  {
    id: 'nuernberg-woernitzstrasse',
    sourceFolder: 'Nürnberg/RMH Wörnitzstraße',
    citySlug: 'nuernberg',
    city: city('Nürnberg', 'Nuremberg'),
    area: city('Nürnberg', 'Nuremberg'),
    type: 'townhouse',
    typeLabel: city('Reihenmittelhaus', 'Mid-terrace home'),
    title: city('Reihenmittelhaus in Nürnberg', 'Mid-terrace home in Nuremberg'),
    feature: city('Familiengerechte Wohnlage', 'Family-oriented setting'),
    tags: ['family', 'house', 'regional'],
  },
  {
    id: 'schwabach-abenberger',
    sourceFolder: 'Schwabach/ETW Abenberger Straße',
    citySlug: 'schwabach',
    city: city('Schwabach'),
    area: city('Schwabach'),
    type: 'apartment',
    typeLabel: city('Eigentumswohnung', 'Condominium'),
    title: city('Eigentumswohnung in Schwabach', 'Condominium in Schwabach'),
    feature: city('Wohnung mit regionaler Nachfrage', 'Apartment with regional demand'),
    tags: ['regional', 'apartment', 'owner-occupier'],
  },
  {
    id: 'zirndorf-carl-benz',
    sourceFolder: 'Zirndorf/Carl Benz Straße',
    citySlug: 'zirndorf',
    city: city('Zirndorf'),
    area: city('Zirndorf'),
    type: 'townhouse',
    typeLabel: city('Reihenmittelhaus', 'Mid-terrace home'),
    title: city('Reihenmittelhaus in Zirndorf', 'Mid-terrace home in Zirndorf'),
    feature: city('Regional vermarktet', 'Marketed regionally'),
    tags: ['regional', 'house', 'family'],
  },
  {
    id: 'zirndorf-gutenbergstrasse',
    sourceFolder: 'Zirndorf/Gutenbergstraße',
    citySlug: 'zirndorf',
    city: city('Zirndorf'),
    area: city('Zirndorf'),
    type: 'townhouse',
    typeLabel: city('Reihenmittelhaus', 'Mid-terrace home'),
    title: city('Reihenmittelhaus in Zirndorf', 'Mid-terrace home in Zirndorf'),
    feature: city('Wertige Wohnpräsentation', 'High-quality residential presentation'),
    tags: ['family', 'house', 'presentation'],
  },
  {
    id: 'zirndorf-homburger',
    sourceFolder: 'Zirndorf/Homburger Str',
    citySlug: 'zirndorf',
    city: city('Zirndorf'),
    area: city('Zirndorf'),
    type: 'house',
    typeLabel: city('Einfamilienhaus', 'Single-family home'),
    title: city('Einfamilienhaus in Zirndorf', 'Single-family home in Zirndorf'),
    feature: city('Haus mit persönlicher Beratung', 'Home with personal guidance'),
    tags: ['family', 'house', 'regional'],
  },
  {
    id: 'zirndorf-marienbader',
    sourceFolder: 'Zirndorf/Marienbader Str',
    citySlug: 'zirndorf',
    city: city('Zirndorf'),
    area: city('Zirndorf'),
    type: 'house',
    typeLabel: city('Einfamilienhaus', 'Single-family home'),
    title: city('Einfamilienhaus in Zirndorf', 'Single-family home in Zirndorf'),
    feature: city('Klar positionierter Hausverkauf', 'Clearly positioned house sale'),
    tags: ['family', 'house', 'regional'],
  },
  {
    id: 'herzogenaurach-schuetzengraben',
    sourceFolder: 'Herzogenaurach/Schützengraben',
    citySlug: 'herzogenaurach',
    city: city('Herzogenaurach'),
    area: city('Herzogenaurach'),
    type: 'house',
    typeLabel: city('Einfamilienhaus', 'Single-family home'),
    title: city('Einfamilienhaus in Herzogenaurach', 'Single-family home in Herzogenaurach'),
    feature: city('Präzise lokale Positionierung', 'Precise local positioning'),
    tags: ['family', 'house', 'regional'],
  },
  {
    id: 'hagenbuechach-hausaeckern',
    sourceFolder: 'Hagenbüchach/An den Hausäckern',
    citySlug: 'hagenbuechach',
    city: city('Hagenbüchach'),
    area: city('Hagenbüchach'),
    type: 'house',
    typeLabel: city('Einfamilienhaus', 'Single-family home'),
    title: city('Einfamilienhaus in Hagenbüchach', 'Single-family home in Hagenbüchach'),
    feature: city('Regional und persönlich begleitet', 'Regionally supported and personal'),
    tags: ['family', 'house', 'regional'],
  },
] as const

export type ReferenceId = (typeof REFERENCE_SEEDS)[number]['id']

const sourceFilesById: Record<ReferenceId, readonly string[]> = {
  'adelsdorf-reuthseering': ['_DSC2868.JPG', '_DSC2873.JPG', '_DSC2889.JPG'],
  'deining-neubauwohnung': ['10.png', '11.jpg', '8.png'],
  'erlangen-eigentumswohnung': ['_DSC3092.JPG', '_DSC3112.JPG', '_DSC3124.JPG'],
  'forchheim-eigentumswohnung': ['_DSC2361.JPG', '_DSC2369.JPG', '_DSC2378.JPG'],
  'forchheim-reihenhaus': ['_DSC2205.JPG', '_DSC2243.JPG', '_DSC2244.JPG'],
  'fuerth-altbauwohnung': ['_DSC0193.JPG', '_DSC0204.JPG', '_DSC0209.JPG'],
  'fuerth-renovierte-wohnung': ['_DSC4063.jpg', '_DSC4068.jpg', '_DSC4073.jpg'],
  'fuerth-versorgungszentrum': ['_DSC0487.JPG', '_DSC0489.JPG', 'IMG_4728.JPG'],
  'fuerth-mehrfamilienhaus': ['_DSC2828.JPG', '_DSC2833.JPG', '_DSC2845.JPG'],
  'hagenbuechach-hausaeckern': ['_DSC7081.jpg', '_DSC7141.jpg', 'DJI_0084.jpg'],
  'heroldsbach-mehrfamilienhaus': ['_DSC3863.jpg', '_DSC3864.jpg', '_DSC3877.jpg'],
  'herzogenaurach-schuetzengraben': ['_DSC2571.JPG', '666666666666666.JPG', '88888888888888.JPG'],
  'langenzenn-terrassenwohnung': ['1111111.JPG', '11111111.JPG', '9999999.JPG'],
  'nuernberg-willy-wunder': ['_DSC8986.jpg', '_DSC8987.jpg', '_DSC9035-HDR.jpg'],
  'nuernberg-einfamilienhaus': ['_DSC3904.jpg', '_DSC3946.jpg', 'DJI_0028-2.jpg'],
  'nuernberg-neutrograben': ['_DSC1460.JPG', '_DSC1466.JPG', '_DSC1492.JPG'],
  'nuernberg-eigentumswohnung': ['_DSC6008.jpg', '_DSC6043.jpg', '_DSC6056.jpg'],
  'nuernberg-zuericher-52': ['_DSC4489.jpg', '_DSC4500.jpg', '_DSC4509.jpg'],
  'nuernberg-zuericher-40': ['_DSC5185.jpg', '_DSC5188.jpg', '_DSC5197.jpg'],
  'nuernberg-reihenendhaus': ['_DSC2275.JPG', '_DSC2298.JPG', '_DSC2299.JPG'],
  'nuernberg-haderastrasse': ['_DSC9314.jpg', '_DSC9345-HDR.jpg', '_DSC9382.jpg'],
  'nuernberg-woernitzstrasse': ['_DSC6085.jpg', '_DSC6135.jpg', '_DSC6154.jpg'],
  'oberasbach-einfamilienhaus': ['22222222.JPG', '555555,555.JPG', '5555555.JPG'],
  'schwabach-abenberger': ['_DSC7207.jpg', '_DSC7221.jpg', '_DSC7243.jpg'],
  'zirndorf-carl-benz': ['_DSC6962.jpg', 'DJI_0071.jpg', 'DJI_0075.jpg'],
  'zirndorf-gutenbergstrasse': ['_DSC4622.jpg', '_DSC4624.jpg', '_DSC4645.jpg'],
  'zirndorf-homburger': ['_DSC1834.JPG', '_DSC1853.JPG', '_DSC1854.JPG'],
  'zirndorf-marienbader': ['_DSC2622.JPG', '_DSC2643.JPG', '4444.JPG'],
  'zirndorf-gartenwohnung': ['_DSC7024.jpg', '_DSC7051.jpg', 'DJI_0083.jpg'],
}

const legacyImageAliases: Partial<Record<ReferenceId, string>> = {
  'deining-neubauwohnung': '/images/references/deining-neubauwohnung.webp',
  'erlangen-eigentumswohnung': '/images/references/erlangen-eigentumswohnung.webp',
  'forchheim-eigentumswohnung': '/images/references/forchheim-eigentumswohnung.webp',
  'forchheim-reihenhaus': '/images/references/forchheim-reihenhaus.webp',
  'fuerth-altbauwohnung': '/images/references/fuerth-altbauwohnung.webp',
  'fuerth-renovierte-wohnung': '/images/references/fuerth-renovierte-wohnung.webp',
  'fuerth-versorgungszentrum': '/images/references/fuerth-versorgungszentrum.webp',
  'fuerth-mehrfamilienhaus': '/images/references/fuerth-mehrfamilienhaus.webp',
  'heroldsbach-mehrfamilienhaus': '/images/references/heroldsbach-mehrfamilienhaus.webp',
  'langenzenn-terrassenwohnung': '/images/references/langenzenn-terrassenwohnung.webp',
  'nuernberg-einfamilienhaus': '/images/references/nuernberg-einfamilienhaus.webp',
  'nuernberg-eigentumswohnung': '/images/references/nuernberg-eigentumswohnung.webp',
  'nuernberg-reihenendhaus': '/images/references/nuernberg-reihenendhaus.webp',
  'oberasbach-einfamilienhaus': '/images/references/oberasbach-einfamilienhaus.webp',
  'zirndorf-gartenwohnung': '/images/references/zirndorf-gartenwohnung.webp',
} satisfies Partial<Record<ReferenceId, string>>

export const REFERENCE_IDS = REFERENCE_SEEDS.map(({ id }) => id) as ReferenceId[]

const propertyTypeText: Record<ReferencePropertyType, LocalizedText> = {
  apartment: city('Wohnung', 'Apartment'),
  house: city('Haus', 'House'),
  'semi-detached': city('Doppelhaushälfte', 'Semi-detached home'),
  townhouse: city('Reihenhaus', 'Terraced home'),
  'apartment-building': city('Mehrfamilienhaus', 'Apartment building'),
  commercial: city('Gewerbeimmobilie', 'Commercial property'),
}

const draftedCaseById: Partial<Record<ReferenceId, string>> = {
  'deining-neubauwohnung': 'case-01',
  'erlangen-eigentumswohnung': 'case-02',
  'forchheim-eigentumswohnung': 'case-03',
  'forchheim-reihenhaus': 'case-04',
  'fuerth-altbauwohnung': 'case-05',
  'fuerth-renovierte-wohnung': 'case-06',
  'fuerth-versorgungszentrum': 'case-07',
  'fuerth-mehrfamilienhaus': 'case-08',
  'hagenbuechach-hausaeckern': 'case-09',
  'heroldsbach-mehrfamilienhaus': 'case-10',
  'herzogenaurach-schuetzengraben': 'case-11',
  'langenzenn-terrassenwohnung': 'case-12',
  'nuernberg-willy-wunder': 'case-13',
  'nuernberg-einfamilienhaus': 'case-14',
  'nuernberg-neutrograben': 'case-15',
  'nuernberg-eigentumswohnung': 'case-16',
  'nuernberg-zuericher-52': 'case-17',
  'nuernberg-zuericher-40': 'case-18',
  'nuernberg-reihenendhaus': 'case-19',
  'nuernberg-haderastrasse': 'case-20',
  'nuernberg-woernitzstrasse': 'case-21',
  'oberasbach-einfamilienhaus': 'case-22',
  'zirndorf-gutenbergstrasse': 'case-23',
  'zirndorf-homburger': 'case-24',
  'zirndorf-gartenwohnung': 'case-25',
  'zirndorf-marienbader': 'case-26',
}

const reviewLabelById: Partial<Record<ReferenceId, string>> = {
  'deining-neubauwohnung': 'Bürgermeister-Keckl · Deining',
  'erlangen-eigentumswohnung': 'Luise-Kiesselbach · Erlangen',
  'hagenbuechach-hausaeckern': 'Hagenbüchach',
  'herzogenaurach-schuetzengraben': 'Schützengraben · Herzogenaurach',
  'nuernberg-eigentumswohnung': 'Stabius · Nürnberg',
  'nuernberg-reihenendhaus': 'Siebenbürger · Nürnberg',
  'nuernberg-woernitzstrasse': 'Wörnitz · Nürnberg',
  'schwabach-abenberger': 'Abenberger · Schwabach',
  'zirndorf-gutenbergstrasse': 'Gutenberg · Zirndorf',
  'nuernberg-zuericher-52': 'Züricher · Nürnberg',
}

const legacyCases: Partial<
  Record<
    ReferenceId,
    { narrative: ReferenceNarrative; metrics: ReferenceMetricSet; review?: ReferenceReview }
  >
> = {
  'deining-neubauwohnung': {
    narrative: {
      startingPoint: city(
        'Neubauwohnung mit hochwertiger Ausstattung und Außenbereich.',
        'A new-build apartment with high-quality finishes and outdoor space.',
      ),
      challenge: city(
        'Eine Neubauwohnung braucht eine präzise Preisstrategie und Käufer, die Energieeffizienz und Ausstattungsqualität richtig einordnen.',
        'A new-build apartment needs precise pricing and buyers who recognise the value of energy efficiency and finish quality.',
      ),
      approach: city(
        'Hochwertige Präsentation, klare Einordnung der Neubauqualität und gezielte Ansprache passender Interessenten.',
        'A high-quality presentation, clear positioning of the new-build specification, and targeted buyer outreach.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '32', viewings: '10', duration: '6', approved: false },
    review: {
      reviewer: 'Waweina',
      rating: 5,
      date: city('vor einem Monat', 'one month ago'),
      quote: city(
        'Besonders positiv fand ich die hochwertige Erstellung des Exposés inklusive Video- und Social-Media-Präsentation. Dadurch wurde die Wohnung optimal präsentiert und tatsächlich konnte bereits innerhalb eines Monats ein Käufer gefunden werden.',
        'I particularly appreciated the high-quality brochure, including the video and social media presentation. It showcased the apartment at its best, and a buyer was found within just one month.',
      ),
      screenshot: {
        src: '/images/reviews/google-waweina-deining.png',
        width: 508,
        height: 533,
        alt: city(
          'Originale Google-Bewertung von Waweina zur verkauften Wohnung in Deining',
          'Original Google review by Waweina for the sold apartment in Deining',
        ),
      },
    },
  },
  'erlangen-eigentumswohnung': {
    narrative: {
      startingPoint: city(
        'Eigentumswohnung in der stark nachgefragten Universitätsstadt.',
        'A condominium in a high-demand university city.',
      ),
      challenge: city(
        'Das Marktpotenzial sollte ausgeschöpft werden, ohne die passende Zielgruppe zu verlieren.',
        'The market potential needed to be realised without losing the right target group.',
      ),
      approach: city(
        'Breite regionale Reichweite, strukturierte Käuferqualifizierung und eine ruhige, wertige Präsentation.',
        'Broad regional reach, structured buyer qualification, and a calm, high-value presentation.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '68', viewings: '26', duration: '4', approved: false },
  },
  'forchheim-eigentumswohnung': {
    narrative: {
      startingPoint: city(
        'Eigentumswohnung in einem ruhigen Forchheimer Ortsteil.',
        'A condominium in a quiet Forchheim district.',
      ),
      challenge: city(
        'Die familienorientierte Zielgruppe musste lokal und emotional erreicht werden.',
        'The family-oriented audience needed locally focused communication.',
      ),
      approach: city(
        'Regionales Marketing, klare Zielgruppenansprache und eine bildstarke Objektpräsentation.',
        'Regional marketing, clear audience targeting, and image-led property presentation.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '34', viewings: '6', duration: '3', approved: false },
  },
  'forchheim-reihenhaus': {
    narrative: {
      startingPoint: city(
        'Modernes Townhouse für Käufer mit Wunsch nach einem klaren Wohnkonzept.',
        'A modern townhouse for buyers looking for a clear living concept.',
      ),
      challenge: city(
        'Das Wohnkonzept musste verständlich und zugleich emotional vermittelt werden.',
        'The living concept needed to be explained clearly while retaining emotional appeal.',
      ),
      approach: city(
        'Konkrete Nutzungsszenarien, qualifizierte Besichtigungen und konsequentes Nachfassen.',
        'Concrete usage scenarios, qualified viewings, and consistent follow-up.',
      ),
      outcome: city('Passenden Käufer gefunden.', 'Matched with the right buyer.'),
    },
    metrics: { requests: '43', viewings: '22', duration: '9', approved: false },
  },
  'fuerth-altbauwohnung': {
    narrative: {
      startingPoint: city(
        'Historische Altbauwohnung mit eigenem architektonischem Charakter.',
        'A period apartment with distinctive architectural character.',
      ),
      challenge: city(
        'Der Charakter sollte sichtbar werden, ohne die sachlichen Kaufkriterien zu überdecken.',
        'The character had to remain visible without obscuring practical buying criteria.',
      ),
      approach: city(
        'Editoriale Fotografie, präzise Detailkommunikation und konzentrierte Terminsteuerung.',
        'Editorial photography, precise detail communication, and concentrated viewing coordination.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '102', viewings: '36', duration: '2', approved: false },
  },
  'fuerth-renovierte-wohnung': {
    narrative: {
      startingPoint: city(
        'Sanierte Wohnung in einer vergleichsreichen Fürther Marktsituation.',
        'A renovated apartment in a comparison-heavy Fürth market.',
      ),
      challenge: city(
        'Die Wohnung musste klar von vergleichbaren Angeboten abgegrenzt werden.',
        'The apartment needed a clear distinction from comparable listings.',
      ),
      approach: city(
        'Überarbeitete Positionierung, transparente Rückmeldungen und laufende Optimierung.',
        'Refined positioning, transparent feedback, and continuous optimisation.',
      ),
      outcome: city('Strategisch neu positioniert.', 'Strategically repositioned.'),
    },
    metrics: { requests: '18', viewings: '11', duration: '12', approved: false },
  },
  'fuerth-versorgungszentrum': {
    narrative: {
      startingPoint: city(
        'Medizinisches Versorgungszentrum mit professionellem Investorenprofil.',
        'A medical centre with a professional investor profile.',
      ),
      challenge: city(
        'Ein kleiner, professioneller Käuferkreis entscheidet anhand belastbarer Unterlagen.',
        'A small professional buyer group makes decisions based on substantiated documentation.',
      ),
      approach: city(
        'Diskrete Ansprache geeigneter Investoren und strukturierte Aufbereitung der Eckdaten.',
        'Discreet outreach to suitable investors and structured presentation of the fundamentals.',
      ),
      outcome: city(
        'Spezialimmobilie erfolgreich vermittelt.',
        'Specialist property successfully sold.',
      ),
    },
    metrics: { requests: '8', viewings: '4', duration: '15', approved: false },
  },
  'fuerth-mehrfamilienhaus': {
    narrative: {
      startingPoint: city(
        'Mehrfamilienhaus mit Mietstruktur und Entwicklungspotenzial.',
        'An apartment building with a tenancy structure and development potential.',
      ),
      challenge: city(
        'Mietstruktur und Potenzial mussten für Kapitalanleger nachvollziehbar zusammengeführt werden.',
        'Tenancy structure and potential had to be made legible for investors.',
      ),
      approach: city(
        'Belastbare Unterlagen, klare Investmentstory und qualifizierte Ansprache des Anlegernetzwerks.',
        'Robust documentation, a clear investment story, and qualified investor-network outreach.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '63', viewings: '38', duration: '6', approved: false },
    review: {
      reviewer: 'Markus Biegel',
      rating: 5,
      date: city('vor einem Jahr', 'one year ago'),
      quote: city(
        'Der Verkauf meines Mehrfamilienhauses in Fürth wurde von der Immonation GmbH von Anfang bis Ende professionell begleitet. Besonders positiv fand ich die regelmäßigen Updates zum aktuellen Stand, wodurch ich immer bestens informiert war.',
        'Immonation supported the sale of my apartment building in Fürth professionally from start to finish. I particularly valued the regular progress updates, which kept me fully informed throughout.',
      ),
      screenshot: {
        src: '/images/reviews/google-markus-biegel-fuerth-mehrfamilienhaus.png',
        width: 515,
        height: 406,
        alt: city(
          'Originale Google-Bewertung von Markus Biegel zum verkauften Mehrfamilienhaus in Fürth',
          'Original Google review by Markus Biegel for the sold apartment building in Fürth',
        ),
      },
    },
  },
  'heroldsbach-mehrfamilienhaus': {
    narrative: {
      startingPoint: city(
        'Zweifamilienhaus für Eigennutzer oder mehrere Generationen.',
        'A two-family home for owner-occupiers or multiple generations.',
      ),
      challenge: city(
        'Eigennutzer und Kapitalanleger brauchten eine verständliche Doppelpositionierung.',
        'Owner-occupiers and investors needed a clear dual positioning.',
      ),
      approach: city(
        'Getrennte Nutzungsszenarien, vollständige Unterlagen und gezielte Qualifizierung.',
        'Separate usage scenarios, complete documentation, and targeted qualification.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '29', viewings: '24', duration: '13', approved: false },
  },
  'langenzenn-terrassenwohnung': {
    narrative: {
      startingPoint: city(
        'Terrassenwohnung mit Fokus auf Wohnqualität und Außenraum.',
        'A terrace apartment focused on living quality and outdoor space.',
      ),
      challenge: city(
        'Die Wohnung sollte zügig verkauft werden, ohne den Wert der Außenfläche zu verschenken.',
        'The apartment needed a timely sale without undervaluing its outdoor space.',
      ),
      approach: city(
        'Fokus auf Wohnqualität und Außenraum sowie eine kompakte, vorqualifizierte Besichtigungsphase.',
        'A focus on living quality and outdoor space, followed by a compact, pre-qualified viewing phase.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '12', viewings: '8', duration: '2.5', approved: false },
    review: {
      reviewer: 'Hermann Meier',
      rating: 5,
      date: city('vor einem Jahr', 'one year ago'),
      quote: city(
        'Es war einfach wohltuend, mit richtigen Profis zusammenzuarbeiten. Der Verkauf unserer Wohnung wurde vom Immonation-Team kompetent durchgeführt – von der Marktanalyse über die Anzeigenerstellung und Besichtigungen bis zum Notartermin.',
        'It was genuinely reassuring to work with true professionals. The Immonation team handled the sale of our apartment with expertise, from market analysis and the listing through viewings and the notary appointment.',
      ),
      screenshot: {
        src: '/images/reviews/google-hermann-meier-langenzenn.png',
        width: 518,
        height: 289,
        alt: city(
          'Originale Google-Bewertung von Hermann Meier zur verkauften Terrassenwohnung in Langenzenn',
          'Original Google review by Hermann Meier for the sold terrace apartment in Langenzenn',
        ),
      },
    },
  },
  'nuernberg-einfamilienhaus': {
    narrative: {
      startingPoint: city(
        'Neuwertiges Einfamilienhaus mit flexibel nutzbaren Räumen.',
        'A modern single-family home with flexible spaces.',
      ),
      challenge: city(
        'Viele Nutzungsmöglichkeiten mussten in eine klare Geschichte übersetzt werden.',
        'Several usage options needed one clear story.',
      ),
      approach: city(
        'Strukturierte Raumdarstellung, hochwertige Medien und persönliche Einordnung bei Besichtigungen.',
        'Structured space presentation, high-quality media, and personal guidance during viewings.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '31', viewings: '26', duration: '10', approved: false },
  },
  'nuernberg-eigentumswohnung': {
    narrative: {
      startingPoint: city(
        'Renovierte Stadtwohnung in einer vergleichsreichen Marktlage.',
        'A renovated city apartment in a comparison-heavy market.',
      ),
      challenge: city(
        'Die relevanten Qualitätsmerkmale mussten präzise sichtbar werden.',
        'The relevant quality features needed precise presentation.',
      ),
      approach: city(
        'Zielgerichtete Darstellung der Details und eine eng geführte Auswahl ernsthafter Interessenten.',
        'Targeted presentation of the details and tightly managed selection of serious buyers.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '21', viewings: '8', duration: '3', approved: false },
  },
  'nuernberg-reihenendhaus': {
    narrative: {
      startingPoint: city(
        'Reihenendhaus mit Kino, Sauna und gehobener Ausstattung.',
        'An end-of-terrace home with cinema, sauna, and elevated finishes.',
      ),
      challenge: city(
        'Lifestyle-Qualität und belastbare Fakten mussten zusammenpassen.',
        'Lifestyle appeal and substantiated facts had to work together.',
      ),
      approach: city(
        'Video-orientierte Vermarktung, starke Bilddramaturgie und konsequente Käuferqualifizierung.',
        'Video-led marketing, strong visual storytelling, and consistent buyer qualification.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '110', viewings: '43', duration: '2', approved: false },
  },
  'oberasbach-einfamilienhaus': {
    narrative: {
      startingPoint: city(
        'Einfamilienhaus mit großem Grundstück, Einliegerwohnung und Nebengebäuden.',
        'A single-family home with a large plot, annex, and outbuildings.',
      ),
      challenge: city(
        'Mehrere Zielgruppen sollten fokussiert und nicht beliebig angesprochen werden.',
        'Several audiences needed focused rather than generic communication.',
      ),
      approach: city(
        'Klar getrennte Nutzungsszenarien und breite, dennoch qualifizierte Zielgruppenansprache.',
        'Clearly separated usage scenarios and broad but qualified audience outreach.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '82', viewings: '48', duration: '6', approved: false },
  },
  'zirndorf-gartenwohnung': {
    narrative: {
      startingPoint: city(
        'Neubau-Gartenwohnung mit Terrasse und privatem Außenbereich.',
        'A new-build garden apartment with a terrace and private outdoor space.',
      ),
      challenge: city(
        'Der Außenbereich musste räumlich erlebbar und als Kaufargument klar eingeordnet werden.',
        'The outdoor space needed to feel tangible and be positioned as a clear buying argument.',
      ),
      approach: city(
        'Lokale Ansprache, architekturorientierte Präsentation und klare Vermittlung des Außenraumwerts.',
        'Local outreach, architecture-led presentation, and clear communication of the outdoor-space value.',
      ),
      outcome: city('Erfolgreich vermittelt.', 'Successfully sold.'),
    },
    metrics: { requests: '27', viewings: '13', duration: '6.5', approved: false },
  },
}

function defaultNarrative(seed: ReferenceSeed): ReferenceNarrative {
  return {
    startingPoint: {
      de: `${seed.typeLabel.de} in ${seed.city.de} mit dem Merkmal ${seed.feature.de}.`,
      en: `${seed.typeLabel.en} in ${seed.city.en} with ${seed.feature.en.toLowerCase()}.`,
    },
    challenge: {
      de: `Die Immobilie sollte mit ihrem Merkmal ${seed.feature.de.toLowerCase()} klar positioniert und passenden Interessenten verständlich präsentiert werden.`,
      en: `The property needed clear positioning around ${seed.feature.en.toLowerCase()} and a presentation that helped suitable buyers decide.`,
    },
    approach: {
      de: 'Wir haben die Immobilie strukturiert aufbereitet, die Zielgruppe regional angesprochen und Besichtigungen qualifiziert gesteuert.',
      en: 'We prepared the property in a structured way, addressed the regional audience, and managed qualified viewings.',
    },
    outcome: { de: 'Erfolgreich vermittelt.', en: 'Successfully sold.' },
  }
}

function mediaFor(
  seed: ReferenceSeed,
): readonly [ReferenceMediaAsset, ReferenceMediaAsset, ReferenceMediaAsset] {
  const positions = ['cover', 'gallery-02', 'gallery-03'] as const
  return positions.map((position, index) => ({
    src: `/images/references/${seed.id}/${position}.webp`,
    width: 1600,
    height: 1067,
    alt: {
      de: `${seed.title.de} – ${index === 0 ? 'Außenansicht' : index === 1 ? 'Innenansicht' : 'Detailansicht'}`,
      en: `${seed.title.en} – ${index === 0 ? 'exterior view' : index === 1 ? 'interior view' : 'detail view'}`,
    },
    caption: {
      de: `${seed.typeLabel.de} in ${seed.area.de} · ${index === 0 ? 'Referenzansicht' : index === 1 ? 'Weitere Perspektive' : 'Detail der Immobilie'}`,
      en: `${seed.typeLabel.en} in ${seed.area.en} · ${index === 0 ? 'Reference view' : index === 1 ? 'Additional perspective' : 'Property detail'}`,
    },
  })) as unknown as readonly [ReferenceMediaAsset, ReferenceMediaAsset, ReferenceMediaAsset]
}

function buildRecord(seed: ReferenceSeed): ReferenceRecord {
  const legacy = legacyCases[seed.id as ReferenceId]
  const category = categoryForPropertyType(seed.type)
  return {
    ...seed,
    id: seed.id as ReferenceId,
    slug: seed.id,
    propertyType: seed.type,
    category,
    categoryLabel: REFERENCE_CATEGORY_LABELS[category],
    region: REGION,
    description: {
      de: `${seed.title.de}. ${seed.feature.de}. Archivierter Verkaufsfall von Immonation.`,
      en: `${seed.title.en}. ${seed.feature.en}. Archived Immonation sales reference.`,
    },
    narrative: legacy?.narrative ?? defaultNarrative(seed),
    media: mediaFor(seed),
    ...(legacy?.metrics ? { metrics: legacy.metrics } : {}),
    ...(legacy?.review ? { review: legacy.review } : {}),
    provenance: {
      sourceFiles: sourceFilesById[seed.id as ReferenceId].map(
        (file) => `${seed.sourceFolder}/${file}`,
      ),
      notes: draftedCaseById[seed.id as ReferenceId]
        ? 'Source folder reconciled to the supplied numbered draft case; exact street address withheld from public copy.'
        : reviewLabelById[seed.id as ReferenceId]
          ? 'Additional folder resolved from supplied review labels and source documents; exact street address withheld from public copy.'
          : 'Additional source folder reconciled from the supplied inventory; exact street address withheld from public copy.',
      ...(draftedCaseById[seed.id as ReferenceId]
        ? {
            draftedCase: `${draftedCaseById[seed.id as ReferenceId]} · Immonation_Referenztexte.docx.md`,
          }
        : {}),
      ...(reviewLabelById[seed.id as ReferenceId]
        ? { reviewLabel: reviewLabelById[seed.id as ReferenceId] }
        : {}),
    },
    publication: {
      state: 'published',
      locationPrecision: 'city-area',
      copyApproved: true,
      imagesApproved: true,
      locationApproved: true,
      outcomeApproved: true,
      metricsApproved: legacy?.metrics?.approved ?? false,
      rightsApproved: true,
      lastReviewed: '2026-09-03',
    },
  }
}

export const REFERENCE_RECORDS: readonly ReferenceRecord[] = REFERENCE_SEEDS.map(buildRecord)
const RECORD_BY_ID = new Map(REFERENCE_RECORDS.map((record) => [record.id, record]))
export const PUBLISH_REFERENCE_METRICS = false

export type ReferenceItem = {
  id: ReferenceId
  title: string
  type: string
  location: string
  area: string
  city: string
  citySlug: string
  propertyType: ReferencePropertyType
  category: ReferenceCategory
  feature: string
  alt: string
  image: string
}

export function getReference(idOrSlug: string) {
  return (
    RECORD_BY_ID.get(idOrSlug as ReferenceId) ??
    REFERENCE_RECORDS.find((record) => record.slug === idOrSlug)
  )
}
export function listAllReferences() {
  return REFERENCE_RECORDS
}
export function listReferencesByCity(citySlug: string) {
  return REFERENCE_RECORDS.filter((record) => record.citySlug === citySlug)
}
export function listReferencesByPropertyType(type: ReferencePropertyType) {
  return REFERENCE_RECORDS.filter((record) => record.type === type)
}

export function localizeReference(record: ReferenceRecord, locale: Locale): ReferenceItem {
  return {
    id: record.id,
    title: record.title[locale],
    type: record.categoryLabel[locale],
    location: record.city[locale],
    area: record.area[locale],
    city: record.city[locale],
    citySlug: record.citySlug,
    propertyType: record.type,
    category: record.category,
    feature: record.feature[locale],
    alt: record.media[0].alt[locale],
    image: record.media[0].src,
  }
}

export function listLocalizedReferences(locale: Locale) {
  return REFERENCE_RECORDS.map((record) => localizeReference(record, locale))
}

function listingCitySlug(location: string) {
  const name = location.split('·')[0]?.trim().toLowerCase() ?? ''
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function listingTypeMatches(record: ReferenceRecord, listingType: string) {
  const normalized = listingType.toLowerCase()
  if (normalized.includes('wohnung') || normalized.includes('apartment'))
    return record.type === 'apartment'
  if (normalized.includes('mehrfamil') || normalized.includes('investment'))
    return record.type === 'apartment-building' || record.type === 'commercial'
  if (normalized.includes('haus') || normalized.includes('house'))
    return ['house', 'townhouse', 'semi-detached'].includes(record.type)
  return true
}

export function listReferencesForListing(listing: { location: string; type: string }) {
  const citySlug = listingCitySlug(listing.location)
  const cityMatches = REFERENCE_RECORDS.filter((record) => record.citySlug === citySlug)
  const exact = cityMatches.filter((record) => listingTypeMatches(record, listing.type))
  const fallback = cityMatches.length > 0 ? cityMatches : REFERENCE_RECORDS
  return (
    exact.length > 0 ? exact : fallback.filter((record) => listingTypeMatches(record, listing.type))
  ).slice(0, 3)
}

export function listReferencesForSellerGuide(translationKey: string) {
  switch (translationKey) {
    case 'sell-house':
      return REFERENCE_RECORDS.filter((record) =>
        ['house', 'townhouse', 'semi-detached'].includes(record.type),
      ).slice(0, 6)
    case 'sell-apartment':
      return REFERENCE_RECORDS.filter((record) => record.type === 'apartment').slice(0, 6)
    case 'sell-apartment-building':
      return REFERENCE_RECORDS.filter(
        (record) => record.type === 'apartment-building' || record.type === 'commercial',
      ).slice(0, 6)
    case 'sell-land':
      return REFERENCE_RECORDS.filter((record) => record.tags.includes('regional')).slice(0, 4)
    default:
      return []
  }
}

export function listReferenceUsage() {
  return {
    sourceFolders: REFERENCE_RECORDS.length,
    sourcePhotos: REFERENCE_RECORDS.length * 3,
    catalogRecords: REFERENCE_RECORDS.length,
    publicDerivatives: REFERENCE_RECORDS.length * 3,
    localizedDetailRoutes: REFERENCE_RECORDS.length * 2,
    cities: new Set(REFERENCE_RECORDS.map((record) => record.citySlug)).size,
    draftedCases: Object.keys(draftedCaseById).length,
    additionalOrAmbiguousFolders: REFERENCE_RECORDS.length - Object.keys(draftedCaseById).length,
    legacyCoverAliases: Object.keys(legacyImageAliases).length,
  }
}

/** Compatibility adapter for consumers that still expect the former detail shape. */
export type ReferenceDetail = {
  id: ReferenceId
  requests: string
  viewings: string
  duration: string
  result: LocalizedText
  challenge: LocalizedText
  approach: LocalizedText
  review?: ReferenceReview
}
export function getReferenceDetail(id: string): ReferenceDetail | undefined {
  const record = getReference(id)
  if (!record) return undefined
  return {
    id: record.id,
    requests: record.metrics?.inquiries ?? record.metrics?.requests ?? '',
    viewings: record.metrics?.viewings ?? '',
    duration: record.metrics?.duration ?? '',
    result: record.narrative.outcome,
    challenge: record.narrative.challenge,
    approach: record.narrative.approach,
    ...(record.review ? { review: record.review } : {}),
  }
}
export function listReferenceReviews() {
  return REFERENCE_RECORDS.flatMap((record) =>
    record.review ? [{ id: record.id, ...record.review }] : [],
  )
}

/** Existing root-level cover URLs remain valid; new code uses record.media. */
export function referenceImage(id: ReferenceId) {
  return legacyImageAliases[id] ?? `/images/references/${id}/cover.webp`
}
export function referenceTypeLabel(type: ReferencePropertyType, locale: Locale) {
  return propertyTypeText[type][locale]
}
