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
  'warning-signs': define(
    {
      title: 'Warnsignale beim Immobilienverkauf',
      lede: 'Seriöse Beratung bleibt überprüfbar: Preis, Leistung, Käuferprüfung und Vergütung müssen verständlich erklärt und dokumentiert sein.',
      answer:
        'Ein einzelnes Warnsignal beweist noch kein Fehlverhalten. Häufen sich unklare Versprechen, Zeitdruck und fehlende Nachweise, sollten Eigentümer innehalten, Angebote vergleichen und offene Punkte schriftlich klären.',
      sectionTitles: [
        'Phantom-Käufer',
        'Preis ohne Herleitung',
        'Druck zur Unterschrift',
        'Unklarer Leistungsumfang',
        'Schwache Unterlagenprüfung',
        'Keine Käuferqualifizierung',
        'Undurchsichtige Berichte',
        'Nicht prüfbare Nachweise',
        'Gebührenversprechen vor Leistung',
      ],
      sectionTexts: [
        'Eine angeblich fertige Käuferliste ist nur hilfreich, wenn Suchprofil, Qualifizierung und Einwilligung zur Ansprache nachvollziehbar sind.',
        'Ein hoher Angebotspreis braucht Vergleichsdaten und eine Strategie. Ohne Herleitung kann er die Vermarktung unnötig verlängern.',
        'Verträge sollten ohne künstliche Eile gelesen werden können. Laufzeit, Kündigung und Vollmachten gehören vorab erklärt.',
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
        'Unsupported asking price',
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
        'An ambitious price needs relevant evidence and a strategy. Without either, it can prolong the campaign unnecessarily.',
        'Owners should be able to compare contracts without artificial urgency. Term, termination, and authority must be clear first.',
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
  staging: define(
    {
      title: 'Home Staging: physisch oder digital',
      lede: 'Staging macht Nutzung und Proportion verständlich, ohne Zustand oder Ausstattung vorzutäuschen.',
      answer:
        'Physisches Staging arbeitet mit realen Möbeln vor Ort. Digitales Staging ergänzt Bilder um klar gekennzeichnete Visualisierungen. Auswahl und Veröffentlichung werden mit dem Eigentümer abgestimmt.',
      sectionTitles: [
        'Geeignete Ausgangslage',
        'Freigabe & Kennzeichnung',
        'Grenzen der Inszenierung',
      ],
      sectionTexts: [
        'Leere, überfüllte oder stark personalisierte Räume können von einer reduzierten Darstellung profitieren.',
        'Digital ergänzte Bilder werden freigegeben, eindeutig bezeichnet und mit realen Aufnahmen kombiniert.',
        'Staging ändert weder Grundriss noch Zustand und darf keine nicht vorhandene Ausstattung suggerieren.',
      ],
      faq: [
        {
          question: 'Wann ist digitales Staging sinnvoll?',
          answer: 'Vor allem bei leeren Räumen, wenn Nutzung und Maßstab schwer erkennbar sind.',
        },
        {
          question: 'Müssen Bilder gekennzeichnet werden?',
          answer: 'Ja. Digitale Veränderungen sollten eindeutig als Visualisierung erkennbar sein.',
        },
        {
          question: 'Kann Staging Mängel verdecken?',
          answer: 'Nein. Relevante Merkmale und Mängel müssen transparent bleiben.',
        },
      ],
    },
    {
      title: 'Home staging: physical or digital',
      lede: 'Staging clarifies use and proportion without misrepresenting condition or specification.',
      answer:
        'Physical staging uses real furniture on site. Digital staging adds clearly labelled visualisations. Selection and publication are approved by the owner.',
      sectionTitles: ['Suitable starting points', 'Approval & disclosure', 'Limits of staging'],
      sectionTexts: [
        'Empty, overcrowded, or highly personalised rooms may benefit from a restrained presentation.',
        'Digital additions are approved, clearly labelled, and shown with genuine photographs.',
        'Staging changes neither layout nor condition and must not suggest features that do not exist.',
      ],
      faq: [
        {
          question: 'When is digital staging useful?',
          answer: 'Especially for empty rooms where use and scale are hard to read.',
        },
        {
          question: 'Should edited images be disclosed?',
          answer: 'Yes. Digital changes should be clearly recognisable as visualisations.',
        },
        {
          question: 'Can staging hide defects?',
          answer: 'No. Relevant characteristics and defects must remain transparent.',
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
    '/contact',
  ),
  engagement: define(
    {
      title: 'Engagement mit nachvollziehbarem Bezug',
      lede: 'Immonation unterstützt dokumentierte lokale und soziale Vorhaben. Veröffentlicht wird nur, was Partnerbezug und Medienfreigabe tragen.',
      answer:
        'Dokumentiert ist die Partnerschaft mit der Leichtathletik des TSV Zirndorf, insbesondere im Umfeld von Eni Kuske und Amelie Giese. Quellenmaterial beschreibt außerdem Bildungsunterstützung in Uganda; Bilder mit Minderjährigen bleiben ohne geklärte Rechte unveröffentlicht.',
      sectionTitles: [
        'TSV Zirndorf Leichtathletik',
        'Bildungsunterstützung in Uganda',
        'Transparenz & Medienrechte',
      ],
      sectionTexts: [
        'Die Quelle nennt Immonation als Partner und hebt die Unterstützung der Athletinnen Eni Kuske und Amelie Giese hervor.',
        'Vorhandenes Material dokumentiert Unterstützung für Bildungsprojekte; unbestätigte Wirkungszahlen werden nicht veröffentlicht.',
        'Partner, Art der Unterstützung und Bildrechte werden je Beitrag geprüft, besonders bei Athleten und Minderjährigen.',
      ],
      faq: [
        {
          question: 'Welche lokale Partnerschaft ist dokumentiert?',
          answer:
            'Die Partnerschaft mit der Leichtathletik des TSV Zirndorf und der Bezug zu Eni Kuske und Amelie Giese.',
        },
        {
          question: 'Warum gibt es keine Wirkungszahlen?',
          answer: 'Zahlen erscheinen erst mit eindeutiger Quelle, Zeitraum und Freigabe.',
        },
        {
          question: 'Wie werden Bildrechte behandelt?',
          answer: 'Medien werden nur mit passender Freigabe für Personen, Motiv und Kanal genutzt.',
        },
      ],
    },
    {
      title: 'Community support with traceable context',
      lede: 'Immonation supports documented local and social initiatives. Publication is limited to material supported by the relationship and media permissions.',
      answer:
        'The partnership with TSV Zirndorf Athletics is documented, particularly around Eni Kuske and Amelie Giese. Source material also describes education support in Uganda; images involving minors remain unpublished without confirmed rights.',
      sectionTitles: [
        'TSV Zirndorf Athletics',
        'Education support in Uganda',
        'Transparency & media rights',
      ],
      sectionTexts: [
        'The source names Immonation as a partner and highlights support for Eni Kuske and Amelie Giese.',
        'Existing material documents education support; unconfirmed impact figures are not published.',
        'Partner, form of support, and image rights are reviewed for each story, especially for athletes and minors.',
      ],
      faq: [
        {
          question: 'Which local partnership is documented?',
          answer:
            'The relationship with TSV Zirndorf Athletics and its connection to Eni Kuske and Amelie Giese.',
        },
        {
          question: 'Why are there no impact figures?',
          answer: 'Figures appear only with a clear source, period, and approval.',
        },
        {
          question: 'How are image rights handled?',
          answer: 'Media is used only with suitable permission for people, subject, and channel.',
        },
      ],
    },
  ),
}
