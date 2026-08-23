import type { NavigationHref } from './navigation'
import { SAFE_CATALOG_OVERRIDES } from './safe-catalog-pages'

export type CatalogPageId =
  | 'selling-situations'
  | 'buyer-search'
  | 'virtual-tour'
  | 'ai'
  | 'warning-signs'
  | 'appointment'
  | 'market-data'
  | 'market'
  | 'glossary'
  | 'magazine'
  | 'sold'
  | 'reviews'
  | 'testimonials'
  | 'awards'
  | 'engagement'
  | 'group'
  | 'partners'
  | 'directions'
  | 'staging'
  | 'video'
  | 'social'
  | 'html-sitemap'
  | 'seo'

export type LocalizedPage = {
  eyebrow: string
  title: string
  description: string
  lede: string
  answer: string
  sectionTitles: string[]
  sectionTexts?: string[]
  sectionHrefs?: NavigationHref[]
  faq: Array<{ question: string; answer: string }>
  ctaTitle: string
  ctaText: string
  ctaLabel: string
}

export type CatalogPageContent = LocalizedPage & {
  id: CatalogPageId
  preview?: 'assistant' | 'appointment'
  ctaHref: NavigationHref
}

export type PageDefinition = {
  de: LocalizedPage
  en: LocalizedPage
  preview?: CatalogPageContent['preview']
  ctaHref?: NavigationHref
}

