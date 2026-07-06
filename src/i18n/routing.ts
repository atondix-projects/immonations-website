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
    '/referrers': {
      de: '/tippgeber',
      en: '/referrers',
    },
    '/downloads': {
      de: '/downloads',
      en: '/downloads',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
