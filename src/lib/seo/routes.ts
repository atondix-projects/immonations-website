import { routing } from '@/i18n/routing'

/**
 * Static routes that should appear in the sitemap.
 *
 * - `internal` is the canonical (English / default-locale) path used as the
 *   key in `routing.pathnames`. It is **not** the public URL.
 * - `priority` and `changefreq` are passed straight to the sitemap entry.
 *
 * Dynamic content (blog posts, services) is appended in `app/sitemap.ts`
 * via the corresponding `listAll*` helpers.
 */
export const STATIC_ROUTES = [
  { internal: '/', priority: 1.0, changefreq: 'weekly' as const },
  { internal: '/services', priority: 0.9, changefreq: 'monthly' as const },
  { internal: '/blog', priority: 0.7, changefreq: 'weekly' as const },
  { internal: '/about', priority: 0.5, changefreq: 'monthly' as const },
  { internal: '/contact', priority: 0.6, changefreq: 'yearly' as const },
] as const

type LocaleKey = (typeof routing.locales)[number]

/**
 * Resolve a per-locale public path for a given canonical internal route.
 * Falls back to the internal path when no localized override exists.
 */
export function localizePath(internal: string, locale: LocaleKey): string {
  const map = routing.pathnames as Record<string, string | Partial<Record<LocaleKey, string>>>
  const entry = map[internal]
  if (!entry) return internal
  if (typeof entry === 'string') return entry
  return entry[locale] ?? internal
}
