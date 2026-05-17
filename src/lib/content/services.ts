import { routing } from '@/i18n/routing'

type LocaleKey = (typeof routing.locales)[number]

export type ServiceSection = {
  heading: string
  body: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type Service = {
  /** Canonical slug — same value across locales; locale-specific URL is derived from routing.pathnames. */
  slug: string
  locale: LocaleKey
  title: string
  lede: string
  hero: { eyebrow: string; bullets: string[] }
  sections: ServiceSection[]
  faq: ServiceFaq[]
  cta: { label: string; href: '/contact' }
  /** ISO date string — surfaces in JSON-LD and sitemap. */
  updatedAt?: string
  /** Optional area-served / service-type metadata for Service schema. */
  serviceType?: string
  areaServed?: string
}

const registries: Record<LocaleKey, () => Promise<Record<string, Service>>> = {
  de: async () => (await import('@/content/services/de')).default,
  en: async () => (await import('@/content/services/en')).default,
}

export async function listServices(locale: LocaleKey): Promise<Service[]> {
  const registry = await registries[locale]()
  return Object.values(registry).sort((a, b) => a.title.localeCompare(b.title))
}

export async function listAllServices(): Promise<Service[]> {
  const lists = await Promise.all(routing.locales.map((loc) => listServices(loc as LocaleKey)))
  return lists.flat()
}

export async function getService(locale: LocaleKey, slug: string): Promise<Service | null> {
  const registry = await registries[locale]()
  return registry[slug] ?? null
}

export async function listServiceSlugs(): Promise<Array<{ locale: LocaleKey; slug: string }>> {
  const results = await Promise.all(
    routing.locales.map(async (loc) => {
      const list = await listServices(loc as LocaleKey)
      return list.map((s) => ({ locale: loc as LocaleKey, slug: s.slug }))
    }),
  )
  return results.flat()
}
