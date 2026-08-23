import { describe, expect, it } from 'vitest'
import { PATHNAMES } from '@/i18n/pathnames'
import { REFERENCE_IDS } from '@/lib/content/references'
import { getRouteByPath, listIndexableRoutes, ROUTE_CATALOG } from '@/lib/routing/route-catalog'

describe('route catalog contract', () => {
  it('accounts for the 176 customer targets and 15 reference details exactly once', () => {
    expect(ROUTE_CATALOG).toHaveLength(191)
    expect(new Set(ROUTE_CATALOG.map((route) => route.id))).toHaveLength(191)
    expect(new Set(ROUTE_CATALOG.map((route) => route.paths.de))).toHaveLength(191)
    expect(new Set(ROUTE_CATALOG.map((route) => route.paths.en))).toHaveLength(191)

    for (const route of ROUTE_CATALOG) {
      expect(['published', 'noindex', 'phased', 'reserved']).toContain(route.status)
      expect(['index', 'noindex', 'excluded']).toContain(route.indexing)
      expect(['substantive', 'draft', 'reserved']).toContain(route.contentStatus)
    }
  })

  it('pairs every German route with its reciprocal English identity', () => {
    for (const route of ROUTE_CATALOG) {
      expect(getRouteByPath('de', route.paths.de)?.id).toBe(route.id)
      expect(getRouteByPath('en', route.paths.en)?.id).toBe(route.id)
      expect(route.paths.de).toMatch(/^\//)
      expect(route.paths.en).toMatch(/^\//)
    }
  })

  it('publishes the partner-agent page under its dedicated bilingual slugs', () => {
    expect(getRouteByPath('de', '/partnermakler')?.id).toBe('partners')
    expect(getRouteByPath('en', '/partner-agents')?.id).toBe('partners')
  })

  it('excludes reserved and noindex records from the sitemap source', () => {
    const indexableIds = new Set(listIndexableRoutes().map((route) => route.id))
    expect(indexableIds.has('client-area')).toBe(false)
    expect(indexableIds.has('staging')).toBe(true)
    expect(indexableIds.has('seo')).toBe(false)
    expect(indexableIds.size).toBe(86)
    expect(ROUTE_CATALOG.filter((route) => route.status === 'phased')).toHaveLength(103)
  })

  it('publishes a reciprocal localized route for every reference detail', () => {
    for (const slug of REFERENCE_IDS) {
      const route = ROUTE_CATALOG.find((candidate) => candidate.id === `reference:${slug}`)
      expect(route?.internal).toBe('/references/[slug]')
      expect(route?.paths.de).toBe(`/referenzen/${slug}`)
      expect(route?.paths.en).toBe(`/references/${slug}`)
      expect(route?.status).toBe('published')
    }
  })

  it('has no public collisions between static and dynamic route families', () => {
    const dynamicTemplates = Object.values(PATHNAMES)
      .flatMap((value) => (typeof value === 'string' ? [value] : [value.de, value.en]))
      .filter((value) => value.includes('['))
      .map(
        (template) =>
          new RegExp(
            `^${template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\[[^\]]+\\\]/g, '[^/]+')}$`,
          ),
      )

    const staticPaths = ROUTE_CATALOG.filter((route) => !route.internal.includes('[')).flatMap(
      (route) => [route.paths.de, route.paths.en],
    )

    for (const staticPath of staticPaths) {
      expect(dynamicTemplates.some((template) => template.test(staticPath))).toBe(false)
    }
  })
})