const DEFINITIONS: Record<CatalogPageId, PageDefinition> = {
  'selling-situations': definition(
    'Verkaufsanlässe',
    'Selling situations',
    'Der passende Weg für Ihre Situation',
    'The right route for your situation',
    'Trennung, Erbfall, Pflege, Sanierung oder finanzielle Belastung verändern den Verkaufsprozess. Zwölf eigene Ratgeber zeigen, welche Entscheidungen zuerst anstehen.',
    'Separation, inheritance, care needs, renovation, or financial pressure change the sales process. Twelve dedicated guides explain the first decisions.',
    ['Situation klären', 'Wertbasis schaffen', 'Nächste Schritte planen'],
    ['Clarify the situation', 'Establish a value basis', 'Plan the next steps'],
  ),
  'buyer-search': definition(
    'Aktive Suchkunden',
    'Active buyers',
    'Passt Ihre Immobilie zu einem Suchprofil?',
    'Does your property match an active search?',
    'Immonation führt konkrete Suchprofile für Häuser, Wohnungen, Grundstücke und Anlageobjekte. Ein Abgleich zeigt, ob ein diskreter Verkauf ohne öffentliche Vermarktung sinnvoll ist.',
    'Immonation maintains active search profiles for homes, apartments, land, and investments. A match indicates whether a discreet sale without public marketing could work.',
    ['Suchprofil abgleichen', 'Käufer qualifizieren', 'Diskret anbieten'],
    ['Match the search', 'Qualify buyers', 'Offer discreetly'],
  ),
  'virtual-tour': definition(
    'Virtuelle Besichtigung',
    'Virtual viewing',
    '360°-Rundgänge für ernsthafte Käufer',
    '360° tours for serious buyers',
    'Ein virtueller Rundgang macht Raumfolgen und Proportionen vor dem Vor-Ort-Termin verständlich. Interessenten können besser vorqualifizieren, Eigentümer vermeiden unnötige Besichtigungen.',
    'A virtual tour makes room sequences and proportions clear before an on-site visit. Buyers can pre-qualify themselves and owners avoid unnecessary appointments.',
    ['Objekt aufnehmen', 'Rundgang veröffentlichen', 'Besichtigungen fokussieren'],
    ['Capture the property', 'Publish the tour', 'Focus viewings'],
  ),
  ai: definition(
    'Immobilien-KI',
    'Property AI',
    'Antworten und Käufer-Matching als Vorschau',
    'Answers and buyer matching in preview',
    'Der Assistent zeigt, wie häufige Fragen rund um Bewertung, Verkauf und Finanzierung strukturiert beantwortet werden können. Die Vorschau ersetzt keine persönliche oder rechtliche Beratung.',
    'The assistant demonstrates how common valuation, sales, and financing questions can be structured. The preview does not replace personal or legal advice.',
    ['Frage stellen', 'Thema einordnen', 'Persönlich vertiefen'],
    ['Ask a question', 'Classify the topic', 'Discuss it personally'],
    'assistant',
  ),
  'warning-signs': definition(
    'Warnsignale',
    'Warning signs',
    'Unseriöse Makler beim Immobilienverkauf erkennen',
    'Recognise unreliable estate agents',
    'Phantom-Käufer, Lockpreise und Unterschriftsdruck kosten Eigentümer Zeit und Geld. Neun klare Warnsignale helfen, Versprechen von belastbarer Leistung zu unterscheiden.',
    'Phantom buyers, inflated asking prices, and pressure to sign cost owners time and money. Nine clear warning signs separate promises from reliable delivery.',
    ['Versprechen prüfen', 'Preis herleiten lassen', 'Leistung belegen lassen'],
    ['Test promises', 'Demand pricing evidence', 'Verify delivery'],
  ),
  appointment: definition(
    'Erstgespräch',
    'Initial consultation',
    'Termin online vorbereiten',
    'Prepare an appointment online',
    'Im Erstgespräch klären wir Objekt, Ziel, Zeitplan und die nächsten Unterlagen. Die Vorschau zeigt den Buchungsablauf, reserviert aber noch keinen Termin.',
    'The first conversation covers the property, objective, timing, and required documents. The preview demonstrates the booking flow but does not reserve a slot.',
    ['Anliegen wählen', 'Zeitfenster abstimmen', 'Gespräch vorbereiten'],
    ['Choose the topic', 'Coordinate timing', 'Prepare the call'],
    'appointment',
  ),
  'market-data': definition(
    'Marktdaten',
    'Market data',
    'Echte Abschlüsse statt Angebotspreise',
    'Completed sales instead of asking prices',
    'Marktdaten zeigen, was in der Region tatsächlich beurkundet wurde. Sie bilden den Rahmen; die konkrete Bewertung entsteht aus Lage, Zustand, Unterlagen und Nachfrage.',
    'Market data shows what was actually notarised in the region. It provides context; a specific valuation combines location, condition, documents, and demand.',
    ['Transaktionen einordnen', 'Lage vergleichen', 'Objekt ableiten'],
    ['Assess transactions', 'Compare locations', 'Derive property value'],
  ),
  market: definition(
    'Immobilienpreise',
    'Property prices',
    'Quadratmeterpreise richtig lesen',
    'Read square-metre prices correctly',
    'Durchschnittliche Quadratmeterpreise sind ein Ausgangspunkt, kein Verkaufspreis. Baujahr, Modernisierung, Grundstück, Etage und Mikrolage erklären die entscheidenden Abweichungen.',
    'Average square-metre prices are a starting point, not a sale price. Age, modernisation, land, floor, and micro-location explain the decisive differences.',
    ['Durchschnitt verstehen', 'Abweichungen prüfen', 'Preisstrategie festlegen'],
    ['Understand averages', 'Check adjustments', 'Set the pricing strategy'],
  ),
  glossary: definition(
    'Immobilienlexikon A–Z',
    'Property glossary A–Z',
    '77 Fachbegriffe verständlich erklärt',
    '77 specialist terms explained clearly',
    'Von Auflassungsvormerkung bis Zinsbindung erklärt das Lexikon die Begriffe, die Eigentümer und Käufer im Verkaufsprozess tatsächlich brauchen.',
    'From priority notice to fixed-interest periods, the glossary explains the terms owners and buyers actually need during a transaction.',
    ['Begriff finden', 'Bedeutung verstehen', 'Im Kontext anwenden'],
    ['Find the term', 'Understand the meaning', 'Apply it in context'],
  ),
  magazine: definition(
    'REVIER Magazin',
    'REVIER magazine',
    'Echte Verkäufe zum Durchblättern',
    'Browse real property sales',
    'REVIER verbindet regionale Marktgeschichten, echte Verkäufe und Einblicke in die Vermarktung. Die digitale Ausgabe macht Ergebnisse und Vorgehen nachvollziehbar.',
    'REVIER combines regional market stories, real sales, and marketing insights. The digital edition makes outcomes and methods transparent.',
    ['Ausgabe öffnen', 'Geschichten entdecken', 'Referenzen vertiefen'],
    ['Open the edition', 'Discover stories', 'Explore references'],
  ),
  sold: definition(
    'Verkaufte Objekte',
    'Sold properties',
    'Das Immonation-Verkaufsarchiv',
    'The Immonation sales archive',
    'Das Archiv dokumentiert vermittelte Häuser, Wohnungen, Grundstücke und Anlageobjekte. Veröffentlicht werden nur freigegebene Angaben und belastbare Ergebnisse.',
    'The archive documents sold homes, apartments, land, and investments. Only approved information and reliable outcomes are published.',
    ['Objekte filtern', 'Ergebnisse prüfen', 'Vorgehen vergleichen'],
    ['Filter properties', 'Review outcomes', 'Compare approaches'],
  ),
  reviews: definition(
    'Bewertungen',
    'Reviews',
    'Echte Bewertungen nachvollziehbar prüfen',
    'Review genuine feedback with context',
    'Bewertungen werden mit Quelle, Datum und Bezug zum Verkaufsprozess gezeigt. So bleibt nachvollziehbar, welche Erfahrung hinter einer Sternezahl steht.',
    'Reviews include source, date, and transaction context so visitors can understand the experience behind a star rating.',
    ['Quelle öffnen', 'Kontext lesen', 'Ergebnis einordnen'],
    ['Open the source', 'Read the context', 'Assess the outcome'],
  ),
  testimonials: definition(
    'Kundenstimmen',
    'Testimonials',
    'Persönliche Erfahrungen mit Immonation',
    'Personal experiences with Immonation',
    'Kunden berichten, wie Bewertung, Vermarktung, Kommunikation und Abschluss erlebt wurden. Detailseiten bewahren Quelle und Wortlaut der freigegebenen Stimmen.',
    'Clients describe their experience of valuation, marketing, communication, and completion. Detail pages retain the approved wording and source.',
    ['Stimme auswählen', 'Erfahrung lesen', 'Referenz ansehen'],
    ['Choose a story', 'Read the experience', 'View the reference'],
  ),
  awards: definition(
    'Auszeichnungen',
    'Awards',
    'Unabhängig geprüfte Anerkennungen',
    'Independently assessed recognition',
    'Auszeichnungen und Siegel werden mit Herausgeber, Jahr und Prüfkontext dokumentiert. Dazu gehören unter anderem TOP Makler 2026 und weitere Branchenanerkennungen.',
    'Awards and seals are documented with issuer, year, and assessment context, including TOP Agent 2026 and further industry recognition.',
    ['Auszeichnung prüfen', 'Kriterien verstehen', 'Jahr einordnen'],
    ['Review the award', 'Understand criteria', 'Check the year'],
  ),
  engagement: definition(
    'Engagement',
    'Community engagement',
    'Verantwortung in der Region und darüber hinaus',
    'Responsibility locally and beyond',
    'Immonation unterstützt den TSV Zirndorf und ausgewählte Projekte in Uganda. Die Seite zeigt Partner, Ziele und konkrete Formen des Engagements.',
    'Immonation supports TSV Zirndorf and selected projects in Uganda. This page explains the partners, goals, and concrete support.',
    ['Partner vorstellen', 'Projekte erklären', 'Wirkung zeigen'],
    ['Introduce partners', 'Explain projects', 'Show impact'],
  ),
  group: definition(
    'Unternehmensgruppe',
    'Company group',
    'Vier Gesellschaften, ein Qualitätsanspruch',
    'Four companies, one standard',
    'Die Immonation-Gruppe bündelt spezialisierte Leistungen rund um Immobilien, Vermarktung und Partnerschaften. Zuständigkeiten bleiben für Kunden klar erkennbar.',
    'The Immonation group combines specialised property, marketing, and partnership services while keeping responsibilities clear for clients.',
    ['Gesellschaften verstehen', 'Leistungen zuordnen', 'Ansprechpartner finden'],
    ['Understand the companies', 'Match services', 'Find the right contact'],
  ),
  partners: definition(
    'Partnermakler',
    'Partner agents',
    'Geprüfte Zusammenarbeit in zwei Modellen',
    'Verified collaboration in two models',
    'Partnermakler erweitern die regionale Betreuung nach definierten Qualitätsstandards. Zwei Kooperationsmodelle schaffen Klarheit über Marke, Prozesse und Verantwortung.',
    'Partner agents extend regional coverage under defined quality standards. Two cooperation models clarify brand, process, and responsibility.',
    ['Modell vergleichen', 'Voraussetzungen prüfen', 'Gespräch vereinbaren'],
    ['Compare models', 'Check requirements', 'Arrange a conversation'],
  ),
  directions: definition(
    'Anfahrt',
    'Directions',
    'Immonation in Zirndorf besuchen',
    'Visit Immonation in Zirndorf',
    'Unser Büro liegt in der Nürnberger Straße 18, 90513 Zirndorf. Termine werden vorab abgestimmt, damit der richtige Ansprechpartner Zeit für Ihr Anliegen hat.',
    'Our office is at Nürnberger Straße 18, 90513 Zirndorf. Appointments are arranged in advance so the right contact has time for your request.',
    ['Route planen', 'Öffnungszeiten prüfen', 'Termin abstimmen'],
    ['Plan the route', 'Check opening hours', 'Arrange a visit'],
  ),
  staging: definition(
    'Home Staging',
    'Home staging',
    'Interne Vorschau für Inszenierung und Visualisierung',
    'Internal preview for staging and visualisation',
    'Diese nicht indexierte Vorschau dokumentiert, wie reale und digitale Inszenierung Potenzial sichtbar macht. Sie dient der internen Abstimmung.',
    'This noindex preview documents how physical and digital staging can reveal potential. It is intended for internal review.',
    ['Ausgangslage prüfen', 'Visualisierung planen', 'Freigabe dokumentieren'],
    ['Review the starting point', 'Plan visualisation', 'Document approval'],
  ),
  video: definition(
    'Video-Marketing',
    'Video marketing',
    'Immobilien als Geschichte erzählen',
    'Tell a property story through video',
    'Video zeigt Raumgefühl, Lage und besondere Details in einer geführten Dramaturgie. Es ergänzt Fotografie, Exposé und 360°-Rundgang.',
    'Video communicates space, location, and distinctive details through a guided story. It complements photography, brochures, and 360° tours.',
    ['Konzept entwickeln', 'Objekt produzieren', 'Kanäle ausspielen'],
    ['Develop the concept', 'Produce the property', 'Distribute the content'],
  ),
  social: definition(
    'Social Media',
    'Social media',
    'Objekte zielgerichtet sichtbar machen',
    'Make properties visible to relevant audiences',
    'Social Media erweitert die Reichweite über Immobilienportale hinaus. Formate und Ausspielung folgen Objekt, Zielgruppe und Freigabe des Eigentümers.',
    'Social media extends reach beyond property portals. Formats and distribution follow the property, audience, and owner approval.',
    ['Zielgruppe definieren', 'Formate produzieren', 'Resonanz auswerten'],
    ['Define the audience', 'Produce formats', 'Assess response'],
  ),
  'html-sitemap': definition(
    'Alle Seiten',
    'All pages',
    'Die öffentliche Seitenübersicht',
    'The public page directory',
    'Die HTML-Sitemap führt zu allen veröffentlichten und indexierbaren Bereichen. Reservierte und interne Seiten bleiben ausgeblendet.',
    'The HTML sitemap links to all published, indexable sections. Reserved and internal pages remain hidden.',
    ['Bereich auswählen', 'Detailseiten finden', 'Direkt navigieren'],
    ['Choose a section', 'Find detail pages', 'Navigate directly'],
  ),
  seo: definition(
    'SEO-Übersicht',
    'SEO overview',
    'Interne Prüfung der Seitenstruktur',
    'Internal review of site structure',
    'Diese nicht indexierte Seite unterstützt die interne Kontrolle von Pfaden, Metadaten, Sprachalternativen und Veröffentlichungsstatus.',
    'This noindex page supports internal review of paths, metadata, language alternates, and publication status.',
    ['Pfade prüfen', 'Metadaten prüfen', 'Status prüfen'],
    ['Review paths', 'Review metadata', 'Review status'],
  ),
}

