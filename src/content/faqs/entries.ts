import type { FaqCategoryId, FaqEntryDef } from '@/lib/content/faqs'

/**
 * Canonical FAQ bank. German copy from assets/faq.md; English is a faithful translation.
 * Niche seller-guide and page-specific items live here with narrow tags.
 */
export const FAQ_ENTRIES: FaqEntryDef[] = [
  // ── Makler & Kosten ──────────────────────────────────────────────
  {
    id: 'broker-cost-nuremberg',
    category: 'broker-costs',
    tags: ['broker-costs', 'sell', 'sell-haus', 'locations'],
    priority: 10,
    de: {
      question: 'Was kostet ein Immobilienmakler in Nürnberg?',
      answer:
        'Die Maklerprovision wird beim Verkauf von Wohnimmobilien in der Regel zwischen Käufer und Verkäufer geteilt – so schreibt es das Gesetz seit Dezember 2020 vor. Die genaue Höhe vereinbaren wir transparent im Erstgespräch, bevor Sie sich entscheiden. Es entstehen Ihnen keine Vorabkosten.',
    },
    en: {
      question: 'What does a real-estate agent cost in Nuremberg?',
      answer:
        'For residential sales, commission is usually shared between buyer and seller — as required by law since December 2020. We agree the exact amount transparently in the initial consultation before you decide. There are no upfront costs for you.',
    },
  },
  {
    id: 'who-pays-commission',
    category: 'broker-costs',
    tags: ['broker-costs', 'sell', 'sell-haus', 'sell-wohnung'],
    priority: 20,
    de: {
      question: 'Wer zahlt die Maklerprovision beim Hausverkauf?',
      answer:
        'Beim Verkauf einer Wohnung oder eines Einfamilienhauses an eine Privatperson teilen sich Käufer und Verkäufer die Provision. Der Käufer muss dabei mindestens den gleichen Anteil zahlen wie der Verkäufer. Alles Weitere klären wir vorab schriftlich und nachvollziehbar.',
    },
    en: {
      question: 'Who pays the agent’s commission when selling a house?',
      answer:
        'When selling an apartment or single-family home to a private buyer, buyer and seller share the commission. The buyer must pay at least the same share as the seller. We clarify everything in writing beforehand so it is transparent and traceable.',
    },
  },
  {
    id: 'is-agent-worthwhile',
    category: 'broker-costs',
    tags: ['broker-costs', 'sell', 'about'],
    priority: 30,
    de: {
      question: 'Lohnt sich ein Makler überhaupt?',
      answer:
        'Ein guter Makler holt in der Regel mehr heraus, als er kostet – durch die richtige Preisstrategie, geprüfte Käufer und Verhandlungserfahrung. Eine unserer Kundinnen verkaufte 6 % über dem Marktpreis, eine andere in nur zwei Wochen zum vollen Angebotspreis, noch bevor das Objekt online ging.',
    },
    en: {
      question: 'Is using an agent worth it?',
      answer:
        'A good agent typically recovers more than their fee through pricing strategy, vetted buyers, and negotiation experience. One of our clients sold 6% above market price; another achieved the full asking price in two weeks before the listing even went online.',
    },
  },
  {
    id: 'valuation-cost-free',
    category: 'broker-costs',
    tags: ['broker-costs', 'valuation-price', 'property-valuation', 'sell'],
    priority: 40,
    de: {
      question: 'Was kostet die Immobilienbewertung?',
      answer:
        'Nichts. Unsere Bewertung ist kostenlos und unverbindlich – online als erste Einschätzung, vor Ort als fundierte Wertermittlung. Sie gehen damit keinerlei Verpflichtung ein.',
    },
    en: {
      question: 'What does the property valuation cost?',
      answer:
        'Nothing. Our valuation is free and non-binding — online as a first estimate, on site as a solid appraisal. You take on no obligation whatsoever.',
    },
  },
  {
    id: 'commission-if-private-buyer',
    category: 'broker-costs',
    tags: ['broker-costs', 'sell'],
    priority: 50,
    de: {
      question: 'Muss ich die Provision zahlen, wenn ich privat selbst einen Käufer finde?',
      answer:
        'Das hängt von der Art des Maklervertrags ab. Bei einem einfachen Auftrag zahlen Sie nur, wenn wir den Käufer bringen; bei einem qualifizierten Alleinauftrag kann es anders geregelt sein. Wir legen das vorab transparent fest, damit es keine Überraschungen gibt.',
    },
    en: {
      question: 'Do I still pay commission if I find a buyer myself?',
      answer:
        'It depends on the type of agency agreement. With a simple mandate you only pay if we introduce the buyer; a qualified exclusive mandate may be structured differently. We set this out transparently upfront so there are no surprises.',
    },
  },
  {
    id: 'commission-tax-deductible',
    category: 'broker-costs',
    tags: ['broker-costs', 'tax-law', 'sell'],
    priority: 60,
    de: {
      question: 'Kann ich die Maklerprovision steuerlich absetzen?',
      answer:
        'Beim Verkauf einer selbst genutzten Immobilie in der Regel nicht. Bei vermieteten oder gewerblichen Objekten kann die Provision als Werbungskosten oder Anschaffungsnebenkosten zählen. Die verbindliche Auskunft gibt Ihr Steuerberater – die Belege liefern wir.',
    },
    en: {
      question: 'Can I deduct the agent’s commission for tax purposes?',
      answer:
        'Usually not when selling an owner-occupied property. For rented or commercial properties, commission may count as income-related expenses or acquisition costs. Your tax adviser gives the binding answer — we provide the documentation.',
    },
  },
  {
    id: 'no-sale-no-fee',
    category: 'broker-costs',
    tags: ['broker-costs', 'sell'],
    priority: 70,
    de: {
      question: 'Zahle ich etwas, wenn mein Objekt nicht verkauft wird?',
      answer:
        'Nein. Unsere Provision ist eine reine Erfolgsprovision und wird nur fällig, wenn ein Kaufvertrag zustande kommt. Bewertung, Beratung, Fotos, Video und Vermarktung gehen bis dahin nicht zu Ihren Lasten.',
    },
    en: {
      question: 'Do I pay anything if my property does not sell?',
      answer:
        'No. Our fee is success-based and due only when a purchase contract is concluded. Valuation, advice, photos, video, and marketing are not charged to you until then.',
    },
  },

  // ── Verkaufsprozess ──────────────────────────────────────────────
  {
    id: 'how-sale-works',
    category: 'sales-process',
    tags: ['sales-process', 'sell', 'sell-haus', 'blog'],
    priority: 10,
    de: {
      question: 'Wie läuft ein Hausverkauf ab?',
      answer:
        'In zehn Schritten: kostenlose Bewertung, persönliche Beratung, Unterlagenprüfung, professionelle Objektaufnahme, Marketingstrategie, Käuferqualifizierung, Besichtigungen, Verhandlung, Notartermin und Übergabe. Wir übernehmen jeden dieser Schritte und halten Sie durchgehend auf dem Laufenden.',
    },
    en: {
      question: 'How does selling a house work?',
      answer:
        'In ten steps: free valuation, personal advice, document review, professional property capture, marketing strategy, buyer qualification, viewings, negotiation, notary appointment, and handover. We handle each step and keep you informed throughout.',
    },
  },
  {
    id: 'sale-duration',
    category: 'sales-process',
    tags: ['sales-process', 'sell', 'sell-haus', 'locations', 'blog'],
    priority: 20,
    de: {
      question: 'Wie lange dauert der Verkauf einer Immobilie?',
      answer:
        'Typischerweise sechs bis zwölf Wochen ab Vermarktungsstart. Entscheidend sind Preisstrategie, Objektzustand und Zielgruppe. Über unser Netzwerk aktiver Suchkunden geht es oft deutlich schneller – teils in zwei Wochen, ohne dass die Immobilie überhaupt inseriert wird.',
    },
    en: {
      question: 'How long does it take to sell a property?',
      answer:
        'Typically six to twelve weeks from the start of marketing. Pricing strategy, condition, and target audience matter most. Through our network of active search clients it is often much faster — sometimes within two weeks without a public listing.',
    },
  },
  {
    id: 'attend-viewings',
    category: 'sales-process',
    tags: ['sales-process', 'sell'],
    priority: 30,
    de: {
      question: 'Muss ich bei den Besichtigungen dabei sein?',
      answer:
        'Nein. Wir übernehmen alle Besichtigungen für Sie – und dank vorgeschaltetem 360°-Rundgang und Käuferqualifizierung kommen nur ernsthafte, finanzierungsgeprüfte Interessenten überhaupt vor Ort. Das spart Ihnen Zeit und Nerven.',
    },
    en: {
      question: 'Do I need to be present at viewings?',
      answer:
        'No. We handle all viewings for you — and thanks to a prior 360° tour and buyer qualification, only serious, finance-checked prospects visit in person. That saves you time and stress.',
    },
  },
  {
    id: 'discreet-sale',
    category: 'sales-process',
    tags: ['sales-process', 'sell', 'sell-mehrfamilienhaus', 'tax-law'],
    priority: 40,
    de: {
      question: 'Kann ich verkaufen, ohne dass es jemand mitbekommt?',
      answer:
        'Ja. Ein diskreter Verkauf über unser Suchkunden-Netzwerk ist ohne öffentliches Inserat möglich – ohne Portal, ohne Schild, ohne Aufsehen in der Nachbarschaft. Gerade bei Trennung, Erbfall oder finanziellen Engpässen ist das oft der richtige Weg.',
    },
    en: {
      question: 'Can I sell without anyone noticing?',
      answer:
        'Yes. A discreet sale through our search-client network is possible without a public listing — no portal, no sign, no neighbourhood attention. Especially in cases of separation, inheritance, or financial pressure, that is often the right path.',
    },
  },
  {
    id: 'best-time-to-sell',
    category: 'sales-process',
    tags: ['sales-process', 'sell'],
    priority: 50,
    de: {
      question: 'Wann ist der beste Zeitpunkt, um meine Immobilie zu verkaufen?',
      answer:
        'Der beste Zeitpunkt hängt weniger von der Jahreszeit ab als von Ihrer Situation und der Marktlage. Frühjahr und Frühherbst sind erfahrungsgemäß nachfragestark. Entscheidend ist, dass Unterlagen, Preis und Präsentation stimmen, bevor die Immobilie an den Markt geht.',
    },
    en: {
      question: 'When is the best time to sell my property?',
      answer:
        'The best moment depends less on the season than on your situation and market conditions. Spring and early autumn are typically strong for demand. What matters most is that documents, price, and presentation are ready before the property goes to market.',
    },
  },
  {
    id: 'renovate-before-sale',
    category: 'sales-process',
    tags: ['sales-process', 'sell', 'sell-haus', 'valuation-price'],
    priority: 60,
    de: {
      question: 'Sollte ich vor dem Verkauf noch renovieren?',
      answer:
        'Meist lohnen sich nur kleine Maßnahmen: aufräumen, streichen, reparieren, gut ausleuchten. Große Sanierungen spielen ihre Kosten selten voll wieder ein. Wir sagen Ihnen vor der Vermarktung ehrlich, was sich rechnet und was Sie sich sparen können.',
    },
    en: {
      question: 'Should I renovate before selling?',
      answer:
        'Usually only small measures pay off: decluttering, painting, repairs, good lighting. Major renovations rarely earn back their full cost. Before marketing we tell you honestly what is worth doing and what you can skip.',
    },
  },
  {
    id: 'what-is-expose',
    category: 'sales-process',
    tags: ['sales-process', 'sell', 'documents-financing'],
    priority: 70,
    de: {
      question: 'Was ist ein Exposé und was gehört hinein?',
      answer:
        'Das Exposé ist die Verkaufsunterlage Ihrer Immobilie: aussagekräftige Fotos, Grundrisse, Wohnfläche, Baujahr, Energiedaten, Lagebeschreibung und Preis. Ein professionelles Exposé weckt Interesse und filtert zugleich – so kommen nur passende Käufer auf Sie zu.',
    },
    en: {
      question: 'What is an exposé and what belongs in it?',
      answer:
        'The exposé is your property’s sales dossier: compelling photos, floor plans, living area, year built, energy data, location description, and price. A professional exposé attracts interest and filters at the same time — so only suitable buyers reach you.',
    },
  },
  {
    id: 'when-published',
    category: 'sales-process',
    tags: ['sales-process'],
    priority: 80,
    de: {
      question: 'Wann wird die Immobilie veröffentlicht?',
      answer:
        'Die Veröffentlichung erfolgt erst, wenn Objektaufnahme, Bewertung, Verkaufsstrategie und professionelle Aufbereitung abgeschlossen sind. Exposé, Preis und Vermarktungsweg gehen nach Ihrer Freigabe auf die relevanten Portale und in die abgestimmten Kanäle.',
    },
    en: {
      question: 'When is the property published?',
      answer:
        'Publication happens only after property capture, valuation, sales strategy, and professional preparation are complete. Exposé, price, and marketing channels go live after your approval on the relevant portals and agreed channels.',
    },
  },
  {
    id: 'buyer-screening',
    category: 'sales-process',
    tags: ['sales-process', 'buyers'],
    priority: 90,
    de: {
      question: 'Wie werden Kaufinteressenten geprüft?',
      answer:
        'Wir bearbeiten alle Anfragen, prüfen Ernsthaftigkeit und Bonität, klären die Finanzierung und koordinieren erst danach passende Besichtigungen. So werden Termine auf Käufer konzentriert, die das Objekt wirklich kaufen wollen und können.',
    },
    en: {
      question: 'How are prospective buyers checked?',
      answer:
        'We handle every enquiry, check seriousness and creditworthiness, clarify financing, and only then arrange suitable viewings. Appointments focus on buyers who truly want and can purchase the property.',
    },
  },
  {
    id: 'after-offer',
    category: 'sales-process',
    tags: ['sales-process'],
    priority: 100,
    de: {
      question: 'Was passiert nach einem Kaufangebot?',
      answer:
        'Wir prüfen Preis und Konditionen, bewerten Käuferprofil und Finanzierung und führen die Verhandlung in Ihrem Interesse. Anschließend koordinieren wir Kaufvertragsvorbereitung, Notariat und Beurkundung.',
    },
    en: {
      question: 'What happens after a purchase offer?',
      answer:
        'We review price and terms, assess the buyer profile and financing, and negotiate in your interest. We then coordinate contract preparation, the notary, and notarisation.',
    },
  },
  {
    id: 'after-notary',
    category: 'sales-process',
    tags: ['sales-process', 'about'],
    priority: 110,
    de: {
      question: 'Endet die Maklerbegleitung mit dem Notartermin?',
      answer:
        'Nein. Nach der Beurkundung organisieren wir die Übergabe, dokumentieren Zählerstände und klären offene Punkte. Die Begleitung reicht bis zur Schlüsselübergabe und darüber hinaus.',
    },
    en: {
      question: 'Does agent support end at the notary appointment?',
      answer:
        'No. After notarisation we organise the handover, document meter readings, and resolve open points. Support continues through key handover and beyond.',
    },
  },

  // ── Unterlagen & Finanzierung ────────────────────────────────────
  {
    id: 'docs-house-sale',
    category: 'documents-financing',
    tags: ['documents-financing', 'sell', 'sell-haus', 'sales-process', 'property-valuation'],
    priority: 10,
    de: {
      question: 'Welche Unterlagen brauche ich für den Hausverkauf?',
      answer:
        'Grundbuchauszug, Flurkarte, Energieausweis, Baupläne und Wohnflächenberechnung, Nachweise über Modernisierungen sowie die Grundsteuerdaten. Fehlt etwas? Wir beschaffen die Dokumente für Sie – das gehört bei uns zum Service.',
    },
    en: {
      question: 'Which documents do I need to sell a house?',
      answer:
        'Land-register extract, cadastral map, energy certificate, building plans and living-space calculation, modernisation proof, and property-tax data. Missing something? We obtain the documents for you — that is part of our service.',
    },
  },
  {
    id: 'docs-apartment-sale',
    category: 'documents-financing',
    tags: ['documents-financing', 'sell', 'sell-wohnung'],
    priority: 20,
    de: {
      question: 'Welche Unterlagen brauche ich für den Wohnungsverkauf?',
      answer:
        'Zusätzlich zu den Hausunterlagen: Teilungserklärung, Protokolle der Eigentümerversammlungen der letzten Jahre, aktuelle Hausgeldabrechnung, Wirtschaftsplan und die Höhe der Instandhaltungsrücklage. Diese WEG-Unterlagen sind für Käufer und deren Banken entscheidend.',
    },
    en: {
      question: 'Which documents do I need to sell an apartment?',
      answer:
        'In addition to house documents: declaration of division, recent owners’ meeting minutes, current service-charge statement, annual budget, and maintenance-reserve balance. These association records are decisive for buyers and their banks.',
    },
  },
  {
    id: 'energy-certificate-required',
    category: 'documents-financing',
    tags: ['documents-financing', 'sell', 'sell-haus', 'sell-wohnung'],
    priority: 30,
    de: {
      question: 'Brauche ich einen Energieausweis?',
      answer:
        'Ja, der Energieausweis ist gesetzlich Pflicht und muss spätestens bei der Besichtigung vorgelegt werden. Fehlt er, drohen Bußgelder. Wir sagen Ihnen, welche Variante Sie brauchen, und organisieren die Erstellung auf Wunsch für Sie.',
    },
    en: {
      question: 'Do I need an energy certificate?',
      answer:
        'Yes. The energy certificate is legally required and must be presented by the viewing at the latest. Without it, fines can apply. We tell you which type you need and can arrange creation for you on request.',
    },
  },
  {
    id: 'land-register-extract',
    category: 'documents-financing',
    tags: ['documents-financing', 'sell'],
    priority: 40,
    de: {
      question: 'Wie bekomme ich einen aktuellen Grundbuchauszug?',
      answer:
        'Einen Grundbuchauszug erhalten Eigentümer beim zuständigen Amtsgericht (Grundbuchamt) oder über einen Notar. Für den Verkauf sollte er aktuell sein. Fehlt er Ihnen, beschaffen wir ihn im Rahmen der Unterlagenaufbereitung.',
    },
    en: {
      question: 'How do I get a current land-register extract?',
      answer:
        'Owners obtain a land-register extract from the competent local court (land registry) or via a notary. For a sale it should be current. If you do not have one, we obtain it as part of document preparation.',
    },
  },
  {
    id: 'energy-certificate-types',
    category: 'documents-financing',
    tags: ['documents-financing', 'sell'],
    priority: 50,
    de: {
      question: 'Welche Arten von Energieausweis gibt es?',
      answer:
        'Es gibt den Verbrauchsausweis, der auf dem tatsächlichen Verbrauch beruht, und den aufwändigeren Bedarfsausweis, der den energetischen Zustand des Gebäudes bewertet. Welche Variante zulässig ist, hängt von Baujahr und Größe ab – wir klären das für Ihr Objekt.',
    },
    en: {
      question: 'What types of energy certificate exist?',
      answer:
        'There is the consumption-based certificate and the more detailed demand-based certificate that assesses the building’s energy performance. Which type is allowed depends on year built and size — we clarify this for your property.',
    },
  },
  {
    id: 'energy-certificate-validity',
    category: 'documents-financing',
    tags: ['documents-financing', 'sell'],
    priority: 60,
    de: {
      question: 'Wie lange ist ein Energieausweis gültig?',
      answer:
        'Ein Energieausweis ist ab Ausstellung zehn Jahre gültig. Danach muss er bei Verkauf oder Neuvermietung erneuert werden. Ein abgelaufener oder fehlender Ausweis kann zu Bußgeldern führen.',
    },
    en: {
      question: 'How long is an energy certificate valid?',
      answer:
        'An energy certificate is valid for ten years from issuance. After that it must be renewed for sale or re-letting. An expired or missing certificate can lead to fines.',
    },
  },

  // ── Bewertung & Preis ────────────────────────────────────────────
  {
    id: 'how-valuation-works',
    category: 'valuation-price',
    tags: ['valuation-price', 'property-valuation', 'sell', 'blog'],
    priority: 10,
    de: {
      question: 'Wie wird meine Immobilie bewertet?',
      answer:
        'Auf Basis aktueller Marktdaten und vergleichbarer Verkäufe – ergänzt durch die persönliche Einschätzung vor Ort. Lage, Zustand, Ausstattung, Grundriss und aktuelle Nachfrage entscheiden über den Preis. Ein reiner Online-Klickwert reicht dafür nicht aus.',
    },
    en: {
      question: 'How is my property valued?',
      answer:
        'Based on current market data and comparable sales — plus an on-site assessment. Location, condition, fittings, layout, and current demand determine the price. A pure online click estimate is not enough.',
    },
  },
  {
    id: 'online-valuation-limits',
    category: 'valuation-price',
    tags: ['valuation-price', 'property-valuation'],
    priority: 20,
    de: {
      question: 'Warum reicht eine Online-Bewertung nicht?',
      answer:
        'Ein Onlinerechner kennt weder den Zustand Ihres Bads noch den Blick vom Balkon, die Hellhörigkeit oder den Sanierungsstand des Hauses. Er liefert eine Orientierung – den tatsächlich erzielbaren Preis bestimmen die Details, die man nur vor Ort sieht.',
    },
    en: {
      question: 'Why is an online valuation not enough?',
      answer:
        'An online calculator does not know your bathroom’s condition, the view from the balcony, noise transfer, or renovation status. It offers orientation — the achievable price is set by details you only see on site.',
    },
  },
  {
    id: 'price-too-high',
    category: 'valuation-price',
    tags: ['valuation-price', 'sell', 'sales-process'],
    priority: 30,
    de: {
      question: 'Was passiert, wenn der Preis zu hoch angesetzt ist?',
      answer:
        'Die Immobilie bleibt am Markt liegen und wird zum „Ladenhüter“. Interessenten fragen dann, was mit dem Objekt nicht stimmt – und am Ende wird oft unter Wert verkauft. Deshalb setzen wir von Anfang an auf eine realistische, belegbare Preisstrategie.',
    },
    en: {
      question: 'What happens if the asking price is set too high?',
      answer:
        'The property sits on the market and becomes a stale listing. Prospects then wonder what is wrong — and it often sells below value in the end. That is why we start with a realistic, evidence-based pricing strategy.',
    },
  },
  {
    id: 'house-worth',
    category: 'valuation-price',
    tags: ['valuation-price', 'property-valuation', 'sell-haus'],
    priority: 40,
    de: {
      question: 'Wie viel ist mein Haus wert?',
      answer:
        'Seriös lässt sich das nur mit Blick auf Lage, Zustand, Ausstattung und aktuelle Vergleichsverkäufe sagen. Eine Online-Einschätzung liefert eine erste Spanne; den belastbaren Wert ermitteln wir kostenlos vor Ort – inklusive Aufmaß durch unseren Ingenieur.',
    },
    en: {
      question: 'What is my house worth?',
      answer:
        'A serious answer needs location, condition, fittings, and current comparable sales. An online estimate gives a first range; we establish a reliable value free of charge on site — including measurement by our engineer.',
    },
  },
  {
    id: 'market-value-vs-sale-price',
    category: 'valuation-price',
    tags: ['valuation-price', 'property-valuation', 'sell'],
    priority: 50,
    de: {
      question: 'Was ist der Unterschied zwischen Verkehrswert und Verkaufspreis?',
      answer:
        'Der Verkehrswert ist der objektiv ermittelte Marktwert zu einem Stichtag. Der Verkaufspreis ist, was ein Käufer tatsächlich zahlt – er kann durch Nachfrage, Vermarktung und Verhandlung darüber oder darunter liegen.',
    },
    en: {
      question: 'What is the difference between market value and sale price?',
      answer:
        'Market value is the objectively determined value as of a reference date. The sale price is what a buyer actually pays — it can land above or below depending on demand, marketing, and negotiation.',
    },
  },
  {
    id: 'standard-land-value',
    category: 'valuation-price',
    tags: ['valuation-price', 'sell-land', 'sell-haus'],
    priority: 60,
    de: {
      question: 'Was ist der Bodenrichtwert und wo finde ich ihn?',
      answer:
        'Der Bodenrichtwert ist der vom Gutachterausschuss ermittelte durchschnittliche Grundstückswert je Quadratmeter für eine Lage. Er dient als Orientierung, ersetzt aber keine Bewertung. In Bayern ist er über das Portal BORIS-Bayern einsehbar.',
    },
    en: {
      question: 'What is the standard land value and where do I find it?',
      answer:
        'The standard land value is the average plot value per square metre for a location, set by the appraisal committee. It is guidance, not a valuation. In Bavaria it is available via the BORIS-Bayern portal.',
    },
  },
  {
    id: 'valuation-duration',
    category: 'valuation-price',
    tags: ['valuation-price', 'property-valuation'],
    priority: 70,
    de: {
      question: 'Wie lange dauert die Bewertung?',
      answer:
        'Von der Anfrage bis zum schriftlichen Ergebnis vergehen typischerweise wenige Tage bis zwei Wochen, abhängig von Terminfindung und Unterlagen. Die Vor-Ort-Besichtigung selbst dauert meist unter einer Stunde.',
    },
    en: {
      question: 'How long does the valuation take?',
      answer:
        'From enquiry to written result typically takes a few days to two weeks, depending on scheduling and documents. The on-site visit itself usually takes under an hour.',
    },
  },
  {
    id: 'valuation-no-obligation',
    category: 'valuation-price',
    tags: ['valuation-price', 'property-valuation', 'broker-costs'],
    priority: 80,
    de: {
      question: 'Bin ich nach der Bewertung zu etwas verpflichtet?',
      answer:
        'Nein. Die Bewertung ist eine Entscheidungsgrundlage — ob und wann Sie verkaufen, bestimmen allein Sie. Es entstehen keine Kosten und keine Bindung an einen Maklerauftrag.',
    },
    en: {
      question: 'Am I obligated to anything after the valuation?',
      answer:
        'No. The valuation is a basis for your decision — whether and when you sell is entirely up to you. There are no costs and no commitment to an agency mandate.',
    },
  },
  {
    id: 'land-worth',
    category: 'valuation-price',
    tags: ['valuation-price', 'sell-land'],
    priority: 90,
    de: {
      question: 'Was ist mein Grundstück wert?',
      answer:
        'Bodenrichtwert, Baurecht, Zuschnitt, Erschließung und Nachfrage werden gemeinsam betrachtet. Zwei benachbarte Grundstücke können deshalb einen deutlich unterschiedlichen Wert haben.',
    },
    en: {
      question: 'What is my land worth?',
      answer:
        'Standard land value, planning rights, shape, servicing, and demand must be considered together. Neighbouring plots can therefore have very different values.',
    },
  },
  {
    id: 'preliminary-planning-approval',
    category: 'valuation-price',
    tags: ['valuation-price', 'sell-land'],
    priority: 100,
    de: {
      question: 'Lohnt sich eine Bauvoranfrage vor dem Verkauf?',
      answer:
        'Häufig ja, wenn das Nutzungspotenzial unklar ist. Wer belegen kann, was gebaut werden darf, kann das Grundstück für passende Käufer präziser und oft besser vermarkten.',
    },
    en: {
      question: 'Is preliminary planning approval worth obtaining before a sale?',
      answer:
        'Often yes when development potential is unclear. Evidence of what may be built lets you market the land more precisely — and often better — to suitable buyers.',
    },
  },
  {
    id: 'apartment-building-valuation',
    category: 'valuation-price',
    tags: ['valuation-price', 'sell-mehrfamilienhaus'],
    priority: 110,
    de: {
      question: 'Wie wird ein Mehrfamilienhaus bewertet?',
      answer:
        'Über das Ertragswertverfahren: Jahresnettokaltmiete, Faktor und Lage bestimmen den Wert – nicht der Quadratmeterpreis für Eigennutzer. Wir bereiten die Zahlen so auf, wie Anleger und Banken sie erwarten.',
    },
    en: {
      question: 'How is an apartment building valued?',
      answer:
        'Using the income approach: annual net rent, multiplier, and location determine value — not owner-occupier square-metre prices. We prepare the figures the way investors and lenders expect.',
    },
  },
  {
    id: 'good-multiplier',
    category: 'valuation-price',
    tags: ['valuation-price', 'sell-mehrfamilienhaus'],
    priority: 120,
    de: {
      question: 'Was ist ein guter Faktor in der Metropolregion?',
      answer:
        'Der Faktor – Kaufpreis geteilt durch Jahresnettokaltmiete – hängt stark von Lage und Zustand ab. Deshalb ordnen wir ein Objekt anhand vergleichbarer Abschlüsse ein, statt mit Pauschalwerten zu arbeiten.',
    },
    en: {
      question: 'What is a good multiplier in the metropolitan region?',
      answer:
        'The multiplier — purchase price divided by annual net rent — depends strongly on location and condition. We assess a property using comparable transactions instead of blanket figures.',
    },
  },

  // ── Steuern & Recht ──────────────────────────────────────────────
  {
    id: 'sale-taxes',
    category: 'tax-law',
    tags: ['tax-law', 'sell'],
    priority: 10,
    de: {
      question: 'Muss ich beim Verkauf Steuern zahlen?',
      answer:
        'Beim Verkauf einer selbst genutzten Immobilie fällt in der Regel keine Spekulationssteuer an. Bei vermieteten Objekten kann sie innerhalb der Zehnjahresfrist anfallen. Die verbindliche Auskunft gibt Ihr Steuerberater – wir weisen Sie frühzeitig auf das Thema hin.',
    },
    en: {
      question: 'Do I have to pay tax when selling?',
      answer:
        'Selling an owner-occupied property usually incurs no speculation tax. For rented properties it can apply within the ten-year holding period. Your tax adviser gives the binding answer — we flag the topic early.',
    },
  },
  {
    id: 'sell-tenanted-apartment',
    category: 'tax-law',
    tags: ['tax-law', 'sell', 'sell-wohnung', 'sell-mehrfamilienhaus'],
    priority: 20,
    de: {
      question: 'Kann ich eine vermietete Wohnung verkaufen?',
      answer:
        'Ja. „Kauf bricht nicht Miete“ – das Mietverhältnis läuft beim neuen Eigentümer weiter. Für Kapitalanleger ist eine vermietete Wohnung sogar besonders attraktiv, weil die Rendite von Anfang an steht.',
    },
    en: {
      question: 'Can I sell a tenanted apartment?',
      answer:
        'Yes. Purchase does not break the tenancy — the lease continues with the new owner. For investors a tenanted apartment can be especially attractive because the yield is in place from day one.',
    },
  },
  {
    id: 'heir-community-sale',
    category: 'tax-law',
    tags: ['tax-law', 'sell', 'sales-process'],
    priority: 30,
    de: {
      question: 'Wie verkaufen wir als Erbengemeinschaft?',
      answer:
        'Alle Miterben müssen dem Verkauf zustimmen. Wir schaffen mit einer neutralen Bewertung die gemeinsame Entscheidungsgrundlage und moderieren den Prozess – damit aus einer schwierigen Situation eine faire Lösung für alle wird.',
    },
    en: {
      question: 'How do we sell as a community of heirs?',
      answer:
        'All co-heirs must agree to the sale. We create a shared decision basis with a neutral valuation and moderate the process — so a difficult situation becomes a fair solution for everyone.',
    },
  },
  {
    id: 'speculation-period',
    category: 'tax-law',
    tags: ['tax-law', 'sell'],
    priority: 40,
    de: {
      question: 'Wie lange ist die Spekulationsfrist bei Immobilien?',
      answer:
        'Zehn Jahre. Verkaufen Sie eine vermietete Immobilie innerhalb dieser Frist mit Gewinn, kann Spekulationssteuer anfallen. Selbst genutzte Immobilien sind in der Regel ausgenommen. Verbindlich klärt das Ihr Steuerberater.',
    },
    en: {
      question: 'How long is the speculation holding period for property?',
      answer:
        'Ten years. Selling a rented property at a profit within that period can trigger speculation tax. Owner-occupied properties are usually exempt. Your tax adviser clarifies this bindingly.',
    },
  },
  {
    id: 'three-object-rule',
    category: 'tax-law',
    tags: ['tax-law', 'sell'],
    priority: 50,
    de: {
      question: 'Was ist die Drei-Objekt-Grenze?',
      answer:
        'Verkaufen Sie innerhalb von fünf Jahren mehr als drei Objekte, kann das Finanzamt gewerblichen Grundstückshandel annehmen – mit steuerlichen Folgen. Wer mehrere Verkäufe plant, sollte das vorab mit dem Steuerberater besprechen.',
    },
    en: {
      question: 'What is the three-object rule?',
      answer:
        'If you sell more than three properties within five years, the tax office may treat it as commercial property trading — with tax consequences. Anyone planning multiple sales should discuss this with a tax adviser first.',
    },
  },
  {
    id: 'transfer-tax-bavaria',
    category: 'tax-law',
    tags: ['tax-law', 'buyers', 'buy'],
    priority: 60,
    de: {
      question: 'Wer zahlt die Grunderwerbsteuer und wie hoch ist sie?',
      answer:
        'Die Grunderwerbsteuer zahlt üblicherweise der Käufer. In Bayern beträgt sie 3,5 % des Kaufpreises – der niedrigste Satz in Deutschland. Erst nach ihrer Zahlung wird der Käufer ins Grundbuch eingetragen.',
    },
    en: {
      question: 'Who pays real-estate transfer tax and how high is it?',
      answer:
        'Transfer tax is usually paid by the buyer. In Bavaria it is 3.5% of the purchase price — the lowest rate in Germany. Only after payment is the buyer entered in the land register.',
    },
  },

  // ── Für Käufer ───────────────────────────────────────────────────
  {
    id: 'new-listings-alert',
    category: 'buyers',
    tags: ['buyers', 'buy'],
    priority: 10,
    de: {
      question: 'Wie erfahre ich von neuen Immobilien?',
      answer:
        'Legen Sie einen kostenlosen Suchauftrag an. Sobald ein passendes Objekt in unsere Datenbank kommt, melden wir uns – oft bevor die Immobilie öffentlich inseriert wird. Viele unserer Objekte werden so verkauft, ohne je online zu erscheinen.',
    },
    en: {
      question: 'How do I hear about new properties?',
      answer:
        'Place a free search request. As soon as a matching property enters our database, we contact you — often before it is listed publicly. Many of our properties sell this way without ever appearing online.',
    },
  },
  {
    id: 'financing-help',
    category: 'buyers',
    tags: ['buyers', 'buy', 'documents-financing'],
    priority: 20,
    de: {
      question: 'Helfen Sie auch bei der Finanzierung?',
      answer:
        'Ja. Über unseren langjährigen Partner Dr. Klein erhalten Sie eine unabhängige Finanzierungsberatung und Konditionen aus einem breiten Bankenvergleich. Auf unserer Website finden Sie außerdem Rechner für Budget, Rate und Nebenkosten.',
    },
    en: {
      question: 'Do you also help with financing?',
      answer:
        'Yes. Through our long-standing partner Dr. Klein you receive independent financing advice and terms from a broad bank comparison. Our website also offers calculators for budget, instalments, and ancillary costs.',
    },
  },
  {
    id: 'equity-needed',
    category: 'buyers',
    tags: ['buyers', 'buy'],
    priority: 30,
    de: {
      question: 'Wie viel Eigenkapital brauche ich für den Immobilienkauf?',
      answer:
        'Als Faustregel sollten Sie mindestens die Kaufnebenkosten – in Bayern rund 5–6 % – aus Eigenkapital tragen, besser zusätzlich etwa 20 % des Kaufpreises. Mehr Eigenkapital verbessert Ihren Zins und Ihre Finanzierungschance.',
    },
    en: {
      question: 'How much equity do I need to buy a property?',
      answer:
        'As a rule of thumb, cover at least the purchase costs — around 5–6% in Bavaria — from equity, ideally plus about 20% of the purchase price. More equity improves your rate and financing prospects.',
    },
  },
  {
    id: 'purchase-costs-bavaria',
    category: 'buyers',
    tags: ['buyers', 'buy', 'tax-law'],
    priority: 40,
    de: {
      question: 'Was sind die Kaufnebenkosten in Bayern?',
      answer:
        'Zum Kaufpreis kommen 3,5 % Grunderwerbsteuer, rund 1,5–2 % für Notar und Grundbuch sowie gegebenenfalls die Maklerprovision. Zusammen sollten Sie mit etwa 8–12 % des Kaufpreises rechnen.',
    },
    en: {
      question: 'What are the purchase costs in Bavaria?',
      answer:
        'On top of the purchase price come 3.5% transfer tax, about 1.5–2% for notary and land register, and possibly agent commission. Altogether you should budget roughly 8–12% of the purchase price.',
    },
  },
  {
    id: 'notary-purchase-process',
    category: 'buyers',
    tags: ['buyers', 'buy', 'sales-process'],
    priority: 50,
    de: {
      question: 'Wie läuft der Kauf beim Notar ab?',
      answer:
        'Der Notar setzt den Kaufvertrag auf, verliest ihn im Termin und erklärt beiden Seiten die Inhalte. Nach der Unterschrift veranlasst er Auflassungsvormerkung, Zahlungsabwicklung und Grundbucheintrag. Der Notar ist dabei neutral.',
    },
    en: {
      question: 'How does the notary purchase process work?',
      answer:
        'The notary drafts the purchase contract, reads it at the appointment, and explains the contents to both parties. After signing, they arrange priority notice, payment handling, and land-register entry. The notary remains neutral.',
    },
  },

  // ── Über Immonation ──────────────────────────────────────────────
  {
    id: 'why-immonation',
    category: 'about',
    tags: ['about', 'locations', 'sell'],
    priority: 10,
    de: {
      question: 'Warum Immonation?',
      answer:
        'Wir sind seit 2017 eigenständig – kein Franchise – verkaufen rund 60 Immobilien pro Jahr mit etwa 30 Mio. € Volumen und wurden vom F.A.Z. Institut als TOP Makler 2026 ausgezeichnet. Unsere Kunden bewerten uns mit 4,9 von 5 Sternen bei 223 Google-Rezensionen.',
    },
    en: {
      question: 'Why Immonation?',
      answer:
        'We have been independent since 2017 — no franchise — sell around 60 properties a year with about €30m volume, and were named TOP Broker 2026 by the F.A.Z. Institute. Clients rate us 4.9 of 5 stars across 223 Google reviews.',
    },
  },
  {
    id: 'rentals-or-not',
    category: 'about',
    tags: ['about'],
    priority: 20,
    de: {
      question: 'Vermitteln Sie auch Mietobjekte?',
      answer:
        'Nein. Wir konzentrieren uns bewusst ausschließlich auf den Verkauf von Kaufobjekten. Diese Spezialisierung ist der Grund, warum wir in diesem Bereich so gute Ergebnisse für unsere Eigentümer erzielen.',
    },
    en: {
      question: 'Do you also broker rental properties?',
      answer:
        'No. We deliberately focus exclusively on sales of purchase properties. That specialisation is why we achieve strong results for owners in this area.',
    },
  },
  {
    id: 'service-region',
    category: 'about',
    tags: ['about', 'locations', 'contact'],
    priority: 30,
    de: {
      question: 'In welcher Region sind Sie tätig?',
      answer:
        'Unser Kerngebiet ist die Metropolregion Nürnberg: Zirndorf, Nürnberg, Fürth, Erlangen, Schwabach sowie das Umland bis Forchheim, Herzogenaurach, Oberasbach und Langenzenn. Unser Büro befindet sich in der Nürnberger Straße 18 in Zirndorf.',
    },
    en: {
      question: 'Which region do you cover?',
      answer:
        'Our core area is the Nuremberg metropolitan region: Zirndorf, Nuremberg, Fürth, Erlangen, Schwabach, and surroundings through Forchheim, Herzogenaurach, Oberasbach, and Langenzenn. Our office is at Nürnberger Straße 18 in Zirndorf.',
    },
  },
  {
    id: 'opening-hours',
    category: 'about',
    tags: ['about', 'contact'],
    priority: 40,
    de: {
      question: 'Wann haben Sie geöffnet?',
      answer:
        'Montag bis Freitag von 9:00 bis 18:00 Uhr und samstags von 10:30 bis 14:00 Uhr. Termine außerhalb der Öffnungszeiten sind nach vorheriger Absprache jederzeit möglich.',
    },
    en: {
      question: 'What are your opening hours?',
      answer:
        'Monday to Friday from 9:00 to 18:00 and Saturdays from 10:30 to 14:00. Appointments outside opening hours are possible by prior arrangement at any time.',
    },
  },
  {
    id: 'referrer-reward',
    category: 'about',
    tags: ['about', 'referrers'],
    priority: 50,
    de: {
      question: 'Ich kenne jemanden, der verkaufen will – bekomme ich etwas dafür?',
      answer:
        'Ja. Über unser Tippgeber-Netzwerk können Sie jemanden empfehlen, der verkaufen möchte. Kommt daraus ein Verkauf zustande, werden Sie mit einer Tippgeberprovision beteiligt – unsere aktiven Tippgeber erhalten je nach Vermittlung im Schnitt zwischen 2.000 und 8.000 € pro Jahr.',
    },
    en: {
      question: 'I know someone who wants to sell — do I get something for that?',
      answer:
        'Yes. Through our referrer network you can recommend someone who wants to sell. If a sale results, you share in a referrer commission — active referrers typically earn between €2,000 and €8,000 per year depending on introductions.',
    },
  },
  {
    id: 'dedicated-contact',
    category: 'about',
    tags: ['about', 'sell', 'contact'],
    priority: 60,
    de: {
      question: 'Bekomme ich einen festen Ansprechpartner?',
      answer:
        'Ja. Von der Bewertung bis zum Notartermin begleitet Sie eine feste Person aus unserem Team – kein Callcenter, kein anonymer Franchise-Partner. Wer Sie betreut, lernen Sie schon im Erstgespräch persönlich kennen.',
    },
    en: {
      question: 'Will I have a dedicated contact?',
      answer:
        'Yes. From valuation to the notary appointment, one person from our team accompanies you — no call centre, no anonymous franchise partner. You meet your contact personally in the first consultation.',
    },
  },
  {
    id: 'what-makes-different',
    category: 'about',
    tags: ['about', 'sell', 'locations'],
    priority: 70,
    de: {
      question: 'Was macht Immonation anders als andere Makler?',
      answer:
        'Wir sind auf den Verkauf spezialisiert – keine Vermietung, kein Franchise. Dazu ein eigener Ingenieur für Wohnflächen und Grundrisse, ein Netzwerk aktiver Suchkunden und Preisangaben aus echten beurkundeten Abschlüssen statt aus Angebotsportalen.',
    },
    en: {
      question: 'What makes Immonation different from other agents?',
      answer:
        'We specialise in sales — no rentals, no franchise. Plus an in-house engineer for living space and floor plans, a network of active search clients, and prices from real notarised closings instead of listing portals.',
    },
  },
]

export const FAQ_CATEGORY_ORDER: FaqCategoryId[] = [
  'broker-costs',
  'sales-process',
  'documents-financing',
  'valuation-price',
  'tax-law',
  'buyers',
  'about',
]
