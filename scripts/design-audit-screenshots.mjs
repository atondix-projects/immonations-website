import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { chromium, devices } from 'playwright'

const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000'
const outDir = process.env.OUT_DIR ?? 'output/design-audit/before'

const pages = [
  { name: 'de-home', path: '/de' },
  { name: 'de-about', path: '/de/ueber-uns' },
  { name: 'de-buy', path: '/de/immobilie-kaufen' },
  { name: 'de-careers', path: '/de/karriere' },
  { name: 'de-contact', path: '/de/kontakt' },
  { name: 'de-downloads', path: '/de/downloads' },
  { name: 'de-faq', path: '/de/faq' },
  { name: 'de-imprint', path: '/de/impressum' },
  { name: 'de-privacy', path: '/de/datenschutz' },
  { name: 'de-terms', path: '/de/agb' },
  { name: 'de-property-valuation', path: '/de/immobilienbewertung' },
  { name: 'de-referrers', path: '/de/tippgeber' },
  { name: 'de-blog', path: '/de/ratgeber' },
  { name: 'de-services', path: '/de/leistungen' },
  { name: 'de-service-initial-consultation', path: '/de/leistungen/initial-consultation' },
  { name: 'en-property-valuation', path: '/en/property-valuation' },
  { name: 'en-services', path: '/en/services' },
]

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const mobile = await browser.newContext({ ...devices['iPhone 14'] })

for (const page of pages) {
  for (const [kind, context] of [
    ['desktop', desktop],
    ['mobile', mobile],
  ]) {
    const tab = await context.newPage()
    const url = `${baseUrl}${page.path}`
    await tab.goto(url, { waitUntil: 'networkidle', timeout: 120_000 })
    await tab.waitForTimeout(500)
    const file = path.join(outDir, `${page.name}-${kind}.png`)
    await tab.screenshot({ path: file, fullPage: true })
    console.log(`saved ${file}`)
    await tab.close()
  }
}

await browser.close()
