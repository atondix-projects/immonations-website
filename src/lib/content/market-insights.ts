import type { Locale } from '@/i18n/routing'

export type LocalizedText = Record<Locale, string>

const text = (de: string, en: string): LocalizedText => ({ de, en })

export type MarketCity = {
  id: string
  name: LocalizedText
  apartmentPrice: number
  housePrice: number
  trend: number
}

export const MARKET_CITIES: readonly MarketCity[] = [
  {
    id: 'nuernberg',
    name: text('Nürnberg', 'Nuremberg'),
    apartmentPrice: 3750,
    housePrice: 4540,
    trend: 4,
  },
  {
    id: 'fuerth',
    name: text('Fürth', 'Fürth'),
    apartmentPrice: 4300,
    housePrice: 4700,
    trend: 1.8,
  },
  {
    id: 'erlangen',
    name: text('Erlangen', 'Erlangen'),
    apartmentPrice: 5400,
    housePrice: 5900,
    trend: 2.6,
  },
  {
    id: 'zirndorf',
    name: text('Zirndorf', 'Zirndorf'),
    apartmentPrice: 4100,
    housePrice: 4600,
    trend: 1.9,
  },
  {
    id: 'schwabach',
    name: text('Schwabach', 'Schwabach'),
    apartmentPrice: 3900,
    housePrice: 4300,
    trend: 1.5,
  },
]

export type HousingYear = {
  year: number
  count: number
  lowK: number
  highK: number
}

export type HousingSeries = {
  city: LocalizedText
  propertyType: LocalizedText
  years: readonly HousingYear[]
}

export const HOUSING_MARKET: readonly HousingSeries[] = [
  {
    city: text('Nürnberg', 'Nuremberg'),
    propertyType: text('Reihenhaus', 'Terraced house'),
    years: [
      { year: 2024, count: 5, lowK: 425, highK: 690 },
      { year: 2025, count: 8, lowK: 460, highK: 719 },
      { year: 2026, count: 6, lowK: 490, highK: 680 },
    ],
  },
  {
    city: text('Nürnberg', 'Nuremberg'),
    propertyType: text('Einfamilienhaus', 'Detached house'),
    years: [
      { year: 2024, count: 7, lowK: 590, highK: 890 },
      { year: 2025, count: 9, lowK: 649, highK: 915 },
      { year: 2026, count: 4, lowK: 729, highK: 890 },
    ],
  },
  {
    city: text('Fürth', 'Fürth'),
    propertyType: text('Reihenhaus', 'Terraced house'),
    years: [
      { year: 2024, count: 5, lowK: 425, highK: 640 },
      { year: 2025, count: 8, lowK: 430, highK: 619 },
      { year: 2026, count: 6, lowK: 530, highK: 589 },
    ],
  },
  {
    city: text('Fürth', 'Fürth'),
    propertyType: text('Einfamilienhaus', 'Detached house'),
    years: [
      { year: 2024, count: 7, lowK: 540, highK: 790 },
      { year: 2025, count: 9, lowK: 549, highK: 715 },
      { year: 2026, count: 4, lowK: 629, highK: 850 },
    ],
  },
  {
    city: text('Erlangen', 'Erlangen'),
    propertyType: text('Reihenhaus', 'Terraced house'),
    years: [
      { year: 2024, count: 5, lowK: 525, highK: 740 },
      { year: 2025, count: 8, lowK: 500, highK: 719 },
      { year: 2026, count: 6, lowK: 580, highK: 789 },
    ],
  },
  {
    city: text('Erlangen', 'Erlangen'),
    propertyType: text('Einfamilienhaus', 'Detached house'),
    years: [
      { year: 2024, count: 7, lowK: 640, highK: 990 },
      { year: 2025, count: 9, lowK: 649, highK: 915 },
      { year: 2026, count: 4, lowK: 729, highK: 850 },
    ],
  },
  {
    city: text('Forchheim', 'Forchheim'),
    propertyType: text('Reihenhaus', 'Terraced house'),
    years: [
      { year: 2024, count: 5, lowK: 525, highK: 670 },
      { year: 2025, count: 8, lowK: 490, highK: 619 },
      { year: 2026, count: 6, lowK: 480, highK: 689 },
    ],
  },
  {
    city: text('Forchheim', 'Forchheim'),
    propertyType: text('Einfamilienhaus', 'Detached house'),
    years: [
      { year: 2024, count: 7, lowK: 620, highK: 790 },
      { year: 2025, count: 9, lowK: 629, highK: 725 },
      { year: 2026, count: 4, lowK: 629, highK: 775 },
    ],
  },
  {
    city: text('Schwabach', 'Schwabach'),
    propertyType: text('Reihenhaus', 'Terraced house'),
    years: [
      { year: 2024, count: 5, lowK: 425, highK: 630 },
      { year: 2025, count: 8, lowK: 430, highK: 619 },
      { year: 2026, count: 6, lowK: 480, highK: 669 },
    ],
  },
  {
    city: text('Schwabach', 'Schwabach'),
    propertyType: text('Einfamilienhaus', 'Detached house'),
    years: [
      { year: 2024, count: 7, lowK: 520, highK: 890 },
      { year: 2025, count: 9, lowK: 529, highK: 785 },
      { year: 2026, count: 4, lowK: 529, highK: 735 },
    ],
  },
  {
    city: text('Zirndorf', 'Zirndorf'),
    propertyType: text('Reihenhaus', 'Terraced house'),
    years: [
      { year: 2024, count: 5, lowK: 425, highK: 580 },
      { year: 2025, count: 8, lowK: 480, highK: 639 },
      { year: 2026, count: 6, lowK: 580, highK: 689 },
    ],
  },
  {
    city: text('Zirndorf', 'Zirndorf'),
    propertyType: text('Einfamilienhaus', 'Detached house'),
    years: [
      { year: 2024, count: 7, lowK: 620, highK: 850 },
      { year: 2025, count: 9, lowK: 629, highK: 895 },
      { year: 2026, count: 4, lowK: 729, highK: 1100 },
    ],
  },
]

export type ApartmentYear = {
  year: number
  count: number
  lowK: number
  highK: number
}

export type ApartmentMarketCity = {
  city: LocalizedText
  years: readonly ApartmentYear[]
}

export const APARTMENT_MARKET: readonly ApartmentMarketCity[] = [
  {
    city: text('Nürnberg', 'Nuremberg'),
    years: [
      { year: 2023, count: 7, lowK: 85, highK: 580 },
      { year: 2024, count: 9, lowK: 98, highK: 365 },
      { year: 2025, count: 5, lowK: 175, highK: 460 },
      { year: 2026, count: 5, lowK: 210, highK: 360 },
    ],
  },
  {
    city: text('Fürth', 'Fürth'),
    years: [
      { year: 2023, count: 4, lowK: 275, highK: 440 },
      { year: 2024, count: 2, lowK: 88, highK: 170 },
      { year: 2025, count: 2, lowK: 265, highK: 343 },
      { year: 2026, count: 1, lowK: 435, highK: 435 },
    ],
  },
  {
    city: text('Erlangen', 'Erlangen'),
    years: [
      { year: 2023, count: 4, lowK: 130, highK: 290 },
      { year: 2024, count: 1, lowK: 350, highK: 350 },
      { year: 2025, count: 2, lowK: 179, highK: 619 },
      { year: 2026, count: 1, lowK: 275, highK: 275 },
    ],
  },
  {
    city: text('Zirndorf', 'Zirndorf'),
    years: [
      { year: 2024, count: 1, lowK: 251, highK: 251 },
      { year: 2025, count: 4, lowK: 165, highK: 307 },
      { year: 2026, count: 1, lowK: 525, highK: 525 },
    ],
  },
  {
    city: text('Schwabach', 'Schwabach'),
    years: [
      { year: 2023, count: 1, lowK: 230, highK: 230 },
      { year: 2024, count: 2, lowK: 510, highK: 555 },
      { year: 2026, count: 1, lowK: 224, highK: 224 },
    ],
  },
  {
    city: text('Forchheim', 'Forchheim'),
    years: [
      { year: 2023, count: 1, lowK: 360, highK: 360 },
      { year: 2024, count: 1, lowK: 315, highK: 315 },
      { year: 2025, count: 1, lowK: 250, highK: 250 },
    ],
  },
]

