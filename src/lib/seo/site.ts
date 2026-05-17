import { routing } from '@/i18n/routing'

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const SITE = {
  url: rawUrl.replace(/\/$/, ''),
  name: 'Immonations',
  legalName: 'Immonations GmbH',
  defaultLocale: routing.defaultLocale,
  locales: routing.locales,
  twitter: '@immonations',
  socials: {
    linkedin: 'https://www.linkedin.com/company/immonations',
  },
  contact: {
    email: 'hallo@immonations.example',
    phone: '+49 30 0000000',
  },
} as const

export type SiteConfig = typeof SITE
