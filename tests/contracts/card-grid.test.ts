import { describe, expect, it } from 'vitest'
import { cardGridColumns, cardGridSpan } from '@/components/site/templates/card-grid'

const columnsOf = (classes: string) => Number(/md:grid-cols-(\d)/.exec(classes)?.[1])
const spanOf = (classes: string) => Number(/md:col-span-(\d)/.exec(classes)?.[1] ?? 1)

describe('card grid contract', () => {
  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    'fills every row with %i cards, leaving no empty grey cell',
    (count) => {
      const columns = columnsOf(cardGridColumns(count))
      const cells = Array.from({ length: count }, (_, index) =>
        spanOf(cardGridSpan(index, count)),
      ).reduce((sum, span) => sum + span, 0)

      expect(cells % columns).toBe(0)
    },
  )

  it('lays four cards out as two by two instead of three plus one', () => {
    expect(cardGridColumns(4)).toBe('md:grid-cols-2')
    expect(cardGridColumns(3)).toBe('md:grid-cols-3')
    expect(cardGridColumns(9)).toBe('md:grid-cols-3')
  })
})
