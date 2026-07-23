import type { Locale } from '@/i18n/routing'

export type LocationGuide = {
  locale: Locale
  slug: string
  name: string
  title: string
  description: string
  lede: string
  answer: string
  localFocus: string[]
  sections: Array<{ heading: string; body: string }>
  faq: Array<{ question: string; answer: string }>
}

const cityFacts = {
  zirndorf: {
    name: 'Zirndorf',
    de: {
      context:
        'Als Unternehmensstandort ist Zirndorf der Ausgangspunkt unserer Beratung. Gewachsene Wohnlagen, familiengeprägte Quartiere und die Nähe zu Fürth und Nürnberg verlangen eine mikrolokale Einordnung.',
      focuses: [
        'Stadtteile und Mikrolagen',
        'Eigennutzer und Familien',
        'Kurze Wege zum lokalen Team',
      ],
    },
    en: {
      context:
        'Zirndorf is our home base. Established neighborhoods, family-oriented residential areas, and proximity to Fürth and Nuremberg require a micro-local assessment.',
      focuses: [
        'Neighborhood context',
        'Owner-occupiers and families',
        'Direct access to the local team',
      ],
    },
  },
  nuernberg: {
    name: 'Nürnberg',
    de: {
      context:
        'Nürnberg vereint dichte innerstädtische Quartiere, Altbau, Einfamilienhauslagen und große Unterschiede zwischen den Mikrolagen. Eine pauschale Stadtaussage reicht für die Verkaufsstrategie nicht aus.',
      focuses: [
        'Quartiersgenaue Positionierung',
        'Altbau und Eigentumswohnungen',
        'Breite regionale Käufernachfrage',
      ],
    },
    en: {
      context:
        'Nuremberg combines dense urban districts, period apartments, family-home areas, and major differences between micro-locations. A city-wide generalization is not enough for a sales strategy.',
      focuses: [
        'District-specific positioning',
        'Period homes and apartments',
        'Broad regional buyer demand',
      ],
    },
  },
  fuerth: {
    name: 'Fürth',
    de: {
      context:
        'Fürth verbindet Gründerzeitquartiere, ruhige Wohnlagen und eine enge Verflechtung mit Nürnberg und dem Landkreis. Objektart, Gebäudezustand und unmittelbares Umfeld prägen die Nachfrage.',
      focuses: [
        'Altbau und Denkmalkontext',
        'Wohnlagen in Stadt und Landkreis',
        'Zielgruppen zwischen Fürth und Nürnberg',
      ],
    },
    en: {
      context:
        'Fürth combines late-19th-century districts, quieter residential areas, and close links with Nuremberg and the surrounding county. Property type, condition, and immediate setting shape demand.',
      focuses: [
        'Period-property context',
        'City and county locations',
        'Buyer groups across Fürth and Nuremberg',
      ],
    },
  },
  erlangen: {
    name: 'Erlangen',
    de: {
      context:
        'Erlangen ist durch Wissenschaft, Technologie, internationale Arbeitgeber und knappen Wohnraum geprägt. Für Verkauf und Käuferansprache sind Lage, Pendelwege und Objektqualität besonders relevant.',
      focuses: [
        'Wissenschafts- und Technologiestandort',
        'Internationale Käufergruppen',
        'Wohnungen und familiengerechte Häuser',
      ],
    },
    en: {
      context:
        'Erlangen is shaped by science, technology, international employers, and limited housing supply. Location, commuting links, and property quality are especially relevant to positioning.',
      focuses: [
        'Science and technology hub',
        'International buyer groups',
        'Apartments and family homes',
      ],
    },
  },
} as const

