import { expect, test } from '@playwright/test'
import { listIndexableRoutes } from '../../src/lib/routing/route-catalog'
import { SITE } from '../../src/lib/seo/site'

const locales = ['de', 'en'] as const

function publicUrl(locale: (typeof locales)[number], path: string) {
  return `/${locale}${path}`.replace(/\/$/, '') || `/${locale}`
}

test('every published catalog URL is canonical, indexable, bilingual and in the sitemap', async ({
  request,
}) => {
  test.setTimeout(180_000)
  const sitemapResponse = await request.get('/sitemap.xml')
  expect(sitemapResponse.ok()).toBe(true)
  const sitemap = await sitemapResponse.text()
  const checks = listIndexableRoutes().flatMap((routeRecord) =>
    locales.map((locale) => ({ routeRecord, locale })),
  )

  for (let offset = 0; offset < checks.length; offset += 12) {
    const batch = checks.slice(offset, offset + 12)
    await Promise.all(
      batch.map(async ({ routeRecord, locale }) => {
        const path = publicUrl(locale, routeRecord.paths[locale])
        const counterpart = locale === 'de' ? 'en' : 'de'
        const counterpartPath = publicUrl(counterpart, routeRecord.paths[counterpart])
        const response = await request.get(path)
        expect(response.status(), `${path} should resolve`).toBe(200)
        const html = await response.text()

        expect(
          html.includes(`rel="canonical" href="${SITE.url}${path}"`),
          `${path} should be canonical`,
        ).toBe(true)
        expect(html, `${path} should not be noindex`).not.toMatch(
          /<meta[^>]+name="robots"[^>]+noindex/i,
        )
        expect(
          html.includes(`hrefLang="${counterpart}" href="${SITE.url}${counterpartPath}"`),
          `${path} should link to ${counterpart}`,
        ).toBe(true)
        expect(
          sitemap.includes(`${SITE.url}${path}`),
          `${path} should be represented in sitemap alternates`,
        ).toBe(true)
      }),
    )
  }
})

test('reserved, noindex, and unknown dynamic routes obey publication rules', async ({
  request,
}) => {
  const reserved = await request.get('/de/kundenbereich')
  expect(reserved.status()).toBe(404)

  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const path of ['/de/seo']) {
    const response = await request.get(path)
    expect(response.status()).toBe(200)
    expect(await response.text()).toMatch(/<meta[^>]+name="robots"[^>]+noindex/i)
    expect(sitemap).not.toContain(`${SITE.url}${path}`)
  }

  const phasedDistrict = await request.get('/de/stadtteil/nuernberg/almoshof')
  expect(phasedDistrict.status()).toBe(200)
  expect(await phasedDistrict.text()).toMatch(/<meta[^>]+name="robots"[^>]+noindex/i)
  expect(sitemap).not.toContain(`${SITE.url}/de/stadtteil/nuernberg/almoshof`)

  for (const path of [
    '/de/objektart/unbekannt',
    '/de/nische/unbekannt',
    '/de/stadt/unbekannt',
    '/de/stadtteil/nuernberg/unbekannt',
    '/de/objekt/unbekannt',
    '/de/stimme/unbekannt',
    '/de/referenzen/unbekannt',
  ]) {
    expect((await request.get(path)).status(), `${path} should 404`).toBe(404)
  }
})
