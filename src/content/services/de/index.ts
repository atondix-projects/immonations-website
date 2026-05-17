import type { Service } from '@/lib/content/services'

const services: Record<string, Service> = {
  'initial-consultation': {
    slug: 'initial-consultation',
    locale: 'de',
    title: 'Erstberatung & Marktanalyse',
    lede: 'Eine ehrliche Einschätzung Ihrer Immobilie — ohne Verkaufsdruck, dafür mit belastbaren Daten.',
    hero: {
      eyebrow: 'In 14 Tagen Klarheit',
      bullets: [
        'Schriftliches Gutachten mit drei Vergleichsobjekten',
        'Marktstrategie auf Basis aktueller Transaktionen',
        'Persönliches Gespräch vor Ort oder digital',
      ],
    },
    sections: [
      {
        heading: 'Was Sie bekommen',
        body: 'Wir analysieren Ihre Immobilie anhand öffentlicher Transaktionsdaten, eigener Vermittlungen und KI-gestützter Vergleichswerte. Das Ergebnis ist ein schriftliches Gutachten, das Sie für Eigentümerentscheidungen, Erbschaftsregelungen oder Bankgespräche nutzen können.',
      },
      {
        heading: 'Wie wir arbeiten',
        body: 'Ein Berater begleitet Sie persönlich von der Erstanalyse bis zum schriftlichen Ergebnis. Wir liefern keine generischen Zahlen, sondern eine Einschätzung mit Begründung — inklusive einer Strategieempfehlung, wenn Sie verkaufen möchten.',
      },
      {
        heading: 'Für wen geeignet',
        body: 'Eigentümer, die einen Verkauf erwägen, Erben, die einen Wert dokumentieren müssen, sowie Investoren, die ein Objekt vor dem Kauf einordnen wollen.',
      },
    ],
    faq: [
      {
        question: 'Wie lange dauert eine Erstberatung?',
        answer:
          'Vom ersten Gespräch bis zum schriftlichen Gutachten vergehen typischerweise 10 bis 14 Tage, abhängig von der Verfügbarkeit relevanter Unterlagen.',
      },
      {
        question: 'Was kostet die Erstberatung?',
        answer:
          'Die Erstberatung ist für Verkaufsinteressenten unverbindlich und kostenfrei. Reine Gutachten für Erbschafts- oder Steuerzwecke berechnen wir transparent nach Aufwand.',
      },
      {
        question: 'Bin ich nach der Beratung zu etwas verpflichtet?',
        answer:
          'Nein. Sie erhalten das Gutachten als Grundlage für Ihre Entscheidung — ob Sie verkaufen, halten oder eine zweite Meinung einholen, bleibt Ihnen überlassen.',
      },
    ],
    cta: { label: 'Beratung anfragen', href: '/contact' },
    updatedAt: '2026-04-12',
    serviceType: 'Real estate valuation and advisory',
    areaServed: 'Germany',
  },
}

export default services
