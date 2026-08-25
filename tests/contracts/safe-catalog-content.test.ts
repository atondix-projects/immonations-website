import { describe, expect, it } from 'vitest'
import { getCatalogPage, type CatalogPageId } from '@/content/catalog-pages'

const scopedIds: CatalogPageId[] = [
  'warning-signs',
  'selling-situations',
  'virtual-tour',
  'video',
  'social',
  'group',
  'partners',
  'engagement',
]

describe('safe catalog content contract', () => {
  it.each(scopedIds)('%s has explicit bilingual sections and unique FAQs', (id) => {
    for (const locale of ['de', 'en'] as const) {
      const page = getCatalogPage(id, locale)
      expect(page.sectionTexts).toHaveLength(page.sectionTitles.length)
      expect(page.sectionTexts?.every((text) => text.trim().length > 30)).toBe(true)
      expect(page.faq.length).toBeGreaterThanOrEqual(3)
      expect(page.sectionTexts?.join(' ')).not.toContain('clear, documented approach')
      expect(page.sectionTexts?.join(' ')).not.toContain('klaren, dokumentierten Vorgehens')
    }
  })
})
