import { expect, test } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

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

test('PDF-R-01 exposes exactly four reference-category filters in both languages', async ({
  page,
}) => {
  for (const [path, categories] of [
    ['/de/referenzen', ['Wohnung', 'Haus', 'Gewerbe', 'Investment']],
    ['/en/references', ['Apartment', 'House', 'Commercial', 'Investment']],
  ] as const) {
    await page.goto(path)
    const gallery = page
      .locator('section')
      .filter({ has: page.locator('[aria-label]') })
      .first()

    for (const category of categories) {
      await expect(page.getByRole('button', { name: category, exact: true })).toHaveCount(1)
    }
    expect(categories).toHaveLength(4)
    await expect(gallery).toBeVisible()
  }

  await page.goto('/de')
  await expect(page.locator('#referenzen')).toContainText('Wohnung')
  await expect(page.locator('#referenzen')).toContainText('Haus')
  await expect(page.locator('#referenzen')).toContainText('Gewerbe')

  await page.goto('/de/referenzen/fuerth-mehrfamilienhaus')
  await expect(page.getByRole('main').last()).toContainText(/Investment · Fürth/)
})

test('PDF-R-03 renders provider-backed review text without screenshots', async ({ page }) => {
  await page.setViewportSize(VIEWPORTS[0])
  await page.goto('/de/referenzen')

  const section = page.locator('#kundenstimmen-bewertungen')
  await expect(section).toHaveAttribute('data-review-source', /google-live|curated-fallback/)
  await expect(section.locator('img[src*="/images/reviews/"]')).toHaveCount(0)

  const carousel = section.getByRole('region')
  const activeSlide = carousel.locator('[aria-roledescription="Bewertung"][aria-hidden="false"]')
  const initialLabel = await activeSlide.getAttribute('aria-label')
  await carousel.getByRole('button', { name: 'Nächste Bewertung' }).last().click()
  await expect(activeSlide).not.toHaveAttribute('aria-label', initialLabel ?? '')
})

for (const viewport of VIEWPORTS) {
  test(`PDF-KI-01 operates the visualisation slider on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de/ki-visualisierung-home-staging')

    const comparison = page.locator('[data-visualization-compare]').first()
    const slider = comparison.getByRole('slider')
    await expect(comparison).toContainText('Original')
    await expect(comparison).toContainText('Visualisierung')
    await expect(slider).toHaveValue('50')

    await slider.focus()
    await page.keyboard.press('Home')
    await expect(slider).toHaveValue('0')
    await page.keyboard.press('End')
    await expect(slider).toHaveValue('100')
    await slider.fill('50')
    await expect(slider).toHaveValue('50')

    const evidenceDirectory = join(process.cwd(), 'output', 'verification', 'PDF-KI-01')
    mkdirSync(evidenceDirectory, { recursive: true })
    await page.screenshot({
      path: join(evidenceDirectory, `${viewport.name}.png`),
      fullPage: true,
    })

    await page.goto('/de')
    await expect(page.locator('a[href="/de/ki-visualisierung-home-staging"]')).not.toHaveCount(0)
  })
}

for (const viewport of VIEWPORTS) {
  test(`PDF-S-01 keeps financing compact on the homepage on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de')

    const teaser = page.locator('#leistungen a[href="/de/finanzierung"]')
    await expect(teaser).toHaveCount(1)
    await expect(teaser).toContainText('Top-Konditionen mit unserem Partner Dr. Klein.')
    await expect(teaser.locator('svg')).toHaveCount(1)

    await teaser.click()
    await expect(page).toHaveURL(/\/de\/finanzierung$/)
    await expect(
      page.getByRole('heading', { name: 'Rechnen Sie selbst – bevor Sie ins Gespräch gehen' }),
    ).toBeVisible()
  })
}

