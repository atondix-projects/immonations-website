import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import de from '../../messages/de.json'
import en from '../../messages/en.json'
import { HOME_STORY_IDS, testimonialImage, testimonialVideo } from '@/lib/content/testimonials'

const LOCALES = { de, en } as const

describe('testimonial media contract', () => {
  it('keeps all homepage stories bilingual and video-enabled', () => {
    for (const [locale, messages] of Object.entries(LOCALES)) {
      const stories = new Map(messages.Testimonials.items.map((item) => [item.id, item]))
      const feedback = new Map(messages.Home.feedback.items.map((item) => [item.id, item]))

      for (const id of HOME_STORY_IDS) {
        expect(stories.get(id)?.video, `${locale}: Testimonials.items.${id}`).toBe(true)
        expect(feedback.get(id)?.available, `${locale}: Home.feedback.items.${id}`).toBe(true)
      }
    }
  })

  it('points every homepage story at committed image and video files', () => {
    for (const id of HOME_STORY_IDS) {
      const video = testimonialVideo(id)
      expect(video, `${id} video metadata`).not.toBeNull()
      expect(existsSync(join(process.cwd(), 'public', testimonialImage(id).slice(1)))).toBe(true)
      expect(video && existsSync(join(process.cwd(), 'public', video.src.slice(1)))).toBe(true)
    }
  })
})
