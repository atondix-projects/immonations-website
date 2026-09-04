import { describe, expect, it } from 'vitest'
import de from '../../messages/de.json'
import en from '../../messages/en.json'
import { REVIEW_PORTAL_IDS, listReviewPortalUrls } from '@/lib/content/review-portals'

describe('custom page message contract', () => {
  it.each([
    ['TestimonialsPage', de.TestimonialsPage, en.TestimonialsPage],
    ['ReviewsPage', de.ReviewsPage, en.ReviewsPage],
    ['StagingPage', de.StagingPage, en.StagingPage],
  ])('%s exists in both locales with matching top-level keys', (_name, german, english) => {
    expect(Object.keys(german).sort()).toEqual(Object.keys(english).sort())
  })

  it('provides testimonial FAQs in both locales', () => {
    expect(de.TestimonialsPage.faq.items).toHaveLength(3)
    expect(en.TestimonialsPage.faq.items).toHaveLength(3)
  })

  it('lists ten review portals and matching review-page FAQs', () => {
    expect(de.Home.reviews.portals).toHaveLength(10)
    expect(en.Home.reviews.portals).toHaveLength(10)
    expect(de.ReviewsPage.faq.items).toHaveLength(4)
    expect(en.ReviewsPage.faq.items).toHaveLength(4)
    expect(REVIEW_PORTAL_IDS).toHaveLength(10)
    expect(listReviewPortalUrls()).toHaveLength(10)
    expect(de.Home.reviews.portals.map((portal) => portal.id)).toEqual(REVIEW_PORTAL_IDS)
  })
})
