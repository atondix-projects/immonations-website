import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['de', 'en'] as const,
  defaultLocale: 'de',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/buy': {
      de: '/immobilie-kaufen',
      en: '/buy-property',
    },
    '/services': {
      de: '/leistungen',
      en: '/services',
    },
    '/services/[slug]': {
      de: '/leistungen/[slug]',
      en: '/services/[slug]',
    },
    '/sell': {
      de: '/immobilie-verkaufen',
      en: '/sell-property',
    },
    '/sales-process': {
      de: '/immobilie-verkaufen/ablauf',
      en: '/sell-property/process',
    },
    '/sell/[slug]': {
      de: '/immobilie-verkaufen/[slug]',
      en: '/sell-property/[slug]',
    },
    '/locations': {
      de: '/immobilienmakler-region',
      en: '/real-estate-agent-locations',
    },
    '/locations/[slug]': {
      de: '/immobilienmakler-region/[slug]',
      en: '/real-estate-agent-locations/[slug]',
    },
    '/blog': {
      de: '/ratgeber',
      en: '/guides',
    },
    '/blog/[slug]': {
      de: '/ratgeber/[slug]',
      en: '/guides/[slug]',
    },
    '/about': {
      de: '/ueber-uns',
      en: '/about',
    },
    '/contact': {
      de: '/kontakt',
      en: '/contact',
    },
    '/property-valuation': {
      de: '/immobilienbewertung',
      en: '/property-valuation',
    },
    '/property-valuation/thank-you': {
      de: '/immobilienbewertung/danke',
      en: '/property-valuation/thank-you',
    },
    '/faq': {
      de: '/faq',
      en: '/faq',
    },
    '/imprint': {
      de: '/impressum',
      en: '/imprint',
    },
    '/privacy': {
      de: '/datenschutz',
      en: '/privacy',
    },
    '/terms': {
      de: '/agb',
      en: '/terms',
    },
    '/careers': {
      de: '/karriere',
      en: '/careers',
    },
    '/real-estate-agent-career': {
      de: '/immobilienmakler-werden',
      en: '/become-a-real-estate-agent',
    },
    '/referrers': {
      de: '/tippgeber',
      en: '/referrers',
    },
    '/downloads': {
      de: '/downloads',
      en: '/downloads',
    },
    '/references': {
      de: '/referenzen',
      en: '/references',
    },
    '/references/[slug]': {
      de: '/referenzen/[slug]',
      en: '/references/[slug]',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
