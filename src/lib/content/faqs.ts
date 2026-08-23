import { FAQ_CATEGORY_ORDER, FAQ_ENTRIES } from '@/content/faqs/entries'
import type { Locale } from '@/i18n/routing'

export type FaqCategoryId =
  | 'broker-costs'
  | 'sales-process'
  | 'documents-financing'
  | 'valuation-price'
  | 'tax-law'
  | 'buyers'
  | 'about'

type FaqTag =
  | FaqCategoryId
  | 'sell'
  | 'sell-haus'
  | 'sell-wohnung'
  | 'sell-land'
  | 'sell-mehrfamilienhaus'
  | 'property-valuation'
  | 'buy'
  | 'locations'
  | 'contact'
  | 'referrers'
  | 'blog'
  | 'downloads'

export type FaqEntryDef = {
  id: string
  category: FaqCategoryId
  tags: FaqTag[]
  priority: number
  de: { question: string; answer: string }
  en: { question: string; answer: string }
}

export type FaqItem = {
  id: string
  category: FaqCategoryId
  question: string
  answer: string
  tags: FaqTag[]
  priority: number
}

export type PageFaqKey =
  | 'property-valuation'
  | 'sales-process'
  | 'sell'
  | 'sell/haus'
  | 'sell/wohnung'
  | 'sell/land'
  | 'sell/mehrfamilienhaus'
  | 'buy'
  | 'locations'
  | 'contact'
  | 'about'
  | 'referrers'
  | 'blog'
  | 'downloads'

export type PageFaqProfile = {
  /** Preferred tags — higher overlap scores higher. */
  tags: FaqTag[]
  /** Optional forced IDs that always appear first (in this order). */
  forceIds?: string[]
  /** Max items to return (default 5). */
  limit?: number
  /** Soft boost for entries in these categories. */
  categoryBoost?: FaqCategoryId[]
}

const PAGE_FAQ_PROFILES: Record<PageFaqKey, PageFaqProfile> = {
  'property-valuation': {
    tags: ['property-valuation', 'valuation-price', 'broker-costs'],
    forceIds: [
      'valuation-cost-free',
      'how-valuation-works',
      'online-valuation-limits',
      'valuation-duration',
      'valuation-no-obligation',
    ],
    limit: 5,
    categoryBoost: ['valuation-price', 'broker-costs'],
  },
  'sales-process': {
    tags: ['sales-process', 'documents-financing'],
    forceIds: [
      'how-sale-works',
      'docs-house-sale',
      'when-published',
      'buyer-screening',
      'after-offer',
      'after-notary',
    ],
    limit: 6,
    categoryBoost: ['sales-process'],
  },
  sell: {
    tags: ['sell', 'sales-process', 'broker-costs', 'valuation-price'],
    limit: 5,
    categoryBoost: ['sales-process', 'broker-costs'],
  },
  'sell/haus': {
    tags: ['sell-haus', 'sell', 'sales-process', 'valuation-price', 'documents-financing'],
    forceIds: ['house-worth', 'sale-duration', 'renovate-before-sale'],
    limit: 4,
    categoryBoost: ['sales-process', 'valuation-price'],
  },
  'sell/wohnung': {
    tags: ['sell-wohnung', 'sell', 'documents-financing', 'tax-law'],
    forceIds: ['docs-apartment-sale', 'sell-tenanted-apartment', 'sale-duration'],
    limit: 4,
    categoryBoost: ['documents-financing', 'tax-law'],
  },
  'sell/land': {
    tags: ['sell-land', 'valuation-price', 'sell'],
    forceIds: ['land-worth', 'standard-land-value', 'preliminary-planning-approval'],
    limit: 4,
    categoryBoost: ['valuation-price'],
  },
  'sell/mehrfamilienhaus': {
    tags: ['sell-mehrfamilienhaus', 'valuation-price', 'tax-law', 'sales-process'],
    forceIds: ['apartment-building-valuation', 'good-multiplier', 'discreet-sale'],
    limit: 4,
    categoryBoost: ['valuation-price', 'tax-law'],
  },
  buy: {
    tags: ['buyers', 'buy', 'documents-financing'],
    limit: 5,
    categoryBoost: ['buyers'],
  },
  locations: {
    tags: ['locations', 'sales-process', 'broker-costs', 'about'],
    forceIds: ['service-region', 'sale-duration', 'broker-cost-nuremberg'],
    limit: 5,
    categoryBoost: ['about', 'sales-process'],
  },
  contact: {
    tags: ['contact', 'about'],
    forceIds: ['opening-hours', 'how-to-get-there', 'service-region', 'dedicated-contact'],
    limit: 4,
    categoryBoost: ['about'],
  },
  about: {
    tags: ['about'],
    forceIds: ['why-immonation', 'what-makes-different', 'service-region', 'rentals-or-not'],
    limit: 5,
    categoryBoost: ['about'],
  },
  referrers: {
    tags: ['referrers', 'about'],
    forceIds: ['referrer-reward', 'why-immonation', 'service-region'],
    limit: 4,
    categoryBoost: ['about'],
  },
  blog: {
    tags: ['blog', 'sales-process', 'valuation-price'],
    limit: 4,
    categoryBoost: ['sales-process', 'valuation-price'],
  },
  downloads: {
    tags: ['downloads', 'documents-financing', 'sales-process'],
    forceIds: ['docs-house-sale', 'docs-apartment-sale', 'energy-certificate-required'],
    limit: 4,
    categoryBoost: ['documents-financing'],
  },
}