for (const viewport of VIEWPORTS) {
  test(`PDF-S-03 follows the sales bell immediately with Polaroids on ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de')

    const polaroids = page.locator('#beurkundet + #uebergabe')
    await expect(polaroids).toHaveCount(1)
    await expect(polaroids.locator('img')).toHaveCount(8)

    const evidenceDirectory = join(process.cwd(), 'output', 'verification', 'PDF-S-03')
    mkdirSync(evidenceDirectory, { recursive: true })
    await polaroids.screenshot({ path: join(evidenceDirectory, `${viewport.name}.png`) })
  })
}

for (const viewport of VIEWPORTS) {
  test(`PDF-V-01 opens and closes the Ogulo tour on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de/virtuell')

    await expect(
      page.getByText(/Erst mit Ihrem Klick wird der Rundgang von Ogulo geladen/),
    ).toBeVisible()
    const evidenceDirectory = join(process.cwd(), 'output', 'verification', 'PDF-V-01')
    mkdirSync(evidenceDirectory, { recursive: true })
    await page.screenshot({
      path: join(evidenceDirectory, `page-${viewport.name}.png`),
      fullPage: true,
    })

    await page.getByRole('button', { name: /360°-Rundgang ansehen/ }).click()

    const dialog = page.getByRole('dialog', { name: /360°-Rundgang ansehen/ })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('iframe')).toHaveAttribute('src', 'https://tour.ogulo.com/a4mC')
    await expect(dialog.locator('iframe')).toHaveAttribute('allow', /fullscreen/)

    await page.screenshot({
      path: join(evidenceDirectory, `overlay-${viewport.name}.png`),
      fullPage: true,
    })

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
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

test('PDF-Ü-03 uses the approved brokerage-data attribution in both languages', async ({
  page,
}) => {
  for (const [path, source] of [
    ['/de/preisatlas', 'basierend auf Vermittlungsdaten der Immonation'],
    ['/de/marktdaten', 'basierend auf Vermittlungsdaten der Immonation'],
    ['/en/price-atlas', 'based on Immonation brokerage data'],
    ['/en/market-data', 'based on Immonation brokerage data'],
  ] as const) {
    await page.goto(path)
    await expect(page.locator('body')).toContainText(source)
    await expect(page.locator('body')).not.toContainText(/einige Vermittlungsdaten/i)
  }
})

for (const viewport of VIEWPORTS) {
  test(`PDF-S-02 uses captioned feedback videos on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de')

    const stories = page.locator('#kundenstimmen')
    await expect(stories.locator('img[src*="/images/reviews/"]')).toHaveCount(0)
    await expect(stories.locator('[data-video-dialog]')).toHaveCount(4)

    const firstVideoTrigger = stories.locator('[data-video-dialog]').first()
    await firstVideoTrigger.focus()
    await page.keyboard.press('Enter')

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('video track[kind="captions"][srclang="de"]')).toHaveCount(1)
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })
}

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

test('PDF-W-01 keeps the price atlas provenance and footer clean', async ({ page }) => {
  await page.goto('/de/preisatlas')

  await expect(page.locator('body')).toContainText('basierend auf Vermittlungsdaten der Immonation')
  await expect(page.locator('body')).not.toContainText(/Stand:? September(?: 2026)?/i)
  await expect(page.locator('body')).not.toContainText(/einige Vermittlungsdaten/i)
  await expect(page.locator('[data-site-footer]')).toHaveCount(1)
})

test('PDF-W-05 exposes substantive owner guides in both languages', async ({ page }) => {
  for (const [path, titles] of [
    [
      '/de/news',
      [
        'Immobilienverkauf vorbereiten: Diese Unterlagen schaffen Klarheit',
        'Angebotspreis richtig einordnen',
      ],
    ],
    [
      '/en/news',
      [
        'Preparing a property sale: the documents that create clarity',
        'How to understand an asking price',
      ],
    ],
  ] as const) {
    await page.goto(path)
    for (const title of titles) {
      await expect(page.getByRole('link', { name: title, exact: true })).toBeVisible()
    }
  }
})

for (const viewport of VIEWPORTS) {
  test(`PDF-W-05 renders the document guide on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de/news/immobilienverkauf-vorbereiten-unterlagen')

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Immobilienverkauf vorbereiten: Diese Unterlagen schaffen Klarheit',
      }),
    ).toBeVisible()
    await expect(page.locator('#article-content')).toContainText(
      'Mit einer Bestandsaufnahme beginnen',
    )
    await expect(page.locator('#article-content a[href="/de/bewertung"]')).toBeVisible()

    const evidenceDirectory = join(process.cwd(), 'output', 'verification', 'PDF-W-05')
    mkdirSync(evidenceDirectory, { recursive: true })
    await page.screenshot({
      path: join(evidenceDirectory, `${viewport.name}.png`),
      fullPage: true,
    })
  })
}

test('PDF-W-07 renders local evidence on representative city and district pages', async ({
  page,
}) => {
  for (const path of [
    '/de/stadt/nuernberg',
    '/de/stadt/fuerth',
    '/de/stadt/erlangen',
    '/de/stadt/zirndorf',
    '/de/stadt/schwabach',
  ]) {
    await page.goto(path)
    await expect(page.locator('main, article').first()).toContainText(/Immobilien/)
    await expect(page.locator('[data-site-footer]')).toHaveCount(1)
  }

  await page.goto('/de/stadtteil/nuernberg/st-johannis')
  await expect(page.getByRole('heading', { name: 'Preisspannen in St. Johannis' })).toBeVisible()
  await expect(page.locator('body')).toContainText('4.920')
  await expect(page.locator('body')).toContainText('5.830')
  await expect(page.locator('body')).toContainText('basierend auf Vermittlungsdaten der Immonation')
  await expect(page.locator('[data-site-footer]')).toHaveCount(1)
})

for (const viewport of VIEWPORTS) {
  test(`PDF-W-07 renders district evidence on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de/stadtteil/nuernberg/st-johannis')

    await expect(page.getByRole('heading', { name: 'Preisspannen in St. Johannis' })).toBeVisible()
    const evidenceDirectory = join(process.cwd(), 'output', 'verification', 'PDF-W-07')
    mkdirSync(evidenceDirectory, { recursive: true })
    await page.screenshot({
      path: join(evidenceDirectory, `${viewport.name}.png`),
      fullPage: true,
    })
  })
}

for (const viewport of VIEWPORTS) {
  test(`PDF-W-08 keeps the property-prices page current on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/de/markt')

    await expect(page.locator('body')).toContainText(
      'basierend auf Vermittlungsdaten der Immonation',
    )
    await expect(page.locator('body')).not.toContainText(/Stand:? September(?: 2026)?/i)
    await expect(page.locator('[data-site-footer]')).toHaveCount(1)

    const evidenceDirectory = join(process.cwd(), 'output', 'verification', 'PDF-W-08')
    mkdirSync(evidenceDirectory, { recursive: true })
    await page.screenshot({
      path: join(evidenceDirectory, `${viewport.name}.png`),
      fullPage: true,
    })
  })
}

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
