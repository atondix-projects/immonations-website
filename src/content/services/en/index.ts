import type { Service } from '@/lib/content/services'

const services: Record<string, Service> = {
  'initial-consultation': {
    slug: 'initial-consultation',
    locale: 'en',
    title: 'Initial consultation & market analysis',
    lede: 'An honest read of your property — no sales pressure, defensible numbers only.',
    hero: {
      eyebrow: 'Clarity in 14 days',
      bullets: [
        'Written valuation with three comparable transactions',
        'Market strategy grounded in current deal data',
        'Personal conversation on-site or remote',
      ],
    },
    sections: [
      {
        heading: 'What you get',
        body: 'We analyze your property using public transaction data, our own placements, and AI-assisted comparables. The result is a written valuation you can use for owner decisions, inheritance settlements, or bank conversations.',
      },
      {
        heading: 'How we work',
        body: 'One advisor walks you from first analysis to written result. We do not deliver generic numbers — we deliver a rationale, plus a recommendation if you choose to sell.',
      },
      {
        heading: 'Who it is for',
        body: 'Owners considering a sale, heirs who need a documented value, and investors sizing up a property before a purchase.',
      },
    ],
    faq: [
      {
        question: 'How long does an initial consultation take?',
        answer:
          'From the first conversation to the written valuation is typically 10 to 14 days, depending on document availability.',
      },
      {
        question: 'How much does the initial consultation cost?',
        answer:
          'For owners considering a sale, the initial consultation is free and non-binding. Standalone valuations for tax or estate purposes are quoted transparently by scope.',
      },
      {
        question: 'Am I committed to anything afterwards?',
        answer:
          'No. The valuation is yours to act on — sell, hold, or get a second opinion. The decision stays with you.',
      },
    ],
    cta: { label: 'Request a consultation', href: '/contact' },
    updatedAt: '2026-04-12',
    serviceType: 'Real estate valuation and advisory',
    areaServed: 'Germany',
  },
}

export default services