function createLocation(locale: Locale, slug: keyof typeof cityFacts): LocationGuide {
  const city = cityFacts[slug]
  const localized = city[locale]
  const isGerman = locale === 'de'

  return {
    locale,
    slug,
    name: city.name,
    title: isGerman ? `Immobilienmakler für ${city.name}` : `Real-estate agent for ${city.name}`,
    description: isGerman
      ? `Immobilienverkauf und Immobilienbewertung in ${city.name}: lokal eingeordnet, professionell vermarktet und persönlich begleitet.`
      : `Property sales and valuation in ${city.name}: locally assessed, professionally marketed, and personally guided.`,
    lede: localized.context,
    answer: isGerman
      ? `Immonation begleitet Eigentümer in ${city.name} mit Vor-Ort-Bewertung, einer objektbezogenen Verkaufsstrategie, Premium-Vermarktung und einem festen Ansprechpartner bis zum Notartermin.`
      : `Immonation supports owners in ${city.name} with an on-site valuation, property-specific sales strategy, premium marketing, and one dedicated contact through the notary appointment.`,
    localFocus: [...localized.focuses],
    sections: isGerman
      ? [
          {
            heading: `Immobilien in ${city.name} richtig einordnen`,
            body: `Für eine belastbare Einschätzung betrachten wir nicht nur die Stadt, sondern die konkrete Straße, das Umfeld, die Objektart, den Zustand und die aktuelle Zielgruppe. Allgemeine Quadratmeterpreise ersetzen diese Prüfung nicht.`,
          },
          {
            heading: 'Vom Marktwert zur Verkaufsstrategie',
            body: 'Eine Bewertung beantwortet die Preisfrage; die Strategie klärt Zielgruppe, Unterlagen, Präsentation, Reichweite und Zeitplan. Beides wird vor dem Vermarktungsstart aufeinander abgestimmt.',
          },
          {
            heading: 'Persönlich in der Metropolregion begleitet',
            body: `Das Team in Zirndorf koordiniert Objektaufnahme, Medien, Interessentenprüfung, Besichtigungen und Vertragsvorbereitung. Eigentümer in ${city.name} behalten dabei einen festen Ansprechpartner.`,
          },
        ]
      : [
          {
            heading: `Assessing property in ${city.name}`,
            body: 'A reliable assessment considers the specific street, surroundings, property type, condition, and current buyer group. General square-metre figures do not replace that review.',
          },
          {
            heading: 'From market value to sales strategy',
            body: 'A valuation addresses price; the strategy defines buyers, documents, presentation, reach, and timing. Both are aligned before marketing begins.',
          },
          {
            heading: 'Personal support across the metropolitan region',
            body: `The Zirndorf team coordinates property onboarding, media, prospect qualification, viewings, and contract preparation. Owners in ${city.name} retain one dedicated contact.`,
          },
        ],
    faq: isGerman
      ? [
          {
            question: `Wie bewertet Immonation eine Immobilie in ${city.name}?`,
            answer:
              'Wir verbinden Unterlagen, Vergleichswerte und Marktnachfrage mit einer persönlichen Vor-Ort-Einschätzung von Zustand, Ausstattung und Mikrolage.',
          },
          {
            question: `Welche Immobilien vermittelt Immonation in ${city.name}?`,
            answer:
              'Wir begleiten insbesondere den Verkauf von Häusern, Eigentumswohnungen, Grundstücken und Mehrfamilienhäusern. Die konkrete Eignung klären wir im Erstgespräch.',
          },
          {
            question: 'Was ist der erste Schritt?',
            answer:
              'Starten Sie mit einer unverbindlichen Bewertung oder einem kurzen Gespräch zu Objekt, Zeitplan und Verkaufsziel.',
          },
        ]
      : [
          {
            question: `How does Immonation value a property in ${city.name}?`,
            answer:
              'We combine documents, comparable evidence, and demand with an on-site assessment of condition, finish, and micro-location.',
          },
          {
            question: `Which properties does Immonation sell in ${city.name}?`,
            answer:
              'We primarily support sales of houses, apartments, land, and apartment buildings. We confirm the fit in an initial conversation.',
          },
          {
            question: 'What is the first step?',
            answer:
              'Start with a non-binding valuation or a short conversation about the property, timing, and your sales objective.',
          },
        ],
  }
}

const locationSlugs = Object.keys(cityFacts) as Array<keyof typeof cityFacts>

export function listLocations(locale: Locale) {
  return locationSlugs.map((slug) => createLocation(locale, slug))
}

export function listAllLocations() {
  return (['de', 'en'] as const).flatMap((locale) => listLocations(locale))
}

export function getLocation(locale: Locale, slug: string) {
  if (!locationSlugs.includes(slug as keyof typeof cityFacts)) return undefined
  return createLocation(locale, slug as keyof typeof cityFacts)
}
