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

  it('preserves Google Maps review and author attribution for live reviews', async () => {
    vi.stubEnv('GOOGLE_PLACES_API_KEY', 'test-key')
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            rating: 4.9,
            userRatingCount: 227,
            googleMapsUri: 'https://maps.google.com/place',
            reviews: [
              {
                rating: 5,
                publishTime: '2026-08-20T12:00:00Z',
                relativePublishTimeDescription: 'a week ago',
                originalText: {
                  text: 'Eine ausführliche aktuelle Bewertung über den Verkauf und die Betreuung.',
                },
                googleMapsUri: 'https://maps.google.com/review/1',
                authorAttribution: {
                  displayName: 'Live Reviewer',
                  uri: 'https://maps.google.com/contributor/1',
                  photoUri: 'https://lh3.googleusercontent.com/avatar',
                },
              },
            ],
          }),
        ),
      ),
    )

    const result = await listTestimonialReviews()
    const liveReview = result.reviews.find((review) => review.isLiveGoogle)

    expect(result.live).toBe(true)
    expect(result.reviewCount).toBe(227)
    expect(liveReview).toMatchObject({
      sourceUrl: 'https://maps.google.com/review/1',
      authorUrl: 'https://maps.google.com/contributor/1',
      authorPhotoUrl: 'https://lh3.googleusercontent.com/avatar',
      relativePublished: 'a week ago',
    })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({ cache: 'no-store' }),
    )
    const requestedUrl = vi.mocked(fetch).mock.calls[0]?.[0]
    expect(String(requestedUrl)).toContain('languageCode=de')
  })
})
