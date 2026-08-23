import { expect, test } from '@playwright/test'

test('desktop mega menu supports pointer and keyboard access', async ({ page }) => {
  await page.goto('/de')
  const seller = page.getByRole('button', { name: 'Ich will verkaufen' })
  await seller.hover()
  await expect(
    page.getByRole('link', { name: /Was ist meine Immobilie wert/ }).first(),
  ).toBeVisible()
  await expect(page.getByText('Kundenbereich')).toHaveCount(0)

  const knowledge = page.getByRole('button', { name: 'Preise & Wissen' })
  await knowledge.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('link', { name: /Immobilienpreise & Trends/ })).toBeVisible()
})

test('mobile drawer is complete, scrollable, dismissible and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/de')
  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  const drawer = page.locator('[data-slot="sheet-content"]')
  await expect(drawer).toBeVisible()
  await expect(
    drawer.getByRole('navigation').getByRole('heading', { name: 'Immonation' }),
  ).toBeVisible()
  await expect(drawer.getByText('Kundenbereich')).toHaveCount(0)
  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()

  await page.getByRole('button', { name: 'Menü öffnen' }).click()
  await drawer.getByRole('link', { name: /Was ist meine Immobilie wert/ }).click()
  await expect(page).toHaveURL(/\/de\/bewertung$/)
})

test('locale switching follows the translated route identity', async ({ page }) => {
  await page.goto('/de/objektart/haus')
  await page.getByRole('button', { name: 'Switch to English' }).click()
  await expect(page).toHaveURL(/\/en\/property-type\/house$/)
})

test('representative dynamic pages expose canonical and hreflang metadata', async ({ page }) => {
  await page.goto('/de/nische/trennung')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/de\/nische\/trennung$/,
  )
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    'href',
    /\/en\/selling-situation\/separation$/,
  )

  const response = await page.goto('/de/nische/unbekannt')
  expect(response?.status()).toBe(404)
})

test('preview interactions stay client-side', async ({ page }) => {
  await page.goto('/de/preisatlas')
  const submissions: string[] = []
  page.on('request', (request) => {
    if (request.method() === 'GET') return
    submissions.push(request.url())
  })
  await page.getByPlaceholder('Stadtteil eingeben').fill('St. Johannis')
  await page.getByRole('button', { name: 'Vorschau anzeigen' }).click()
  await expect(page.getByRole('status')).toContainText('Mikrolagenprüfung')
  expect(submissions).toEqual([])
})

test('header and open mega menu visual contract', async ({ page }) => {
  await page.goto('/de')
  await page.getByRole('button', { name: 'Ich will verkaufen' }).hover()
  await expect(page.locator('[data-slot="navigation-menu-content"]')).toBeVisible()
  await expect(page.locator('[data-slot="navigation-menu-content"]')).toHaveScreenshot(
    'desktop-mega-menu.png',
    { animations: 'disabled' },
  )
})

test('buyer mega menu uses the compact variation', async ({ page }) => {
  await page.goto('/de')
  await page.getByRole('button', { name: 'Ich will kaufen' }).hover()
  const menu = page.locator('[data-slot="navigation-menu-content"]')
  await expect(menu).toBeVisible()
  await expect(menu).toHaveCSS('width', '760px')
  await expect(menu).toHaveScreenshot('buyer-compact-mega-menu.png', { animations: 'disabled' })
})
