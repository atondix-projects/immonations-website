import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { ReviewPortalGrid, type ReviewPortal } from '@/components/site/home/review-portals'
import { ReviewScoreboard } from '@/components/site/reviews/review-scoreboard'
import { ReviewScreenshotGallery } from '@/components/site/reviews/review-screenshots'
import { ReviewSeals } from '@/components/site/reviews/review-seals'
import { ReferenceProofRail } from '@/components/site/references/reference-proof-rail'
import { ReviewWall, type WallReview } from '@/components/site/reviews/review-wall'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { REAL_REVIEWS_POST_SLUG } from '@/lib/content/blog'
import { formatReviewDate, listTestimonialReviews } from '@/lib/content/google-reviews'
import { listReviewPortalUrls } from '@/lib/content/review-portals'
import { listOriginalReviewScreenshots } from '@/lib/content/review-screenshots'
import { listReferencesByPropertyType } from '@/lib/content/references'
import { breadcrumbList, faqPage, realEstateAgent } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

type Headline = { platform: string; rating: string; count: string; link: string }
type Stat = { value: string; label: string }
type SealCopy = { title: string; text: string; alt: string; open: string }

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
  const t = await getTranslations({ locale, namespace: 'ReviewsPage' })

  return buildMetadata({
    locale,
    path: '/reviews',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/reviews', 'de'),
      en: localizePath('/reviews', 'en'),
    },
  })
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const language = locale === 'en' ? 'en' : 'de'
  const t = await getTranslations('ReviewsPage')
  const tHome = await getTranslations('Home.reviews')
  const referencesT = await getTranslations('ReferencesPage')
  const { reviews, live, rating, reviewCount } = await listTestimonialReviews(language)
  const faq = t.raw('faq.items') as FaqItem[]
  const portals = tHome.raw('portals') as ReviewPortal[]
  const headline = tHome.raw('headline') as Headline
  const stats = tHome.raw('stats') as Stat[]
  const publicPath = localizePath('/reviews', language)
  const pageUrl = `${SITE.url}/${language}${publicPath}`
  const ratingLabel = language === 'de' ? rating.toString().replace('.', ',') : rating.toFixed(1)
  const provenexpert = portals.find((portal) => portal.id === 'provenexpert')
  const screenshots = listOriginalReviewScreenshots(language)
  const wall = reviews.map((item): WallReview => ({
    id: item.id,
    author: item.author,
    quote: item.quote,
    rating: item.rating,
    sourceId: item.source,
    sourceLabel: item.source === 'google' ? t('source.google') : t('source.golocal'),
    sourceUrl: item.sourceUrl,
    authorUrl: item.authorUrl,
    authorPhotoUrl: item.authorPhotoUrl,
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
          realEstateAgent({
            locale: language,
            url: pageUrl,
            name: SITE.legalName,
            description: t('metadata.description'),
            ratingValue: rating,
            reviewCount,
            sameAs: listReviewPortalUrls(),
          }),
          faqPage(faq),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <p className="max-w-[82ch] text-[17px] leading-[1.75] text-pretty">
            {t('answer', { rating: ratingLabel, count: String(reviewCount) })}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <ReviewScoreboard
            headline={headline}
            stats={stats}
            ratingSuffix={tHome('ratingSuffix')}
            claimTitle={t('claimTitle')}
            claimText={t('claimText')}
          />
        </div>
      </section>

      <section id="portale" className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <h2 className="hyphens-headline max-w-[18ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words md:text-[3.2rem]">
            {t('portals.title')}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-[62ch] text-[17px] leading-[1.75] text-pretty">
            {t('portals.intro')}
          </p>
          <div className="mt-10">
            <ReviewPortalGrid
              portals={portals}
              labels={{
                direct: tHome('sourceDirect'),
                aggregate: tHome('sourceAggregate'),
                openProfile: tHome('openProfile'),
              }}
            />
          </div>
          <div className="text-muted-foreground mt-4 flex flex-wrap items-start justify-between gap-x-10 gap-y-2 text-xs leading-relaxed">
            <p className="max-w-3xl text-pretty">{tHome('portalNote')}</p>
            <p className="whitespace-nowrap">{tHome('asOf')}</p>
          </div>
        </div>
      </section>

      <section id="stimmen" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <h2 className="hyphens-headline max-w-[18ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words md:text-[3.2rem]">
            {t('quotes.title')}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-[62ch] text-[17px] leading-[1.75] text-pretty">
            {t('quotes.intro')}
          </p>
          <div className="mt-10">
            <ReviewWall
              reviews={wall}
              locale={language}
              filters={[
                { id: 'all', label: t('quotes.filters.all') },
                { id: 'google', label: t('source.google') },
                { id: 'golocal', label: t('source.golocal') },
              ]}
              labels={{
                list: t('quotes.listLabel'),
                expand: t('quotes.expand'),
                collapse: t('quotes.collapse'),
                openSource: t('quotes.openSource'),
                empty: t('quotes.empty'),
              }}
            />
          </div>
          <p className="text-muted-foreground mt-8 max-w-[62ch] text-xs leading-relaxed text-pretty">
            {t(live ? 'attribution.live' : 'attribution.curated')}{' '}
            <Link
              href={{
                pathname: '/blog/[slug]',
                params: { slug: REAL_REVIEWS_POST_SLUG[language] },
              }}
              className="text-brand-700 hover:text-brand-800 font-semibold transition-colors"
            >
              {tHome('guideLink')}
            </Link>
          </p>
        </div>
      </section>

      <ReviewScreenshotGallery
        screenshots={screenshots}
        title={t('screenshots.title')}
        note={t('screenshots.note')}
      />

      <ReviewSeals
        title={t('seals.title')}
        intro={t('seals.intro')}
        note={t('seals.note')}
        maklersieger={t.raw('seals.maklersieger') as SealCopy}
        maklersiegel={t.raw('seals.maklersiegel') as SealCopy}
        provenexpert={{
          ...(t.raw('seals.provenexpert') as SealCopy),
          rating: provenexpert?.rating ?? '5,00',
          basis: provenexpert?.basis ?? '',
        }}
      />

      <ReferenceProofRail
        references={listReferencesByPropertyType('apartment')}
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
