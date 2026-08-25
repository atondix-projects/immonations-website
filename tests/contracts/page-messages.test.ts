import { describe, expect, it } from 'vitest'
import de from '../../messages/de.json'
import en from '../../messages/en.json'

describe('custom page message contract', () => {
  it.each([
    ['TestimonialsPage', de.TestimonialsPage, en.TestimonialsPage],
    ['StagingPage', de.StagingPage, en.StagingPage],
  ])('%s exists in both locales with matching top-level keys', (_name, german, english) => {
    expect(Object.keys(german).sort()).toEqual(Object.keys(english).sort())
  })

  it('provides testimonial FAQs in both locales', () => {
    expect(de.TestimonialsPage.faq.items).toHaveLength(3)
    expect(en.TestimonialsPage.faq.items).toHaveLength(3)
  })
})
