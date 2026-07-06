import { routing } from '@/i18n/routing'

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const SITE = {
  url: rawUrl.replace(/\/$/, ''),
  name: 'Immonation',
  legalName: 'Immonation GmbH',
  defaultLocale: routing.defaultLocale,
  locales: routing.locales,
  twitter: '@immonationgmbh',
  socials: {
    linkedin: 'https://www.linkedin.com/company/immonation-gmbh',
    instagram: 'https://www.instagram.com/immonationgmbh',
    tiktok: 'https://www.tiktok.com/@immonationgmbh',
    facebook: 'https://www.facebook.com/immonationgmbh',
  },
  contact: {
    email: 'info@immonations.de',
    phone: '+49 911 21283890',
  },
  address: {
    streetAddress: 'Nürnberger Straße 18',
    postalCode: '90513',
    addressLocality: 'Zirndorf',
    addressCountry: 'DE',
  },
} as const

export type SiteConfig = typeof SITE
