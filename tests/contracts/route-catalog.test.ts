import { describe, expect, it } from 'vitest'
import { PATHNAMES } from '@/i18n/pathnames'
import {
  getRouteByPath,
  listIndexableRoutes,
  ROUTE_CATALOG,
} from '@/lib/routing/route-catalog'

describe('route catalog contract', () => {
  it('accounts for all 176 customer targets exactly once', () => {
    expect(ROUTE_CATALOG).toHaveLength(176)
    expect(new Set(ROUTE_CATALOG.map((route) => route.id))).toHaveLength(176)
    expect(new Set(ROUTE_CATALOG.map((route) => route.paths.de))).toHaveLength(176)
    expect(new Set(ROUTE_CATALOG.map((route) => route.paths.en))).toHaveLength(176)

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

  it('excludes reserved and noindex records from the sitemap source', () => {
    const indexableIds = new Set(listIndexableRoutes().map((route) => route.id))
    expect(indexableIds.has('client-area')).toBe(false)
    expect(indexableIds.has('staging')).toBe(false)
    expect(indexableIds.has('seo')).toBe(false)
    expect(indexableIds.size).toBe(70)
    expect(ROUTE_CATALOG.filter((route) => route.status === 'phased')).toHaveLength(103)
  })

  it('has no public collisions between static and dynamic route families', () => {
    const dynamicTemplates = Object.values(PATHNAMES)
      .flatMap((value) => typeof value === 'string' ? [value] : [value.de, value.en])
      .filter((value) => value.includes('['))
      .map((template) => new RegExp(`^${template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\[[^\]]+\\\]/g, '[^/]+')}$`))

    const staticPaths = ROUTE_CATALOG
      .filter((route) => !route.internal.includes('['))
      .flatMap((route) => [route.paths.de, route.paths.en])

    for (const staticPath of staticPaths) {
      expect(dynamicTemplates.some((template) => template.test(staticPath))).toBe(false)
    }
  })
})
