/**
 * Registry der Dr. Klein Partner-Widgets.
 *
 * Herkunft: Partnerportal → "Rechner & Tools" (`/tng/tools`). Dort liegt zu jedem
 * Modul ein fertiger iframe-Schnipsel; die Werte unten sind daraus übernommen.
 *
 * Warum diese Einbettung funktioniert, der Rechner-Hub aber nicht:
 * `/tng/tools` bootet und leitet auf `id.drklein-plattform.de` weiter, das
 * `frame-ancestors 'self'` setzt — ein iframe darauf bliebe leer. Die einzelnen
 * `/apps/<tool>/<uuid>`-Endpunkte sind davon getrennt. Geprüft am 2026-09-05:
 * Sie antworten ohne Cookies mit `200 text/html` und senden weder
 * `X-Frame-Options` noch eine `Content-Security-Policy`, sind also von jeder
 * Herkunft einbettbar.
 *
 * `embedPath` bleibt bewusst die *kurze* Form. Der Endpunkt leitet serverseitig
 * auf eine lange URL mit der Lead-Zuordnung von Immonation weiter
 * (`preferredAgent`, `extcid`, `leadSource`, `utm_*`, `tippgeberpartnerid`).
 * Wer die aufgelöste URL fest einträgt, friert eine Zuordnung ein, die Dr. Klein
 * pflegt.
 *
 * **Zur Höhe.** Der Schnipsel von Dr. Klein setzt `min-height: 900px` und will
 * die echte Höhe per `postMessage` nachreichen (`drk-rechner.iframe.resized`).
 * Diese Nachricht kommt nicht. Gemessen am 2026-09-05 mit dem unveränderten
 * Schnipsel auf einer nackten HTML-Seite: In 24 Sekunden schickt jedes Modul
 * genau eine Nachricht, nämlich den Handshake `[iFrameResizerChild]Ready`. Das
 * eingebettete Dokument ist ein iframe-resizer-Kind (v5.5.9) und meldet Größen
 * erst, wenn die Gegenstelle den `[iFrameSizer]`-Handshake beantwortet — die
 * lädt Dr. Klein aber nicht mit aus. Mit dem Original-Schnipsel bleibt deshalb
 * jeder Rechner auf 900 px und schneidet seinen Inhalt ab.
 *
 * Darum steht hier je Modul eine gemessene Höhe (Inhaltshöhe bei 1180 px
 * Viewport-Breite, plus etwas Luft). Der Listener in `DrKleinToolEmbed` bleibt
 * bestehen: Sobald Dr. Klein die Gegenstelle nachliefert, greift die echte
 * Auto-Höhe ohne weitere Änderung. Auf schmalen Viewports werden die Module
 * höher als hier hinterlegt — dann scrollt das iframe intern.
 *
 * `quote` ist ein Textbaustein aus dem Portalbereich "Inhalte Homepage".
 * Dr. Klein gibt diese Texte ausschließlich als gekennzeichnetes Zitat frei —
 * deshalb stehen sie wörtlich hier und werden als `<blockquote>` mit `<cite>`
 * auf die Quell-URL gerendert. Nicht umformulieren, nicht kürzen, nicht
 * übersetzen.
 */

export type DrKleinToolId =
  'interest-tableau' | 'construction-interest-calculator' | 'loan-calculator' | 'partner-banner'

export type DrKleinTool = {
  /** Identisch mit `data.data.id` der Resize-Nachricht des iframes. */
  id: DrKleinToolId
  embedPath: string
  /**
   * Gemessene Inhaltshöhe bei 1180 px Breite, mit etwas Luft. Wird als feste
   * Höhe gesetzt, weil die Auto-Höhe von Dr. Klein nicht funktioniert — siehe
   * Kopfkommentar.
   */
  frameHeight: number
  /** Anzeigename des Moduls im Partnerportal. */
  name: string
  /** Überschrift des Dr. Klein Textbausteins. `null` beim Banner. */
  quoteTitle: string | null
  /** Wörtlicher Textbaustein, in Absätzen. Leer beim Banner. */
  quote: readonly string[]
  /** Quell-URL für das `<cite>`. `null`, wenn kein Zitat vorliegt. */
  sourceUrl: string | null
}

export const DRKLEIN_ORIGIN = 'https://immonation-gmbh.drklein-plattform.de'

/**
 * Partnermakler-Logo. Aus dem Partnerportal heruntergeladen und lokal
 * ausgeliefert — `next.config.ts` erlaubt keine Fremd-Hosts für Bilder, und ein
 * Hotlink auf den S3-Bucket von Dr. Klein würde die IP jedes Besuchers dorthin
 * tragen, bevor er überhaupt eingewilligt hat. Im Portal liegt zusätzlich eine
 * `.eps`-Fassung für Print.
 */
export const DRKLEIN_PARTNER_LOGO = {
  src: '/images/partners/dr-klein-partnermakler.png',
  href: 'https://drklein.de/',
  width: 600,
  height: 158,
} as const

