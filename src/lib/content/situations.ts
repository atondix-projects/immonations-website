import type { Locale } from '@/i18n/routing'

export type SituationGuide = {
  translationKey: string
  locale: Locale
  slug: string
  title: string
  description: string
  lede: string
  factors: [string, string, string]
  faq: Array<{ question: string; answer: string }>
}

type SituationSeed = {
  key: string
  slugs: Record<Locale, string>
  de: { title: string; lede: string; factors: [string, string, string] }
  en: { title: string; lede: string; factors: [string, string, string] }
}

const SEEDS: SituationSeed[] = [
  seed(
    'trennung',
    'separation',
    'Immobilie verkaufen bei Trennung & Scheidung',
    'Selling property after separation or divorce',
    'Eine gemeinsame Immobilie braucht unter emotionalem Druck eine neutrale Wertbasis und einen Ablauf, den beide Seiten nachvollziehen können.',
    'A jointly owned property needs a neutral valuation and a process both parties can understand, especially under emotional pressure.',
    [
      'Neutral vermitteln',
      'Auszahlung oder Verkauf vergleichen',
      'Teilungsversteigerung vermeiden',
    ],
    ['Mediate neutrally', 'Compare buyout and sale', 'Avoid a forced partition sale'],
  ),
  seed(
    'erbfall',
    'inheritance',
    'Geerbte Immobilie verkaufen',
    'Selling an inherited property',
    'Erbengemeinschaft, Grundbuch, Erbschein und möglicher Leerstand werden zu einem koordinierten Verkaufsweg zusammengeführt.',
    'Co-heirs, land-register status, probate documents, and possible vacancy are brought into one coordinated sales process.',
    ['Erben koordinieren', 'Unterlagen klären', 'Gemeinsame Wertbasis schaffen'],
    ['Coordinate heirs', 'Clarify documents', 'Create a shared value basis'],
  ),
  seed(
    'insolvenz',
    'insolvency',
    'Verkaufen bei Insolvenz',
    'Selling during insolvency',
    'Wenn Raten nicht mehr tragbar sind, zählen Tempo, Diskretion und die rechtzeitige Abstimmung mit Bank oder Verwalter.',
    'When payments are no longer sustainable, speed, discretion, and timely coordination with the lender or administrator matter.',
    ['Zeitfenster klären', 'Gläubiger abstimmen', 'Freien Verkauf sichern'],
    ['Clarify the timeline', 'Coordinate creditors', 'Secure an open-market sale'],
  ),
  seed(
    'verrentung',
    'property-annuity',
    'Immobilienverrentung',
    'Property annuity',
    'Wohnrecht oder Leibrente können Kapital freisetzen, ohne das vertraute Zuhause sofort aufzugeben.',
    'A right of residence or annuity can release capital without immediately leaving a familiar home.',
    ['Modell vergleichen', 'Wohnrecht bewerten', 'Passende Käufer finden'],
    ['Compare models', 'Value residence rights', 'Find suitable buyers'],
  ),
  seed(
    'alter-pflege',
    'ageing-and-care',
    'Verkaufen im Alter & bei Pflege',
    'Selling due to ageing or care needs',
    'Der Verkauf kann Pflege finanzieren und Angehörige entlasten. Vollmacht, Zeitplan und Haushaltsauflösung werden früh geklärt.',
    'A sale can fund care and relieve relatives. Authority, timing, and household clearance are clarified early.',
    ['Vollmacht prüfen', 'Familie einbinden', 'Übergang organisieren'],
    ['Review authority', 'Involve the family', 'Organise the transition'],
  ),
  seed(
    'sanierung',
    'renovation',
    'Sanierungsbedürftige Immobilie verkaufen',
    'Selling a property requiring renovation',
    'Vor dem Verkauf wird ehrlich gerechnet, ob eine Sanierung Mehrwert schafft oder der Ist-Zustand gezielt vermarktet werden sollte.',
    'Before the sale, we assess whether renovation creates value or whether the current condition should be marketed directly.',
    ['Sanierung rechnen', 'Potenzial darstellen', 'Käufergruppe ansprechen'],
    ['Model renovation costs', 'Show potential', 'Target suitable buyers'],
  ),
  seed(
    'kapitalanlage',
    'investment-property',
    'Vermietete Kapitalanlage verkaufen',
    'Selling a tenanted investment property',
    'Mietverhältnisse, Rendite, Unterlagen und Käuferzielgruppe bestimmen die Positionierung einer Kapitalanlage.',
    'Tenancies, yield, documents, and the buyer audience determine how an investment property is positioned.',
    ['Mietdaten aufbereiten', 'Rendite einordnen', 'Investoren qualifizieren'],
    ['Prepare tenancy data', 'Assess yield', 'Qualify investors'],
  ),
  seed(
    'umzug',
    'relocation',
    'Immobilie verkaufen beim Umzug',
    'Selling when relocating',
    'Kauf, Verkauf und Übergabe müssen zeitlich zusammenpassen, damit Finanzierung und Wohnsituation planbar bleiben.',
    'Purchase, sale, and handover must align so financing and living arrangements remain manageable.',
    ['Zeitplan bauen', 'Zwischenfinanzierung klären', 'Übergabe abstimmen'],
    ['Build the timeline', 'Clarify bridging finance', 'Coordinate handover'],
  ),
  seed(
    'finanznot',
    'financial-distress',
    'Verkaufen bei Finanznot',
    'Selling under financial pressure',
    'Eine frühe realistische Bewertung schafft Handlungsspielraum und verhindert, dass Zeitdruck den Verkaufspreis unnötig belastet.',
    'An early realistic valuation preserves options and prevents time pressure from unnecessarily reducing the outcome.',
    ['Belastung erfassen', 'Handlungsfenster sichern', 'Diskret vermarkten'],
    ['Assess the pressure', 'Protect the available time', 'Market discreetly'],
  ),
  seed(
    'vollmacht',
    'power-of-attorney',
    'Immobilienverkauf mit Vollmacht',
    'Selling with power of attorney',
    'Wenn Eigentümer nicht selbst handeln können, müssen Umfang, Form und Verwendbarkeit der Vollmacht vor dem Verkaufsstart geprüft sein.',
    'When owners cannot act personally, the scope, form, and usability of the authority must be checked before marketing starts.',
    ['Vollmacht prüfen', 'Eigentümerinteressen sichern', 'Notar vorbereiten'],
    ['Review authority', 'Protect owner interests', 'Prepare the notary process'],
  ),
  seed(
    'gewerbe',
    'commercial-property',
    'Gewerbeimmobilie verkaufen',
    'Selling commercial property',
    'Nutzung, Mietverträge, Ertrag und ein kleiner professioneller Käuferkreis verlangen belastbare Unterlagen und gezielte Ansprache.',
    'Use, leases, income, and a smaller professional buyer pool require robust documents and targeted outreach.',
    ['Nutzung analysieren', 'Ertragsdaten aufbereiten', 'Investoren ansprechen'],
    ['Analyse use', 'Prepare income data', 'Approach investors'],
  ),
  seed(
    'leerstand',
    'vacancy',
    'Leerstehende Immobilie verkaufen',
    'Selling a vacant property',
    'Leerstand erhöht Kosten und Risiken, bietet Käufern aber auch schnelle Verfügbarkeit. Zustand und Potenzial müssen klar gezeigt werden.',
    'Vacancy increases cost and risk but offers immediate availability. Condition and potential must be presented clearly.',
    ['Risiken begrenzen', 'Zustand dokumentieren', 'Schnell verfügbar vermarkten'],
    ['Limit risks', 'Document condition', 'Market immediate availability'],
  ),
]

