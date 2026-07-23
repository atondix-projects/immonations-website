export const REFERENCE_MEDIA = {
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
} as const

export type ReferenceId = keyof typeof REFERENCE_MEDIA

export type ReferenceItem = {
  id: ReferenceId
  title: string
  type: string
  location: string
  alt: string
}

export type ReferenceDetail = {
  id: ReferenceId
  requests: string
  viewings: string
  duration: string
  result: { de: string; en: string }
  challenge: { de: string; en: string }
  approach: { de: string; en: string }
}

export const REFERENCE_DETAILS: Record<ReferenceId, ReferenceDetail> = {
  'deining-neubauwohnung': {
    id: 'deining-neubauwohnung',
    requests: '32',
    viewings: '10',
    duration: '6',
    result: { de: 'Erfolgreich vermittelt', en: 'Successfully sold' },
    challenge: {
      de: 'Eine Neubauwohnung braucht eine präzise Preisstrategie und Käufer, die Energieeffizienz und Ausstattungsqualität richtig einordnen.',
      en: 'A new-build apartment needs precise pricing and buyers who recognise the value of energy efficiency and finish quality.',
    },
    approach: {
      de: 'Hochwertige Präsentation, klare Einordnung der Neubauqualität und gezielte Ansprache passender Interessenten.',
      en: 'A high-quality presentation, clear positioning of the new-build specification, and targeted buyer outreach.',
    },
  },
  'erlangen-eigentumswohnung': {
    id: 'erlangen-eigentumswohnung',
    requests: '68',
    viewings: '26',
    duration: '4',
    result: { de: '9 % über Erstbewertung', en: '9% above initial valuation' },
    challenge: {
      de: 'In einer stark nachgefragten Universitätsstadt sollte das Marktpotenzial ausgeschöpft werden, ohne die richtige Zielgruppe zu verlieren.',
      en: 'In a high-demand university city, the objective was to realise the market potential without losing the right target group.',
    },
    approach: {
      de: 'Breite regionale Reichweite, strukturierte Käuferqualifizierung und eine ruhige, wertige Präsentation.',
      en: 'Broad regional reach, structured buyer qualification, and a calm, high-value presentation.',
    },
  },
  'forchheim-eigentumswohnung': {
    id: 'forchheim-eigentumswohnung',
    requests: '34',
    viewings: '6',
    duration: '3',
    result: { de: 'In drei Wochen verkauft', en: 'Sold in three weeks' },
    challenge: {
      de: 'Für die Wohnung im ruhigen Ortsteil musste die familienorientierte Zielgruppe lokal und emotional erreicht werden.',
      en: 'The apartment in a quiet district needed locally focused communication for family-oriented buyers.',
    },
    approach: {
      de: 'Regionales Marketing, klare Zielgruppenansprache und eine bildstarke Objektpräsentation.',
      en: 'Regional marketing, clear audience targeting, and image-led property presentation.',
    },
  },
  'forchheim-reihenhaus': {
    id: 'forchheim-reihenhaus',
    requests: '43',
    viewings: '22',
    duration: '9',
    result: { de: 'Passenden Käufer gefunden', en: 'Matched with the right buyer' },
    challenge: {
      de: 'Das moderne Wohnkonzept des Town-House musste verständlich und zugleich emotional vermittelt werden.',
      en: 'The modern townhouse concept needed to be explained clearly while retaining emotional appeal.',
    },
    approach: {
      de: 'Konkrete Nutzungsszenarien, qualifizierte Besichtigungen und eine konsequente Nachfassroutine.',
      en: 'Concrete usage scenarios, qualified viewings, and a consistent follow-up process.',
    },
  },
  'fuerth-altbauwohnung': {
    id: 'fuerth-altbauwohnung',
    requests: '102',
    viewings: '36',
    duration: '2',
    result: { de: 'In zwei Wochen verkauft', en: 'Sold in two weeks' },
    challenge: {
      de: 'Der Charakter des historischen Anwesens sollte sichtbar werden, ohne die sachlichen Kaufkriterien zu überdecken.',
      en: 'The character of the historic building had to remain visible without obscuring practical buying criteria.',
    },
    approach: {
      de: 'Editoriale Fotografie, präzise Detailkommunikation und konzentrierte Terminsteuerung.',
      en: 'Editorial photography, precise detail communication, and concentrated viewing coordination.',
    },
  },
  'fuerth-renovierte-wohnung': {
    id: 'fuerth-renovierte-wohnung',
    requests: '18',
    viewings: '11',
    duration: '12',
    result: { de: 'Strategisch neu positioniert', en: 'Strategically repositioned' },
    challenge: {
      de: 'Die sanierte Wohnung musste in einer längeren Vermarktungsphase klar von vergleichbaren Angeboten abgegrenzt werden.',
      en: 'During a longer marketing phase, the renovated apartment needed a clear distinction from comparable listings.',
    },
    approach: {
      de: 'Überarbeitete Positionierung, transparente Rückmeldungen und laufende Optimierung der Ansprache.',
      en: 'Refined positioning, transparent feedback, and continuous optimisation of the campaign.',
    },
  },
  'fuerth-versorgungszentrum': {
    id: 'fuerth-versorgungszentrum',
    requests: '8',
    viewings: '4',
    duration: '15',
    result: { de: 'Spezialimmobilie vermittelt', en: 'Specialist property sold' },
    challenge: {
      de: 'Bei einem medizinischen Versorgungszentrum entscheidet ein kleiner, professioneller Käuferkreis anhand belastbarer Zahlen.',
      en: 'A medical centre is assessed by a small professional buyer group using robust commercial figures.',
    },
    approach: {
      de: 'Diskrete Ansprache geeigneter Investoren und strukturierte Aufbereitung der wirtschaftlichen Eckdaten.',
      en: 'Discreet outreach to suitable investors and structured presentation of the commercial fundamentals.',
    },
  },
  'fuerth-mehrfamilienhaus': {
    id: 'fuerth-mehrfamilienhaus',
    requests: '63',
    viewings: '38',
    duration: '6',
    result: { de: 'In sechs Wochen verkauft', en: 'Sold in six weeks' },
    challenge: {
      de: 'Denkmalschutz, Mietstruktur und Entwicklungspotenzial mussten für Kapitalanleger nachvollziehbar zusammengeführt werden.',
      en: 'Heritage status, tenancy structure, and development potential had to be made legible for investors.',
    },
    approach: {
      de: 'Belastbare Unterlagen, klare Investmentstory und qualifizierte Ansprache des Anlegernetzwerks.',
      en: 'Robust documentation, a clear investment story, and qualified investor-network outreach.',
    },
  },
  'heroldsbach-mehrfamilienhaus': {
    id: 'heroldsbach-mehrfamilienhaus',
    requests: '29',
    viewings: '24',
    duration: '13',
    result: { de: 'Mehrgenerationenhaus vermittelt', en: 'Multi-generation home sold' },
    challenge: {
      de: 'Das Dreifamilienhaus sprach sowohl Eigennutzer als auch Kapitalanleger an und brauchte eine verständliche Doppelpositionierung.',
      en: 'The three-unit property appealed to owner-occupiers and investors, requiring a clear dual positioning.',
    },
    approach: {
      de: 'Getrennte Nutzungsszenarien, vollständige Unterlagen und gezielte Qualifizierung beider Käufergruppen.',
      en: 'Separate usage scenarios, complete documentation, and targeted qualification of both buyer groups.',
    },
  },
  'langenzenn-terrassenwohnung': {
    id: 'langenzenn-terrassenwohnung',
    requests: '12',
    viewings: '8',
    duration: '2.5',
    result: { de: 'In zweieinhalb Wochen verkauft', en: 'Sold in two and a half weeks' },
    challenge: {
      de: 'Die Terrassenwohnung sollte schnell verkauft werden, ohne den Wert der Außenfläche zu verschenken.',
      en: 'The terrace apartment needed a quick sale without undervaluing its outdoor space.',
    },
    approach: {
      de: 'Fokus auf Wohnqualität und Außenraum sowie eine kompakte, vorqualifizierte Besichtigungsphase.',
      en: 'A focus on living quality and outdoor space, followed by a compact, pre-qualified viewing phase.',
    },
  },
  'nuernberg-einfamilienhaus': {
    id: 'nuernberg-einfamilienhaus',
    requests: '31',
    viewings: '26',
    duration: '10',
    result: { de: 'Neuwertiges Haus erfolgreich verkauft', en: 'Modern home successfully sold' },
    challenge: {
      de: 'Flexible Nutzungsmöglichkeiten mussten in eine klare Geschichte übersetzt werden, statt Interessenten mit Optionen zu überfordern.',
      en: 'Flexible usage options needed one clear story rather than overwhelming buyers with possibilities.',
    },
    approach: {
      de: 'Strukturierte Raumdarstellung, hochwertige Medien und persönliche Einordnung während der Besichtigungen.',
      en: 'Structured space presentation, high-quality media, and personal guidance during viewings.',
    },
  },
  'nuernberg-eigentumswohnung': {
    id: 'nuernberg-eigentumswohnung',
    requests: '21',
    viewings: '8',
    duration: '3',
    result: { de: 'In drei Wochen verkauft', en: 'Sold in three weeks' },
    challenge: {
      de: 'Die renovierte Stadtwohnung brauchte eine präzise Abgrenzung in einem vergleichsreichen Markt.',
      en: 'The renovated city apartment needed precise differentiation in a comparison-heavy market.',
    },
    approach: {
      de: 'Zielgerichtete Präsentation der relevanten Details und eine eng geführte Auswahl ernsthafter Interessenten.',
      en: 'Targeted presentation of relevant details and tightly managed selection of serious buyers.',
    },
  },
  'nuernberg-reihenendhaus': {
    id: 'nuernberg-reihenendhaus',
    requests: '110',
    viewings: '43',
    duration: '2',
    result: { de: 'In zwei Wochen verkauft', en: 'Sold in two weeks' },
    challenge: {
      de: 'Kino, Sauna und gehobene Ausstattung verlangten eine emotionale Lifestyle-Positionierung mit belastbaren Fakten.',
      en: 'Cinema, sauna, and elevated finishes called for emotional lifestyle positioning supported by clear facts.',
    },
    approach: {
      de: 'Video-orientierte Vermarktung, starke Bilddramaturgie und konsequente Käuferqualifizierung.',
      en: 'Video-led marketing, strong visual storytelling, and consistent buyer qualification.',
    },
  },
  'oberasbach-einfamilienhaus': {
    id: 'oberasbach-einfamilienhaus',
    requests: '82',
    viewings: '48',
    duration: '6',
    result: { de: 'In sechs Wochen verkauft', en: 'Sold in six weeks' },
    challenge: {
      de: 'Großes Grundstück, Einliegerwohnung und Nebengebäude eröffneten viele Zielgruppen, aber keine durfte beliebig angesprochen werden.',
      en: 'A large plot, annex, and outbuildings created many audiences, each requiring focused communication.',
    },
    approach: {
      de: 'Mehrere klar getrennte Nutzungsszenarien und breite, dennoch qualifizierte Zielgruppenansprache.',
      en: 'Several clearly separated usage scenarios and broad but qualified audience outreach.',
    },
  },
  'zirndorf-gartenwohnung': {
    id: 'zirndorf-gartenwohnung',
    requests: '27',
    viewings: '13',
    duration: '6.5',
    result: { de: 'In sechseinhalb Wochen verkauft', en: 'Sold in six and a half weeks' },
    challenge: {
      de: 'Bei einer Neubau-Gartenwohnung ist der Außenbereich das zentrale Kaufargument und musste räumlich erlebbar werden.',
      en: 'For a new-build garden apartment, the outdoor space is the central buying argument and had to feel tangible.',
    },
    approach: {
      de: 'Lokale Ansprache, architekturorientierte Präsentation und klare Vermittlung des Garten- und Terrassenwerts.',
      en: 'Local outreach, architecture-led presentation, and clear communication of the garden and terrace value.',
    },
  },
}

export function getReferenceDetail(id: string) {
  return id in REFERENCE_DETAILS ? REFERENCE_DETAILS[id as ReferenceId] : undefined
}

export function referenceImage(id: ReferenceId) {
  return REFERENCE_MEDIA[id]
}