export type DistrictTransaction = {
  district: LocalizedText
  year: number
  propertyType: LocalizedText
  price: number
}

export const NUREMBERG_DISTRICT_TRANSACTIONS: readonly DistrictTransaction[] = [
  {
    district: text('St. Johannis', 'St. Johannis'),
    year: 2023,
    propertyType: text('Eigentumswohnung', 'Apartment'),
    price: 430000,
  },
  {
    district: text('St. Sebald', 'St. Sebald'),
    year: 2023,
    propertyType: text('Eigentumswohnung', 'Apartment'),
    price: 469000,
  },
  {
    district: text('Erlenstegen', 'Erlenstegen'),
    year: 2023,
    propertyType: text('Loft', 'Loft'),
    price: 745000,
  },
  {
    district: text('Südstadt', 'Südstadt'),
    year: 2023,
    propertyType: text('Mehrfamilienhaus', 'Apartment building'),
    price: 1150000,
  },
  {
    district: text('Kettlersiedlung', 'Kettlersiedlung'),
    year: 2023,
    propertyType: text('Einfamilienhaus', 'Detached house'),
    price: 815000,
  },
  {
    district: text('Zerzabelshof', 'Zerzabelshof'),
    year: 2023,
    propertyType: text('Reihenendhaus', 'End-terrace house'),
    price: 628000,
  },
  {
    district: text('St. Johannis', 'St. Johannis'),
    year: 2024,
    propertyType: text('Eigentumswohnung', 'Apartment'),
    price: 420000,
  },
  {
    district: text('Almoshof', 'Almoshof'),
    year: 2024,
    propertyType: text('Eigentumswohnung', 'Apartment'),
    price: 419000,
  },
  {
    district: text('Maxfeld', 'Maxfeld'),
    year: 2024,
    propertyType: text('Loft', 'Loft'),
    price: 545000,
  },
  {
    district: text('Gostenhof', 'Gostenhof'),
    year: 2024,
    propertyType: text('Mehrfamilienhaus', 'Apartment building'),
    price: 1100000,
  },
  {
    district: text('Erlenstegen', 'Erlenstegen'),
    year: 2024,
    propertyType: text('Einfamilienhaus', 'Detached house'),
    price: 815000,
  },
  {
    district: text('Mögeldorf', 'Mögeldorf'),
    year: 2024,
    propertyType: text('Reihenendhaus', 'End-terrace house'),
    price: 628000,
  },
]

export const MARKET_DATA_ORIGIN = 2023
export const MARKET_DATA_REGION_COUNT = 21

export type MarketCard = {
  tag: LocalizedText
  title: LocalizedText
  text: LocalizedText
}

export type MarketFaq = {
  question: string
  answer: string
}

export type MarketDataCopy = {
  metadata: { title: string; description: string }
  hero: { eyebrow: string; title: string; lede: string }
  overview: { badge: string; title: string; paragraphs: string[] }
  trend: { title: string; cards: MarketCard[] }
  houses: {
    title: string
    badge: string
    lede: string
    comparisonTitle: string
    tableTitle: string
    table: { city: string; propertyType: string; year: number; range: string }[]
    tableLabels: { city: string; propertyType: string; year: string; range: string }
    readingNote: string
  }
  apartments: {
    title: string
    badge: string
    lede: string
    note: string
    countLabel: string
  }
  districts: { title: string; badge: string; lede: string; note: string }
  /** Attribution rendered by <DataProvenance> beneath the transaction tables. */
  source: string
  factors: { title: string; lede: string; cards: MarketCard[] }
  why: { title: string; lede: string; cards: MarketCard[] }
  cta: { title: string; text: string; primary: string; secondary: string; atlas: string }
  /** Legends, axis units and key-figure labels for the report's charts. */
  charts: {
    glanceTitle: string
    glanceCities: string
    glancePeriod: string
    glanceApartments: string
    glanceLevels: string
    levelShiftTitle: string
    levelShiftCaption: string
    corridorEarlier: string
    corridorLatest: string
    unitThousands: string
    tableUnit: string
  }
  labels: {
    apartment: string
    house: string
    since: string
    selected: string
    assessed: string
    highest: string
    lowest: string
    rank: string
    averageHouse: string
    district: string
    salePrice: string
  }
  faqTitle: string
  faq: MarketFaq[]
}

