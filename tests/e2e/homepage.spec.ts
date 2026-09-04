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

for (const locale of ['de', 'en'] as const) {
  test(`${locale} homepage follows the 15-chapter conversion journey`, async ({ page }) => {
    await page.goto(`/${locale}`)

    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('[data-home-chapter="hero"] form:visible')).toBeVisible()
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
  const hero = page.locator('[data-home-chapter="hero"]')
  const valuationEntry = hero.locator('form:visible')

  const houseOption = valuationEntry.getByRole('radio', { name: 'Haus', exact: true })
  await valuationEntry.getByText('Haus', { exact: true }).click()
  await expect(houseOption).toBeChecked()
  await valuationEntry.getByRole('button', { name: /Weiter/ }).click()

  await expect(page).toHaveURL(/\/de\/bewertung\?type=house$/)
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
