import { describe, expect, it } from 'vitest'
import { getNavigation } from '@/content/navigation'

describe('navigation contract', () => {
  it('keeps the exact group and visible destination order', () => {
    const groups = getNavigation('de')
    expect(groups.map((group) => group.label)).toEqual([
      'Ich will verkaufen',
      'Ich will kaufen',
      'Preise & Wissen',
      'Immonation',
    ])
    expect(
      groups.map((group) =>
        group.links.filter((link) => !link.hiddenFromList).map((link) => link.id),
      ),
    ).toEqual([
      [
        'valuation',
        'sell',
        'situations',
        'price-atlas',
        'appointment',
        'house',
        'apartment',
        'land',
        'apartment-building',
        'living-area',
        'active-buyers',
        'virtual',
        'ai',
        'warning-signs',
        'referrers-sell',
      ],
      ['properties', 'financing'],
      ['market-data', 'market', 'cities', 'land-value', 'news', 'glossary', 'faq', 'downloads'],
      [
        'about',
        'magazine',
        'references',
        'sold',
        'reviews',
        'testimonials',
        'awards',
        'engagement',
        'group',
        'careers',
        'partners',
        'referrers-company',
        'contact',
      ],
    ])
  })

  it('retains highlights, footer destinations, descriptions, and duplicated referrers', () => {
    const german = getNavigation('de')
    const english = getNavigation('en')
    expect(german.map((group) => group.highlightId)).toEqual([
      'valuation',
      'properties',
      'price-atlas-knowledge',
      'references',
    ])
    expect(german.map((group) => group.footer.href)).toEqual([
      '/sell',
      '/financing',
      '/downloads',
      '/contact',
    ])
    expect(
      german.flatMap((group) => group.links).filter((link) => link.label === 'Tippgeber'),
    ).toHaveLength(2)
    expect(
      german.flatMap((group) => group.links).every((link) => link.description.length > 0),
    ).toBe(true)
    expect(
      english.flatMap((group) => group.links).every((link) => link.description.length > 0),
    ).toBe(true)
    expect(JSON.stringify(german)).not.toContain('Kundenbereich')
    expect(JSON.stringify(english)).not.toContain('Login')
  })

  it('locks the full bilingual navigation content', () => {
    expect(getNavigation('de')).toMatchSnapshot()
    expect(getNavigation('en')).toMatchSnapshot()
  })
})