const MARKET_DATA_COPY: Record<Locale, MarketDataCopy> = {
  de: {
    metadata: {
      title: 'Immobilienpreise Nürnberg, Fürth & Erlangen 2026 – echte Abschlüsse | Immonation',
      description:
        'Echte beurkundete Immobilienverkäufe aus der Metropolregion Nürnberg: Preiskorridore für Häuser, Spannen für Eigentumswohnungen und ausgewählte Stadtteil-Transaktionen.',
    },
    hero: {
      eyebrow: 'Immobilienpreise Metropolregion',
      title: 'Was Immobilien in der Region wirklich kosten',
      lede: 'Fast alle Preise im Netz sind Angebotspreise – also das, was jemand gern hätte. Wir zeigen etwas anderes: Preise aus tatsächlich beurkundeten Abschlüssen unserer eigenen Vermittlung. Das ist der Unterschied zwischen dem, was gefordert wird, und dem, was bezahlt wird.',
    },
    overview: {
      badge: 'Trendübersicht – bewusst nicht alle Verkäufe',
      title: 'Was Sie hier sehen – und was nicht',
      paragraphs: [
        'Diese Seite ist keine Verkaufsbilanz, sondern eine Marktübersicht. Wir zeigen aus jedem Jahr Ausschnitte unserer Abschlüsse, damit Entwicklungen sichtbar werden – nicht jede einzelne Transaktion. Eine vollständige Liste wäre unübersichtlich und würde die Trends eher verdecken als zeigen.',
        'Grundlage: Reihen- und Einfamilienhäuser aus den Jahren 2024–2026 sowie Eigentumswohnungen aus 2023–2026, jeweils aus unserer eigenen Vermittlung in der Metropolregion Nürnberg.',
      ],
    },
    trend: {
      title: 'Der Trend 2026 in drei Sätzen',
      cards: [
        {
          tag: text('Auseinander statt aufwärts', 'Widening rather than rising'),
          title: text('Der Markt spreizt sich', 'The market is spreading out'),
          text: text(
            'Es gibt nicht mehr „den“ Preis. Innerhalb derselben Stadt und desselben Jahres liegen zwischen dem günstigsten und teuersten Haus regelmäßig 200.000 € und mehr. Entscheidend ist längst nicht mehr nur die Adresse.',
            'There is no single “market price” anymore. Within the same city and year, the gap between the least and most expensive house is regularly €200,000 or more. The address is no longer the only decisive factor.',
          ),
        },
        {
          tag: text('Energie ist der neue Preisfaktor', 'Energy is the new price factor'),
          title: text('Zustand schlägt Lage', 'Condition beats location'),
          text: text(
            'Seit dem Gebäudeenergiegesetz rechnet jeder Käufer die Heizung in seine Monatsrate ein. Ein energetisch gutes Haus erreicht das obere Ende seiner Spanne – ein sanierungsbedürftiges das untere, in derselben Straße.',
            'Since the Building Energy Act, every buyer factors the heating system into their monthly cost. An energy-efficient house reaches the top of its range; one needing refurbishment reaches the bottom, even on the same street.',
          ),
        },
        {
          tag: text('Umland holt auf', 'The surrounding area is catching up'),
          title: text(
            'Zirndorf mit der stärksten Bewegung',
            'Zirndorf shows the strongest movement',
          ),
          text: text(
            'Plus 25,3 % beim Hauspreisniveau seit 2024 – deutlich mehr als in den Großstädten. Wer hier vor drei Jahren verkauft hat, hatte einen anderen Markt vor sich.',
            'House price levels are up 25.3% since 2024 — well above the larger cities. Anyone who sold here three years ago faced a different market.',
          ),
        },
      ],
    },
    houses: {
      title: 'Häuser: Preiskorridore 2024–2026',
      badge: 'Ausschnitt aus unseren Abschlüssen',
      lede: 'Reihen- und Einfamilienhäuser, aufgeschlüsselt nach Stadt und Jahr. Wir zeigen bewusst Korridore statt Einzelpreise – so sehen Sie den realen Rahmen, in dem sich Abschlüsse bewegen, statt einer Zahl, die für Ihr Objekt ohnehin nicht gilt.',
      comparisonTitle: 'Preisniveau im Vergleich · Häuser 2026',
      tableTitle: 'Die Korridore im Detail',
      table: [],
      tableLabels: {
        city: 'Stadt',
        propertyType: 'Objektart',
        year: 'Jahr',
        range: 'Preiskorridor',
      },
      readingNote:
        'Lesehilfe: Ein Korridor zeigt nicht, dass jedes Haus so viel bringt. Er zeigt, wo sich unsere Abschlüsse tatsächlich bewegt haben – nach oben und nach unten.',
    },
    apartments: {
      title: 'Eigentumswohnungen: die Spannen',
      badge: 'Ausschnitt 2023–2026',
      lede: 'Wohnungen decken die größte Bandbreite ab – vom vermieteten 1-Zimmer-Appartement bis zur sanierten Altbauwohnung mit Denkmalschutz. Genau deshalb sagt ein Durchschnittspreis hier noch weniger aus als beim Haus.',
      note: 'Auffällig: Die Spanne bei Wohnungen ist prozentual noch größer als bei Häusern. In Nürnberg reichen unsere Abschlüsse von 85.000 € bis 580.000 € – Faktor sieben. Zustand, Etage, Schnitt und Eigentümergemeinschaft machen hier den Unterschied.',
      countLabel: 'ausgewertete Wohnungen',
    },
    districts: {
      title: 'Nürnberg nach Stadtteilen',
      badge: 'Ausgewählte Objekte',
      lede: 'Für Nürnberg können wir bis auf Stadtteil-Ebene zeigen, was tatsächlich bezahlt wurde.',
      note: 'Für die übrigen Städte liegen Stadtteil-Zuordnungen in dieser Auswertung noch nicht vor.',
    },
    source: 'basierend auf Vermittlungsdaten der Immonation',
    factors: {
      title: 'Woran der Bestpreis 2026 wirklich hängt',
      lede: 'Die Korridore oben sind die wichtigste Erkenntnis dieser Seite. Zwei Häuser in derselben Straße können 200.000 € auseinanderliegen. Das sind die Faktoren, die darüber entscheiden – wir sehen sie in jedem einzelnen Verkauf.',
      cards: [
        {
          tag: text('Neuwertige Objekte', 'Modern properties'),
          title: text('Energieeffizienz gewinnt', 'Energy efficiency wins'),
          text: text(
            'Seit dem Gebäudeenergiegesetz ist die Heizung die erste Frage jedes Käufers. Wärmepumpe, gute Dämmung, niedrige Nebenkosten – das rechnet der Käufer direkt in seine monatliche Belastung ein und bezahlt es. Neuwertige Häuser erreichen deshalb regelmäßig das obere Ende ihres Korridors, oft ohne lange Verhandlung.',
            'Since the Building Energy Act, the heating system is every buyer’s first question. A heat pump, good insulation, and low running costs are priced into the monthly burden. Modern homes therefore regularly reach the top of their range, often without lengthy negotiation.',
          ),
        },
        {
          tag: text('Ältere Objekte', 'Older properties'),
          title: text('Lage, Grundstück und Potenzial', 'Location, land, and potential'),
          text: text(
            'Ein Bestandshaus gewinnt woanders: gewachsene Lage, großes Grundstück, ausbaufähiger Dachboden, Teilungsmöglichkeit. Diese Objekte holen ihren Preis über das, was sich daraus machen lässt – wenn man es sichtbar macht. Genau dafür setzen wir Visualisierung und Home Staging ein.',
            'An older home wins in other ways: an established location, a large plot, an extendable attic, or subdivision potential. Its price comes from what can be created from it — when that potential is made visible. That is where visualisation and home staging help.',
          ),
        },
        {
          tag: text('Grundstück', 'Plot'),
          title: text('Der stille Wertträger', 'The quiet value driver'),
          text: text(
            'Bei Häusern macht der Bodenwert häufig 30 bis 50 % des Kaufpreises aus. Zwei baugleiche Häuser mit 400 und 800 m² Grund sind zwei verschiedene Produkte – besonders, wenn Teilung oder Anbau möglich wären.',
            'For houses, land value often accounts for 30 to 50% of the purchase price. Two identical houses on 400 and 800 m² plots are two different products — especially when subdivision or an extension could be possible.',
          ),
        },
        {
          tag: text('Unterlagen', 'Documents'),
          title: text('Vollständigkeit ist bares Geld', 'Complete documents save money'),
          text: text(
            'Fehlende Wohnflächenberechnung, kein verwertbarer Grundriss, kein Energieausweis: Die Finanzierung des Käufers stockt, Wochen vergehen, Konditionen ändern sich – am Ende wird nachverhandelt. Deshalb misst unser Ingenieur auf, bevor der erste Interessent anruft.',
            'A missing living-area calculation, unusable floor plan, or energy certificate can stall a buyer’s financing for weeks while terms change. The result is often renegotiation. That is why our engineer measures before the first buyer calls.',
          ),
        },
        {
          tag: text('Zuschnitt', 'Layout'),
          title: text('Nutzbarkeit vor Quadratmetern', 'Usability before square metres'),
          text: text(
            'Acht Zimmer auf 200 m² verkaufen sich schlechter als fünf gut geschnittene. Käufer bezahlen nicht Fläche, sondern Wohnbarkeit – ein Grund, warum ein guter Grundriss im Exposé den Unterschied macht.',
            'Eight rooms over 200 m² can sell worse than five well-planned rooms. Buyers pay for liveability, not floor area — one reason a good floor plan makes a difference in the brochure.',
          ),
        },
        {
          tag: text('Preisstrategie', 'Pricing strategy'),
          title: text(
            'Der Einstieg entscheidet über das Ende',
            'The opening price shapes the outcome',
          ),
          text: text(
            'Zu hoch angesetzt bleibt das Objekt liegen und wird zum Ladenhüter – Interessenten fragen dann, was nicht stimmt. Am Ende wird oft unter Wert verkauft. Der beste Preis entsteht in den ersten Wochen, nicht im vierten Nachlass.',
            'Set too high, a property sits and becomes stale. Buyers then wonder what is wrong. The result is often a sale below value. The best price is created in the first weeks, not in the fourth reduction.',
          ),
        },
      ],
    },
    why: {
      title: 'Warum wir der richtige Ansprechpartner sind',
      lede: 'Diese Seite ist selbst die Antwort: Wir können Ihnen zeigen, was in Ihrer Lage tatsächlich bezahlt wurde – weil wir dort verkauft haben.',
      cards: [
        {
          tag: text('Nachweis', 'Evidence'),
          title: text(
            'Wir kennen Notarpreise, nicht Wunschpreise',
            'We know notary prices, not wish prices',
          ),
          text: text(
            'Ein Onlinerechner kennt Inserate. Wir kennen den Betrag, der am Ende im Kaufvertrag stand – aus unseren eigenen Abschlüssen in 21 Orten der Region.',
            'An online calculator knows listings. We know the amount written into the final contract — from our own closings in 21 locations across the region.',
          ),
        },
        {
          tag: text('Einordnung', 'Context'),
          title: text(
            'Wir wissen, wo im Korridor Sie liegen',
            'We know where you sit in the range',
          ),
          text: text(
            'Zwischen 490.000 € und 680.000 € für ein Reihenhaus in Nürnberg liegen Welten. Wo genau Ihr Objekt steht, klären wir vor Ort – kostenlos und unverbindlich.',
            'There is a world of difference between €490,000 and €680,000 for a terraced house in Nuremberg. We clarify where your property sits on site — free of charge and without obligation.',
          ),
        },
        {
          tag: text('Vorbereitung', 'Preparation'),
          title: text('Wir bringen die Unterlagen mit', 'We bring the documents together'),
          text: text(
            'Unser fest angestellter Ingenieur misst Wohnfläche auf und erstellt Grundrisse – bevor die Bank Ihres Käufers danach fragt. Das ist der Unterschied zwischen sechs Wochen und sechs Monaten.',
            'Our in-house engineer measures living space and prepares floor plans before the buyer’s bank asks for them. That can be the difference between six weeks and six months.',
          ),
        },
        {
          tag: text('Suchkunden', 'Active buyers'),
          title: text('Wir haben die Käufer schon', 'We already know the buyers'),
          text: text(
            'Viele unserer Objekte verkaufen wir aus dem Netzwerk aktiver Suchkunden – teils in zwei Wochen, ohne dass die Immobilie je online steht.',
            'Many properties are sold through our network of active search clients — sometimes in two weeks, without the property ever appearing online.',
          ),
        },
        {
          tag: text('Regional', 'Regional'),
          title: text('Wir sind hier zu Hause', 'We are at home here'),
          text: text(
            'Kein Franchise, kein Callcenter. Büro in Zirndorf, seit 2017 eigenständig, 4,9 von 5 Sternen bei 223 Google-Rezensionen.',
            'No franchise, no call centre. Our office is in Zirndorf; independent since 2017, with 4.9 out of 5 stars from 223 Google reviews.',
          ),
        },
        {
          tag: text('Ehrlichkeit', 'Honesty'),
          title: text('Wir sagen auch, wenn es nicht passt', 'We also say when it does not fit'),
          text: text(
            'Wenn Sanieren sich für Sie nicht rechnet, sagen wir das. Wenn Ihr Preiswunsch nicht erreichbar ist, auch. Ehrlichkeit ist der Grund, warum Kunden uns weiterempfehlen.',
            'If renovating does not make economic sense for you, we say so. The same applies when a price expectation cannot be achieved. Honesty is why clients recommend us.',
          ),
        },
      ],
    },
    cta: {
      title: 'Wo liegt mein Objekt im Korridor?',
      text: 'Der Preisatlas gibt die Richtung vor. Die belastbare Zahl entsteht am Objekt – kostenlos und unverbindlich.',
      primary: 'Kostenlose Bewertung anfordern',
      secondary: 'Erstgespräch buchen',
      atlas: 'Noch granularer: der Immobilien-Preisatlas',
    },
    charts: {
      glanceTitle: 'Die Auswertung auf einen Blick',
      glanceCities: 'Städte in der Auswertung',
      glancePeriod: 'Zeitraum der Abschlüsse',
      glanceApartments: 'Eigentumswohnungen ausgewertet',
      glanceLevels: 'Ø Hauspreisniveau 2026 je Stadt',
      levelShiftTitle: 'Ø Hauspreisniveau je Stadt, 2024 → 2026',
      levelShiftCaption:
        'Mittelwert der Korridor-Mitten von Reihen- und Einfamilienhäusern. Hohler Punkt 2024, voller Punkt 2026.',
      corridorEarlier: 'Korridor 2024',
      corridorLatest: 'Korridor 2026',
      unitThousands: 'Tsd. €',
      tableUnit: 'Preiskorridore in Tsd. €, die Spalte 2026 ist hervorgehoben.',
    },
    labels: {
      apartment: 'Wohnung',
      house: 'Haus',
      since: 'seit 2024',
      selected: 'Ausgewählte Objekte',
      assessed: 'ausgewertete Wohnungen',
      highest: 'Höchstes Niveau',
      lowest: 'Günstigster Einstieg',
      rank: 'Platz',
      averageHouse: 'Ø Haus 2026',
      district: 'Stadtteil',
      salePrice: 'Kaufpreis',
    },
    faqTitle: 'Häufige Fragen zu Immobilienpreisen',
    faq: [
      {
        question: 'Was kostet ein Haus in Nürnberg 2026?',
        answer:
          'Unsere Abschlüsse für Reihenhäuser in Nürnberg bewegten sich 2026 zwischen 490.000 € und 680.000 €, Einfamilienhäuser zwischen 729.000 € und 890.000 €. Die Spanne ist Absicht: Zustand, Energiestandard, Grundstück und Lage entscheiden darüber, wo im Korridor ein Objekt landet.',
      },
      {
        question: 'Wo sind Immobilien in der Metropolregion am teuersten?',
        answer:
          'Nach unseren Hausabschlüssen 2026 führt Zirndorf mit durchschnittlich 775.000 €, gefolgt von Erlangen und Nürnberg. Den günstigsten Einstieg bietet Schwabach mit 603.000 € – bei vergleichbarer Anbindung.',
      },
      {
        question: 'Steigen die Immobilienpreise 2026 noch?',
        answer:
          'Nicht pauschal. In unseren Daten legen einzelne Regionen deutlich zu, andere geben leicht nach. Entscheidender als der Ort ist inzwischen der Zustand: Energetisch gute Objekte erzielen Spitzenpreise, sanierungsbedürftige verlieren – in derselben Straße.',
      },
      {
        question: 'Was ist der Unterschied zwischen Angebotspreis und Verkaufspreis?',
        answer:
          'Der Angebotspreis steht im Inserat, der Verkaufspreis im Kaufvertrag. Onlinerechner und Portale arbeiten überwiegend mit Angebotspreisen. Die Zahlen auf dieser Seite stammen ausschließlich aus beurkundeten Abschlüssen.',
      },
      {
        question: 'Wie finde ich heraus, was meine Immobilie wert ist?',
        answer:
          'Ein Korridor ist eine Orientierung, keine Bewertung. Wo Ihr Objekt tatsächlich liegt, hängt von Lage, Zustand, Ausstattung, Grundriss und Nachfrage ab – das klären wir kostenlos und unverbindlich vor Ort, inklusive Aufmaß durch unseren Ingenieur.',
      },
    ],
  },
  en: {
    metadata: {
      title: 'Property prices Nuremberg, Fürth & Erlangen 2026 — real sales | Immonation',
      description:
        'Real notarised property sales from the Nuremberg metropolitan region: price ranges for houses, apartment ranges, and selected district-level transactions.',
    },
    hero: {
      eyebrow: 'Property prices in the region',
      title: 'What properties really cost in the region',
      lede: 'Almost every price online is an asking price — what someone would like to receive. We show something else: prices from actually notarised sales handled by our team. That is the difference between what is requested and what is paid.',
    },
    overview: {
      badge: 'Trend overview — deliberately not every sale',
      title: 'What you see here — and what you do not',
      paragraphs: [
        'This is not a sales balance sheet but a market overview. We show selected closings from each year so developments become visible — not every individual transaction. A complete list would be unwieldy and would hide the trends rather than clarify them.',
        'Basis: terraced and detached houses from 2024–2026 and apartments from 2023–2026, all from our own brokerage work in the Nuremberg metropolitan region.',
      ],
    },
    trend: {
      title: 'The 2026 trend in three sentences',
      cards: [
        {
          tag: text('Auseinander statt aufwärts', 'Widening rather than rising'),
          title: text('Der Markt spreizt sich', 'The market is spreading out'),
          text: text(
            'Es gibt nicht mehr „den“ Preis. Innerhalb derselben Stadt und desselben Jahres liegen zwischen dem günstigsten und teuersten Haus regelmäßig 200.000 € und mehr. Entscheidend ist längst nicht mehr nur die Adresse.',
            'There is no single “market price” anymore. Within the same city and year, the gap between the least and most expensive house is regularly €200,000 or more. The address is no longer the only decisive factor.',
          ),
        },
        {
          tag: text('Energie ist der neue Preisfaktor', 'Energy is the new price factor'),
          title: text('Zustand schlägt Lage', 'Condition beats location'),
          text: text(
            'Seit dem Gebäudeenergiegesetz rechnet jeder Käufer die Heizung in seine Monatsrate ein. Ein energetisch gutes Haus erreicht das obere Ende seiner Spanne – ein sanierungsbedürftiges das untere, in derselben Straße.',
            'Since the Building Energy Act, every buyer factors the heating system into their monthly cost. An energy-efficient house reaches the top of its range; one needing refurbishment reaches the bottom, even on the same street.',
          ),
        },
        {
          tag: text('Umland holt auf', 'The surrounding area is catching up'),
          title: text(
            'Zirndorf mit der stärksten Bewegung',
            'Zirndorf shows the strongest movement',
          ),
          text: text(
            'Plus 25,3 % beim Hauspreisniveau seit 2024 – deutlich mehr als in den Großstädten. Wer hier vor drei Jahren verkauft hat, hatte einen anderen Markt vor sich.',
            'House price levels are up 25.3% since 2024 — well above the larger cities. Anyone who sold here three years ago faced a different market.',
          ),
        },
      ],
    },
    houses: {
      title: 'Houses: price ranges 2024–2026',
      badge: 'Selected closings from our work',
      lede: 'Terraced and detached houses, broken down by city and year. We deliberately show ranges instead of individual prices — so you can see the real band in which closings move, rather than a number that would not apply to your property anyway.',
      comparisonTitle: 'Price levels compared · houses 2026',
      tableTitle: 'The ranges in detail',
      table: [],
      tableLabels: {
        city: 'City',
        propertyType: 'Property type',
        year: 'Year',
        range: 'Price range',
      },
      readingNote:
        'How to read this: a range does not mean every house achieves these prices. It shows where our closings actually landed — both higher and lower.',
    },
    apartments: {
      title: 'Apartments: the ranges',
      badge: 'Selected data 2023–2026',
      lede: 'Apartments cover the widest spectrum — from a rented one-room flat to a renovated listed-period apartment. That is exactly why an average price says even less here than it does for a house.',
      note: 'The apartment range is noticeably wider in percentage terms than the house range. In Nuremberg, our closings range from €85,000 to €580,000 — a factor of seven. Condition, floor, layout, and the owners’ association make the difference.',
      countLabel: 'apartments assessed',
    },
    districts: {
      title: 'Nuremberg by district',
      badge: 'Selected properties',
      lede: 'For Nuremberg, we can show what was actually paid down to district level.',
      note: 'This evaluation does not yet include district assignments for the other cities.',
    },
    source: 'based on Immonation brokerage data',
    factors: {
      title: 'What really determines the best price in 2026',
      lede: 'The ranges above are the most important insight on this page. Two houses on the same street can differ by €200,000. These are the factors that decide where a sale lands — we see them in every closing.',
      cards: [
        {
          tag: text('Neuwertige Objekte', 'Modern properties'),
          title: text('Energieeffizienz gewinnt', 'Energy efficiency wins'),
          text: text(
            'Seit dem Gebäudeenergiegesetz ist die Heizung die erste Frage jedes Käufers. Wärmepumpe, gute Dämmung, niedrige Nebenkosten – das rechnet der Käufer direkt in seine monatliche Belastung ein und bezahlt es. Neuwertige Häuser erreichen deshalb regelmäßig das obere Ende ihres Korridors, oft ohne lange Verhandlung.',
            'Since the Building Energy Act, the heating system is every buyer’s first question. A heat pump, good insulation, and low running costs are priced into the monthly burden. Modern homes therefore regularly reach the top of their range, often without lengthy negotiation.',
          ),
        },
        {
          tag: text('Ältere Objekte', 'Older properties'),
          title: text('Lage, Grundstück und Potenzial', 'Location, land, and potential'),
          text: text(
            'Ein Bestandshaus gewinnt woanders: gewachsene Lage, großes Grundstück, ausbaufähiger Dachboden, Teilungsmöglichkeit. Diese Objekte holen ihren Preis über das, was sich daraus machen lässt – wenn man es sichtbar macht. Genau dafür setzen wir Visualisierung und Home Staging ein.',
            'An older home wins in other ways: an established location, a large plot, an extendable attic, or subdivision potential. Its price comes from what can be created from it — when that potential is made visible. That is where visualisation and home staging help.',
          ),
        },
        {
          tag: text('Grundstück', 'Plot'),
          title: text('Der stille Wertträger', 'The quiet value driver'),
          text: text(
            'Bei Häusern macht der Bodenwert häufig 30 bis 50 % des Kaufpreises aus. Zwei baugleiche Häuser mit 400 und 800 m² Grund sind zwei verschiedene Produkte – besonders, wenn Teilung oder Anbau möglich wären.',
            'For houses, land value often accounts for 30 to 50% of the purchase price. Two identical houses on 400 and 800 m² plots are two different products — especially when subdivision or an extension could be possible.',
          ),
        },
        {
          tag: text('Unterlagen', 'Documents'),
          title: text('Vollständigkeit ist bares Geld', 'Complete documents save money'),
          text: text(
            'Fehlende Wohnflächenberechnung, kein verwertbarer Grundriss, kein Energieausweis: Die Finanzierung des Käufers stockt, Wochen vergehen, Konditionen ändern sich – am Ende wird nachverhandelt. Deshalb misst unser Ingenieur auf, bevor der erste Interessent anruft.',
            'A missing living-area calculation, unusable floor plan, or energy certificate can stall a buyer’s financing for weeks while terms change. The result is often renegotiation. That is why our engineer measures before the first buyer calls.',
          ),
        },
        {
          tag: text('Zuschnitt', 'Layout'),
          title: text('Nutzbarkeit vor Quadratmetern', 'Usability before square metres'),
          text: text(
            'Acht Zimmer auf 200 m² verkaufen sich schlechter als fünf gut geschnittene. Käufer bezahlen nicht Fläche, sondern Wohnbarkeit – ein Grund, warum ein guter Grundriss im Exposé den Unterschied macht.',
            'Eight rooms over 200 m² can sell worse than five well-planned rooms. Buyers pay for liveability, not floor area — one reason a good floor plan makes a difference in the brochure.',
          ),
        },
        {
          tag: text('Preisstrategie', 'Pricing strategy'),
          title: text(
            'Der Einstieg entscheidet über das Ende',
            'The opening price shapes the outcome',
          ),
          text: text(
            'Zu hoch angesetzt bleibt das Objekt liegen und wird zum Ladenhüter – Interessenten fragen dann, was nicht stimmt. Am Ende wird oft unter Wert verkauft. Der beste Preis entsteht in den ersten Wochen, nicht im vierten Nachlass.',
            'Set too high, a property sits and becomes stale. Buyers then wonder what is wrong. The result is often a sale below value. The best price is created in the first weeks, not in the fourth reduction.',
          ),
        },
      ],
    },
    why: {
      title: 'Why we are the right point of contact',
      lede: 'This page is the answer: we can show what was actually paid in your location — because we have sold there.',
      cards: [
        {
          tag: text('Nachweis', 'Evidence'),
          title: text(
            'Wir kennen Notarpreise, nicht Wunschpreise',
            'We know notary prices, not wish prices',
          ),
          text: text(
            'Ein Onlinerechner kennt Inserate. Wir kennen den Betrag, der am Ende im Kaufvertrag stand – aus unseren eigenen Abschlüssen in 21 Orten der Region.',
            'An online calculator knows listings. We know the amount written into the final contract — from our own closings in 21 locations across the region.',
          ),
        },
        {
          tag: text('Einordnung', 'Context'),
          title: text(
            'Wir wissen, wo im Korridor Sie liegen',
            'We know where you sit in the range',
          ),
          text: text(
            'Zwischen 490.000 € und 680.000 € für ein Reihenhaus in Nürnberg liegen Welten. Wo genau Ihr Objekt steht, klären wir vor Ort – kostenlos und unverbindlich.',
            'There is a world of difference between €490,000 and €680,000 for a terraced house in Nuremberg. We clarify where your property sits on site — free of charge and without obligation.',
          ),
        },
        {
          tag: text('Vorbereitung', 'Preparation'),
          title: text('Wir bringen die Unterlagen mit', 'We bring the documents together'),
          text: text(
            'Unser fest angestellter Ingenieur misst Wohnfläche auf und erstellt Grundrisse – bevor die Bank Ihres Käufers danach fragt. Das ist der Unterschied zwischen sechs Wochen und sechs Monaten.',
            'Our in-house engineer measures living space and prepares floor plans before the buyer’s bank asks for them. That can be the difference between six weeks and six months.',
          ),
        },
        {
          tag: text('Suchkunden', 'Active buyers'),
          title: text('Wir haben die Käufer schon', 'We already know the buyers'),
          text: text(
            'Viele unserer Objekte verkaufen wir aus dem Netzwerk aktiver Suchkunden – teils in zwei Wochen, ohne dass die Immobilie je online steht.',
            'Many properties are sold through our network of active search clients — sometimes in two weeks, without the property ever appearing online.',
          ),
        },
        {
          tag: text('Regional', 'Regional'),
          title: text('Wir sind hier zu Hause', 'We are at home here'),
          text: text(
            'Kein Franchise, kein Callcenter. Büro in Zirndorf, seit 2017 eigenständig, 4,9 von 5 Sternen bei 223 Google-Rezensionen.',
            'No franchise, no call centre. Our office is in Zirndorf; independent since 2017, with 4.9 out of 5 stars from 223 Google reviews.',
          ),
        },
        {
          tag: text('Ehrlichkeit', 'Honesty'),
          title: text('Wir sagen auch, wenn es nicht passt', 'We also say when it does not fit'),
          text: text(
            'Wenn Sanieren sich für Sie nicht rechnet, sagen wir das. Wenn Ihr Preiswunsch nicht erreichbar ist, auch. Ehrlichkeit ist der Grund, warum Kunden uns weiterempfehlen.',
            'If renovating does not make economic sense for you, we say so. The same applies when a price expectation cannot be achieved. Honesty is why clients recommend us.',
          ),
        },
      ],
    },
    cta: {
      title: 'Where does my property sit in the range?',
      text: 'The price atlas points the way. A reliable figure comes from the property itself — free of charge and without obligation.',
      primary: 'Request a free valuation',
      secondary: 'Book an initial call',
      atlas: 'Go more granular: the property price atlas',
    },
    charts: {
      glanceTitle: 'The analysis at a glance',
      glanceCities: 'Cities in this analysis',
      glancePeriod: 'Period of closings',
      glanceApartments: 'Apartments assessed',
      glanceLevels: 'Avg. house level 2026 by city',
      levelShiftTitle: 'Average house level by city, 2024 → 2026',
      levelShiftCaption:
        'Average of the range midpoints for terraced and detached houses. Hollow dot 2024, solid dot 2026.',
      corridorEarlier: '2024 range',
      corridorLatest: '2026 range',
      unitThousands: '€ thousands',
      tableUnit: 'Price ranges in € thousands; the 2026 column is highlighted.',
    },
    labels: {
      apartment: 'Apartment',
      house: 'House',
      since: 'since 2024',
      selected: 'Selected properties',
      assessed: 'apartments assessed',
      highest: 'Highest level',
      lowest: 'Lowest entry',
      rank: 'Rank',
      averageHouse: 'Avg. house 2026',
      district: 'District',
      salePrice: 'Sale price',
    },
    faqTitle: 'Frequently asked questions about property prices',
    faq: [
      {
        question: 'What does a house cost in Nuremberg in 2026?',
        answer:
          'Our 2026 closings for terraced houses in Nuremberg ranged from €490,000 to €680,000; detached houses ranged from €729,000 to €890,000. The range is deliberate: condition, energy standard, plot, and location determine where a property lands.',
      },
      {
        question: 'Where are properties in the metropolitan region most expensive?',
        answer:
          'Based on our 2026 house closings, Zirndorf leads with an average of €775,000, followed by Erlangen and Nuremberg. Schwabach offers the lowest entry point at €603,000, with comparable connections.',
      },
      {
        question: 'Are property prices still rising in 2026?',
        answer:
          'Not across the board. Some regions in our data are clearly gaining while others are easing slightly. Condition is now more important than location: energy-efficient properties reach the top of the range while properties needing work lose value, even on the same street.',
      },
      {
        question: 'What is the difference between an asking price and a sale price?',
        answer:
          'The asking price appears in the listing; the sale price appears in the purchase contract. Online calculators and portals mainly work with asking prices. The figures on this page come exclusively from notarised closings.',
      },
      {
        question: 'How can I find out what my property is worth?',
        answer:
          'A range is an orientation, not a valuation. Where your property actually sits depends on location, condition, fittings, layout, and demand. We clarify this on site free of charge and without obligation, including a measurement by our engineer.',
      },
    ],
  },
}

