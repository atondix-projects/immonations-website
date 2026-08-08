import type { Locale } from '@/i18n/routing'

export type SellerGuide = {
  locale: Locale
  slug: string
  translationKey: string
  title: string
  description: string
  eyebrow: string
  lede: string
  answer: string
  highlights: string[]
  sections: Array<{ heading: string; body: string }>
  documents: string[]
  serviceType: string
}

const guides: Record<Locale, SellerGuide[]> = {
  de: [
    {
      locale: 'de',
      slug: 'haus',
      translationKey: 'sell-house',
      title: 'Haus verkaufen in Nürnberg, Fürth, Erlangen & Zirndorf',
      description:
        'Haus verkaufen in Nürnberg, Fürth, Erlangen und Zirndorf: kostenlose Bewertung, Wohnflächenberechnung und professionelle Vermarktung.',
      eyebrow: 'Hausverkauf',
      lede: 'Ein Haus ist selten nur ein Objekt – meist steckt ein halbes Leben darin. Wer Grundstück, Bausubstanz und Energiestand sauber belegt, verhandelt aus einer anderen Position.',
      answer:
        'Beim Hausverkauf zählt die Vorbereitung: Wir klären Wert und Unterlagen, ordnen Energiestandard und Grundstück ein und sprechen Familien mit einer überzeugenden, realistischen Präsentation an.',
      highlights: ['Bodenwert und Grundstück prüfen', 'Energiezustand ehrlich einordnen', 'Familien und Finanzierung qualifizieren'],
      sections: [
        { heading: 'Das Grundstück ist ein wesentlicher Werttreiber', body: 'Bodenrichtwert, Grundstücksgrenzen und Zuschnitt prägen den Verkaufspreis erheblich. Wir ordnen sie gemeinsam mit Lage und Bausubstanz ein, damit Sie Ihren Verhandlungsspielraum kennen.' },
        { heading: 'Energiestandard und Flächen belastbar belegen', body: 'Heizungsalter, Dämmung und Energieausweis sind zentrale Käuferfragen. Bei Anbauten oder Ausbauten sorgt eine aktuelle Wohn- und Nutzflächenberechnung für Klarheit und reduziert Haftungsrisiken.' },
        { heading: 'Familien gezielt und verlässlich ansprechen', body: 'Familien kaufen emotional und finanzieren oft eng. Video, 360°-Rundgang und eine Bonitätsprüfung vor der Besichtigung schaffen einen klaren Ablauf bis zum Notartermin.' },
      ],
      documents: ['Grundbuchauszug', 'Flurkarte oder amtlicher Lageplan', 'Energieausweis', 'Baupläne und Baubeschreibung', 'Wohn- und Nutzflächenberechnung', 'Nachweise über Modernisierungen', 'Grundsteuerbescheid', 'Gegebenenfalls Baulastenauskunft'],
      serviceType: 'Hausverkauf',
    },
    {
      locale: 'de',
      slug: 'wohnung',
      translationKey: 'sell-apartment',
      title: 'Eigentumswohnung verkaufen in Nürnberg, Fürth, Erlangen & Zirndorf',
      description:
        'Eigentumswohnung verkaufen in Nürnberg, Fürth, Erlangen und Zirndorf: WEG-Unterlagen, Wohnfläche und geprüfte Käufer.',
      eyebrow: 'Wohnungsverkauf',
      lede: 'Beim Wohnungsverkauf entscheidet nicht nur die Wohnung, sondern die Eigentümergemeinschaft dahinter. Käufer und Banken prüfen Protokolle und Rücklage genauso genau wie das Bad.',
      answer:
        'Wir bereiten Wohnung und WEG transparent auf, prüfen Flächen und richten die Strategie bewusst auf Eigennutzer oder Kapitalanleger aus – je nachdem, ob die Wohnung frei oder vermietet ist.',
      highlights: ['WEG-Unterlagen vollständig aufbereiten', 'Wohnfläche belastbar prüfen', 'Eigennutzer oder Anleger gezielt ansprechen'],
      sections: [
        { heading: 'Die WEG verkauft mit', body: 'Teilungserklärung, Protokolle, Hausgeld und Instandhaltungsrücklage beeinflussen den Preis. Eine gesunde Rücklage ist ein Argument; anstehende Sonderumlagen sollten vor der Vermarktung klar sein.' },
        { heading: 'Fläche und Unterlagen verlässlich machen', body: 'Gerade bei Dachgeschoss- und Maisonettewohnungen können die Angaben der Teilungserklärung von der tatsächlichen Wohnfläche abweichen. Eine aktuelle Berechnung schützt vor Unsicherheit und Haftung.' },
        { heading: 'Zielgruppe und Vermietung früh entscheiden', body: 'Selbstnutzer kaufen Wohngefühl, Kapitalanleger Rendite. Eine vermietete Wohnung ist für Anleger oft besonders interessant, während freie Wohnungen andere Käufer ansprechen. Das bestimmt Inszenierung und Preisstrategie.' },
      ],
      documents: ['Grundbuchauszug', 'Teilungserklärung und Aufteilungsplan', 'Protokolle der Eigentümerversammlungen der letzten drei Jahre', 'Aktuelle Hausgeldabrechnung', 'Wirtschaftsplan', 'Stand der Instandhaltungsrücklage', 'Energieausweis', 'Wohnflächenberechnung und Grundriss', 'Gegebenenfalls Mietvertrag'],
      serviceType: 'Wohnungsverkauf',
    },
    {
      locale: 'de',
      slug: 'grundstueck',
      translationKey: 'sell-land',
      title: 'Grundstück verkaufen in Nürnberg, Fürth, Erlangen & Zirndorf',
      description:
        'Grundstück verkaufen in Nürnberg, Fürth, Erlangen und Zirndorf: Baurecht prüfen, Bodenrichtwert einordnen und passende Käufer ansprechen.',
      eyebrow: 'Grundstücksverkauf',
      lede: 'Bei Grundstücken verkaufen Sie kein Gebäude, sondern eine Möglichkeit. Was darauf gebaut werden darf, entscheidet über den Preis – und genau das wissen viele Eigentümer nicht genau.',
      answer:
        'Wir klären Baurecht, Bodenrichtwert, Erschließung und Teilbarkeit und bereiten das tatsächliche Potenzial so auf, dass private Bauherren oder professionelle Käufer belastbar entscheiden können.',
      highlights: ['Baurecht und Bebauungspotenzial prüfen', 'Bodenrichtwert richtig einordnen', 'Teilung und Käuferzielgruppe bewerten'],
      sections: [
        { heading: 'Baurecht bestimmt den Preis', body: 'Bebauungsplan, Geschossflächenzahl und Grundflächenzahl bestimmen, was möglich ist. Ein Grundstück mit Baurecht für zwei Doppelhaushälften ist ein anderes Produkt als eine Gartenfläche.' },
        { heading: 'Der Bodenrichtwert ist der Startpunkt', body: 'Der amtliche Bodenrichtwert liefert Orientierung, aber nicht den Verkaufspreis. Zuschnitt, Erschließung, Altlasten und tatsächliche Bebaubarkeit können den realen Wert deutlich verändern.' },
        { heading: 'Professionelle Käufer brauchen belastbare Optionen', body: 'Bauträger rechnen in möglichen Einheiten und Verkaufserlösen. Eine klare Darstellung der Bebauung und die Prüfung einer möglichen Grundstücksteilung schaffen die Grundlage für Verhandlungen auf Augenhöhe.' },
      ],
      documents: ['Grundbuchauszug', 'Flurkarte oder amtlicher Lageplan', 'Auszug aus dem Bebauungsplan', 'Bodenrichtwert-Auskunft', 'Erschließungsnachweise', 'Altlastenauskunft', 'Gegebenenfalls Baugenehmigung oder Bauvoranfrage', 'Vermessungsunterlagen'],
      serviceType: 'Grundstücksverkauf',
    },
    {
      locale: 'de',
      slug: 'mehrfamilienhaus',
      translationKey: 'sell-apartment-building',
      title: 'Mehrfamilienhaus & Anlageobjekt verkaufen in der Metropolregion Nürnberg',
      description:
        'Mehrfamilienhaus oder Anlageobjekt in der Metropolregion Nürnberg verkaufen: Ertragswert, Faktor und diskrete Vermarktung.',
      eyebrow: 'Investmentverkauf',
      lede: 'Ein Mehrfamilienhaus wird nicht emotional gekauft, sondern gerechnet. Wer seine Zahlen belastbar aufbereitet, verkauft besser; geschönte Zahlen scheitern in der Due Diligence.',
      answer:
        'Wir strukturieren Miet-, Ertrags- und Objektdaten, zeigen Potenziale realistisch und sprechen auf Wunsch diskret die passende Investorenzielgruppe an.',
      highlights: ['Miet- und Ertragsdaten nachvollziehbar aufbereiten', 'Potenziale realistisch darstellen', 'Diskret an Investoren vermarkten'],
      sections: [
        { heading: 'Die Zahlen sind das Exposé', body: 'Mieterliste, Ist- und Soll-Miete, Faktor, Rendite und Instandhaltungsstau entscheiden, ob Anleger weiterprüfen. Plausible Daten schaffen mehr Vertrauen als pauschale Renditeversprechen.' },
        { heading: 'Mietpotenzial und Substanz ehrlich zeigen', body: 'Untervermietete Bestände und Denkmalobjekte können für besondere Käufergruppen interessant sein. Entscheidend ist, was rechtlich und praktisch erreichbar ist und welche Instandhaltung absehbar bleibt.' },
        { heading: 'Diskrete Vermarktung bewusst planen', body: 'Bei vermieteten Objekten kann die Ansprache auf ein aktives Anlegernetzwerk begrenzt werden. So lassen sich Unterlagenzugriff, Besichtigungen und Kommunikation strukturiert und mit möglichst wenig Unruhe organisieren.' },
      ],
      documents: ['Grundbuchauszug', 'Mieterliste mit Ist-Mieten', 'Mietverträge', 'Nebenkostenabrechnungen der letzten zwei bis drei Jahre', 'Nachweise über Instandhaltung und Sanierungen', 'Energieausweis', 'Grundrisse und Wohnflächenberechnung', 'Versicherungsnachweise', 'Gegebenenfalls Denkmalschutzauflagen'],
      serviceType: 'Verkauf eines Mehrfamilienhauses',
    },
  ],
  en: [
    {
      locale: 'en', slug: 'house', translationKey: 'sell-house', title: 'Selling a house in Nuremberg, Fürth, Erlangen & Zirndorf',
      description: 'Sell a house in Nuremberg, Fürth, Erlangen, and Zirndorf with a considered valuation, clear documentation, and professional marketing.', eyebrow: 'House sale',
      lede: 'A house is rarely just a property – it often holds a lifetime of memories. Clear evidence of the plot, building fabric, and energy condition puts you in a stronger negotiating position.',
      answer: 'House sales benefit from preparation. We clarify value and documents, assess the energy standard and plot, and present the home realistically to qualified family buyers.',
      highlights: ['Assess plot and land value', 'Position energy condition honestly', 'Qualify family buyers and financing'],
      sections: [
        { heading: 'The plot is a key value driver', body: 'The standard land value, boundaries, and plot shape have a major impact on the sale price. We assess them alongside location and building condition so you understand your negotiating position.' },
        { heading: 'Document energy condition and areas reliably', body: 'Heating age, insulation, and the energy certificate are central buyer questions. Where there are extensions or conversions, an up-to-date area calculation creates clarity and reduces risk.' },
        { heading: 'Reach families with a reliable process', body: 'Families often buy emotionally and finance carefully. Video, a 360° tour, and financing checks before viewings create a clear path through to the notary appointment.' },
      ],
      documents: ['Land-registry extract', 'Cadastral map or official site plan', 'Energy certificate', 'Building plans and specification', 'Living and usable area calculation', 'Evidence of improvements', 'Property-tax notice', 'Where applicable, information on registered building burdens'],
      serviceType: 'House sale',
    },
    {
      locale: 'en', slug: 'apartment', translationKey: 'sell-apartment', title: 'Selling a condominium in Nuremberg, Fürth, Erlangen & Zirndorf',
      description: 'Sell a condominium in Nuremberg, Fürth, Erlangen, and Zirndorf with complete association records, confirmed areas, and qualified buyers.', eyebrow: 'Apartment sale',
      lede: 'When selling an apartment, the owners’ association matters as much as the home itself. Buyers and their lenders examine minutes and reserves as closely as the bathroom.',
      answer: 'We prepare both the apartment and association records transparently, confirm areas, and tailor the strategy to owner-occupiers or investors depending on whether the apartment is vacant or let.',
      highlights: ['Prepare association records completely', 'Confirm the living area', 'Target owner-occupiers or investors'],
      sections: [
        { heading: 'The owners’ association sells with the home', body: 'The declaration of division, meeting minutes, service charges, and maintenance reserve all affect the price. A healthy reserve is a selling point; foreseeable special levies should be clear before marketing.' },
        { heading: 'Make areas and documents reliable', body: 'Especially in top-floor and duplex apartments, the declared area can differ from the actual living area. A current calculation reduces uncertainty and liability risk.' },
        { heading: 'Choose the buyer group early', body: 'Owner-occupiers buy a lifestyle; investors buy income. A let apartment can be especially attractive to investors, while vacant homes reach a different audience. This determines presentation and pricing.' },
      ],
      documents: ['Land-registry extract', 'Declaration of division and allocation plan', 'Owners’ meeting minutes for the last three years', 'Current service-charge statement', 'Annual budget', 'Maintenance reserve balance', 'Energy certificate', 'Living area calculation and floor plan', 'Where applicable, tenancy agreement'],
      serviceType: 'Apartment sale',
    },
    {
      locale: 'en', slug: 'land', translationKey: 'sell-land', title: 'Selling land in Nuremberg, Fürth, Erlangen & Zirndorf',
      description: 'Sell land in Nuremberg, Fürth, Erlangen, and Zirndorf with a clear assessment of planning rights, standard land value, and suitable buyers.', eyebrow: 'Land sale',
      lede: 'With land, you are not selling a building but a possibility. What can be built on it determines the price – and many owners do not know that potential in detail.',
      answer: 'We clarify planning rights, standard land value, access, and subdivision, then present the substantiated potential so private builders and professional buyers can make informed decisions.',
      highlights: ['Assess planning rights and buildability', 'Put standard land value in context', 'Evaluate subdivision and buyer group'],
      sections: [
        { heading: 'Planning rights determine the price', body: 'The local plan, floor-area ratio, and site-coverage ratio determine what is possible. Land approved for two semi-detached homes is a different product from garden land.' },
        { heading: 'The standard land value is a starting point', body: 'The official standard land value provides orientation, not the sale price. Plot shape, access to utilities, contamination, and actual buildability can materially change the value.' },
        { heading: 'Professional buyers need substantiated options', body: 'Developers calculate potential units and sale proceeds. A clear presentation of buildability and a check of possible subdivision create a sound basis for negotiations.' },
      ],
      documents: ['Land-registry extract', 'Cadastral map or official site plan', 'Extract from the local development plan', 'Standard land value information', 'Evidence of servicing and utility access', 'Contamination information', 'Where applicable, planning permission or preliminary approval', 'Survey records'],
      serviceType: 'Land sale',
    },
    {
      locale: 'en', slug: 'apartment-building', translationKey: 'sell-apartment-building', title: 'Selling an apartment building or investment property in the Nuremberg metropolitan region',
      description: 'Sell an apartment building or investment property in the Nuremberg metropolitan region with clear income data, valuation, and discreet marketing.', eyebrow: 'Investment sale',
      lede: 'An apartment building is purchased on the numbers, not emotion. Owners who prepare them reliably sell better; polished numbers fall apart during due diligence.',
      answer: 'We structure tenancy, income, and property data, present potential realistically, and, if desired, approach the right investor group discreetly.',
      highlights: ['Structure tenancy and income data', 'Present potential realistically', 'Market discreetly to investors'],
      sections: [
        { heading: 'The numbers are the brochure', body: 'Rent roll, actual and potential rent, multiplier, yield, and maintenance backlog determine whether investors continue their review. Plausible records build more confidence than broad yield promises.' },
        { heading: 'Show rental potential and condition honestly', body: 'Under-rented stock and listed buildings can appeal to specific buyers. The essential question is what is legally and practically achievable and what maintenance remains foreseeable.' },
        { heading: 'Plan discreet marketing deliberately', body: 'For tenanted buildings, outreach can be limited to an active investor network. This gives a controlled process for document access, viewings, and communication with as little disruption as possible.' },
      ],
      documents: ['Land-registry extract', 'Rent roll with current rents', 'Tenancy agreements', 'Operating-cost statements for the last two to three years', 'Evidence of maintenance and refurbishment', 'Energy certificate', 'Floor plans and living area calculation', 'Insurance records', 'Where applicable, listed-building requirements'],
      serviceType: 'Apartment-building sale',
    },
  ],
}

export function listSellerGuides(locale: Locale) {
  return guides[locale]
}

export function listAllSellerGuides() {
  return Object.values(guides).flat()
}

export function getSellerGuide(locale: Locale, slug: string) {
  return guides[locale].find((guide) => guide.slug === slug)
}

export function getSellerGuideAlternates(guide: SellerGuide) {
  const paths: Partial<Record<Locale, string>> = {}
  for (const locale of Object.keys(guides) as Locale[]) {
    const match = guides[locale].find(
      (candidate) => candidate.translationKey === guide.translationKey,
    )
    if (match) paths[locale] = match.slug
  }
  return paths
}

/** Maps a seller guide to its page-level FAQ profile key. */
export function getSellerGuideFaqPageKey(
  guide: SellerGuide,
): 'sell/haus' | 'sell/wohnung' | 'sell/land' | 'sell/mehrfamilienhaus' {
  switch (guide.translationKey) {
    case 'sell-apartment':
      return 'sell/wohnung'
    case 'sell-land':
      return 'sell/land'
    case 'sell-apartment-building':
      return 'sell/mehrfamilienhaus'
    case 'sell-house':
    default:
      return 'sell/haus'
  }
}