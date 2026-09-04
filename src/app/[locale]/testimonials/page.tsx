import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { ReferenceProofRail } from '@/components/site/references/reference-proof-rail'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import {
  ReviewSlideshow,
  type SlideshowReview,
} from '@/components/site/testimonials/review-slideshow'
import { routing } from '@/i18n/routing'
import {
  formatReviewDate,
  GOOGLE_PROFILE,
  listTestimonialReviews,
} from '@/lib/content/google-reviews'
import { breadcrumbList, faqPage } from '@/lib/seo/jsonld'
import { listReferencesByPropertyType } from '@/lib/content/references'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: 'TestimonialsPage' })

  return buildMetadata({
    locale,
    path: '/testimonials',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/testimonials', 'de'),
      en: localizePath('/testimonials', 'en'),
    },
  })
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const language = locale === 'en' ? 'en' : 'de'
  const t = await getTranslations('TestimonialsPage')
  const referencesT = await getTranslations('ReferencesPage')
  const { reviews, live, rating, reviewCount } = await listTestimonialReviews(language)
  const faq = t.raw('faq.items') as FaqItem[]
  const publicPath = localizePath('/testimonials', language)
  const pageUrl = `${SITE.url}/${language}${publicPath}`
  const slides = reviews.map((item): SlideshowReview => ({
    id: item.id,
    author: item.author,
    quote: item.quote,
    rating: item.rating,
    source: item.source === 'google' ? t('source.google') : t('source.golocal'),
    sourceUrl: item.sourceUrl,
    authorUrl: item.authorUrl,
    authorPhotoUrl: item.authorPhotoUrl,
    isLiveGoogle: item.isLiveGoogle,
    date: item.relativePublished ?? formatReviewDate(item, language),
  }))

  return (
    <div className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: language === 'de' ? 'Start' : 'Home', url: `${SITE.url}/${language}` },
            { name: t('eyebrow'), url: pageUrl },
          ]),
          faqPage(faq),
        ]}
      />

      <section className="px-5 pt-16 pb-20 sm:px-7 md:pt-24 md:pb-28 lg:px-12">
        <div className="mx-auto w-full max-w-[1080px] text-center">
          <p className="text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs">
            {t('eyebrow')}
          </p>
          <h1 className="hyphens-headline mx-auto mt-5 max-w-[16ch] font-serif text-[2.8rem] leading-[0.98] font-medium tracking-[-0.035em] text-balance md:text-[4.25rem] lg:text-[4.6rem]">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-[54ch] text-[17px] leading-[1.75] text-pretty">
            {t('lede', {
              rating: language === 'de' ? rating.toString().replace('.', ',') : rating.toFixed(1),
              count: String(reviewCount),
            })}
          </p>

          <div className="mt-14 md:mt-18">
            <ReviewSlideshow
              reviews={slides}
              locale={language}
              showGoogleAttribution={live}
              labels={{
                carousel: t('carousel.label'),
                previous: t('carousel.previous'),
                next: t('carousel.next'),
                slide: t('carousel.slide'),
                expand: t('carousel.expand'),
                collapse: t('carousel.collapse'),
                openSource: t('carousel.openSource'),
              }}
            />
          </div>

          <a
            href={GOOGLE_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground hover:bg-foreground hover:text-background mt-14 inline-flex min-h-12 items-center justify-center gap-2 border px-8 py-3 text-sm font-semibold transition-colors"
          >
            {t('allLink')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <p className="text-muted-foreground mx-auto mt-5 max-w-[48ch] text-xs leading-relaxed text-pretty">
            {t(live ? 'attribution.live' : 'attribution.curated')}
          </p>
        </div>
      </section>

      <ReferenceProofRail
        references={listReferencesByPropertyType('house')}
        locale={language}
        eyebrow={referencesT('gallery.eyebrow')}
        title={referencesT('proof.title')}
        text={referencesT('proof.text')}
        referenceLabel={referencesT('gallery.referenceLabel')}
      />

      <FaqSection title={t('faq.title')} items={faq} />
      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.label'), href: '/property-valuation' }}
      />
    </div>
  )
}