export const MARKET_OVERVIEW_COPY: Record<
  Locale,
  {
    metadata: { title: string; description: string }
    hero: { eyebrow: string; title: string; lede: string }
    answer: string
    source: string
    interpretation: {
      title: string
      lede: string
      items: { title: string; text: string }[]
    }
    factors: {
      title: string
      lede: string
      items: { title: string; text: string }[]
    }
    sellerPath: {
      title: string
      lede: string
      steps: { title: string; text: string }[]
      reportLabel: string
    }
    methodology: { title: string; paragraphs: string[]; reportLabel: string }
    labels: {
      apartment: string
      house: string
      trend: string
      citySectionEyebrow: string
      citySectionTitle: string
      citySectionText: string
      cityLink: string
      moreEyebrow: string
      valuationTitle: string
    }
    cta: { title: string; text: string; cityLink: string; valuation: string; atlas: string }
    faqTitle: string
    faq: MarketFaq[]
  }
> = {
  de: {
    metadata: {
      title: 'Immobilienmarkt – Kaufpreise €/m² | Immonation',
      description:
        'Kaufpreise, regionale Einordnung und wertbestimmende Faktoren für Immobilien in Nürnberg, Fürth, Erlangen, Zirndorf und Schwabach.',
    },
    hero: {
      eyebrow: 'Immobilienmarkt',
      title: 'Kaufpreise in der Metropolregion',
      lede: 'Durchschnittliche Kaufpreise €/m² – als Orientierung auf Basis regionaler Marktdaten.',
    },
    answer:
      'Die folgenden Quadratmeterpreise zeigen eine erste Größenordnung für Wohnungen und Häuser in der Region. Sie ersetzen keine persönliche Bewertung: Lage, Zustand, Ausstattung, Baujahr, Grundstück, Etage und Nachfrage entscheiden darüber, wo ein konkretes Objekt liegt.',
    source: 'basierend auf Vermittlungsdaten der Immonation',
    interpretation: {
      title: 'Was die Zahlen über den regionalen Markt erzählen',
      lede: 'Ein Durchschnitt macht Städte vergleichbar. Für die Preisentscheidung einer einzelnen Immobilie ist aber die Abweichung vom Durchschnitt entscheidend.',
      items: [
        {
          title: 'Erlangen setzt in der Übersicht das obere Preisniveau',
          text: 'Mit 5.400 €/m² für Wohnungen und 5.900 €/m² für Häuser liegt Erlangen in den hinterlegten Vergleichswerten vorn. Das zeigt die stärkere Zahlungsbereitschaft in gefragten Lagen – nicht, dass jedes Objekt dort automatisch den Spitzenwert erreicht.',
        },
        {
          title: 'Der regionale Abstand bleibt relevant',
          text: 'Zwischen den fünf Städten liegen bei vergleichbaren Objektarten mehrere hundert Euro pro Quadratmeter. Für Eigentümer kann schon die genaue Lage innerhalb des Ballungsraums einen spürbaren Unterschied im Gesamtpreis bedeuten.',
        },
        {
          title: 'Ein positiver Trend ersetzt keine Objektprüfung',
          text: 'Die hinterlegten 12-Monats-Trends sind in allen fünf Städten positiv. Gleichzeitig entscheidet der Markt selektiver: Energiezustand, Modernisierungen, Grundriss und vollständige Unterlagen beeinflussen, ob ein Objekt oberhalb oder unterhalb des Ortswerts liegt.',
        },
      ],
    },
    factors: {
      title: 'Sechs Faktoren, die den Quadratmeterpreis verschieben',
      lede: 'Zwei Immobilien in derselben Straße können deutlich unterschiedliche Verkaufspreise erzielen. Diese Merkmale erklären den Abstand zum rechnerischen Mittelwert.',
      items: [
        {
          title: 'Mikrolage',
          text: 'Straße, Lärm, Aussicht, Anbindung und das direkte Wohnumfeld zählen oft stärker als der Stadtname.',
        },
        {
          title: 'Zustand und Energie',
          text: 'Modernisierungen, Heizung, Dämmung und absehbare Investitionen verändern Budget und Zahlungsbereitschaft der Käufer.',
        },
        {
          title: 'Fläche und Grundriss',
          text: 'Eine gut nutzbare, korrekt ermittelte Wohnfläche ist wertvoller als reine Quadratmeter ohne funktionalen Zuschnitt.',
        },
        {
          title: 'Grundstück und Außenraum',
          text: 'Größe, Zuschnitt, Ausrichtung, Privatsphäre und Baurecht prägen den Wert eines Hauses zusätzlich zur Wohnfläche.',
        },
        {
          title: 'Unterlagen und Rechtssicherheit',
          text: 'Grundrisse, Flächenberechnung, Energieausweis und geklärte Rechte erleichtern Finanzierung und Kaufentscheidung.',
        },
        {
          title: 'Vermarktung und Nachfrage',
          text: 'Positionierung, Präsentation, Käuferqualifizierung und Verhandlung entscheiden mit darüber, welcher Preis realisiert wird.',
        },
      ],
    },
    sellerPath: {
      title: 'Vom Marktüberblick zur belastbaren Preisstrategie',
      lede: 'Eine gute Preisentscheidung entsteht in drei Schritten: erst den Markt einordnen, dann das Objekt prüfen und anschließend die Vermarktung darauf ausrichten.',
      steps: [
        {
          title: 'Region und Objektart einordnen',
          text: 'Stadtwerte und Preisatlas liefern den ersten Korridor für Lage und Immobilientyp.',
        },
        {
          title: 'Das konkrete Objekt bewerten',
          text: 'Vor Ort werden Zustand, Ausstattung, Flächen, Grundstück, Unterlagen und Besonderheiten geprüft.',
        },
        {
          title: 'Angebotspreis strategisch setzen',
          text: 'Der Startpreis muss Nachfrage erzeugen und zugleich den realistischen Verhandlungsspielraum schützen.',
        },
      ],
      reportLabel: 'Ausführlichen Marktbericht öffnen',
    },
    methodology: {
      title: 'So sind die Werte zu lesen',
      paragraphs: [
        'Die Übersicht fasst regionale Vermittlungsdaten der Immonation als durchschnittliche Orientierungswerte zusammen. Sie bildet keinen amtlichen Miet- oder Kaufpreisspiegel ab und ist keine Bewertung eines konkreten Grundstücks oder Gebäudes.',
        'Angebotspreise, rechnerische Quadratmeterwerte und tatsächlich erzielte Verkaufspreise sind nicht dasselbe. Für eine belastbare Einordnung verbinden wir Vergleichsdaten mit Objektprüfung, Unterlagen, aktueller Nachfrage und der jeweiligen Mikrolage.',
      ],
      reportLabel: 'Datengrundlage und Marktbewegung ansehen',
    },
    labels: {
      apartment: 'Wohnung',
      house: 'Haus',
      trend: 'Trend 12 Mon.',
      citySectionEyebrow: 'Immobilienmarkt',
      citySectionTitle: 'Orientierung nach Stadt',
      citySectionText: 'Die fünf Ortswerte auf einen Blick – getrennt nach Wohnungen und Häusern.',
      cityLink: 'Stadtseite öffnen',
      moreEyebrow: 'Mehr Tiefe',
      valuationTitle: 'Was ist Ihre Immobilie wirklich wert?',
    },
    cta: {
      title: 'Der Durchschnitt ist nur der Anfang',
      text: 'Für eine belastbare Preisstrategie zählt das konkrete Objekt. Wir ordnen Lage, Zustand, Unterlagen und Nachfrage persönlich ein.',
      cityLink: 'Alle Städte & Stadtteile',
      valuation: 'Immobilie bewerten lassen',
      atlas: 'Preisatlas nach Stadtteil ansehen',
    },
    faqTitle: 'Häufige Fragen zu Kaufpreisen',
    faq: [
      {
        question: 'Sind Quadratmeterpreise gleich dem Verkaufspreis?',
        answer:
          'Nein. Ein Quadratmeterpreis ist eine Orientierung. Grundstück, Baujahr, Zustand, Ausstattung, Zuschnitt, Etage und Mikrolage können den tatsächlichen Kaufpreis deutlich verändern.',
      },
      {
        question: 'Warum unterscheiden sich die Preise innerhalb einer Stadt?',
        answer:
          'Stadtteile, Straßen und einzelne Grundstücke unterscheiden sich bei Nachfrage, Lärm, Anbindung, Gebäudequalität und Wohnlage. Deshalb ist eine Stadtzahl immer nur der erste Rahmen.',
      },
      {
        question: 'Wie bekomme ich eine realistische Einschätzung?',
        answer:
          'Eine realistische Einschätzung verbindet aktuelle Vergleichswerte mit einer Prüfung des konkreten Objekts vor Ort. Bei Bedarf messen wir Wohnfläche auf und prüfen die Unterlagen vor der Vermarktung.',
      },
      {
        question: 'Was bedeutet ein positiver Markttrend für meinen Verkauf?',
        answer:
          'Ein positiver Trend zeigt, dass sich das durchschnittliche Preisniveau zuletzt nach oben bewegt hat. Er garantiert aber keinen bestimmten Verkaufspreis: Käufer vergleichen Zustand, Energiequalität, Mikrolage und Unterlagen sehr genau.',
      },
      {
        question: 'Warum ist der richtige Angebotspreis so wichtig?',
        answer:
          'Der Angebotspreis bestimmt, welche Käufer aufmerksam werden und wie viel Nachfrage in den ersten Vermarktungswochen entsteht. Ein zu hoher Start kann Interessenten abschrecken; ein zu niedriger Preis kann unnötig Verhandlungsspielraum verschenken.',
      },
    ],
  },
  en: {
    metadata: {
      title: 'Property market — prices per m² | Immonation',
      description:
        'Purchase prices, regional context, and value factors for property in Nuremberg, Fürth, Erlangen, Zirndorf, and Schwabach.',
    },
    hero: {
      eyebrow: 'Property market',
      title: 'Purchase prices in the metropolitan region',
      lede: 'Average purchase prices per m² — a first orientation based on regional market data.',
    },
    answer:
      'The square-metre prices below provide a first frame of reference for apartments and houses in the region. They do not replace a personal valuation: location, condition, fittings, year built, land, floor, and demand determine where an individual property sits.',
    source: 'based on Immonation brokerage data',
    interpretation: {
      title: 'What the figures reveal about the regional market',
      lede: 'An average makes cities comparable. For an individual property, however, the decisive question is why it sits above or below that average.',
      items: [
        {
          title: 'Erlangen sets the upper price level in this overview',
          text: 'At €5,400/m² for apartments and €5,900/m² for houses, Erlangen leads the comparison values shown here. This reflects stronger willingness to pay in sought-after locations — not that every property there automatically achieves the top figure.',
        },
        {
          title: 'Regional differences remain material',
          text: 'For comparable property types, the five cities differ by several hundred euros per square metre. Even within the metropolitan area, the precise location can therefore make a noticeable difference to the total price.',
        },
        {
          title: 'A positive trend does not replace a property review',
          text: 'The recorded 12-month trends are positive in all five cities. At the same time, buyers are more selective: energy performance, improvements, layout, and complete documents influence whether a property sits above or below its local reference value.',
        },
      ],
    },
    factors: {
      title: 'Six factors that move the price per square metre',
      lede: 'Two properties on the same street can achieve very different sale prices. These characteristics explain the distance from a calculated average.',
      items: [
        {
          title: 'Micro-location',
          text: 'Street, noise, outlook, transport links, and the immediate setting often matter more than the city name alone.',
        },
        {
          title: 'Condition and energy performance',
          text: 'Improvements, heating, insulation, and foreseeable investment affect buyers’ budgets and willingness to pay.',
        },
        {
          title: 'Area and layout',
          text: 'Well-used, correctly measured living space is worth more than square metres without a practical layout.',
        },
        {
          title: 'Plot and outdoor space',
          text: 'Size, shape, orientation, privacy, and planning rights add to a house’s value beyond its living area.',
        },
        {
          title: 'Documents and legal clarity',
          text: 'Floor plans, area calculations, energy certificates, and clarified rights make financing and purchase decisions easier.',
        },
        {
          title: 'Marketing and demand',
          text: 'Positioning, presentation, buyer qualification, and negotiation all help determine the price ultimately achieved.',
        },
      ],
    },
    sellerPath: {
      title: 'From market overview to a reliable pricing strategy',
      lede: 'A sound pricing decision takes three steps: understand the market, assess the property, and align the marketing strategy with both.',
      steps: [
        {
          title: 'Place the region and property type',
          text: 'City values and the price atlas provide an initial corridor for the location and type of property.',
        },
        {
          title: 'Assess the actual property',
          text: 'Condition, fittings, areas, plot, documents, and special features are reviewed on site.',
        },
        {
          title: 'Set the asking price strategically',
          text: 'The launch price must create demand while protecting a realistic margin for negotiation.',
        },
      ],
      reportLabel: 'Open the detailed market report',
    },
    methodology: {
      title: 'How to read these values',
      paragraphs: [
        'This overview summarises Immonation’s regional brokerage data as average orientation values. It is not an official rent or purchase-price index and does not constitute a valuation of a specific plot or building.',
        'Asking prices, calculated square-metre values, and achieved sale prices are not the same. For a reliable assessment, we combine comparison data with a property review, documentation, current demand, and the specific micro-location.',
      ],
      reportLabel: 'Explore the data basis and market movement',
    },
    labels: {
      apartment: 'Apartment',
      house: 'House',
      trend: '12-month trend',
      citySectionEyebrow: 'Property market',
      citySectionTitle: 'A first frame by city',
      citySectionText: 'The five city values at a glance — separated into apartments and houses.',
      cityLink: 'Open city page',
      moreEyebrow: 'Go deeper',
      valuationTitle: 'What is your property really worth?',
    },
    cta: {
      title: 'The average is only the beginning',
      text: 'A reliable pricing strategy starts with the property itself. We assess location, condition, documents, and demand personally.',
      cityLink: 'All cities & districts',
      valuation: 'Request a property valuation',
      atlas: 'Explore the price atlas by district',
    },
    faqTitle: 'Frequently asked questions about purchase prices',
    faq: [
      {
        question: 'Are square-metre prices the same as the sale price?',
        answer:
          'No. A square-metre price is an orientation. Plot, age, condition, fittings, layout, floor, and micro-location can change the actual purchase price significantly.',
      },
      {
        question: 'Why do prices vary within one city?',
        answer:
          'Districts, streets, and individual plots differ in demand, noise, connections, building quality, and residential setting. A city-wide figure is therefore only the starting frame.',
      },
      {
        question: 'How do I get a realistic assessment?',
        answer:
          'A realistic assessment combines current comparable values with an on-site review of the actual property. Where needed, we measure living space and check the documents before marketing begins.',
      },
      {
        question: 'What does a positive market trend mean for my sale?',
        answer:
          'A positive trend shows that the average price level has recently moved upwards. It does not guarantee a specific sale price: buyers compare condition, energy performance, micro-location, and documentation carefully.',
      },
      {
        question: 'Why is the right asking price so important?',
        answer:
          'The asking price determines which buyers take notice and how much demand develops in the first weeks of marketing. Starting too high can deter buyers, while starting too low can give away valuable negotiating room.',
      },
    ],
  },
}