function localizeEntry(entry: FaqEntryDef, locale: Locale): FaqItem {
  const copy = locale === 'en' ? entry.en : entry.de
  return {
    id: entry.id,
    category: entry.category,
    question: copy.question,
    answer: copy.answer,
    tags: entry.tags,
    priority: entry.priority,
  }
}

function listAllFaqs(locale: Locale): FaqItem[] {
  return FAQ_ENTRIES.map((entry) => localizeEntry(entry, locale))
}

export function listFaqsByCategory(locale: Locale): Array<{
  category: FaqCategoryId
  items: FaqItem[]
}> {
  const all = listAllFaqs(locale)
  return FAQ_CATEGORY_ORDER.map((category) => ({
    category,
    items: all.filter((item) => item.category === category).sort((a, b) => a.priority - b.priority),
  })).filter((group) => group.items.length > 0)
}

/**
 * Score and select FAQs for a content page. Forced IDs come first (stable order),
 * then remaining items ranked by tag overlap, category boost, and priority.
 */
export function selectFaqsForPage(
  locale: Locale,
  pageKey: PageFaqKey,
  overrides?: Partial<PageFaqProfile>,
): FaqItem[] {
  const profile = { ...PAGE_FAQ_PROFILES[pageKey], ...overrides }
  const limit = profile.limit ?? 5
  const preferred = new Set(profile.tags)
  const boostCategories = new Set(profile.categoryBoost ?? [])
  const forcedIds = profile.forceIds ?? []
  const forcedSet = new Set(forcedIds)

  const all = listAllFaqs(locale)
  const byId = new Map(all.map((item) => [item.id, item]))

  const forced: FaqItem[] = []
  for (const id of forcedIds) {
    const item = byId.get(id)
    if (item) forced.push(item)
  }

  const scored = all
    .filter((item) => !forcedSet.has(item.id))
    .map((item) => {
      const tagOverlap = item.tags.reduce((score, tag) => score + (preferred.has(tag) ? 1 : 0), 0)
      const categoryBoost = boostCategories.has(item.category) ? 2 : 0
      const score = tagOverlap * 10 + categoryBoost - item.priority / 1000
      return { item, score, tagOverlap }
    })
    .filter((row) => row.tagOverlap > 0 || boostCategories.has(row.item.category))
    .sort((a, b) => b.score - a.score || a.item.priority - b.item.priority)
    .map((row) => row.item)

  const selected = [...forced]
  for (const item of scored) {
    if (selected.length >= limit) break
    selected.push(item)
  }

  return selected.slice(0, limit)
}

export function toFaqSectionItems(items: FaqItem[]): Array<{ question: string; answer: string }> {
  return items.map(({ question, answer }) => ({ question, answer }))
}

export { FAQ_CATEGORY_ORDER }
