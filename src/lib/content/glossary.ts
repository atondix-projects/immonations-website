import {
  GLOSSARY_ENTRIES,
  type GlossaryEntry,
  type GlossaryLocale,
} from '@/content/glossary/entries'

export const GLOSSARY_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export type LocalizedGlossaryEntry = {
  id: string
  term: string
  definition: string
  letter: string
}

export function glossaryLetter(term: string) {
  return term
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .charAt(0)
    .toUpperCase()
}

export function listGlossaryEntries(locale: GlossaryLocale): LocalizedGlossaryEntry[] {
  const collator = new Intl.Collator(locale, { sensitivity: 'base' })
  return GLOSSARY_ENTRIES.map((entry: GlossaryEntry) => ({
    id: entry.id,
    term: entry[locale].term,
    definition: entry[locale].definition,
    letter: glossaryLetter(entry[locale].term),
  })).sort((a, b) => collator.compare(a.term, b.term))
}
