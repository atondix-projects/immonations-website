import type { Locale } from '@/i18n/routing'

export type SellerGuideShowcaseSlide = {
  id: string
  image: string
  width: number
  height: number
  title: string
  text: string
  alt: string
}

type LocalizedSlide = Omit<SellerGuideShowcaseSlide, 'title' | 'text' | 'alt'> & {
  title: Record<Locale, string>
  text: Record<Locale, string>
  alt: Record<Locale, string>
}

const SHOWCASES: Readonly<Record<string, readonly LocalizedSlide[]>> = {
  'sell-house': [
    {
      id: 'detached-house',
      image: '/images/references/nuernberg-einfamilienhaus/cover.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Freistehendes Einfamilienhaus', en: 'Detached family home' },
      text: {
        de: 'Grundstück, Bausubstanz und Energiezustand werden als zusammenhängendes Angebot präsentiert.',
        en: 'Plot, building fabric, and energy condition are presented as one coherent proposition.',
      },
      alt: {
        de: 'Freistehendes Einfamilienhaus in Nürnberg',
        en: 'Detached family home in Nuremberg',
      },
    },
    {
      id: 'garden-house',
      image: '/images/references/oberasbach-einfamilienhaus/cover.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Haus mit Garten', en: 'House with garden' },
      text: {
        de: 'Außenflächen, Privatsphäre und Nutzungsmöglichkeiten sprechen die passende Familienzielgruppe an.',
        en: 'Outdoor space, privacy, and possible uses address the relevant family buyer group.',
      },
      alt: {
        de: 'Einfamilienhaus mit Garten in Oberasbach',
        en: 'Family home with garden in Oberasbach',
      },
    },
    {
      id: 'townhouse',
      image: '/images/references/forchheim-reihenhaus/cover.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Reihenhaus', en: 'Townhouse' },
      text: {
        de: 'Bei verdichteten Wohnformen zählen ein klarer Grundriss, Zustand und die Einordnung des direkten Umfelds.',
        en: 'For denser housing, a clear layout, condition, and immediate surroundings matter.',
      },
      alt: {
        de: 'Reihenhaus in Forchheim',
        en: 'Townhouse in Forchheim',
      },
    },
  ],
  'sell-apartment': [
    {
      id: 'period-apartment',
      image: '/images/references/fuerth-altbauwohnung/cover.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Altbauwohnung', en: 'Period apartment' },
      text: {
        de: 'Charakter, Gemeinschaftseigentum und Sanierungsstand müssen gemeinsam nachvollziehbar werden.',
        en: 'Character, common property, and refurbishment status need to be made clear together.',
      },
      alt: {
        de: 'Altbauwohnung in Fürth',
        en: 'Period apartment in Fürth',
      },
    },
    {
      id: 'new-build-apartment',
      image: '/images/references/deining-neubauwohnung/cover.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Neubauwohnung', en: 'New-build apartment' },
      text: {
        de: 'Ausstattung, Energiekennwerte und vollständige Teilungsunterlagen tragen die Positionierung.',
        en: 'Specification, energy performance, and complete ownership records support the positioning.',
      },
      alt: {
        de: 'Neubauwohnung in Deining',
        en: 'New-build apartment in Deining',
      },
    },
    {
      id: 'garden-apartment',
      image: '/images/references/zirndorf-gartenwohnung/cover.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Gartenwohnung', en: 'Garden apartment' },
      text: {
        de: 'Sondernutzungsflächen, Zugang und Pflegezuständigkeiten werden für Interessenten klar erklärt.',
        en: 'Exclusive-use areas, access, and maintenance responsibilities are explained clearly to buyers.',
      },
      alt: {
        de: 'Gartenwohnung in Zirndorf',
        en: 'Garden apartment in Zirndorf',
      },
    },
  ],
  'sell-land': [
    {
      id: 'micro-location',
      image: '/images/generic/generic-aerial-townscape.webp',
      width: 1440,
      height: 810,
      title: { de: 'Mikrolage aus der Luft', en: 'Micro-location from above' },
      text: {
        de: 'Umfeld, Nachbarbebauung und Wegebeziehungen helfen, die Lage eines Grundstücks einzuordnen.',
        en: 'Surroundings, neighbouring buildings, and access routes help put a plot location in context.',
      },
      alt: {
        de: 'Luftbild einer fränkischen Wohnlage',
        en: 'Aerial view of a Franconian residential area',
      },
    },
    {
      id: 'plot-access',
      image: '/images/generic/generic-aerial-house-garage.webp',
      width: 1440,
      height: 992,
      title: { de: 'Zufahrt und Grundstückszuschnitt', en: 'Access and plot shape' },
      text: {
        de: 'Zufahrt, Grenzen und Zuschnitt entscheiden mit darüber, welche Nutzung realistisch geprüft werden kann.',
        en: 'Access, boundaries, and plot shape influence which uses can realistically be assessed.',
      },
      alt: {
        de: 'Luftbild eines bebauten Grundstücks mit Zufahrt und Garage',
        en: 'Aerial view of a developed plot with access and garage',
      },
    },
    {
      id: 'planning-context',
      image: '/images/generic/generic-aerial-apartment-complex.webp',
      width: 1440,
      height: 861,
      title: { de: 'Bebauung im Umfeld', en: 'Surrounding development' },
      text: {
        de: 'Die vorhandene Bebauung liefert Kontext; verbindlich bleiben Bebauungsplan und zuständige Behörde.',
        en: 'Existing development provides context; the planning framework and authority remain decisive.',
      },
      alt: {
        de: 'Luftbild einer Wohnanlage und ihrer umliegenden Bebauung',
        en: 'Aerial view of a residential complex and surrounding development',
      },
    },
  ],
  'sell-apartment-building': [
    {
      id: 'period-building',
      image: '/images/references/fuerth-mehrfamilienhaus/gallery-03.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Altbau-Mehrfamilienhaus', en: 'Period apartment building' },
      text: {
        de: 'Historische Substanz, Mietstruktur und möglicher Sanierungsbedarf müssen gemeinsam eingeordnet werden.',
        en: 'Historic fabric, tenancy structure, and potential refurbishment needs must be assessed together.',
      },
      alt: {
        de: 'Straßenansicht eines Altbau-Mehrfamilienhauses in Fürth',
        en: 'Street view of a period apartment building in Fürth',
      },
    },
    {
      id: 'rendered-facade',
      image: '/images/references/heroldsbach-mehrfamilienhaus/cover.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Mehrparteienhaus mit Putzfassade', en: 'Rendered multi-unit property' },
      text: {
        de: 'Bei kleineren Mehrparteienhäusern prägen Nutzung, Außenflächen und Instandhaltung die Käuferansprache.',
        en: 'For smaller multi-unit properties, use, outdoor space, and maintenance shape buyer outreach.',
      },
      alt: {
        de: 'Mehrparteienhaus mit heller Putzfassade und Garten in Heroldsbach',
        en: 'Multi-unit property with a light rendered facade and garden in Heroldsbach',
      },
    },
    {
      id: 'new-build',
      image: '/images/references/zirndorf-gartenwohnung/gallery-02.webp',
      width: 1600,
      height: 1067,
      title: { de: 'Neubau-Mehrfamilienhaus', en: 'New-build apartment building' },
      text: {
        de: 'Bei modernen Wohnanlagen stehen Ausstattungsstandard, Teilung und belastbare Objektunterlagen im Vordergrund.',
        en: 'For modern residential buildings, specification, ownership structure, and reliable records take priority.',
      },
      alt: {
        de: 'Modernes weißes Mehrfamilienhaus mit Balkonen in Zirndorf',
        en: 'Modern white apartment building with balconies in Zirndorf',
      },
    },
  ],
}

export function listSellerGuideShowcaseSlides(
  translationKey: string,
  locale: Locale,
): SellerGuideShowcaseSlide[] {
  return (SHOWCASES[translationKey] ?? []).map((slide) => ({
    id: slide.id,
    image: slide.image,
    width: slide.width,
    height: slide.height,
    title: slide.title[locale],
    text: slide.text[locale],
    alt: slide.alt[locale],
  }))
}
