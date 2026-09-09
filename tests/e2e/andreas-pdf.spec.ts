import { expect, test } from '@playwright/test'

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
] as const

for (const viewport of VIEWPORTS) {
  test(`PDF-W-02 hides the trademark certificate on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de/downloads')

    await expect(
      page.getByRole('link', { name: /marken.*zertifikat|zertifikat.*pdf/i }),
    ).toHaveCount(0)
    await expect(page.locator('a[href*="Zertifikat-Marke-Immonation.pdf"]')).toHaveCount(0)
  })
}

test('PDF-Ü-02 removes the disputed September stamp only from market pages', async ({ page }) => {
  for (const path of ['/de/preisatlas', '/de/markt', '/de/marktdaten']) {
    await page.goto(path)
    await expect(page.locator('body')).not.toContainText(/Stand:? September(?: 2026)?/i)
  }

  await page.goto('/de/bodenrichtwert')
  await expect(page.locator('body')).toContainText('Stand: September 2026')
})

test('PDF-W-02 does not serve the former certificate URL', async ({ request }) => {
  const response = await request.get('/downloads/Zertifikat-Marke-Immonation.pdf')
  expect(response.status()).toBe(404)
})

const METADATA_SAMPLE = [
  '/de',
  '/de/downloads',
  '/de/objektart/haus',
  '/de/stadt/zirndorf',
  '/de/referenzen/deining-neubauwohnung',
  '/de/news/bildungsspende-uganda',
] as const

for (const path of METADATA_SAMPLE) {
  test(`PDF-T-02 emits production metadata for ${path}`, async ({ page }) => {
    await page.goto(path)

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    const openGraphUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
    const openGraphImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    const alternates = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
    const html = await page.content()

    expect(canonical).toMatch(/^https:\/\/immonationgmbh\.de\//)
    expect(openGraphUrl).toBe(canonical)
    expect(openGraphImage).toMatch(/^https:\/\/immonationgmbh\.de\//)
    expect(alternates.length).toBeGreaterThanOrEqual(2)
    expect(alternates.every((href) => href?.startsWith('https://immonationgmbh.de/'))).toBe(true)
    expect(html).not.toMatch(/localhost|127\.0\.0\.1|vercel\.app/i)

    const imageResponse = await page.request.get(new URL(openGraphImage!).pathname)
    expect(imageResponse.ok()).toBe(true)
  })
}

test('PDF-T-02 keeps sitemap and robots on the production origin', async ({ request }) => {
  for (const path of ['/sitemap.xml', '/robots.txt']) {
    const response = await request.get(path)
    expect(response.ok()).toBe(true)
    expect(await response.text()).not.toMatch(/localhost|127\.0\.0\.1|vercel\.app/i)
  }
})

test('PDF-T-01 includes final metrics in the initial homepage HTML', async ({ request }) => {
  const response = await request.get('/de')
  const html = await response.text()

  expect(response.ok()).toBe(true)
  for (const value of ['4,9 / 5', '60+', '30 Mio. €', '8.000+', '300+']) {
    expect(html).toContain(value)
  }
  expect(html).not.toMatch(
    /(?<![\d.,])0,0\s*\/\s*5|(?<!\d)0\+\s*Verkäufe|(?<!\d)0\s*Mio\.\s*€|(?<!\d)0\s*Team/i,
  )
})

for (const viewport of VIEWPORTS) {
  test(`PDF-Ü-01 separates closing CTA and footer on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de/kontakt')

    const closingCta = page.locator('[data-closing-cta]')
    const footer = page.locator('[data-site-footer]')
    await expect(closingCta).toHaveCount(1)
    await expect(footer).toHaveCount(1)

    const [ctaBackground, footerBackground] = await Promise.all([
      closingCta.evaluate((element) => getComputedStyle(element).backgroundColor),
      footer.evaluate((element) => getComputedStyle(element).backgroundColor),
    ])
    expect(ctaBackground).not.toBe(footerBackground)
  })
}
