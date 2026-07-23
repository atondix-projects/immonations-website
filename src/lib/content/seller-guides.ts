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
  faq: Array<{ question: string; answer: string }>
  serviceType: string
}

const guides: Record<Locale, SellerGuide[]> = {
  de: [
    {
      locale: 'de',
      slug: 'haus',
      translationKey: 'sell-house',
      title: 'Haus verkaufen in der Region Nürnberg',
      description:
        'Hausverkauf mit fundierter Bewertung, vollständiger Vorbereitung und Premium-Vermarktung in Zirndorf, Nürnberg, Fürth und Erlangen.',
      eyebrow: 'Hausverkauf',
      lede: 'Ein Haus verkauft sich nicht über einen Angebotspreis allein. Entscheidend sind belastbare Unterlagen, eine klare Zielgruppe und eine Präsentation, die Lage, Substanz und Potenzial nachvollziehbar macht.',
      answer:
        'Für einen erfolgreichen Hausverkauf verbindet Immonation eine Vor-Ort-Bewertung mit Verkaufsstrategie, professioneller Präsentation, qualifizierten Besichtigungen und einer verlässlichen Begleitung bis zum Notartermin.',
      highlights: [
        'Vor-Ort-Bewertung',
        'Unterlagen- und Zielgruppencheck',
        'Video und 360°-Rundgang',
      ],
      sections: [
        {
          heading: 'Wert und Verkaufsziel zuerst klären',
          body: 'Grundstück, Baujahr, Modernisierungen, Energiezustand und Mikrolage prägen den realistischen Marktwert. Wir ordnen diese Faktoren ein und stimmen Preisstrategie, Zeitplan und gewünschte Diskretion mit Ihnen ab.',
        },
        {
          heading: 'Das Haus vollständig vorbereiten',
          body: 'Grundbuchauszug, Grundrisse, Wohnflächenberechnung und Energieausweis schaffen Vertrauen. Fehlende Unterlagen identifizieren wir früh, damit Rückfragen den Verkauf später nicht ausbremsen.',
        },
        {
          heading: 'Passende Käufer statt Besichtigungstourismus',
          body: 'Professionelle Fotos, Video und 360°-Rundgang vermitteln einen realistischen Eindruck. Interessenten werden vor dem Vor-Ort-Termin nach Bedarf, Zeitplan und Finanzierung eingeordnet.',
        },
      ],
      faq: [
        {
          question: 'Wann ist der richtige Zeitpunkt, ein Haus zu verkaufen?',
          answer:
            'Der richtige Zeitpunkt hängt von Ihrem Ziel, dem Zustand des Hauses und der lokalen Nachfrage ab. Eine Bewertung und ein realistischer Zeitplan sind deshalb der sinnvollste erste Schritt.',
        },
        {
          question: 'Welche Unterlagen brauche ich für den Hausverkauf?',
          answer:
            'Typisch sind Grundbuchauszug, Flurkarte, Grundrisse, Wohnflächenberechnung, Energieausweis und Nachweise zu Modernisierungen. Fehlende Unterlagen können strukturiert nachbeschafft werden.',
        },
        {
          question: 'Wie werden Besichtigungen organisiert?',
          answer:
            'Interessenten erhalten zunächst aussagekräftige Informationen und werden qualifiziert. Vor-Ort-Termine finden anschließend koordiniert und mit einem festen Ansprechpartner statt.',
        },
      ],
      serviceType: 'Hausverkauf',
    },
    {
      locale: 'de',
      slug: 'wohnung',
      translationKey: 'sell-apartment',
      title: 'Wohnung verkaufen in der Region Nürnberg',
      description:
        'Eigentumswohnung verkaufen: Bewertung, WEG-Unterlagen, Zielgruppenstrategie und professionelle Vermarktung durch Immonation.',
      eyebrow: 'Wohnungsverkauf',
      lede: 'Bei einer Eigentumswohnung entscheiden nicht nur Lage und Ausstattung. Auch Hausgeld, Rücklagen, Teilungserklärung und Zustand der Gemeinschaft beeinflussen Nachfrage und Finanzierung.',
      answer:
        'Immonation bereitet den Wohnungsverkauf so vor, dass Eigennutzer und Kapitalanleger die Wohnung, das Gebäude und die wirtschaftlichen Rahmenbedingungen verlässlich beurteilen können.',
      highlights: [
        'WEG-Unterlagen prüfen',
        'Eigennutzer oder Kapitalanleger',
        'Strukturierte Käuferqualifizierung',
      ],
      sections: [
        {
          heading: 'Wohnung und Gemeinschaft gemeinsam betrachten',
          body: 'Neben Wohnfläche, Schnitt und Ausstattung prüfen Käufer Hausgeld, Rücklagen, Protokolle und geplante Maßnahmen. Eine vollständige Aufbereitung verhindert Unsicherheit und unnötige Preisabschläge.',
        },
        {
          heading: 'Die passende Zielgruppe ansprechen',
          body: 'Freie Wohnungen und Wohnungen mit bestehendem Mietverhältnis brauchen unterschiedliche Geschichten. Wir richten Exposé, Bildsprache und Ansprache danach aus, ob Eigennutzer oder Kapitalanleger im Mittelpunkt stehen.',
        },
        {
          heading: 'Finanzierbarkeit früh mitdenken',
          body: 'Banken benötigen neben Objektunterlagen auch Informationen zur Eigentümergemeinschaft. Wir bündeln die relevanten Unterlagen und koordinieren Rückfragen bis zur Kaufvertragsvorbereitung.',
        },
      ],
      faq: [
        {
          question: 'Kann ich eine Wohnung mit bestehendem Mietverhältnis verkaufen?',
          answer:
            'Ja. Mietvertrag, Miethöhe, Nebenkosten und weitere wirtschaftliche Daten werden transparent aufbereitet und die Vermarktung auf passende Kapitalanleger ausgerichtet.',
        },
        {
          question: 'Welche WEG-Unterlagen sind wichtig?',
          answer:
            'Dazu gehören insbesondere Teilungserklärung, Wirtschaftsplan, Hausgeldabrechnung, Rücklagenstand und Protokolle der Eigentümerversammlungen.',
        },
        {
          question: 'Muss die Wohnung vor dem Verkauf renoviert werden?',
          answer:
            'Nicht automatisch. Ob Maßnahmen sinnvoll sind, hängt von Zustand, Zielgruppe und erwartbarem Mehrerlös ab. Diese Abwägung gehört in die Verkaufsstrategie.',
        },
      ],
      serviceType: 'Wohnungsverkauf',
    },
    {
      locale: 'de',
      slug: 'grundstueck',
      translationKey: 'sell-land',
      title: 'Grundstück verkaufen in der Region Nürnberg',
      description:
        'Grundstücksverkauf mit Prüfung von Baurecht, Erschließung, Nutzungspotenzial und passender Käuferansprache.',
      eyebrow: 'Grundstücksverkauf',
      lede: 'Der Wert eines Grundstücks entsteht aus Lage und nutzbarer Perspektive. Baurecht, Zuschnitt, Erschließung und mögliche Teilbarkeit müssen verständlich dokumentiert sein.',
      answer:
        'Immonation bereitet Grundstücke für private Bauherren, Investoren oder Projektentwickler nachvollziehbar auf und stimmt die Vermarktung auf das tatsächlich belegbare Nutzungspotenzial ab.',
      highlights: [
        'Baurecht einordnen',
        'Nutzungspotenzial erklären',
        'Zielgruppengerechte Vermarktung',
      ],
      sections: [
        {
          heading: 'Bebaubarkeit belastbar einordnen',
          body: 'Bebauungsplan, § 34 BauGB, Baulasten und Erschließung können den Wert stärker beeinflussen als die reine Fläche. Offene Punkte werden benannt, statt mit unbelegten Möglichkeiten zu werben.',
        },
        {
          heading: 'Unterlagen für schnelle Entscheidungen bündeln',
          body: 'Flurkarte, Grundbuch, Auskünfte und vorhandene Planungen bilden die Grundlage. Eine klare Unterlagenstruktur erleichtert Kaufinteressenten und finanzierenden Banken die Prüfung.',
        },
        {
          heading: 'Die richtige Käufergruppe wählen',
          body: 'Je nach Größe und Potenzial kommen Selbstnutzer, Bauträger oder langfristige Investoren infrage. Die Ansprache folgt der realistischen Nutzung, nicht einem möglichst großen Verteiler.',
        },
      ],
      faq: [
        {
          question: 'Wie wird der Wert eines Grundstücks bestimmt?',
          answer:
            'Bodenrichtwert, Lage, Zuschnitt, Erschließung und tatsächliche Bebaubarkeit werden gemeinsam betrachtet. Der Bodenrichtwert allein ist noch kein belastbarer Verkaufspreis.',
        },
        {
          question: 'Brauche ich vor dem Verkauf eine Bauvoranfrage?',
          answer:
            'Nicht immer. Bei unklarem oder besonderem Potenzial kann eine Bauvoranfrage jedoch helfen, Risiken zu reduzieren und die Vermarktung zu präzisieren.',
        },
        {
          question: 'Kann ein großes Grundstück geteilt werden?',
          answer:
            'Das hängt von Grundstückszuschnitt, Baurecht, Zufahrt und kommunalen Vorgaben ab. Die Möglichkeit sollte vor einer entsprechenden Werbeaussage geprüft werden.',
        },
      ],
      serviceType: 'Grundstücksverkauf',
    },
    {
      locale: 'de',
      slug: 'mehrfamilienhaus',
      translationKey: 'sell-apartment-building',
      title: 'Mehrfamilienhaus verkaufen in der Region Nürnberg',
      description:
        'Mehrfamilienhaus verkaufen: Mietdaten, Ertrag, Instandhaltung und Entwicklungspotenzial professionell aufbereiten.',
      eyebrow: 'Investmentverkauf',
      lede: 'Beim Mehrfamilienhaus zählen nachvollziehbare Erträge, saubere Mietunterlagen und ein realistischer Blick auf Instandhaltung und Entwicklung. Käufer prüfen Zahlen und Substanz gleichermaßen.',
      answer:
        'Immonation strukturiert Objekt-, Miet- und Wirtschaftsdaten, definiert eine passende Investorenzielgruppe und führt den Verkauf diskret und dokumentiert bis zum Notartermin.',
      highlights: [
        'Miet- und Ertragsdaten',
        'Diskrete Investorensuche',
        'Dokumentierter Prüfprozess',
      ],
      sections: [
        {
          heading: 'Ertrag und Substanz transparent darstellen',
          body: 'Mieterliste, Mietverträge, Betriebskosten, Modernisierungen und Instandhaltungsbedarf bilden die Entscheidungsgrundlage. Plausible Daten schaffen mehr Vertrauen als pauschale Renditeversprechen.',
        },
        {
          heading: 'Diskretion und Mieterkommunikation planen',
          body: 'Ein Verkauf kann strukturiert vorbereitet werden, ohne unnötige Unruhe zu erzeugen. Besichtigungen, Unterlagenzugriff und Kommunikation werden auf Objekt und Mietersituation abgestimmt.',
        },
        {
          heading: 'Investoren qualifiziert ansprechen',
          body: 'Je nach Objekt passen private Bestandshalter, Family Offices oder professionelle Investoren. Wir strukturieren den Datenraum und koordinieren die Prüfung mit ernsthaften Interessenten.',
        },
      ],
      faq: [
        {
          question: 'Welche Kennzahlen sind beim Mehrfamilienhaus wichtig?',
          answer:
            'Relevant sind unter anderem Jahresnettokaltmiete, Bewirtschaftungskosten, Leerstand, Mietstruktur und absehbarer Instandhaltungsbedarf. Sie müssen im Kontext von Lage und Substanz gelesen werden.',
        },
        {
          question: 'Erfahren die Mieter vom Verkauf?',
          answer:
            'Die Kommunikation wird rechtlich und organisatorisch passend geplant. Ziel ist ein transparenter Ablauf mit möglichst wenig Belastung für Bewohner und Eigentümer.',
        },
        {
          question: 'Ist ein diskreter Verkauf möglich?',
          answer:
            'Ja. Bei geeigneten Objekten kann die Ansprache auf vorqualifizierte Investoren begrenzt werden. Reichweite und Diskretion werden dabei bewusst gegeneinander abgewogen.',
        },
      ],
      serviceType: 'Verkauf eines Mehrfamilienhauses',
    },
  ],
  en: [
    {
      locale: 'en',
      slug: 'house',
      translationKey: 'sell-house',
      title: 'Selling a house in the Nuremberg region',
      description:
        'Sell your house with an on-site valuation, complete preparation, and premium marketing in Zirndorf, Nuremberg, Fürth, and Erlangen.',
      eyebrow: 'House sale',
      lede: 'A house does not sell on its asking price alone. Reliable documents, a clear buyer profile, and a presentation that explains the location, condition, and potential shape the result.',
      answer:
        'For a successful house sale, Immonation combines an on-site valuation with sales strategy, professional presentation, qualified viewings, and consistent support through the notary appointment.',
      highlights: ['On-site valuation', 'Document and buyer review', 'Video and 360° tour'],
      sections: [
        {
          heading: 'Clarify value and objectives first',
          body: 'Plot, age, improvements, energy condition, and micro-location influence realistic market value. We assess these factors and align pricing, timing, and discretion with your objectives.',
        },
        {
          heading: 'Prepare the property completely',
          body: 'Land-registry records, floor plans, area calculations, and the energy certificate build confidence. Missing documents are identified early so they do not delay the transaction later.',
        },
        {
          heading: 'Suitable buyers instead of viewing tourism',
          body: 'Professional photography, video, and a 360° tour provide a realistic first impression. Prospects are qualified by need, timeline, and financing before an on-site appointment.',
        },
      ],
      faq: [
        {
          question: 'When is the right time to sell a house?',
          answer:
            'The right time depends on your objective, the property condition, and local demand. A valuation and realistic timeline are therefore the most useful starting point.',
        },
        {
          question: 'Which documents are needed?',
          answer:
            'Typical documents include land-registry records, cadastral map, floor plans, area calculation, energy certificate, and evidence of improvements.',
        },
        {
          question: 'How are viewings organized?',
          answer:
            'Prospects first receive meaningful information and are qualified. On-site appointments are then coordinated with a dedicated contact.',
        },
      ],
      serviceType: 'House sale',
    },
    {
      locale: 'en',
      slug: 'apartment',
      translationKey: 'sell-apartment',
      title: 'Selling an apartment in the Nuremberg region',
      description:
        'Sell an apartment with valuation, condominium documents, buyer strategy, and professional marketing from Immonation.',
      eyebrow: 'Apartment sale',
      lede: 'For an apartment, location and finish are only part of the picture. Service charges, reserves, the declaration of division, and the state of the owners’ association also influence demand and financing.',
      answer:
        'Immonation prepares the sale so owner-occupiers and investors can reliably assess the apartment, building, and financial framework.',
      highlights: [
        'Review association documents',
        'Owner-occupier or investor',
        'Structured buyer qualification',
      ],
      sections: [
        {
          heading: 'Assess the apartment and building together',
          body: 'Alongside area, layout, and finish, buyers examine service charges, reserves, meeting minutes, and planned work. Complete preparation prevents uncertainty and avoidable discounts.',
        },
        {
          heading: 'Address the right buyer group',
          body: 'Vacant and tenanted apartments require different stories. The brochure, imagery, and language should reflect whether owner-occupiers or investors are the priority.',
        },
        {
          heading: 'Prepare for financing questions',
          body: 'Banks need information about both the unit and the owners’ association. We organize the relevant documents and coordinate questions through contract preparation.',
        },
      ],
      faq: [
        {
          question: 'Can I sell a tenanted apartment?',
          answer:
            'Yes. The tenancy, rent, service charges, and relevant financial information are prepared transparently for suitable investors.',
        },
        {
          question: 'Which association documents matter?',
          answer:
            'Key records include the declaration of division, annual budget, service-charge statement, reserve balance, and owners’ meeting minutes.',
        },
        {
          question: 'Should I renovate before selling?',
          answer:
            'Not automatically. The right choice depends on condition, buyer group, cost, and the likely additional value. It belongs in the sales strategy.',
        },
      ],
      serviceType: 'Apartment sale',
    },
    {
      locale: 'en',
      slug: 'land',
      translationKey: 'sell-land',
      title: 'Selling land in the Nuremberg region',
      description:
        'Sell land with a clear assessment of planning rights, access, development potential, and suitable buyers.',
      eyebrow: 'Land sale',
      lede: 'Land value comes from location and usable potential. Planning rights, plot shape, access, utilities, and possible subdivision must be documented clearly.',
      answer:
        'Immonation prepares land for private builders, investors, or developers and aligns the marketing with development potential that can actually be substantiated.',
      highlights: ['Assess planning rights', 'Explain usable potential', 'Targeted buyer approach'],
      sections: [
        {
          heading: 'Assess buildability reliably',
          body: 'Local plans, surrounding-development rules, registered burdens, and utility status can matter more than surface area alone. Open questions are named rather than marketed as assumptions.',
        },
        {
          heading: 'Bundle documents for faster decisions',
          body: 'Cadastral plans, title records, official information, and existing concepts form the basis. A clear document structure helps prospects and lenders review the opportunity.',
        },
        {
          heading: 'Select the appropriate buyer group',
          body: 'Depending on size and potential, buyers may be private builders, developers, or long-term investors. Outreach follows realistic use rather than the largest possible mailing list.',
        },
      ],
      faq: [
        {
          question: 'How is land value assessed?',
          answer:
            'Standard land value, location, plot shape, utilities, and actual buildability are considered together. The standard land value alone is not a reliable asking price.',
        },
        {
          question: 'Do I need preliminary planning approval?',
          answer:
            'Not always. Where potential is unclear or unusual, preliminary approval can reduce uncertainty and sharpen the marketing.',
        },
        {
          question: 'Can a large plot be divided?',
          answer:
            'That depends on shape, planning rules, access, and municipal requirements. The option should be checked before it is advertised.',
        },
      ],
      serviceType: 'Land sale',
    },
    {
      locale: 'en',
      slug: 'apartment-building',
      translationKey: 'sell-apartment-building',
      title: 'Selling an apartment building in the Nuremberg region',
      description:
        'Sell an apartment building with well-structured tenancy, income, maintenance, and development information.',
      eyebrow: 'Investment sale',
      lede: 'Apartment buildings require traceable income, clean tenancy records, and a realistic view of maintenance and development. Investors examine both numbers and fabric.',
      answer:
        'Immonation structures property, tenancy, and financial data, defines a suitable investor profile, and manages the sale discreetly through the notary appointment.',
      highlights: [
        'Tenancy and income data',
        'Discreet investor outreach',
        'Documented review process',
      ],
      sections: [
        {
          heading: 'Present income and condition transparently',
          body: 'Rent roll, leases, operating costs, improvements, and maintenance needs form the decision basis. Plausible records create more confidence than blanket yield promises.',
        },
        {
          heading: 'Plan discretion and tenant communication',
          body: 'A sale can be prepared without unnecessary disruption. Viewings, document access, and communication are aligned with the property and tenancy situation.',
        },
        {
          heading: 'Approach qualified investors',
          body: 'Depending on the asset, private owners, family offices, or professional investors may fit. We structure the information and coordinate due diligence with serious parties.',
        },
      ],
      faq: [
        {
          question: 'Which figures matter for an apartment building?',
          answer:
            'Relevant figures include annual net rent, operating costs, vacancy, tenancy structure, and expected maintenance. They must be read in the context of location and condition.',
        },
        {
          question: 'Will tenants be informed about the sale?',
          answer:
            'Communication is planned to fit legal and practical requirements, with as little disruption as possible for residents and the owner.',
        },
        {
          question: 'Is a discreet sale possible?',
          answer:
            'Yes. Where suitable, outreach can be limited to pre-qualified investors. Reach and discretion are balanced deliberately.',
        },
      ],
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
