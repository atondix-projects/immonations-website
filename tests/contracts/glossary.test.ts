import { describe, expect, it } from 'vitest'
import { GLOSSARY_ENTRIES } from '@/content/glossary/entries'
import { glossaryLetter, listGlossaryEntries } from '@/lib/content/glossary'

describe('glossary content contract', () => {
  it('contains exactly 77 unique bilingual entries', () => {
    expect(GLOSSARY_ENTRIES).toHaveLength(77)
    expect(new Set(GLOSSARY_ENTRIES.map((entry) => entry.id)).size).toBe(77)
    for (const entry of GLOSSARY_ENTRIES) {
      expect(entry.de.term.trim()).not.toBe('')
      expect(entry.de.definition.trim()).not.toBe('')
      expect(entry.en.term.trim()).not.toBe('')
      expect(entry.en.definition.trim()).not.toBe('')
    }
  })

  it.each(['de', 'en'] as const)('sorts and groups entries for %s', (locale) => {
    const entries = listGlossaryEntries(locale)
    const collator = new Intl.Collator(locale, { sensitivity: 'base' })
    expect(entries).toHaveLength(77)
    entries.forEach((entry) => expect(entry.letter).toBe(glossaryLetter(entry.term)))
    for (let index = 1; index < entries.length; index += 1) {
      expect(collator.compare(entries[index - 1]!.term, entries[index]!.term)).toBeLessThanOrEqual(
        0,
      )
    }
  })
})
