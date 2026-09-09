import { expect, test } from '@playwright/test'

const HOME_CHAPTERS = [
  'hero',
  'proof',
  'difference',
  'process',
  'guidance',
  'situations',
  'sales-system',
  'market',
  'results',
  'trust',
  'local',
  'company',
  'faq',
  'next-step',
  'contact',
] as const

const CLIENT_TOPIC_ANCHORS = [
  'darum-immonation',
  'warnsignale',
  'verkaufen',
  'virtuelle-besichtigung',
  'social',
  'objektarten',
  'leistungen',
  'kundenstimmen',
  'referenzen',
  'magazin',
  'beurkundet',
  'bewertungen',
  'auszeichnungen',
  'uebergabe',
  'preisatlas',
  'marktdaten',
  'regionen',
  'angebote',
  'wissen',
  'immobilien-assistent',
  'wer-wir-sind',
  'partner',
  'zusammenarbeiten',
  'faq',
  'bewertung',
  'kontakt',
] as const

async function revealHomepageHero(page: import('@playwright/test').Page) {
  await page.locator('[data-home-hero-story]').evaluate((story) => {
    const top = story.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + window.innerHeight * 0.82, behavior: 'instant' })
  })
  await expect(page.locator('[data-home-hero-story]')).toHaveAttribute('data-hero-phase', 'hero')
}

for (const locale of ['de', 'en'] as const) {
  test(`${locale} homepage follows the 15-chapter conversion journey`, async ({ page }) => {
    await page.goto(`/${locale}`)

    const heroStory = page.locator('[data-home-hero-story]')
    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(heroStory).toHaveAttribute('data-hero-phase', 'logo')
    await expect(heroStory).toContainText(
      locale === 'de' ? 'Zuhause beginnt auf dieser Website.' : 'Home starts right here.',
    )

    await revealHomepageHero(page)
    await expect(page.locator('[data-home-chapter="hero"] form:visible')).toBeVisible()
    await expect(page.locator('[data-hero-video="placeholder"]:visible')).toBeVisible()
    await expect(page.locator('[data-home-chapter="hero"]')).not.toContainText('300+')

    const chapterOrder = await page
      .locator('[data-home-chapter]')
      .evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('data-home-chapter')),
      )

    expect(chapterOrder).toEqual(HOME_CHAPTERS)

    for (const anchor of CLIENT_TOPIC_ANCHORS) {
      await expect(page.locator(`#${anchor}`), `#${anchor} should remain addressable`).toHaveCount(
        1,
      )
    }
  })
}

test('homepage valuation entry keeps the primary journey client-side until navigation', async ({
  page,
}) => {
  await page.goto('/de')
  await revealHomepageHero(page)
  const hero = page.locator('[data-home-chapter="hero"]')
  const valuationEntry = hero.locator('form:visible')

  const houseOption = valuationEntry.getByRole('radio', { name: 'Haus', exact: true })
  await valuationEntry.getByText('Haus', { exact: true }).click()
  await expect(houseOption).toBeChecked()
  await valuationEntry.getByRole('button', { name: /Weiter/ }).click()

  await expect(page).toHaveURL(/\/de\/bewertung\?type=house$/)
})

test('homepage bypasses the scroll story when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/de')

  const heroStory = page.locator('[data-home-hero-story]')
  await expect(heroStory).toHaveAttribute('data-hero-phase', 'hero')
  await expect(heroStory.locator('[inert]')).toHaveCount(0)
  await expect(heroStory.locator('form:visible')).toBeVisible()
})

test('homepage hero keeps valuation and video responsive without horizontal overflow', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/de')

    const hero = page.locator('[data-home-hero-story]')
    const formBox = await hero.locator('form:visible').boundingBox()
    const videoBox = await hero.locator('[data-hero-video="placeholder"]:visible').boundingBox()
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )

    expect(formBox).not.toBeNull()
    expect(videoBox).not.toBeNull()
    expect(hasHorizontalOverflow).toBe(false)

    if (!formBox || !videoBox) continue
    if (viewport.width >= 1280) {
      expect(videoBox.x).toBeGreaterThan(formBox.x + formBox.width)
    } else {
      expect(videoBox.y).toBeGreaterThan(formBox.y)
    }
  }
})

test('homepage header stays dark through the hero story and turns light afterwards', async ({
  page,
}) => {
  await page.goto('/de')
  const header = page.locator('header[data-header-tone]')

  await expect(header).toHaveAttribute('data-header-tone', 'dark')
  await revealHomepageHero(page)
  await expect(header).toHaveAttribute('data-header-tone', 'dark')

  await page.locator('[data-home-chapter="proof"]').scrollIntoViewIfNeeded()
  await expect(header).toHaveAttribute('data-header-tone', 'light')
})

test('homepage statistics show their final values with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/de')

  const rating = page.locator('[data-home-chapter="proof"] [aria-label="4,9 / 5"]')
  await rating.scrollIntoViewIfNeeded()
  await expect(rating).toContainText('4,9 / 5')
})

test('homepage process matches the ten prototype steps', async ({ page }) => {
  await page.goto('/de')

  const process = page.getByTestId('sales-process-carousel')
  const expectedSteps: Array<[string, string]> = [
    ['Kostenlose Immobilienbewertung', 'Online-Ersteinschätzung und Terminvereinbarung.'],
    ['Persönliche Beratung', 'Ziele, Zeitrahmen und Fragen im Erstgespräch.'],
    ['Unterlagenprüfung', 'Wir sichten und beschaffen fehlende Dokumente.'],
    ['Professionelle Objektaufnahme', 'Fotos, Video-Exposé und 360°-Rundgang.'],
    ['Marketingstrategie', 'Preisstrategie, Zielgruppen und Vermarktungsplan.'],
    ['Käuferqualifizierung', 'Solvenz- und Finanzierungsprüfung der Interessenten.'],
    ['Besichtigungen', 'Nur ernsthafte, geprüfte Käufer vor Ort.'],
    ['Verhandlung', 'Wir führen die Preisverhandlung für Sie.'],
    ['Notar', 'Vertragsvorbereitung und Notartermin.'],
    ['Übergabe', 'Schlüsselübergabe und Abschluss.'],
  ]

  await expect(process.getByRole('tab')).toHaveCount(10)

  for (const [title, summary] of expectedSteps) {
    await process.getByRole('tab', { name: new RegExp(title) }).click()
    await expect(process.locator('h3')).toHaveText(title)
    await expect(process.locator('p').filter({ hasText: summary })).toHaveCount(1)
  }

  await process.getByRole('tab', { name: /Kostenlose Immobilienbewertung/ }).click()
  await expect(process.locator('article')).toHaveCount(2)
  await expect(process.locator('article').nth(0)).toContainText(
    'Online-Preisindikation für Ihre Immobilie erstellen',
  )
  await expect(process.locator('article').nth(1)).toContainText(
    'Sie wissen, wo Ihr Verkauf sinnvoll startet',
  )
})