function formatRange(value: HousingYear, locale: Locale) {
  const formatter = new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
  return `${formatter.format(value.lowK * 1000)} – ${formatter.format(value.highK * 1000)}`
}

export function getMarketDataCopy(locale: Locale) {
  const copy = MARKET_DATA_COPY[locale] ?? MARKET_DATA_COPY.de
  const table = HOUSING_MARKET.flatMap((series) =>
    series.years.map((year) => ({
      city: series.city[locale],
      propertyType: series.propertyType[locale],
      year: year.year,
      range: formatRange(year, locale),
    })),
  )
  return { ...copy, houses: { ...copy.houses, table } }
}

export function getMarketOverviewCopy(locale: Locale) {
  return MARKET_OVERVIEW_COPY[locale]
}

export function formatCurrency(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatThousands(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB').format(value)
}

export function formatPercent(value: number, locale: Locale) {
  return (
    new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
      signDisplay: 'always',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value) + ' %'
  )
}

export function getHousingComparison() {
  const cities = [...new Set(HOUSING_MARKET.map((series) => series.city.de))]
    .map((city) => {
      const citySeries = HOUSING_MARKET.filter((series) => series.city.de === city)
      const yearValue = (year: number) => {
        const values = citySeries.flatMap((series) => {
          const match = series.years.find((item) => item.year === year)
          return match ? [(match.lowK + match.highK) / 2] : []
        })
        return values.reduce((sum, value) => sum + value, 0) / values.length
      }
      const level = Math.round(yearValue(2026))
      const base = yearValue(2024)
      return {
        city,
        level,
        /** 2024 level the trend is measured against, in thousands of euros. */
        base: Math.round(base),
        trend: Math.round(((level / base) * 100 - 100) * 10) / 10,
        series: citySeries,
      }
    })
    .sort((a, b) => b.level - a.level)

  return cities
}

