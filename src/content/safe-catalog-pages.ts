import type { NavigationHref } from './navigation'
import type { CatalogPageId, LocalizedPage, PageDefinition } from './catalog-pages'

type Copy = Pick<
  LocalizedPage,
  'title' | 'lede' | 'answer' | 'sectionTitles' | 'sectionTexts' | 'sectionHrefs' | 'faq'
>

function localize(copy: Copy, locale: 'de' | 'en'): LocalizedPage {
  return {
    eyebrow: locale === 'de' ? 'Immonation Ratgeber' : 'Immonation guide',
    description: copy.answer,
    ctaTitle:
      locale === 'de'
        ? 'Ihre Immobilie verdient einen klaren Plan.'
        : 'Your property deserves a clear plan.',
    ctaText:
      locale === 'de'
        ? 'Wir ordnen Ausgangslage, Wert und nächste Schritte persönlich ein.'
        : 'We assess your situation, value, and next steps personally.',
    ctaLabel: locale === 'de' ? 'Kostenlose Bewertung starten' : 'Start a free valuation',
    ...copy,
  }
}

function define(
  de: Copy,
  en: Copy,
  ctaHref: NavigationHref = '/property-valuation',
): PageDefinition {
  return { de: localize(de, 'de'), en: localize(en, 'en'), ctaHref }
}

const guides = (slugs: string[]) =>
  slugs.map((slug) => ({ pathname: '/situations/[slug]' as const, params: { slug } }))