const TOOLS = [
  {
    id: 'interest-tableau',
    embedPath: '/apps/interest-tableau/83d1181e-e92a-41e7-a938-22f65c9d2b4f',
    // Gemessen: 1590 px.
    frameHeight: 1650,
    name: 'Bauzinschart',
    quoteTitle: 'Bauzinsen-Chart: Aktuelle Bauzinsen im Überblick',
    quote: [
      'Als Immobilienkäufer möchte man vor allem eines: Niedrige Hypothekenzinsen für seine Baufinanzierung. In diesem interaktiven Zins-Chart finden Sie die aktuellen Bauzinsen für Ihre gewünschte Darlehenssumme. Dabei wird die Entwicklung der Zinssätze (Sollzins und Effektivzins) täglich aktuell abgebildet.',
      'Als Vermittler arbeitet Dr. Klein mit vielen verschiedenen Bankpartnern zusammen, um für jede individuelle Immobilienfinanzierung die passende Lösung zu finden. Die Angaben in diesem Bauzinsen-Chart basieren auf den tatsächlichen Konditionen der Bankpartner.',
    ],
    sourceUrl: 'https://www.drklein.de/aktuelle-bauzinsen.html',
  },
  {
    id: 'construction-interest-calculator',
    embedPath: '/apps/construction-interest-calculator/9e0033a3-c209-4e15-bd1a-25ff7acd06b4',
    // Gemessen: 3357 px — der Rechner zeigt die Angebotsliste sofort mit an.
    frameHeight: 3450,
    name: 'Bauzinsrechner',
    quoteTitle: 'Bauzinsrechner: Wie hoch sind Zinssatz und Monatsrate?',
    quote: [
      'Sie haben eine interessante Immobilie gefunden und möchten nun wissen, wie eine mögliche Finanzierung aussehen könnte? Dieser Rechner zeigt, welche Bauzinsen und Konditionen Dr. Klein Ihnen bietet. Geben Sie die Eckdaten Ihrer Baufinanzierung – wie Objektwert und Darlehensbetrag – in den Bauzinsrechner ein. Wählen Sie Ihre gewünschte Zinsbindung und Tilgung und berechnen Sie neben den Bauzinsen Ihre monatliche Rate, Gesamtkosten, Restschuld und Ihren Tilgungsplan. Sie können auch eine gewünschte monatliche Rate eingeben, für die der Rechner dann zusätzlich zu den Bauzinsen die Tilgung ausgibt. Exakt auf Sie zugeschnittene Angebote erhalten Sie auf Wunsch von unseren Spezialisten für Immobilienfinanzierung.',
    ],
    sourceUrl: 'https://www.drklein.de/bauzinsen-rechner.html',
  },
  {
    id: 'loan-calculator',
    embedPath: '/apps/loan-calculator/e056fce5-c696-498a-bf26-90b5f2f725f9',
    // Gemessen: 1071 px.
    frameHeight: 1150,
    name: 'Hauskreditrechner',
    quoteTitle: 'Hauskreditrechner: Kredit fürs Haus vergleichen',
    quote: [
      'Der Hauskreditrechner zeigt Ihnen, welche Zinsen Sie für die Finanzierung von Ihrem Haus oder Ihrer Wohnung bei Dr. Klein erwarten können und wie sich verschiedene Sollzinsbindungen auswirken. Bei der Immobilienfinanzierung haben Sie meist die Wahl zwischen 5, 10, 15, 20, 25 oder sogar 30 Jahren Zinsbindung. Der Kreditrechner vergleicht mehrere Zinsbindungen und zeigt dazu die Monatsraten, den Effektivzins und die Restschuld Ihres Hauskredits auf einen Blick.',
      'Tipp: Je länger Sie den Zins festlegen, desto mehr Sicherheit genießen Sie über die Laufzeit hinweg. Aber desto höher fallen auch Monatsrate und Effektivzins aus. Das können Sie mit dem Hauskreditrechner testen. Wenn die Bauzinsen in den kommenden Jahren eher steigen werden, ist es für Käufer von Immobilien dennoch sinnvoll, den Zins möglichst lange zu fixieren. Es gilt abzuwägen, ob die längere Zinsbindung finanziell über alle Jahre hinweg tragbar ist. Vergleichen Sie jetzt alle Optionen mit dem Kreditrechner für Immobilien!',
    ],
    sourceUrl: 'https://www.drklein.de/kreditrechner.html',
  },
  {
    id: 'partner-banner',
    embedPath: '/apps/partner-banner/4ef528c8-6d13-400d-ae3d-c10aabc74374',
    // Gemessen: 101 px bei 1180 px Breite. 150 px ist der Wert aus dem Portal und
    // trägt auch das höhere Hochformat auf schmalen Viewports.
    frameHeight: 150,
    name: 'Online-Banner',
    quoteTitle: null,
    quote: [],
    sourceUrl: null,
  },
] as const satisfies readonly DrKleinTool[]

/** Reihenfolge auf der Finanzierungsseite: Marktbild → Konditionen → Rate. */
const CALCULATOR_ORDER = [
  'interest-tableau',
  'construction-interest-calculator',
  'loan-calculator',
] as const satisfies readonly DrKleinToolId[]

export function getDrKleinTool(id: DrKleinToolId): DrKleinTool {
  const tool = TOOLS.find((entry) => entry.id === id)
  // Der Union-Typ deckt genau die Einträge oben ab; ein Fehlschlag wäre ein Tippfehler.
  if (!tool) throw new Error(`Unbekanntes Dr. Klein Modul: ${id}`)
  return tool
}

export function listDrKleinCalculators(): readonly DrKleinTool[] {
  return CALCULATOR_ORDER.map(getDrKleinTool)
}

export function drKleinEmbedUrl(tool: DrKleinTool): string {
  return `${DRKLEIN_ORIGIN}${tool.embedPath}`
}
