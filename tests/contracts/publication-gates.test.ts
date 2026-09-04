import { describe, expect, it } from 'vitest'
import {
  TSV_ALL_IMAGES,
  TSV_PUBLISHABLE_IMAGES,
  TSV_VIDEOS,
  type TsvImage,
} from '@/lib/content/tsv-zirndorf'
import {
  UGANDA_ALL_IMAGES,
  UGANDA_PUBLISHABLE_IMAGES,
  type UgandaImage,
} from '@/lib/content/uganda-donation'

/**
 * The `requiresRelease` flag is the kill-switch that keeps unreleased media off the site:
 * flip it on an entry and that image drops out of `*_PUBLISHABLE_IMAGES`, and therefore
 * out of the rendered gallery, with no other code change.
 *
 * TODO.md now records the Uganda and TSV releases as filed, which means the site relies on
 * this filter staying correct — and until now nothing tested it. These tests lock the
 * mechanism so a refactor cannot quietly start rendering the unfiltered list.
 */
type GatedImage = UgandaImage | TsvImage

const REGISTERS: Array<{
  name: string
  all: readonly GatedImage[]
  publishable: readonly GatedImage[]
}> = [
  { name: 'Uganda', all: UGANDA_ALL_IMAGES, publishable: UGANDA_PUBLISHABLE_IMAGES },
  { name: 'TSV Zirndorf', all: TSV_ALL_IMAGES, publishable: TSV_PUBLISHABLE_IMAGES },
]

describe('media publication gates', () => {
  it.each(REGISTERS)(
    '$name publishes exactly the unreleased-free subset',
    ({ all, publishable }) => {
      expect(all.length).toBeGreaterThan(0)
      expect(publishable).toEqual(all.filter((image) => !image.requiresRelease))
    },
  )

  it.each(REGISTERS)(
    '$name never publishes an image that requires a release',
    ({ publishable }) => {
      for (const image of publishable) {
        expect(image.requiresRelease, `${image.src} is gated but still published`).toBeFalsy()
      }
    },
  )

  it.each(REGISTERS)('$name describes every published image in both locales', ({ publishable }) => {
    for (const image of publishable) {
      for (const locale of ['de', 'en'] as const) {
        expect(image.alt[locale]?.trim(), `${image.src} lacks ${locale} alt text`).toBeTruthy()
        expect(image.caption[locale]?.trim(), `${image.src} lacks a ${locale} caption`).toBeTruthy()
      }
      expect(image.width).toBeGreaterThan(0)
      expect(image.height).toBeGreaterThan(0)
    }
  })

  it('keeps the TSV films titled and captioned in both locales', () => {
    expect(TSV_VIDEOS.length).toBe(2)

    for (const video of TSV_VIDEOS) {
      for (const locale of ['de', 'en'] as const) {
        expect(video.title[locale]?.trim(), `${video.src} lacks a ${locale} title`).toBeTruthy()
        expect(video.caption[locale]?.trim(), `${video.src} lacks a ${locale} caption`).toBeTruthy()
      }
      expect(video.duration).toBeGreaterThan(0)
    }
  })
})