export type HousingComparison = ReturnType<typeof getHousingComparison>[number]

export function getApartmentSummary(city: ApartmentMarketCity) {
  const count = city.years.reduce((sum, year) => sum + year.count, 0)
  const lowK = Math.min(...city.years.map((year) => year.lowK))
  const highK = Math.max(...city.years.map((year) => year.highK))
  return { count, lowK, highK }
}

/** Compact range in thousands, e.g. "490–680"; the unit is stated once per chart or table. */
export function formatThousandsRange(lowK: number, highK: number, locale: Locale) {
  return lowK === highK
    ? formatThousands(lowK, locale)
    : `${formatThousands(lowK, locale)}–${formatThousands(highK, locale)}`
}

/** Key figures for the report masthead, all derived from the published data sets. */
export function getMarketDataGlance() {
  const cities = new Set([
    ...HOUSING_MARKET.map((series) => series.city.de),
    ...APARTMENT_MARKET.map((city) => city.city.de),
  ])
  const years = [
    ...HOUSING_MARKET.flatMap((series) => series.years),
    ...APARTMENT_MARKET.flatMap((city) => city.years),
  ].map((item) => item.year)
  const levels = getHousingComparison().map((city) => city.level)

  return {
    cityCount: cities.size,
    firstYear: Math.min(...years),
    lastYear: Math.max(...years),
    apartmentCount: APARTMENT_MARKET.reduce(
      (sum, city) => sum + getApartmentSummary(city).count,
      0,
    ),
    levelLowK: Math.min(...levels),
    levelHighK: Math.max(...levels),
  }
}
