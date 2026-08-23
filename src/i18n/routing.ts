import { defineRouting } from 'next-intl/routing'
import { PATHNAMES } from './pathnames'

export const routing = defineRouting({
  locales: ['de', 'en'] as const,
  defaultLocale: 'de',
  localePrefix: 'always',
  pathnames: PATHNAMES,
})

export type Locale = (typeof routing.locales)[number]
