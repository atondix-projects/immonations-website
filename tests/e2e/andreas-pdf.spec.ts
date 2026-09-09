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

test('PDF-W-02 does not serve the former certificate URL', async ({ request }) => {
  const response = await request.get('/downloads/Zertifikat-Marke-Immonation.pdf')
  expect(response.status()).toBe(404)
})