function seed(
  deSlug: string,
  enSlug: string,
  deTitle: string,
  enTitle: string,
  deLede: string,
  enLede: string,
  deFactors: [string, string, string],
  enFactors: [string, string, string],
): SituationSeed {
  return {
    key: deSlug,
    slugs: { de: deSlug, en: enSlug },
    de: { title: deTitle, lede: deLede, factors: deFactors },
    en: { title: enTitle, lede: enLede, factors: enFactors },
  }
}

function createGuide(seed: SituationSeed, locale: Locale): SituationGuide {
  const content = seed[locale]
  const isGerman = locale === 'de'
  return {
    translationKey: seed.key,
    locale,
    slug: seed.slugs[locale],
    title: content.title,
    description: content.lede,
    lede: content.lede,
    factors: content.factors,
    faq: [
      {
        question: isGerman
          ? 'Was sollte zuerst geklärt werden?'
          : 'What should be clarified first?',
        answer: isGerman
          ? 'Am Anfang stehen Eigentumssituation, Zeitfenster, Unterlagen und eine neutrale Bewertung.'
          : 'Start with ownership, timing, documents, and a neutral valuation.',
      },
      {
        question: isGerman ? 'Ist ein diskreter Verkauf möglich?' : 'Is a discreet sale possible?',
        answer: isGerman
          ? 'Ja. Wenn Situation und Käuferprofil passen, kann die Immobilie gezielt statt öffentlich angeboten werden.'
          : 'Yes. Where the situation and buyer profile fit, the property can be offered selectively rather than publicly.',
      },
      {
        question: isGerman
          ? 'Ist die Erstberatung verbindlich?'
          : 'Is the initial consultation binding?',
        answer: isGerman
          ? 'Nein. Das erste Gespräch dient der Einordnung und ist kostenlos und unverbindlich.'
          : 'No. The first conversation is free, non-binding, and intended to clarify the situation.',
      },
    ],
  }
}

function listSituationGuides(locale: Locale) {
  return SEEDS.map((entry) => createGuide(entry, locale))
}

export function listAllSituationGuides() {
  return (['de', 'en'] as const).flatMap(listSituationGuides)
}

export function getSituationGuide(locale: Locale, slug: string) {
  const entry = SEEDS.find((candidate) => candidate.slugs[locale] === slug)
  return entry ? createGuide(entry, locale) : undefined
}
