import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  CURATED_REVIEW_COUNT,
  listTestimonialReviews,
  mergeReviews,
  type DisplayReview,
} from '@/lib/content/google-reviews'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

function item(
  overrides: Partial<DisplayReview> & Pick<DisplayReview, 'id' | 'author' | 'quote'>,
): DisplayReview {
  return {
    rating: 5,
    source: 'google',
    sourceUrl: 'https://www.google.com/maps?cid=3199252424447906498',
    publishedOn: '2026-07-01',
    datePrecision: 'day',
    ...overrides,
  }
}

describe('google review merge', () => {
  it('keeps a substantial curated library for the slideshow fallback', () => {
    expect(CURATED_REVIEW_COUNT).toBeGreaterThanOrEqual(18)
  })

  it('prefers live Google reviews and drops curated duplicates', () => {
    const live = item({
      id: 'live-1',
      author: 'Ella Stoss',
      quote:
        'Wir haben mit Immonation unser Haus in Fischbach innerhalb kürzester Zeit verkauft. Der Service war von Beginn an erstklassig.',
      publishedOn: '2026-07-10',
    })
    const curated = item({
      id: 'ella-stoss',
      author: 'Ella Stoss',
      quote:
        'Wir haben mit Immonation unser Haus in Fischbach innerhalb kürzester Zeit verkauft. Der Service war von Beginn an erstklassig, wir wurden zu jeder Zeit informiert.',
      publishedOn: '2026-07-08',
    })

    const merged = mergeReviews([live], [curated])
    expect(merged).toHaveLength(1)
    expect(merged[0]?.id).toBe('live-1')
  })

  it('ignores quotes that are too short to stand as a testimonial', () => {
    const merged = mergeReviews(
      [
        item({
          id: 'short',
          author: 'Test',
          quote: 'Super.',
        }),
      ],
      [],
    )
    expect(merged).toHaveLength(0)
  })

  it('sorts newest reviews first', () => {
    const merged = mergeReviews(
      [],
      [
        item({
          id: 'older',
          author: 'Older',
          quote: 'Eine ausführliche ältere Bewertung über den Verkaufsprozess und die Betreuung.',
          publishedOn: '2024-01-01',
        }),
        item({
          id: 'newer',
          author: 'Newer',
          quote: 'Eine ausführliche neuere Bewertung über den Verkaufsprozess und die Betreuung.',
          publishedOn: '2026-01-01',
        }),
      ],
    )

    expect(merged.map((entry) => entry.id)).toEqual(['newer', 'older'])
  })

  it('fetches current Google reviews from the existing review feed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            status: 'success',
            result: {
              data: [
                {
                  id: 'feed-1',
                  supplier: 'google',
                  rating: 5,
                  published_at: 1_776_316_800,
                  text: 'Eine ausführliche aktuelle Bewertung über den Verkauf und die Betreuung.',
                  url: 'https://maps.google.com/review/1',
                  reviewer_name: 'Live Reviewer',
                  reviewer_picture_url: 'https://lh3.googleusercontent.com/avatar',
                },
              ],
            },
          }),
        ),
      ),
    )

    const result = await listTestimonialReviews()
    const liveReview = result.reviews.find((review) => review.isLiveGoogle)

    expect(result.live).toBe(true)
    expect(liveReview).toMatchObject({
      sourceUrl: 'https://maps.google.com/review/1',
      authorPhotoUrl: 'https://lh3.googleusercontent.com/avatar',
      author: 'Live Reviewer',
    })
    expect(fetch).toHaveBeenCalledWith(
      expect.objectContaining({ host: 'service-reviews-ultimate.elfsight.com' }),
      expect.objectContaining({ next: { revalidate: 10_800 } }),
    )
    const requestedUrl = vi.mocked(fetch).mock.calls[0]?.[0]
    expect(String(requestedUrl)).toContain('page_length=100')
    expect(String(requestedUrl)).not.toContain('places.googleapis.com')
  })
})
