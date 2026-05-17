import type { Metadata } from 'next'
import { SITE } from './site'
import { routing } from '@/i18n/routing'

const OG_LOCALES: Record<(typeof routing.locales)[number], string> = {
  de: 'de_DE',
  en: 'en_US',
}

type BuildMetadataInput = {
  locale: string
  /** Locale-agnostic canonical path, leading slash. e.g. "/services/initial-consultation" */
  path: string
  title: string
  description: string
  /** Override `<title>` template at the route level. Use sparingly. */
  titleTemplate?: string
  /** Override OG image absolute URL. Defaults to the locale-level opengraph-image route handler. */
  image?: string
  noindex?: boolean
  /** Optional per-locale path overrides (used when the URL slug differs by locale). */
  localizedPaths?: Partial<Record<(typeof routing.locales)[number], string>>
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    locale,
    path,
    title,
    description,
    titleTemplate,
    image,
    noindex,
    localizedPaths,
  } = input

  const localePath = (loc: string) => {
    const override = localizedPaths?.[loc as (typeof routing.locales)[number]]
    return `/${loc}${override ?? path}`.replace(/\/$/, '') || `/${loc}`
  }

  const canonical = `${SITE.url}${localePath(locale)}`
  const ogLocale = OG_LOCALES[locale as keyof typeof OG_LOCALES] ?? 'de_DE'
  const ogImage = image ?? `${SITE.url}/${locale}/opengraph-image`

  const languages: Record<string, string> = {}
  for (const loc of routing.locales) {
    languages[loc] = `${SITE.url}${localePath(loc)}`
  }
  languages['x-default'] = `${SITE.url}${localePath(SITE.defaultLocale)}`

  return {
    metadataBase: new URL(SITE.url),
    title: titleTemplate ? { default: title, template: titleTemplate } : title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: SITE.name,
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALES).filter((l) => l !== ogLocale),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter,
      title,
      description,
      images: [ogImage],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}
