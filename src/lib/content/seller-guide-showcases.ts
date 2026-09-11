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
