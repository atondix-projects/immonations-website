import { routing } from '@/i18n/routing'

type LocaleKey = (typeof routing.locales)[number]

/**
 * Resolve a per-locale public path for a given canonical internal route.
 * Falls back to the internal path when no localized override exists.
 */
export function localizePath(internal: string, locale: LocaleKey): string {
  const map = routing.pathnames as Record<string, string | Partial<Record<LocaleKey, string>>>
  const entry = map[internal]
  if (!entry) {
    for (const [template, templateEntry] of Object.entries(map)) {
      if (!template.includes('[')) continue

      const pattern = new RegExp(
        `^${template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\[([^\\\]]+)\\\]/g, '([^/]+)')}$`,
      )
      const match = internal.match(pattern)
      if (!match) continue

      let index = 1
      const localizedTemplate =
        typeof templateEntry === 'string' ? templateEntry : (templateEntry[locale] ?? template)

      return localizedTemplate.replace(/\[([^\]]+)\]/g, () => match[index++] ?? '')
    }

    return internal
  }
  if (typeof entry === 'string') return entry
  return entry[locale] ?? internal
}
