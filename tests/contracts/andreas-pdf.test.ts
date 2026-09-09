import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createElement, type ComponentType, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NextIntlClientProvider } from 'next-intl'
import { describe, expect, it } from 'vitest'
import { AnimatedNumber } from '../../src/components/site/animated-number'
import { SITE } from '../../src/lib/seo/site'

const ROOT = process.cwd()
const TestIntlProvider = NextIntlClientProvider as ComponentType<{
  locale: string
  messages: Record<string, never>
  children?: ReactNode
}>

describe('Andreas PDF contracts', () => {
  it('PDF-W-02 keeps the trademark certificate out of public website surfaces', () => {
    expect(existsSync(join(ROOT, 'public', 'downloads', 'Zertifikat-Marke-Immonation.pdf'))).toBe(
      false,
    )

    const publicIndex = [
      readFileSync(join(ROOT, 'public', 'llms.txt'), 'utf8'),
      readFileSync(join(ROOT, 'public', 'llms-full.txt'), 'utf8'),
    ].join('\n')
    expect(publicIndex).not.toMatch(/Zertifikat-Marke-Immonation\.pdf/i)

    const productionSources = [
      readFileSync(join(ROOT, 'src', 'app', '[locale]', 'about', 'page.tsx'), 'utf8'),
      readFileSync(join(ROOT, 'src', 'app', '[locale]', 'downloads', 'page.tsx'), 'utf8'),
      readFileSync(join(ROOT, 'src', 'components', 'site', 'trademark-certificate.tsx'), 'utf8'),
    ].join('\n')
    expect(productionSources).not.toMatch(/Zertifikat-Marke-Immonation\.pdf/i)
    expect(productionSources).not.toMatch(/downloadLabel/)
  })

  it('PDF-T-02 uses the production origin for generated absolute URLs', () => {
    expect(SITE.url).toBe('https://immonationgmbh.de')
    expect(JSON.stringify(SITE)).not.toMatch(/localhost|127\.0\.0\.1|vercel\.app/i)
  })

  it.each(['4,9/5', '300+', '12 Mio. €', '8 Team'])(
    'PDF-T-01 renders %s as the visible server value',
    (value) => {
      const html = renderToStaticMarkup(
        createElement(
          TestIntlProvider,
          { locale: 'de', messages: {} },
          createElement(AnimatedNumber, { value }),
        ),
      )
      const visibleText = html.replace(/<[^>]*>/g, '')

      expect(visibleText).toBe(value)
    },
  )
})
