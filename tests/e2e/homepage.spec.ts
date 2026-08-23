import { expect, test } from '@playwright/test'

const HOME_CHAPTERS = [
  'hero',
  'proof',
  'difference',
  'process',
  'sales-system',
  'situations',
  'results',
  'trust',
  'market',
  'local',
  'guidance',
  'company',
  'faq',
  'next-step',
  'contact',
] as const

const CLIENT_TOPIC_ANCHORS = [
  'darum-immonation',
  'verkaufen',
  'virtuelle-besichtigung',
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

  await valuationEntry.getByRole('button', { name: 'Haus', exact: true }).click()
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
