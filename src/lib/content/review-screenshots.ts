import { listReferenceReviews } from './references'
import { TESTIMONIAL_IDS, testimonialReview } from './testimonials'

export type OriginalReviewScreenshot = {
  id: string
  reviewer: string
  rating: 4 | 5
  src: string
  width: number
  height: number
  alt: string
}

/**
 * Unique original Google-review screenshots attached to customer stories and
 * sold-property references. Deduped by image path so the same capture is not
 * shown twice when a testimonial and a reference share a reviewer.
 */
export function listOriginalReviewScreenshots(locale: 'de' | 'en'): OriginalReviewScreenshot[] {
  const seen = new Set<string>()
  const items: OriginalReviewScreenshot[] = []

  for (const id of TESTIMONIAL_IDS) {
    const review = testimonialReview(id)
    if (!review || seen.has(review.screenshot.src)) continue
    seen.add(review.screenshot.src)
    items.push({
      id,
      reviewer: review.reviewer,
      rating: review.rating,
      src: review.screenshot.src,
      width: review.screenshot.width,
      height: review.screenshot.height,
      alt: review.screenshot.alt[locale],
    })
  }

  for (const entry of listReferenceReviews()) {
    if (seen.has(entry.screenshot.src)) continue
    seen.add(entry.screenshot.src)
    items.push({
      id: entry.id,
      reviewer: entry.reviewer,
      rating: entry.rating,
      src: entry.screenshot.src,
      width: entry.screenshot.width,
      height: entry.screenshot.height,
      alt: entry.screenshot.alt[locale],
    })
  }

  return items
}