function definition(
  deTitle: string,
  enTitle: string,
  deLede: string,
  enLede: string,
  deAnswer: string,
  enAnswer: string,
  deSections: [string, string, string],
  enSections: [string, string, string],
  preview?: CatalogPageContent['preview'],
): PageDefinition {
  return {
    de: localizedPage(
      deTitle,
      deLede,
      deAnswer,
      deSections,
      'Kostenlose Bewertung starten',
      'Sprechen wir über Ihre Immobilie.',
    ),
    en: localizedPage(
      enTitle,
      enLede,
      enAnswer,
      enSections,
      'Start a free valuation',
      'Let’s talk about your property.',
    ),
    preview,
  }
}

function localizedPage(
  title: string,
  lede: string,
  answer: string,
  sectionTitles: [string, string, string],
  ctaLabel: string,
  ctaTitle: string,
): LocalizedPage {
  const isGerman = ctaLabel.startsWith('Kostenlose')
  return {
    eyebrow: 'Immonation',
    title,
    description: answer,
    lede,
    answer,
    sectionTitles,
    faq: [
      {
        question: isGerman
          ? `Wie unterstützt Immonation bei „${title}“?`
          : `How does Immonation help with “${title}”?`,
        answer,
      },
      {
        question: isGerman ? 'Was ist der nächste Schritt?' : 'What is the next step?',
        answer: isGerman
          ? 'Starten Sie mit einer kostenlosen Bewertung oder einem unverbindlichen Erstgespräch.'
          : 'Start with a free valuation or a non-binding initial conversation.',
      },
    ],
    ctaTitle,
    ctaText: isGerman
      ? 'Wir ordnen Ihre Ausgangslage persönlich und nachvollziehbar ein.'
      : 'We assess your starting point personally and transparently.',
    ctaLabel,
  }
}

export function getCatalogPage(id: CatalogPageId, locale: 'de' | 'en'): CatalogPageContent {
  const definition = SAFE_CATALOG_OVERRIDES[id] ?? DEFINITIONS[id]
  const localized = definition[locale]
  const fallbackTexts = localized.sectionTitles.map((sectionTitle) =>
    locale === 'de'
      ? `${sectionTitle} ist Teil eines klaren, dokumentierten Vorgehens. Immonation verbindet lokale Erfahrung, vollständige Unterlagen und persönliche Begleitung bis zur nächsten belastbaren Entscheidung.`
      : `${sectionTitle} is part of a clear, documented approach. Immonation combines local experience, complete documents, and personal guidance through to the next reliable decision.`,
  )

  return {
    id,
    ...localized,
    sectionTexts: localized.sectionTexts ?? fallbackTexts,
    sectionHrefs: localized.sectionHrefs,
    preview: definition.preview,
    ctaHref: definition.ctaHref ?? '/property-valuation',
  }
}
