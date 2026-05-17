import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo/site'
import { routing } from '@/i18n/routing'
import { STATIC_ROUTES, localizePath } from '@/lib/seo/routes'
import { listAllPosts } from '@/lib/content/blog'
import { listAllServices } from '@/lib/content/services'

type LocaleKey = (typeof routing.locales)[number]

function entryFor(internal: string, opts: { priority?: number; changefreq?: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date } = {}) {
  const url = `${SITE.url}/${SITE.defaultLocale}${localizePath(internal, SITE.defaultLocale)}`.replace(/\/+$/, '') || `${SITE.url}/${SITE.defaultLocale}`
  const languages: Record<string, string> = {}
  for (const loc of routing.locales as readonly LocaleKey[]) {
    const path = localizePath(internal, loc)
    languages[loc] = `${SITE.url}/${loc}${path}`.replace(/\/+$/, '') || `${SITE.url}/${loc}`
  }
  languages['x-default'] = languages[SITE.defaultLocale] ?? url

  return {
    url,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changefreq,
    priority: opts.priority,
    alternates: { languages },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_ROUTES.map((route) =>
    entryFor(route.internal, { priority: route.priority, changefreq: route.changefreq }),
  )

  const services = await listAllServices()
  const serviceEntries = services.map((svc) =>
    entryFor(`/services/${svc.slug}`, {
      priority: 0.8,
      changefreq: 'monthly',
      lastModified: svc.updatedAt ? new Date(svc.updatedAt) : undefined,
    }),
  )

  const posts = await listAllPosts()
  const postEntries = posts.map((post) =>
    entryFor(`/blog/${post.slug}`, {
      priority: 0.6,
      changefreq: 'monthly',
      lastModified: new Date(post.date),
    }),
  )

  // Deduplicate by URL (services index + per-locale slug overrides can collide on edge cases).
  const seen = new Set<string>()
  return [...staticEntries, ...serviceEntries, ...postEntries].filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}
