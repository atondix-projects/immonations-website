import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { SITE } from '@/lib/seo/site'
import { localBusiness } from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/site/json-ld'
import { Hero } from '@/components/site/home/hero'
import { Awards } from '@/components/site/home/awards'
import { TrustProof } from '@/components/site/home/trust-proof'
import { ServicesOverview } from '@/components/site/home/services-overview'
import { PremiumMarketing } from '@/components/site/home/premium-marketing'
import { Reviews } from '@/components/site/home/reviews'
import { CustomerStories } from '@/components/site/home/customer-stories'
import { Partners } from '@/components/site/home/partners'
import { ContactBooking } from '@/components/site/home/contact-booking'
import { ProcessTimeline, type SalesProcessStep } from '@/components/site/home/process-timeline'
import { CONTAINER, SectionHeader } from '@/components/site/home/section-shell'
import { ReferenceGallery } from '@/components/site/references/reference-gallery'
import { SoldVideoReel } from '@/components/site/sold/sold-video-reel'
import { HandoverPolaroidWall } from '@/components/site/handover/handover-polaroid-wall'
import { ValuationEntryCard } from '@/components/site/valuation/valuation-entry-card'
import { listSoldVideos } from '@/lib/content/sold-videos'
import { listHandoverPolaroids } from '@/lib/content/handover-polaroids'
import type { ReferenceItem } from '@/lib/content/references'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('Home')
  const referencesT = await getTranslations('ReferencesPage')
  const soldT = await getTranslations('SoldVideos')
  const processT = await getTranslations('SalesProcess')
  const handoverT = await getTranslations('HandoverPolaroids')
  const processSteps = processT.raw('steps') as SalesProcessStep[]
  const references = (referencesT.raw('items') as ReferenceItem[]).slice(0, 3)

  return (
    <>
      <JsonLd
        data={localBusiness({
          locale,
          name: SITE.legalName,
          address: { ...SITE.address },
        })}
      />

      <Hero mode="seller" />
      <Awards />
      <TrustProof />

      {/* Leistungsübersicht */}
      <ServicesOverview />

      {/* Referenz-Teaser */}
      <section id="referenzen" className="bg-background scroll-mt-24 py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeader
            eyebrow={t('references.eyebrow')}
            title={t('references.title')}
            link={{ label: t('references.link'), href: '/references' }}
          />
          <ReferenceGallery
            items={references}
            compact
            referenceLabel={referencesT('gallery.referenceLabel')}
          />
        </div>
      </section>

      {/* Verkauft-Clips inkl. Ortschaften */}
      <SoldVideoReel
        items={listSoldVideos()}
        eyebrow={soldT('eyebrow')}
        title={soldT('title')}
        text={soldT('text')}
        className="bg-muted border-border border-y"
      />

      <ProcessTimeline
        steps={processSteps}
        eyebrow={t('process.eyebrow')}
        title={t('process.title')}
        lede={t('process.lede')}
        link={{ label: t('process.link'), href: '/sales-process' }}
        labels={{
          previous: t('process.previous'),
          next: t('process.next'),
          tabList: t('process.tabList'),
          selectedStep: t('process.selectedStep'),
          activities: t('process.activities'),
          outcome: t('process.outcome'),
        }}
      />

      {/* Übergabe-Polaroids — die Auflösung des Fahrplans direkt darüber */}
      <HandoverPolaroidWall
        items={listHandoverPolaroids()}
        eyebrow={handoverT('eyebrow')}
        title={handoverT('title')}
        text={handoverT('text')}
        className="bg-muted border-border border-y"
      />

      <PremiumMarketing />

      {/* Google- & Trustpilot-Bewertungen */}
      <Reviews />

      <CustomerStories />

      {/* Partner- und Unternehmensgruppenlogos */}
      <Partners />

      {/* Bewertungs-CTA (dunkel) */}
      <section id="bewertung" className="bg-surface-dark scroll-mt-24 py-16 md:py-24">
        <div className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
          <div className="flex flex-col gap-5">
            <span className="text-brand-200 text-[13px] font-semibold tracking-[0.14em] uppercase">
              {t('valuation.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl leading-[1.15] font-semibold text-balance text-white md:text-[44px]">
              {t('valuation.title')}
            </h2>
            <p className="max-w-[56ch] text-[17px] leading-[1.6] text-neutral-400">
              {t('valuation.subtitle')}
            </p>
            <figure className="border-accent mt-2 flex flex-col gap-2.5 border-l-2 pl-6">
              <blockquote className="max-w-[50ch] font-serif text-xl leading-[1.45] text-neutral-100 italic md:text-[23px]">
                {t('valuation.quote')}
              </blockquote>
              <figcaption className="text-sm text-neutral-500">
                {t('valuation.quoteAuthor')}
              </figcaption>
            </figure>
          </div>
          <ValuationEntryCard />
        </div>
      </section>

      {/* Kontakt & Terminbuchung */}
      <ContactBooking />
    </>
  )
}
