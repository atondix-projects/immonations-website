import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { SITE } from '@/lib/seo/site'
import { faqPage, localBusiness } from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/site/json-ld'
import { HomeHeroStory } from '@/components/site/home/home-hero-story'
import { Awards } from '@/components/site/home/awards'
import { TrustProof } from '@/components/site/home/trust-proof'
import { ServicesOverview } from '@/components/site/home/services-overview'
import { PremiumMarketing } from '@/components/site/home/premium-marketing'
import { StagingTeaser } from '@/components/site/home/staging-teaser'
import { SocialMedia } from '@/components/site/home/social-media'
import { FinancingTeaser } from '@/components/site/home/financing-teaser'
import { Reviews } from '@/components/site/home/reviews'
import { CustomerStories } from '@/components/site/home/customer-stories'
import { Partners } from '@/components/site/home/partners'
import { ContactBooking } from '@/components/site/home/contact-booking'
import { NextStepSwitcher } from '@/components/site/home/next-step-switcher'
import { ValuationCta } from '@/components/site/home/valuation-cta'
import { HomeChapter } from '@/components/site/home/home-chapter'
import { ProcessTimeline, type SalesProcessStep } from '@/components/site/home/process-timeline'
import { CONTAINER, SectionHeader } from '@/components/site/home/section-shell'
import { WhyImmonation } from '@/components/site/home/why-immonation'
import { WarningSigns } from '@/components/site/home/warning-signs'
import { ReferenceGallery } from '@/components/site/references/reference-gallery'
import { HandoverPolaroidWall } from '@/components/site/handover/handover-polaroid-wall'
import { listHandoverPolaroids } from '@/lib/content/handover-polaroids'
import type { ReferenceId } from '@/lib/content/references'
import { listLocalizedReferences } from '@/lib/content/references'
import { MagazineSection } from '@/components/site/magazine-section'
import {
  CollaborationPaths,
  CompanyOverview,
  CurrentProperties,
  DigitalAssistant,
  HomeFaq,
  MarketDataTeaser,
  OwnerKnowledge,
  PriceAtlasTeaser,
  PropertyTypePaths,
  RegionPreview,
  VerifiedResults,
} from '@/components/site/home/client-wish-sections'
import { selectFaqsForPage, toFaqSectionItems } from '@/lib/content/faqs'

const HOME_REFERENCE_IDS = [
  'deining-neubauwohnung',
  'nuernberg-einfamilienhaus',
  'fuerth-versorgungszentrum',
] as const satisfies readonly ReferenceId[]

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
  const handoverT = await getTranslations('HandoverPolaroids')
  const processSteps = t.raw('process.steps') as SalesProcessStep[]
  const referenceItems = listLocalizedReferences(locale)
  const references = HOME_REFERENCE_IDS.flatMap((id) => {
    const reference = referenceItems.find((item) => item.id === id)
    return reference ? [reference] : []
  })
  const homeFaqItems = toFaqSectionItems(
    selectFaqsForPage(locale, 'sell', {
      forceIds: ['valuation-cost-free', 'broker-cost-nuremberg', 'sale-duration', 'discreet-sale'],
      limit: 4,
    }),
  )

  return (
    <>
      <JsonLd
        data={[
          localBusiness({
            locale,
            name: SITE.legalName,
            address: { ...SITE.address },
          }),
          faqPage(homeFaqItems),
        ]}
      />

      <HomeChapter id="hero">
        <HomeHeroStory />
      </HomeChapter>

      <HomeChapter id="proof">
        <TrustProof />
      </HomeChapter>

      <HomeChapter id="difference">
        <WhyImmonation />
      </HomeChapter>

      <HomeChapter id="process">
        <ProcessTimeline
          steps={processSteps}
          showDetails
          eyebrow={t('process.eyebrow')}
          title={t('process.title')}
          lede={t('process.lede')}
          link={{ label: t('process.link'), href: '/sell' }}
          labels={{
            previous: t('process.previous'),
            next: t('process.next'),
            tabList: t('process.tabList'),
            selectedStep: t('process.selectedStep'),
            activities: t('process.activities'),
            outcome: t('process.outcome'),
          }}
        />
      </HomeChapter>

      <HomeChapter id="guidance">
        <DigitalAssistant locale={locale} compact teaser />
        <FinancingTeaser />
      </HomeChapter>

      <HomeChapter id="situations">
        <CustomerStories />
      </HomeChapter>

      <HomeChapter id="sales-system">
        <PropertyTypePaths locale={locale} compact />
        <PremiumMarketing showNetworkProof />
        <StagingTeaser />
        <SocialMedia />
        <ServicesOverview compact />
      </HomeChapter>

      <HomeChapter id="market">
        <PriceAtlasTeaser locale={locale} />
        <MarketDataTeaser compact />
      </HomeChapter>

      <HomeChapter id="results">
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
        <MagazineSection tone="muted" compact />
        <VerifiedResults compact />
        <HandoverPolaroidWall
          items={listHandoverPolaroids()}
          eyebrow={handoverT('eyebrow')}
          title={handoverT('title')}
          text={handoverT('text')}
          className="bg-muted border-border border-y"
          compact
        />
      </HomeChapter>

      <HomeChapter id="trust">
        <Reviews compact />
        <Awards compact />
        <WarningSigns />
      </HomeChapter>

      <HomeChapter id="local">
        <RegionPreview locale={locale} />
        <CurrentProperties locale={locale} compact />
      </HomeChapter>

      <HomeChapter id="company">
        <OwnerKnowledge />
        <CompanyOverview />
        <Partners compact />
        <CollaborationPaths compact />
      </HomeChapter>

      <HomeChapter id="faq">
        <HomeFaq locale={locale} />
      </HomeChapter>

      <HomeChapter id="next-step">
        <NextStepSwitcher
          labels={{
            tabList: t('nextStep.tabList'),
            valuation: t('nextStep.valuation'),
            contact: t('nextStep.contact'),
          }}
          valuation={<ValuationCta />}
          contact={<ContactBooking embedded />}
        />
      </HomeChapter>
    </>
  )
}
