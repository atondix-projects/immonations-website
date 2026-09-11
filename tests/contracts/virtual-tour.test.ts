import { describe, expect, it } from 'vitest'
import { getCuratedReview } from '@/lib/content/google-reviews'
import { getReference, PUBLISH_REFERENCE_METRICS } from '@/lib/content/references'
import { VIRTUAL_TOUR, VIRTUAL_TOUR_REVIEW_IDS } from '@/lib/content/virtual-tour'

describe('virtual tour page contract', () => {
  it.each(VIRTUAL_TOUR_REVIEW_IDS)('review %s exists and mentions the virtual tour', (id) => {
    const review = getCuratedReview(id)

    expect(review).toBeDefined()
    expect(review?.quote).toMatch(/virtuell/i)
  })

  it('links the tour to a published reference with approved metrics', () => {
    expect(VIRTUAL_TOUR).not.toBeNull()
    const reference = getReference(VIRTUAL_TOUR?.referenceId ?? '')

    expect(reference?.publication.state).toBe('published')
    expect(PUBLISH_REFERENCE_METRICS && reference?.publication.metricsApproved).toBe(true)
    expect(reference?.metrics?.requests).toBeTruthy()
    expect(reference?.metrics?.viewings).toBeTruthy()
    expect(reference?.metrics?.duration).toBeTruthy()
  })
})
