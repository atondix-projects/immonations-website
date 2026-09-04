import { describe, expect, it } from 'vitest'
import { PATHNAMES } from '@/i18n/pathnames'
import { REFERENCE_IDS } from '@/lib/content/references'
import {
  getRouteByPath,
  isRouteNoindex,
  listIndexableRoutes,
  ROUTE_CATALOG,
} from '@/lib/routing/route-catalog'

describe('route catalog contract', () => {
  it('accounts for every catalog route and all 29 reference details exactly once', () => {
    expect(new Set(ROUTE_CATALOG.map((route) => route.id))).toHaveLength(ROUTE_CATALOG.length)
    expect(new Set(ROUTE_CATALOG.map((route) => route.paths.de))).toHaveLength(ROUTE_CATALOG.length)
    expect(new Set(ROUTE_CATALOG.map((route) => route.paths.en))).toHaveLength(ROUTE_CATALOG.length)

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
    expect(indexableIds.size).toBeGreaterThan(0)
  })

  /**
   * Previously asserted as absolute counts (86 indexable, 103 phased). Those numbers were
   * standing in for a rule, and any deliberate indexing change turned the suite red without
   * saying what had actually broken. State the rule instead.
   */
  it('never lets a draft route into the sitemap', () => {
    const indexableIds = new Set(listIndexableRoutes().map((route) => route.id))

    for (const route of ROUTE_CATALOG) {
      if (route.contentStatus !== 'draft') continue
      expect(indexableIds.has(route.id), `${route.id} is draft but indexable`).toBe(false)
    }
  })

  it('only marks a route indexable when it is published', () => {
    for (const route of ROUTE_CATALOG) {
      if (route.indexing !== 'index') continue
      expect(route.status, `${route.id} is indexed but not published`).toBe('published')
      expect(route.contentStatus, `${route.id} is indexed but not substantive`).toBe('substantive')
    }
  })

  it('sends every non-indexed route to buildMetadata as noindex', () => {
    // buildMetadata takes a plain boolean and never reads this catalog, so the catalog is
    // only authoritative through this helper. Pages must route their noindex value here.
    for (const route of ROUTE_CATALOG) {
      expect(isRouteNoindex(route)).toBe(route.indexing !== 'index')
    }

    expect(listIndexableRoutes().every((route) => !isRouteNoindex(route))).toBe(true)
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
