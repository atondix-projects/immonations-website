import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['de', 'en'] as const,
  defaultLocale: 'de',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': {
      de: '/leistungen',
      en: '/services',
    },
    '/services/[slug]': {
      de: '/leistungen/[slug]',
      en: '/services/[slug]',
    },
    '/blog': {
      de: '/blog',
      en: '/blog',
    },
    '/blog/[slug]': {
      de: '/blog/[slug]',
      en: '/blog/[slug]',
    },
    '/about': {
      de: '/ueber-uns',
      en: '/about',
    },
    '/contact': {
      de: '/kontakt',
      en: '/contact',
    },
  },
})

export type Locale = (typeof routing.locales)[number]
