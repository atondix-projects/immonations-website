import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import de from '../../messages/de.json'
import en from '../../messages/en.json'
import { HOME_TEASER_PAIR, PAIR_SLUGS } from '../../src/components/site/staging/visualization-pairs'

const ROOT = process.cwd()
const HOMEPAGE = join(ROOT, 'src', 'app', '[locale]', 'page.tsx')
const TEASER = join(ROOT, 'src', 'components', 'site', 'home', 'staging-teaser.tsx')

describe('homepage staging teaser contract', () => {
  it('mounts once inside the sales-system chapter, after the marketing system', () => {
    const homepage = readFileSync(HOMEPAGE, 'utf8')
    const chapterStart = homepage.indexOf('<HomeChapter id="sales-system">')
    const chapterEnd = homepage.indexOf('</HomeChapter>', chapterStart)
    const chapter = homepage.slice(chapterStart, chapterEnd)

    expect(chapterStart).toBeGreaterThan(-1)
    expect(homepage.match(/<StagingTeaser/g)).toHaveLength(1)
    expect(chapter).toContain('<StagingTeaser')
    expect(chapter.indexOf('<StagingTeaser')).toBeGreaterThan(chapter.indexOf('<PremiumMarketing'))
  })

  it('links to the staging page and reuses the accessible comparison slider', () => {
    expect(existsSync(TEASER)).toBe(true)
    const teaser = readFileSync(TEASER, 'utf8')

    expect(teaser).toContain('id="ki-visualisierung"')
    expect(teaser).toContain('<SectionHeader')
    expect(teaser).toContain('<VisualizationCompare')
    expect(teaser).toContain('href="/staging"')
    // The disclaimer is the page's trust claim — the teaser shows it, not a paraphrase.
    expect(teaser).toContain('compare.disclaimer')
  })

  it('shows a published pair that does not repeat the marketing-system video', () => {
    expect(PAIR_SLUGS).toContain(HOME_TEASER_PAIR)
    // PremiumMarketing already plays the Schwabach plot film in the same chapter.
    expect(HOME_TEASER_PAIR).not.toBe('plot-schwabach')

    for (const side of ['before', 'after'] as const) {
      const image = join(ROOT, 'public', 'images', 'staging', `${HOME_TEASER_PAIR}-${side}.webp`)
      expect(existsSync(image), `${HOME_TEASER_PAIR}-${side}.webp`).toBe(true)
    }
  })

  it('has matching teaser copy in both locales', () => {
    const german = (de.Home as Record<string, unknown>).staging as Record<string, string>
    const english = (en.Home as Record<string, unknown>).staging as Record<string, string>

    expect(german).toBeDefined()
    expect(english).toBeDefined()
    expect(Object.keys(german).sort()).toEqual(Object.keys(english).sort())
    // The example count comes from PAIR_SLUGS, so the CTA cannot drift from the page.
    expect(german.cta).toContain('{count}')
    expect(english.cta).toContain('{count}')
  })
})
