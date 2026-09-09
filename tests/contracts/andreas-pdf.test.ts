import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { SITE } from '../../src/lib/seo/site'

const ROOT = process.cwd()

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
})