export const SAFE_CATALOG_OVERRIDES: Partial<Record<CatalogPageId, PageDefinition>> = {
  'buyer-search': define(
    {
      title: 'Beschreibt gerade jemand Ihre Immobilie?',
      lede: 'Konkrete Suchprofile aus der Region können den passenden Käufer schon vor dem öffentlichen Inserat sichtbar machen.',
      answer:
        'Immonation führt Suchprofile für Häuser, Wohnungen, Grundstücke und Anlageobjekte. Passt Ihre Immobilie zu einem dieser Profile, kann ein diskreter Verkauf ohne öffentliche Vermarktung sinnvoll sein – immer mit qualifizierter Anfrage, abgestimmter Kommunikation und Ihrer Freigabe.',
      sectionTitles: [
        '8.000+ Suchkunden im Netzwerk',
        'Vorqualifiziert statt Besichtigungstourismus',
        'Diskret verkaufen',
        'Suchauftrag anlegen',
      ],
      sectionTexts: [
        'Unser Netzwerk verbindet konkrete Wohnwünsche mit Lage, Objektart, Budget und Zeitplan. So wird aus Reichweite eine relevante Vorauswahl.',
        'Wir prüfen Anfrage, Käuferprofil und Finanzierbarkeit, bevor ein Termin mit Eigentümern abgestimmt wird.',
        'Auf Wunsch sprechen wir passende Suchkunden direkt an, ohne die Immobilie öffentlich zu inserieren.',
        'Wer selbst sucht, kann ein Profil hinterlegen und neue passende Objekte vor der öffentlichen Vermarktung erhalten.',
      ],
      faq: [
        {
          question: 'Wird meine Immobilie automatisch an alle Suchkunden gesendet?',
          answer:
            'Nein. Wir gleichen Objektmerkmale und Suchprofil ab und sprechen passende Interessenten nur im abgestimmten Umfang an.',
        },
        {
          question: 'Wie werden Interessenten geprüft?',
          answer:
            'Wir klären Interesse, Objektpassung und – soweit für den nächsten Schritt erforderlich – die Finanzierung, bevor eine Besichtigung koordiniert wird.',
        },
        {
          question: 'Kann der Verkauf vollständig diskret bleiben?',
          answer:
            'Ja. Zielgruppe, Informationsumfang und Zeitpunkt der Ansprache werden vor Beginn gemeinsam festgelegt.',
        },
      ],
    },
    {
      title: 'Is someone already looking for your property?',
      lede: 'Specific buyer profiles from the region can reveal a suitable buyer before a public listing is needed.',
      answer:
        'Immonation maintains search profiles for homes, apartments, land, and investment property. If your property fits one of them, a discreet sale without public marketing may be sensible – with qualified enquiries, agreed communication, and your approval.',
      sectionTitles: [
        '8,000+ buyer profiles',
        'Qualified instead of crowded viewings',
        'Discreet by design',
        'Create a search request',
      ],
      sectionTexts: [
        'Our network connects concrete requirements with location, property type, budget, and timing.',
        'We clarify interest, fit, and finance before arranging a viewing with an owner.',
        'When requested, suitable buyers can be approached directly without a public listing.',
        'People looking to buy can leave a profile and hear about suitable properties before public marketing.',
      ],
      faq: [
        {
          question: 'Is my property automatically sent to every buyer?',
          answer:
            'No. We match property details and search criteria and contact suitable buyers only within the agreed scope.',
        },
        {
          question: 'How are buyers checked?',
          answer:
            'We clarify interest, fit, and – where needed for the next step – financing before arranging a viewing.',
        },
        {
          question: 'Can the sale remain completely discreet?',
          answer: 'Yes. Audience, information, and timing are agreed before contact begins.',
        },
      ],
    },
  ),
  ai: define(
    {
      title: 'Fragen Sie den Immonation-Assistenten',
      lede: 'Antworten zu Verkauf, Bewertung, Ablauf, Provision und Finanzierung – rund um die Uhr als erste Orientierung.',
      answer:
        'Die Demo zeigt, wie häufige Fragen strukturiert eingeordnet werden können. Sie ersetzt keine persönliche, rechtliche oder steuerliche Beratung und ist nicht mit unseren internen Systemen verbunden.',
      sectionTitles: ['Bewertung & Preis', 'Verkaufsprozess', 'Persönlicher Termin'],
      sectionTexts: [
        'Der Assistent erklärt, welche Faktoren den Wert beeinflussen und warum ein Klickwert keine persönliche Bewertung ersetzt.',
        'Fragen zu Unterlagen, Vermarktung, Käufersuche, Besichtigungen und Notar werden in den passenden Prozessschritt eingeordnet.',
        'Wenn es konkret wird, führt der nächste Schritt zum persönlichen Gespräch mit unserem Team.',
      ],
      faq: [
        {
          question: 'Erteilt der Assistent eine verbindliche Bewertung?',
          answer:
            'Nein. Er liefert allgemeine Orientierung. Eine belastbare Einschätzung entsteht erst aus Objekt, Lage, Zustand und Nachfrage.',
        },
        {
          question: 'Werden meine Fragen gespeichert?',
          answer:
            'Die Vorschau übermittelt und speichert keine Eingaben. Die konkrete technische Ausgestaltung der finalen Version wird vor dem Livegang festgelegt.',
        },
        {
          question: 'Kann die KI einen Termin buchen?',
          answer:
            'Nein. Für eine verbindliche Beratung nutzen Sie den persönlichen Kontakt oder die Terminabstimmung.',
        },
      ],
    },
    {
      title: 'Ask the Immonation assistant',
      lede: 'Answers about sales, valuation, process, commission, and finance – available around the clock as a first orientation.',
      answer:
        'The demo shows how common questions can be structured. It does not replace personal, legal, or tax advice and is not connected to our internal systems.',
      sectionTitles: ['Valuation & price', 'The sales process', 'A personal conversation'],
      sectionTexts: [
        'The assistant explains which factors influence value and why a click-based estimate cannot replace a personal valuation.',
        'Questions about documents, marketing, buyer searches, viewings, and the notary are placed into the appropriate process step.',
        'When the situation becomes specific, the next step is a personal conversation with our team.',
      ],
      faq: [
        {
          question: 'Does the assistant provide a binding valuation?',
          answer:
            'No. It offers general orientation. A robust assessment combines the property, location, condition, and demand.',
        },
        {
          question: 'Are my questions stored?',
          answer:
            'The preview does not transmit or store inputs. The final technical setup will be defined before launch.',
        },
        {
          question: 'Can the AI book an appointment?',
          answer: 'No. For binding advice, use personal contact or appointment coordination.',
        },
      ],
    },
  ),
  appointment: {
    ...define(
      {
        title: 'Termin online buchen',
        lede: 'Wählen Sie ein passendes Zeitfenster für Ihr Erstgespräch – vor Ort in Zirndorf, telefonisch oder per Video.',
        answer:
          'Im Erstgespräch klären wir Immobilie, Ziel, Zeitplan und die nächsten Unterlagen. Die Vorschau bildet den Buchungsablauf ab; sie reserviert noch keinen echten Kalendertermin.',
        sectionTitles: ['Anliegen wählen', 'Zeitfenster abstimmen', 'Gespräch vorbereiten'],
        sectionTexts: [
          'Beschreiben Sie kurz, ob es um Bewertung, Verkauf, Kauf oder eine besondere Verkaufssituation geht.',
          'Ein passendes Zeitfenster wird mit dem zuständigen Ansprechpartner abgestimmt.',
          'Unterlagen und offene Fragen können vor dem Gespräch gesammelt werden, damit der Termin konkret bleibt.',
        ],
        faq: [
          {
            question: 'Ist die Buchung auf dieser Seite verbindlich?',
            answer:
              'Die Vorschau reserviert keinen Termin. Die verbindliche Abstimmung erfolgt über den Kontakt mit unserem Team.',
          },
          {
            question: 'Kann das Gespräch auch außerhalb der Öffnungszeiten stattfinden?',
            answer:
              'Ja, Termine außerhalb der Öffnungszeiten sind nach vorheriger Absprache möglich.',
          },
          {
            question: 'Was sollte ich vorbereiten?',
            answer:
              'Hilfreich sind Adresse, Objektart, grober Zeitplan und die Unterlagen, die bereits vorliegen.',
          },
        ],
      },
      {
        title: 'Book an appointment online',
        lede: 'Choose a suitable time for your initial conversation – in Zirndorf, by phone, or by video.',
        answer:
          'The initial conversation covers the property, goal, timing, and next documents. The preview shows the booking flow; it does not reserve a real calendar slot.',
        sectionTitles: ['Choose the topic', 'Coordinate a time', 'Prepare the conversation'],
        sectionTexts: [
          'Briefly describe whether the topic is valuation, selling, buying, or a specific selling situation.',
          'A suitable time is coordinated with the responsible contact.',
          'Documents and open questions can be collected beforehand so the meeting stays focused.',
        ],
        faq: [
          {
            question: 'Is the booking on this page binding?',
            answer:
              'The preview does not reserve an appointment. Binding coordination takes place through contact with our team.',
          },
          {
            question: 'Can the conversation take place outside opening hours?',
            answer: 'Yes, appointments outside opening hours are possible by prior arrangement.',
          },
          {
            question: 'What should I prepare?',
            answer:
              'The address, property type, rough timing, and documents already available are helpful.',
          },
        ],
      },
      '/contact',
    ),
    preview: 'appointment',
  },
  awards: define(
    {
      title: 'Geprüft, ausgezeichnet, nachweisbar',
      lede: 'Gute Arbeit sollte man nicht nur behaupten. Auszeichnungen werden mit Herausgeber, Jahr und Prüfkontext nachvollziehbar dokumentiert.',
      answer:
        'Die Seite zeigt öffentliche Anerkennungen und fachliche Qualifikation getrennt voneinander. Ein Siegel ist nur dann hilfreich, wenn Quelle, Zeitraum und Kriterien nachvollziehbar bleiben.',
      sectionTitles: [
        'Auszeichnungen & Siegel',
        'F.A.Z. Institut & Capital',
        'Immowelt Business Partner',
        'Fachliche Qualifikation im Team',
      ],
      sectionTexts: [
        'Öffentliche Anerkennungen werden mit Herausgeber und Einordnung gezeigt – ohne aus einem Logo mehr abzuleiten, als die Quelle bestätigt.',
        'Branchenanerkennungen werden als externe Einordnung verstanden, nicht als alleiniger Qualitätsbeweis.',
        'Die Partnerschaft ist über das öffentliche Profil von Immowelt nachvollziehbar.',
        'Ein fest angestellter Ingenieur unterstützt Aufmaß, Wohnflächenberechnung und Grundrisserstellung für die Vermarktung.',
      ],
      faq: [
        {
          question: 'Werden die Siegel von Immonation selbst vergeben?',
          answer:
            'Nein. Die Seite nennt die jeweiligen Herausgeber und verlinkt öffentliche Quellen, soweit verfügbar.',
        },
        {
          question: 'Was sagt eine Auszeichnung aus?',
          answer:
            'Sie beschreibt den jeweiligen Prüf- oder Auswahlkontext. Für die eigene Entscheidung sollten zusätzlich Vorgehen, Unterlagen und Referenzen geprüft werden.',
        },
        {
          question: 'Welche fachliche Qualifikation gibt es im Team?',
          answer:
            'Hubert Christian Mahlich ist fest angestellter Ingenieur und für Aufmaß, Wohnflächenberechnung und Grundrisserstellung zuständig.',
        },
      ],
    },
    {
      title: 'Checked, recognised, verifiable',
      lede: 'Good work should not be claimed only. Awards are documented with issuer, year, and assessment context.',
      answer:
        'This page separates public recognition from professional qualification. A seal is useful only when its source, period, and criteria remain understandable.',
      sectionTitles: [
        'Awards & seals',
        'F.A.Z. Institute & Capital',
        'Immowelt Business Partner',
        'Professional qualification',
      ],
      sectionTexts: [
        'Public recognition is shown with its issuer and context – without claiming more than the source supports.',
        'Industry recognition is an external signal, not the only basis for a decision.',
        'The partnership can be checked through Immowelt’s public profile.',
        'A permanently employed engineer supports measurement, floor-area calculation, and plan preparation.',
      ],
      faq: [
        {
          question: 'Does Immonation issue these seals?',
          answer: 'No. The page names the issuers and links public sources where available.',
        },
        {
          question: 'What does an award prove?',
          answer:
            'It describes its own assessment or selection context. Also review the agency’s process, documents, and references.',
        },
        {
          question: 'What professional qualification is represented?',
          answer:
            'Hubert Christian Mahlich is a permanently employed engineer responsible for measurement, floor-area calculation, and plan preparation.',
        },
      ],
    },
  ),
  magazine: define(
    {
      title: 'REVIER – das Immobilienmagazin für den Großraum Nürnberg',
      lede: 'Ausgewählte, echte Verkäufe aus Nürnberg, Fürth, Erlangen, Zirndorf und Forchheim – und die Geschichten dahinter.',
      answer:
        'REVIER ist kein Werbeprospekt. Jede Ausgabe verbindet konkrete Immobilien, Ausgangslage, Vermarktungsweg und Ergebnis und macht den Grundsatz „beurkundet, nicht behauptet“ an echten Fällen sichtbar.',
      sectionTitles: ['Gemachte Projekte', 'Unsere Haltung', 'Online blättern'],
      sectionTexts: [
        'Konkrete Beispiele statt Behauptungen: Objekte, Ausgangslagen und Ergebnisse aus der Region.',
        'Realistische Preise, saubere Vorbereitung und Vermarktung, die Käufer ernsthaft qualifiziert.',
        'Per Klick, Pfeiltasten oder Vollbildansicht direkt durch die digitale Ausgabe lesen.',
      ],
      faq: [
        {
          question: 'Sind die gezeigten Verkäufe echt?',
          answer:
            'Das Magazin zeigt ausgewählte Immobilien aus tatsächlich vermittelten und freigegebenen Verkaufsfällen.',
        },
        {
          question: 'Kann ich das Magazin auf dem Smartphone lesen?',
          answer:
            'Ja. Der Reader passt sich an kleine Bildschirme an und kann per Klick oder Wisch bedient werden.',
        },
        {
          question: 'Wie geht es nach dem Magazin weiter?',
          answer:
            'Wenn Sie Ihre eigene Situation einordnen möchten, starten Sie mit einer kostenlosen, unverbindlichen Bewertung.',
        },
      ],
    },
    {
      title: 'REVIER – the property magazine for greater Nuremberg',
      lede: 'Selected, genuine sales from Nuremberg, Fürth, Erlangen, Zirndorf, and Forchheim – and the stories behind them.',
      answer:
        'REVIER is not an advertising brochure. Each issue connects a real property with its starting point, marketing route, and outcome and makes “documented, not claimed” tangible through actual cases.',
      sectionTitles: ['Completed projects', 'Our principles', 'Read online'],
      sectionTexts: [
        'Concrete examples instead of claims: properties, starting points, and outcomes from the region.',
        'Realistic pricing, careful preparation, and marketing that qualifies buyers seriously.',
        'Read the digital issue by click, arrow keys, or fullscreen view.',
      ],
      faq: [
        {
          question: 'Are the sales shown genuine?',
          answer:
            'The magazine presents selected properties from completed and approved sales cases.',
        },
        {
          question: 'Can I read the magazine on a phone?',
          answer: 'Yes. The reader adapts to small screens and can be used with clicks or swipes.',
        },
        {
          question: 'What comes after the magazine?',
          answer:
            'If you want to assess your own situation, start with a free, non-binding valuation.',
        },
      ],
    },
  ),
  sold: define(
    {
      title: 'Verkaufte Immobilien – echte Abschlüsse aus der Region',
      lede: 'Ausgewählte Verkäufe aus Nürnberg, Fürth, Erlangen, Zirndorf und dem weiteren Großraum – ergänzt um Video-Belege vom Tag der Übergabe.',
      answer:
        'Jeder gezeigte Fall steht für eine abgeschlossene Vermarktung. Veröffentlicht werden nur freigegebene Angaben; Adressen, Namen und vertrauliche Vertragsinhalte bleiben geschützt.',
      sectionTitles: [
        'Ausgewählte Referenzen',
        'Verkauft-Clips',
        'Verkaufsglocke',
        'Nachvollziehbare Ergebnisse',
      ],
      sectionTexts: [
        'Ausgangslage, Vorgehen und Ergebnis machen sichtbar, wie unterschiedlich ein Verkauf vorbereitet werden kann.',
        'Kurze Clips vom Übergabetag zeigen Objektart und Ort der abgeschlossenen Vermarktung.',
        'Die gesprochenen Glocken-Videos dokumentieren Abschlüsse aus dem Büro – erst nach Klick und mit Ton.',
        'Bewertungen und Referenzen bleiben ihrer Quelle und dem jeweiligen Verkaufsfall zugeordnet.',
      ],
      faq: [
        {
          question: 'Warum sind nicht alle Verkäufe aufgeführt?',
          answer:
            'Die Übersicht zeigt ausgewählte und freigegebene Fälle. Eine vollständige Liste wäre mit Rücksicht auf die Privatsphäre unserer Kunden nicht sinnvoll.',
        },
        {
          question: 'Sind die Kaufpreise öffentlich?',
          answer:
            'Nein. Wir nennen nur Angaben, die für die jeweilige Referenz freigegeben und belastbar dokumentiert sind.',
        },
        {
          question: 'Kann ich eine ähnliche Referenz besprechen?',
          answer:
            'Ja. In einer kostenlosen Bewertung ordnen wir Objektart, Lage, Ausgangslage und passende Vermarktungswege persönlich ein.',
        },
      ],
    },
    {
      title: 'Sold properties – genuine completions from the region',
      lede: 'Selected sales from Nuremberg, Fürth, Erlangen, Zirndorf, and the wider region, supplemented by handover-day video proof.',
      answer:
        'Every case shown represents a completed campaign. Only approved information is published; addresses, names, and confidential contract details remain protected.',
      sectionTitles: ['Selected references', 'Sold clips', 'The sales bell', 'Traceable outcomes'],
      sectionTexts: [
        'Starting point, approach, and outcome show how differently a sale can be prepared.',
        'Short handover-day clips show the property type and town of completed campaigns.',
        'Spoken bell videos document completions from the office and start only after a click.',
        'Reviews and references remain linked to their source and the relevant sales case.',
      ],
      faq: [
        {
          question: 'Why are not all sales listed?',
          answer:
            'The overview shows selected approved cases. A complete list would not be appropriate out of respect for client privacy.',
        },
        {
          question: 'Are purchase prices public?',
          answer:
            'No. We publish only information approved and reliably documented for the reference.',
        },
        {
          question: 'Can I discuss a similar reference?',
          answer:
            'Yes. A free valuation can cover the property type, location, starting point, and suitable marketing routes.',
        },
      ],
    },
  ),
  'warning-signs': define(
    {
      title: 'Warnsignale beim Immobilienverkauf',
      lede: 'Seriöse Beratung bleibt überprüfbar: Preis, Leistung, Käuferprüfung und Vergütung müssen verständlich erklärt und dokumentiert sein.',
      answer:
        'Ein einzelnes Warnsignal beweist noch kein Fehlverhalten. Häufen sich unklare Versprechen, Zeitdruck und fehlende Nachweise, sollten Eigentümer innehalten, Angebote vergleichen und offene Punkte schriftlich klären.',
      sectionTitles: [
        'Phantom-Käufer',
        'Lockpreis',
        'Unterschrifts-Druck',
        'Unklarer Leistungsumfang',
        'Schwache Unterlagenprüfung',
        'Keine Käuferqualifizierung',
        'Undurchsichtige Berichte',
        'Nicht prüfbare Nachweise',
        'Gebührenversprechen vor Leistung',
      ],
      sectionTexts: [
        'Eine angeblich fertige Käuferliste ist nur hilfreich, wenn Suchprofil, Qualifizierung und Einwilligung zur Ansprache nachvollziehbar sind.',
        'Ein überhöhter Startpreis ohne Vergleichsdaten und Strategie verlängert oft die Vermarktung. Folgt danach die öffentliche Preis-Salami, wird der belastbare Wert erst spät sichtbar.',
        'Verträge sollten ohne künstliche Eile gelesen werden können – auch wenn ein Angebot „nur heute gültig“ sein soll. Laufzeit, Kündigung und Vollmachten gehören vorab erklärt.',
        'Foto, Exposé, Portale, Besichtigungen, Berichte und Dokumentenbeschaffung sollten im Auftrag konkret beschrieben sein.',
        'Grundbuch, Flächen, Energieausweis und Objektangaben brauchen eine erkennbare Plausibilitätsprüfung.',
        'Besichtigungen ohne Identitäts-, Interessen- oder Finanzierungsprüfung belasten Eigentümer und erzeugen wenig belastbare Nachfrage.',
        'Eigentümer sollten wissen, welche Anfragen eingingen, was Interessenten zurückmelden und welche Anpassung daraus folgt.',
        'Bewertungen, Auszeichnungen und Referenzen sollten Quelle, Zeitraum und Bezug erkennen lassen. Logos allein sind kein Nachweis.',
        'Vergütung und Fälligkeit gehören schriftlich in den Vertrag. Aussagen über Kostenfreiheit oder Erfolg sollten nicht nur mündlich bleiben.',
      ],
      faq: [
        {
          question: 'Ist ein hoher Angebotspreis automatisch unseriös?',
          answer:
            'Nein. Entscheidend ist, ob er aus Objektmerkmalen, Vergleichsfällen und Nachfrage nachvollziehbar abgeleitet wird.',
        },
        {
          question: 'Welche Punkte gehören in den Maklerauftrag?',
          answer:
            'Mindestens Leistungsumfang, Laufzeit, Kündigung, Vergütung, Vermarktungswege, Vollmachten und der Umgang mit Interessentendaten.',
        },
        {
          question: 'Wie prüfe ich Referenzen?',
          answer:
            'Achten Sie auf eine auffindbare Quelle, plausiblen Kontext und Zustimmung zur Veröffentlichung.',
        },
      ],
    },
    {
      title: 'Warning signs when selling property',
      lede: 'Reliable advice remains verifiable: pricing, services, buyer checks, and fees should be explained and documented clearly.',
      answer:
        'One warning sign does not prove misconduct. When vague promises, pressure, and missing evidence accumulate, owners should pause, compare proposals, and resolve open questions in writing.',
      sectionTitles: [
        'Phantom buyers',
        'Bait asking price',
        'Pressure to sign',
        'Unclear service scope',
        'Weak document review',
        'No buyer qualification',
        'Opaque reporting',
        'Unverifiable proof',
        'Premature fee promises',
      ],
      sectionTexts: [
        'A claimed buyer list is useful only when search criteria, qualification, and permission to make contact can be explained.',
        'An inflated starting price without comparables and a strategy often prolongs the campaign. If public drip-feed reductions follow, the reliable value appears only late.',
        'Owners should be able to compare contracts without artificial urgency — even when an offer is said to be “only valid today”. Term, termination, and authority must be clear first.',
        'Photography, brochures, portals, viewings, reporting, and document work should be described specifically.',
        'Land-register information, areas, energy data, and property statements need visible plausibility checks.',
        'Viewings without identity, intent, or finance checks burden owners and create little reliable evidence of demand.',
        'Owners should know which enquiries arrived, what viewers said, and what changes are proposed as a result.',
        'Reviews, awards, and references should show a source, period, and context. A logo alone is not evidence.',
        'Fees and payment triggers belong in the written agreement. Cost or success claims should not remain verbal.',
      ],
      faq: [
        {
          question: 'Is a high asking price automatically unreliable?',
          answer:
            'No. What matters is whether it follows from the property, relevant comparisons, and demand.',
        },
        {
          question: 'What should an agency agreement cover?',
          answer:
            'At least services, term, termination, fees, marketing channels, authority, and buyer-data handling.',
        },
        {
          question: 'How can I check references?',
          answer: 'Look for a traceable source, plausible context, and permission to publish.',
        },
      ],
    },
  ),
  'selling-situations': define(
    {
      title: 'Ratgeber für besondere Verkaufssituationen',
      lede: 'Zwölf konkrete Einstiege zeigen, wie sich Wertbasis, Entscheidungsbefugnis, Zeitplan, Unterlagen und Diskretion je nach Anlass verändern.',
      answer:
        'Der Anlass bestimmt den Ablauf: Bei einer Erbengemeinschaft muss zuerst Entscheidungsfähigkeit entstehen, bei Zeitdruck das verfügbare Handlungsfenster und bei vermieteten oder gewerblichen Objekten die wirtschaftliche Dokumentation.',
      sectionTitles: [
        'Trennung & Scheidung',
        'Erbfall',
        'Insolvenz',
        'Immobilienverrentung',
        'Alter & Pflege',
        'Sanierungsbedarf',
        'Kapitalanlage',
        'Umzug',
        'Finanznot',
        'Vollmacht',
        'Gewerbeimmobilie',
        'Leerstand',
      ],
      sectionTexts: [
        'Neutrale Wertbasis und einen nachvollziehbaren Ablauf schaffen.',
        'Erben, Grundbuch, Unterlagen und Entscheidungen koordinieren.',
        'Zeitfenster, Bank oder Verwaltung und freien Verkauf früh klären.',
        'Wohnrecht, Kapitalbedarf und Vertragsmodelle vergleichen.',
        'Vollmacht, Familie, Pflegefinanzierung und Übergang planen.',
        'Rechnen, ob Maßnahmen Wert schaffen oder der Ist-Zustand überzeugt.',
        'Mietdaten, Ertrag, Unterlagen und Investorenansprache vorbereiten.',
        'Verkauf, neue Wohnsituation, Finanzierung und Übergabe verzahnen.',
        'Mit früher Bewertung unnötigen Zeitdruck vermeiden.',
        'Vertretungsmacht vor Vermarktungsstart prüfen.',
        'Nutzung, Verträge, Ertrag und Käuferkreis zusammenführen.',
        'Risiken begrenzen, Zustand dokumentieren und Verfügbarkeit nutzen.',
      ],
      sectionHrefs: guides([
        'trennung',
        'erbfall',
        'insolvenz',
        'verrentung',
        'alter-pflege',
        'sanierung',
        'kapitalanlage',
        'umzug',
        'finanznot',
        'vollmacht',
        'gewerbe',
        'leerstand',
      ]),
      faq: [
        {
          question: 'Welcher Ratgeber passt bei mehreren Themen?',
          answer:
            'Beginnen Sie mit dem Thema, das Entscheidungsbefugnis oder Zeitfenster am stärksten begrenzt.',
        },
        {
          question: 'Verändert der Anlass den Marktwert?',
          answer:
            'Nicht unmittelbar. Rechte, Fristen, Nutzung oder fehlende Unterlagen verändern aber Risiko und Ablauf.',
        },
        {
          question: 'Ist ein diskreter Verkauf möglich?',
          answer:
            'Ja. Informationsumfang, Zielgruppe und Zeitpunkt werden vor der Vermarktung vereinbart.',
        },
      ],
    },
    {
      title: 'Guides for specific selling situations',
      lede: 'Twelve focused guides explain how valuation basis, authority, timing, documents, and discretion change with the situation.',
      answer:
        'The reason for selling shapes the process: co-heirs need decision-making clarity, urgent cases need a realistic time window, and tenanted or commercial property needs sound financial documentation.',
      sectionTitles: [
        'Separation & divorce',
        'Inheritance',
        'Insolvency',
        'Property annuity',
        'Ageing & care',
        'Renovation needs',
        'Investment property',
        'Relocation',
        'Financial pressure',
        'Power of attorney',
        'Commercial property',
        'Vacancy',
      ],
      sectionTexts: [
        'Create a neutral value basis and shared process.',
        'Coordinate heirs, title, documents, and decisions.',
        'Clarify the timeline, lender or administrator, and market options.',
        'Compare residence rights, capital needs, and contract structures.',
        'Plan authority, family involvement, care funding, and transition.',
        'Assess whether work creates value or current condition should be sold.',
        'Prepare tenancy data, income, documents, and investor communication.',
        'Align the sale, new home, finance, and handover.',
        'Use early valuation to preserve options under pressure.',
        'Check the scope and usability of authority before marketing.',
        'Bring use, leases, income, and professional buyers together.',
        'Limit risks, document condition, and use availability.',
      ],
      sectionHrefs: guides([
        'separation',
        'inheritance',
        'insolvency',
        'property-annuity',
        'ageing-and-care',
        'renovation',
        'investment-property',
        'relocation',
        'financial-distress',
        'power-of-attorney',
        'commercial-property',
        'vacancy',
      ]),
      faq: [
        {
          question: 'Which guide applies when issues overlap?',
          answer: 'Start with the issue that most limits authority or timing.',
        },
        {
          question: 'Does the reason for selling change market value?',
          answer:
            'Not directly, but rights, deadlines, use, and missing documents can change risk and process.',
        },
        {
          question: 'Can the sale remain discreet?',
          answer: 'Yes. Information scope, audience, and timing are agreed before marketing.',
        },
      ],
    },
  ),
  'virtual-tour': define(
    {
      title: 'Virtuelle Besichtigung mit klaren Grenzen',
      lede: 'Ein 360°-Rundgang hilft Interessenten, Raumfolgen vorab zu verstehen. Er ergänzt die Besichtigung vor Ort und wird erst nach abgestimmter Aufnahme und Freigabe eingesetzt.',
      answer:
        'Vor der Aufnahme werden private Gegenstände, sichtbare Dokumente, Spiegelungen und sensible Bereiche geprüft. Der Zugang kann passend zur Vermarktung offen oder gezielt bereitgestellt werden.',
      sectionTitles: [
        'Aufnahme & Freigabe',
        'Vorqualifizierung & Fernzugang',
        'Vor-Ort-Termin & Alternative',
      ],
      sectionTexts: [
        'Kamerapositionen, Datenschutz, Einwilligungen und auszublendende Bereiche werden gemeinsam festgelegt.',
        'Der Rundgang ermöglicht eine Vorauswahl für entfernte oder zeitlich eingeschränkte Interessenten.',
        'Physische Besichtigungen bleiben wichtig. Alternativ stehen Bilder, Pläne und persönliche Erläuterung bereit.',
      ],
      faq: [
        {
          question: 'Ersetzt der Rundgang die Besichtigung?',
          answer: 'Nein. Er verbessert die Vorauswahl; eine Vor-Ort-Prüfung bleibt sinnvoll.',
        },
        {
          question: 'Sind alle Räume öffentlich sichtbar?',
          answer:
            'Nur freigegebene Bereiche werden aufgenommen; Zugang und Sichtbarkeit werden vereinbart.',
        },
        {
          question: 'Was geschieht mit privaten Dingen?',
          answer:
            'Sensible Informationen werden entfernt, verdeckt oder von der Aufnahme ausgeschlossen.',
        },
      ],
    },
    {
      title: 'Virtual viewings with clear boundaries',
      lede: 'A 360° tour helps buyers understand spatial sequence before travelling. It complements a physical viewing and follows agreed capture and approval.',
      answer:
        'Personal items, visible documents, reflections, and sensitive areas are reviewed before capture. Access can be public or selective depending on the agreed campaign.',
      sectionTitles: [
        'Capture & approval',
        'Pre-qualification & remote access',
        'Physical viewing & alternatives',
      ],
      sectionTexts: [
        'Camera positions, privacy, consent, and excluded areas are agreed together.',
        'The tour supports meaningful screening for remote or time-constrained buyers.',
        'Physical viewings remain important. Photographs, plans, and personal guidance provide an accessible alternative.',
      ],
      faq: [
        {
          question: 'Does the tour replace a viewing?',
          answer: 'No. It improves screening; an in-person inspection remains sensible.',
        },
        {
          question: 'Is every room public?',
          answer: 'Only approved areas are captured; access and visibility are agreed.',
        },
        {
          question: 'What happens to private items?',
          answer: 'Sensitive information is removed, concealed, or excluded from capture.',
        },
      ],
    },
  ),
  video: define(
    {
      title: 'Immobilienvideo als Teil der Präsentation',
      lede: 'Ein Objektvideo übersetzt Raum, Lage und Nutzung in eine klare Erzählung. Es ergänzt Fotos, Grundrisse und 360°-Tour.',
      answer:
        'Vor dem Dreh werden Zielgruppe, Kernaussage, sensible Bereiche und Formate festgelegt. Nach Aufnahme und Schnitt prüft der Eigentümer die Fassung vor der Veröffentlichung.',
      sectionTitles: ['Konzept & Aufnahme', 'Schnitt & Freigabe', 'Varianten & Verteilung'],
      sectionTexts: [
        'Dramaturgie, Motive, Licht und Privatsphäre werden aus dem Objekt abgeleitet.',
        'Langfassung, Hochformat und kurze Ausschnitte entstehen aus geprüftem Material.',
        'Jeder freigegebene Kanal erhält ein geeignetes Format in einer konsistenten Objektgeschichte.',
      ],
      faq: [
        {
          question: 'Bekommt jede Immobilie ein Video?',
          answer:
            'Das wird nach Objekt, Zielgruppe, Freigabe und sinnvoller Strategie entschieden.',
        },
        {
          question: 'Wer gibt das Video frei?',
          answer: 'Der Eigentümer prüft Fassung und Kanäle vor Veröffentlichung.',
        },
        {
          question: 'Ersetzt Video Fotos und Pläne?',
          answer: 'Nein. Es ergänzt sie um Bewegung, Raumfolge und Atmosphäre.',
        },
      ],
    },
    {
      title: 'Property video as part of the presentation',
      lede: 'A property video turns space, location, and use into a clear story. It complements photography, plans, and 360° tours.',
      answer:
        'Audience, central message, sensitive areas, and formats are agreed before filming. The owner reviews the edit before publication.',
      sectionTitles: ['Concept & capture', 'Edit & approval', 'Variants & distribution'],
      sectionTexts: [
        'Story, imagery, light, and privacy follow the property.',
        'Long-form, vertical, and short edits are made from checked footage.',
        'Each approved channel receives a suitable format within one consistent property story.',
      ],
      faq: [
        {
          question: 'Does every property receive a video?',
          answer: 'That depends on the property, audience, approval, and appropriate strategy.',
        },
        {
          question: 'Who approves it?',
          answer: 'The owner reviews the edit and channels before publication.',
        },
        {
          question: 'Does video replace photographs and plans?',
          answer: 'No. It adds movement, sequence, and atmosphere.',
        },
      ],
    },
  ),
  social: define(
    {
      title: 'Social Media mit Freigabe und klarer Rolle',
      lede: 'Social-Kanäle können Objektgeschichten ergänzen. Welche Plattform sinnvoll ist, entscheidet sich nach Zielgruppe, Format und Einwilligung.',
      answer:
        'Kurzvideos schaffen erste Aufmerksamkeit, längere Formate erklären Zusammenhänge. Es gibt keine automatische Veröffentlichung auf allen Plattformen und keine garantierte Reichweite.',
      sectionTitles: [
        'Rolle der Kanäle',
        'Einwilligung & Privatsphäre',
        'Veröffentlichung & Rückmeldung',
      ],
      sectionTexts: [
        'Instagram, Facebook, TikTok und YouTube erfüllen unterschiedliche Aufgaben; die Auswahl folgt dem Objekt.',
        'Eigentümer stimmen Motive, Personen, sensible Bereiche und Kanäle vorab ab.',
        'Selbst gehostete Beispiele oder klare externe Links sind tracking-intensiven Feeds vorzuziehen.',
      ],
      faq: [
        {
          question: 'Wird jedes Objekt überall veröffentlicht?',
          answer:
            'Nein. Kanäle und Formate werden passend zu Zielgruppe, Objekt und Freigabe gewählt.',
        },
        {
          question: 'Kann ich Social Media ausschließen?',
          answer: 'Ja. Der Veröffentlichungsumfang wird vor dem Start dokumentiert.',
        },
        {
          question: 'Garantiert Social Media Nachfrage?',
          answer:
            'Nein. Es kann Sichtbarkeit ergänzen, ersetzt aber weder Preisstrategie noch Unterlagen.',
        },
      ],
    },
    {
      title: 'Social media with approval and a clear role',
      lede: 'Social channels can extend a property story. Platform choice follows audience, format, and owner consent.',
      answer:
        'Short video can create attention and longer formats can explain context. There is no automatic publication everywhere and no guaranteed reach.',
      sectionTitles: ['Channel roles', 'Consent & privacy', 'Publication & feedback'],
      sectionTexts: [
        'Instagram, Facebook, TikTok, and YouTube serve different purposes; selection follows the property.',
        'Owners approve images, people, sensitive areas, and channels in advance.',
        'Self-hosted examples or clear outbound links are preferred to tracking-heavy feeds.',
      ],
      faq: [
        {
          question: 'Is every property published everywhere?',
          answer: 'No. Channels and formats follow the audience, property, and approval.',
        },
        {
          question: 'Can I exclude social media?',
          answer: 'Yes. The publication scope is documented before launch.',
        },
        {
          question: 'Does social media guarantee demand?',
          answer: 'No. It can add visibility but does not replace pricing or documents.',
        },
      ],
    },
  ),
  group: define(
    {
      title: 'Die Gesellschaften der Immonation-Gruppe',
      lede: 'Vier rechtlich eigenständige Gesellschaften werden mit ihren öffentlich beschriebenen Rollen gezeigt. Vertragspartner und Ansprechpartner bleiben ausdrücklich benannt.',
      answer:
        'Zur Gruppe gehören Immonation GmbH, Immonation Capital Holding GmbH, IN Beteiligungs GmbH und Dream Living GmbH. Die Profile beschreiben öffentlich kommunizierte Schwerpunkte, nicht den gesamten Immobilienlebenszyklus.',
      sectionTitles: [
        'Immonation GmbH',
        'Immonation Capital Holding GmbH',
        'IN Beteiligungs GmbH',
        'Dream Living GmbH',
      ],
      sectionTexts: [
        'Immobilienvermittlung, Bewertung und Vermarktungsbegleitung.',
        'Öffentlich als Mutter- und Holdinggesellschaft der Gruppe beschrieben.',
        'Öffentlich mit Immobilienankauf und Projektentwicklung beschrieben.',
        'Öffentlich mit der Revitalisierung renovierungsbedürftiger Immobilien beschrieben.',
      ],
      faq: [
        {
          question: 'Schließe ich mit der gesamten Gruppe einen Vertrag?',
          answer: 'Nein. Maßgeblich ist die im Angebot oder Vertrag benannte Gesellschaft.',
        },
        {
          question: 'Sind externe Partner Teil der Gruppe?',
          answer: 'Nicht automatisch. Kooperationen werden getrennt ausgewiesen.',
        },
        {
          question: 'Wer ist mein Ansprechpartner?',
          answer: 'Ansprechpartner und Vertragspartner werden für das konkrete Anliegen benannt.',
        },
      ],
    },
    {
      title: 'The companies in the Immonation group',
      lede: 'Four legally independent companies are shown with publicly described roles. The contracting entity and contact remain explicit.',
      answer:
        'The group comprises Immonation GmbH, Immonation Capital Holding GmbH, IN Beteiligungs GmbH, and Dream Living GmbH. The profiles describe published areas of focus, not the entire property lifecycle.',
      sectionTitles: [
        'Immonation GmbH',
        'Immonation Capital Holding GmbH',
        'IN Beteiligungs GmbH',
        'Dream Living GmbH',
      ],
      sectionTexts: [
        'Estate agency, valuation, and marketing support.',
        'Publicly described as the parent and holding company.',
        'Publicly described as focusing on acquisition and project development.',
        'Publicly described as revitalising properties in need of renovation.',
      ],
      faq: [
        {
          question: 'Do I contract with the entire group?',
          answer: 'No. The relevant entity is the company named in the proposal or agreement.',
        },
        {
          question: 'Are external partners part of the group?',
          answer: 'Not automatically. Cooperations are presented separately.',
        },
        {
          question: 'Who is my contact?',
          answer: 'The contact and contracting entity are identified for the enquiry.',
        },
      ],
    },
  ),
  partners: define(
    {
      title: 'Als Partnermakler mit Immonation arbeiten',
      lede: 'Zwei Gesprächswege trennen punktuelle Kooperation von einer engeren Zusammenarbeit unter gemeinsamen Qualitäts- und Prozessstandards.',
      answer:
        'Das Kennenlernen klärt Region, Erfahrung, Kundenverantwortung und gewünschte Zusammenarbeit. Erst danach werden Rollen, Markenauftritt, Administration, Datenschutz und Übergaben vereinbart.',
      sectionTitles: [
        'Kooperation im Einzelfall',
        'Dauerhafte Zusammenarbeit',
        'Qualität, Rollen & Onboarding',
      ],
      sectionTexts: [
        'Für ein konkretes Objekt werden Zuständigkeit, Kommunikation und Datenaustausch fallbezogen festgelegt.',
        'Engere Zusammenarbeit verlangt abgestimmte Prozesse, Erreichbarkeit und Standards für Beratung und Dokumentation.',
        'Eignung und Erwartungen werden geklärt; Rollen, Freigaben, Datenschutz und Kontakte werden vor Start dokumentiert.',
      ],
      faq: [
        {
          question: 'Welches Modell passt zu mir?',
          answer: 'Das hängt von Region, Erfahrung, gewünschter Bindung und Aufgabe ab.',
        },
        {
          question: 'Gibt es feste Gebiete oder Vergütungen?',
          answer: 'Diese Punkte werden nur in einer konkreten Vereinbarung geregelt.',
        },
        {
          question: 'Was wird erwartet?',
          answer:
            'Verlässliche Kommunikation, Dokumentation, transparente Kundenführung und vereinbarte Standards.',
        },
      ],
    },
    {
      title: 'Working with Immonation as a partner agent',
      lede: 'Two conversation paths distinguish one-off cooperation from closer collaboration under shared quality and process standards.',
      answer:
        'The first conversation covers region, experience, client responsibility, and the preferred relationship. Roles, brand use, administration, privacy, and handovers are agreed afterwards.',
      sectionTitles: [
        'Case-by-case cooperation',
        'Ongoing collaboration',
        'Quality, roles & onboarding',
      ],
      sectionTexts: [
        'For a specific property, responsibility, communication, and data exchange are defined for that case.',
        'Closer collaboration requires aligned processes, availability, and standards for advice and documentation.',
        'Suitability and expectations are discussed; roles, approvals, privacy, and contacts are documented before work begins.',
      ],
      faq: [
        {
          question: 'Which model suits me?',
          answer: 'That depends on region, experience, desired commitment, and task.',
        },
        {
          question: 'Are territories or compensation fixed?',
          answer: 'Those points are governed only by a specific agreement.',
        },
        {
          question: 'What is expected?',
          answer:
            'Reliable communication, documentation, transparent client handling, and agreed standards.',
        },
      ],
    },
  ),
  engagement: define(
    {
      title: 'Engagement, das man nachsehen kann',
      lede: 'Immonation unterstützt Sport und Bildung dort, wo es sichtbar ankommt — regional in Zirndorf und weltweit in Uganda. Jeder Partner hat die Zusammenarbeit selbst öffentlich gemacht, Sie können also alles nachlesen.',
      answer:
        'Zwei Vorhaben tragen dieses Engagement. Seit Dezember 2025 ist Immonation Partner der Leichtathletikabteilung des TSV Zirndorf und fördert die Bundeskadertalente Eni Kuske und Amelie Giese sowie die gesamte Nachwuchsarbeit. Im April 2026 kam die Bildungsarbeit der Organisation Pateka in Uganda dazu, deren Schulgebühren Immonation mitträgt. Beide Partner haben die Zusammenarbeit selbst öffentlich gemacht — die Quellen sind auf dieser Seite verlinkt.',
      sectionTitles: [
        'TSV Zirndorf Leichtathletik',
        'Bildungsunterstützung in Uganda',
        'Alles aus erster Hand',
      ],
      sectionTexts: [
        'Partner der Leichtathletikabteilung seit Dezember 2025 — mit Athletensponsoring für Eni Kuske und Amelie Giese und einer Zuwendung an die Nachwuchsarbeit.',
        'Seit April 2026 trägt Immonation die Schulgebühren der Organisation Pateka mit — von Pateka selbst öffentlich dokumentiert.',
        'Jede Angabe hier stammt vom Partner selbst und ist verlinkt. Bilder und Filme zeigen wir nur mit Freigabe — bei jungen Athletinnen selbstverständlich.',
      ],
      faq: [
        {
          question: 'Welche lokale Partnerschaft besteht?',
          answer:
            'Seit Dezember 2025 ist Immonation Partner der Leichtathletikabteilung des TSV Zirndorf und fördert Eni Kuske, Amelie Giese und die Nachwuchsarbeit.',
        },
        {
          question: 'Woher stammen die Angaben auf dieser Seite?',
          answer:
            'Von den Partnern selbst: dem TSV Zirndorf und der Organisation Pateka. Beide Bekanntgaben sind hier verlinkt, Zahlen nennen wir nur, wenn sie dort stehen.',
        },
        {
          question: 'Wie werden Bildrechte behandelt?',
          answer:
            'Fotos und Filme veröffentlichen wir nur mit Freigabe für Person, Motiv und Kanal — für alles auf dieser Seite liegt sie vor.',
        },
      ],
    },
    {
      title: 'Support you can look up',
      lede: 'Immonation backs sport and education where it visibly lands — locally in Zirndorf and internationally in Uganda. Every partner made the collaboration public themselves, so you can read all of it first-hand.',
      answer:
        'Two commitments carry this work. Since December 2025 Immonation has been a partner of the athletics division at TSV Zirndorf, backing national squad talents Eni Kuske and Amelie Giese along with the entire youth programme. In April 2026 education support in Uganda joined it: Immonation helps cover school fees through the organisation Pateka. Both partners made the collaboration public themselves — the sources are linked on this page.',
      sectionTitles: [
        'TSV Zirndorf Athletics',
        'Education support in Uganda',
        'Everything first-hand',
      ],
      sectionTexts: [
        'Partner of the athletics division since December 2025 — with athlete sponsorship for Eni Kuske and Amelie Giese and a contribution to the youth programme.',
        'Since April 2026 Immonation helps cover school fees through the organisation Pateka — documented publicly by Pateka themselves.',
        'Every statement here comes from the partner and is linked. Photos and films appear only with permission — for young athletes, as a matter of course.',
      ],
      faq: [
        {
          question: 'Which local partnership is in place?',
          answer:
            'Since December 2025 Immonation has been a partner of the athletics division at TSV Zirndorf, backing Eni Kuske, Amelie Giese, and the youth programme.',
        },
        {
          question: 'Where do the details on this page come from?',
          answer:
            'From the partners themselves: TSV Zirndorf and the organisation Pateka. Both announcements are linked here, and figures appear only where the source states them.',
        },
        {
          question: 'How are image rights handled?',
          answer:
            'Photos and films are published only with permission for the person, subject, and channel — and that permission is in place for everything on this page.',
        },
      ],
    },
  ),
}
