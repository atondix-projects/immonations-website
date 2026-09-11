import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createElement, type ComponentType, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { NextIntlClientProvider } from 'next-intl'
import { describe, expect, it } from 'vitest'
import { AnimatedNumber } from '../../src/components/site/animated-number'
import { listAllReferences, listLocalizedReferences } from '../../src/lib/content/references'
import { getMarketOverviewCopy } from '../../src/lib/content/market-insights'
import { findEntriesByDistrictSlug } from '../../src/lib/content/price-atlas'
import { testimonialVideo } from '../../src/lib/content/testimonials'
import { SITE } from '../../src/lib/seo/site'

const ROOT = process.cwd()
const TestIntlProvider = NextIntlClientProvider as ComponentType<{
  locale: string
  messages: Record<string, never>
  children?: ReactNode
}>

describe('Andreas PDF contracts', () => {
  it('PDF-W-02 keeps the trademark certificate out of public website surfaces', () => {
    expect(existsSync(join(ROOT, 'public', 'downloads', 'Zertifikat-Marke-Immonation.pdf'))).toBe(
      false,
    )

    const publicIndex = [
      readFileSync(join(ROOT, 'public', 'llms.txt'), 'utf8'),
      readFileSync(join(ROOT, 'public', 'llms-full.txt'), 'utf8'),
    ].join('\n')
    expect(publicIndex).not.toMatch(/Zertifikat-Marke-Immonation\.pdf/i)

    const productionSources = [
      readFileSync(join(ROOT, 'src', 'app', '[locale]', 'about', 'page.tsx'), 'utf8'),
      readFileSync(join(ROOT, 'src', 'app', '[locale]', 'downloads', 'page.tsx'), 'utf8'),
      readFileSync(join(ROOT, 'src', 'components', 'site', 'trademark-certificate.tsx'), 'utf8'),
    ].join('\n')
    expect(productionSources).not.toMatch(/Zertifikat-Marke-Immonation\.pdf/i)
    expect(productionSources).not.toMatch(/downloadLabel/)
  })

  it('PDF-T-02 uses the production origin for generated absolute URLs', () => {
    expect(SITE.url).toBe('https://immonationgmbh.de')
    expect(JSON.stringify(SITE)).not.toMatch(/localhost|127\.0\.0\.1|vercel\.app/i)
  })

  it.each(['4,9/5', '300+', '12 Mio. €', '8 Team'])(
    'PDF-T-01 renders %s as the visible server value',
    (value) => {
      const html = renderToStaticMarkup(
        createElement(
          TestIntlProvider,
          { locale: 'de', messages: {} },
          createElement(AnimatedNumber, { value }),
        ),
      )
      const visibleText = html.replace(/<[^>]*>/g, '')

      expect(visibleText).toBe(value)
    },
  )

  it('PDF-Ü-01 visually separates the closing CTA from the dark global footer', () => {
    const ctaBand = readFileSync(
      join(ROOT, 'src', 'components', 'site', 'templates', 'cta-band.tsx'),
      'utf8',
    )
    const localeLayout = readFileSync(join(ROOT, 'src', 'app', '[locale]', 'layout.tsx'), 'utf8')

    expect(ctaBand).not.toContain('bg-surface-dark')
    expect(ctaBand).toContain('bg-brand-50')
    expect(localeLayout.match(/<SiteFooter\s*\/>/g)).toHaveLength(1)
  })

  it('PDF-K-01 exposes no public partner login', () => {
    const publicPartnerSurfaces = [
      readFileSync(join(ROOT, 'src', 'app', '[locale]', 'financing', 'page.tsx'), 'utf8'),
      readFileSync(join(ROOT, 'src', 'components', 'site', 'site-footer.tsx'), 'utf8'),
      readFileSync(join(ROOT, 'src', 'content', 'navigation.ts'), 'utf8'),
      JSON.stringify([
        JSON.parse(readFileSync(join(ROOT, 'messages', 'de.json'), 'utf8')) as object,
        JSON.parse(readFileSync(join(ROOT, 'messages', 'en.json'), 'utf8')) as object,
      ]),
    ].join('\n')

    expect(publicPartnerSurfaces).not.toMatch(/partner.?login|\blogin\b|sign.?in/i)
  })

  it('PDF-Ü-02 omits the disputed date from market pages', () => {
    const provenanceComponent = readFileSync(
      join(ROOT, 'src', 'components', 'site', 'data-provenance.tsx'),
      'utf8',
    )
    const marketPages = readFileSync(
      join(ROOT, 'src', 'components', 'site', 'market', 'market-pages.tsx'),
      'utf8',
    )
    const priceAtlasPage = readFileSync(
      join(ROOT, 'src', 'app', '[locale]', 'price-atlas', 'page.tsx'),
      'utf8',
    )
    expect(provenanceComponent).toContain('asOf?: string')
    expect(`${marketPages}\n${priceAtlasPage}`).not.toContain('asOf={DATA_AS_OF[locale]}')
  })

  it('PDF-Ü-03 uses the approved brokerage-data wording in both languages', () => {
    const germanMessages = readFileSync(join(ROOT, 'messages', 'de.json'), 'utf8')
    const englishMessages = readFileSync(join(ROOT, 'messages', 'en.json'), 'utf8')
    const marketInsights = readFileSync(
      join(ROOT, 'src', 'lib', 'content', 'market-insights.ts'),
      'utf8',
    )

    expect(`${germanMessages}\n${marketInsights}`).toContain(
      'basierend auf Vermittlungsdaten der Immonation',
    )
    expect(`${englishMessages}\n${marketInsights}`).toContain('based on Immonation brokerage data')
    expect(`${germanMessages}\n${marketInsights}`).not.toMatch(/einige Vermittlungsdaten/i)
  })

  it('PDF-S-02 publishes captions for every homepage testimonial video', () => {
    for (const id of [
      'viktor-emter',
      'markus-burkhard',
      'sandra-boerschlein',
      'andres-gugel',
    ] as const) {
      const captionPath = join(ROOT, 'public', 'videos', 'testimonials', `${id}.de.vtt`)
      expect(existsSync(captionPath), `${id} needs a German WebVTT track`).toBe(true)
      expect(testimonialVideo(id)?.captions).toEqual([
        {
          src: `/videos/testimonials/${id}.de.vtt`,
          srcLang: 'de',
          label: 'Deutsch',
          default: true,
        },
      ])
    }
  })

  it('PDF-S-03 places the handover Polaroids directly after the sales bell', () => {
    const homepage = readFileSync(join(ROOT, 'src', 'app', '[locale]', 'page.tsx'), 'utf8')
    const resultsIndex = homepage.indexOf('<VerifiedResults compact />')
    const polaroidsIndex = homepage.indexOf('<HandoverPolaroidWall')

    expect(resultsIndex).toBeGreaterThan(-1)
    expect(polaroidsIndex).toBeGreaterThan(resultsIndex)
    expect(homepage.slice(resultsIndex, polaroidsIndex)).not.toContain('</HomeChapter>')
    expect(homepage.match(/<HandoverPolaroidWall/g)).toHaveLength(1)
  })

  it('PDF-R-01 assigns every reference to one of four public categories', () => {
    expect(new Set(listAllReferences().map((reference) => reference.category))).toEqual(
      new Set(['apartment', 'house', 'commercial', 'investment']),
    )
    expect(new Set(listLocalizedReferences('de').map((reference) => reference.type))).toEqual(
      new Set(['Wohnung', 'Haus', 'Gewerbe', 'Investment']),
    )
    expect(new Set(listLocalizedReferences('en').map((reference) => reference.type))).toEqual(
      new Set(['Apartment', 'House', 'Commercial', 'Investment']),
    )
  })

  it('PDF-R-03 renders the reference review block from the Google-capable provider', () => {
    const feedbackReviews = readFileSync(
      join(ROOT, 'src', 'components', 'site', 'home', 'feedback-reviews.tsx'),
      'utf8',
    )

    expect(feedbackReviews).toContain('listTestimonialReviews')
    expect(feedbackReviews).toContain('ReviewSlideshow')
    expect(feedbackReviews).not.toContain('testimonialReview')
    expect(feedbackReviews).not.toContain('review.screenshot')
  })

  it('PDF-KI-01 provides an accessible interactive before-and-after control', () => {
    const comparison = readFileSync(
      join(ROOT, 'src', 'components', 'site', 'staging', 'visualization-compare.tsx'),
      'utf8',
    )

    expect(comparison).toContain("'use client'")
    expect(comparison).toContain('type="range"')
    expect(comparison).toContain('aria-label={controlLabel}')
    expect(comparison).toContain('data-visualization-compare')
  })

  it('PDF-V-01 places the verified Ogulo tour on its dedicated page', () => {
    const route = readFileSync(
      join(ROOT, 'src', 'app', '[locale]', 'virtual-tour', 'page.tsx'),
      'utf8',
    )
    const tour = readFileSync(join(ROOT, 'src', 'lib', 'content', 'virtual-tour.ts'), 'utf8')
    const overlay = readFileSync(
      join(ROOT, 'src', 'components', 'site', 'home', 'tour-overlay.tsx'),
      'utf8',
    )

    expect(route).toContain('<TourEmbed')
    expect(route).toContain("createCatalogPage('virtual-tour'")
    expect(tour).toContain("url: 'https://tour.ogulo.com/a4mC'")
    expect(overlay).toContain('allowFullScreen')
    expect(overlay).toContain("type LoadStatus = 'loading' | 'ready' | 'failed'")
    expect(overlay).toContain('labels.failedLinkLabel')
  })

  it('PDF-V-03 mounts the property slideshow directly after the decisive steps', () => {
    const sellerGuidePage = readFileSync(
      join(ROOT, 'src', 'app', '[locale]', 'sell', '[slug]', 'page.tsx'),
      'utf8',
    )

    expect(sellerGuidePage).toContain('listSellerGuideShowcaseSlides')
    expect(sellerGuidePage).toContain('<PropertyTypeSlideshow')
    expect(sellerGuidePage).toMatch(
      /data-seller-guide-process[\s\S]*?<PropertyTypeSlideshow[\s\S]*?<section className="border-border border-t/,
    )
  })

  it('PDF-W-05 publishes paired, substantive owner guides in German and English', () => {
    const pairs = [
      ['de/immobilienverkauf-vorbereiten-unterlagen.mdx', 'en/prepare-property-sale-documents.mdx'],
      ['de/angebotspreis-richtig-einordnen.mdx', 'en/understand-property-asking-price.mdx'],
    ] as const

    for (const pair of pairs) {
      for (const relativePath of pair) {
        const content = readFileSync(join(ROOT, 'content', 'blog', relativePath), 'utf8')
        const body = content.replace(/^---[\s\S]*?---/, '').trim()
        const words = body.split(/\s+/).filter(Boolean)

        expect(words.length, `${relativePath} is too thin`).toBeGreaterThanOrEqual(500)
        expect(content).not.toMatch(/lorem|placeholder|platzhalter|coming soon|folgt in kürze/i)
      }
    }
  })

  it('PDF-W-07 gives published district pages local price evidence where available', () => {
    const entries = findEntriesByDistrictSlug('nuernberg', 'st-johannis')
    const districtPage = readFileSync(
      join(ROOT, 'src', 'app', '[locale]', 'districts', '[city]', '[slug]', 'page.tsx'),
      'utf8',
    )

    expect(entries.map((entry) => entry.category)).toEqual(['apartment', 'house'])
    expect(entries.map((entry) => entry.median)).toEqual([4920, 5830])
    expect(districtPage).toContain('findEntriesByDistrictSlug')
    expect(districtPage).toContain('basierend auf Vermittlungsdaten der Immonation')
  })

  it('PDF-W-08 uses the approved source on the property-prices overview', () => {
    expect(getMarketOverviewCopy('de').source).toBe(
      'basierend auf Vermittlungsdaten der Immonation',
    )
    expect(getMarketOverviewCopy('en').source).toBe('based on Immonation brokerage data')
  })
})
