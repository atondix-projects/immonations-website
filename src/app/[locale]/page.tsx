import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { SITE } from '@/lib/seo/site'
import { localBusiness } from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/site/json-ld'
import { Hero } from '@/components/site/home/hero'
import { ValuationForm } from '@/components/site/home/valuation-form'
import { ServicesOverview } from '@/components/site/home/services-overview'
import { VirtualTour } from '@/components/site/home/virtual-tour'
import { Reviews } from '@/components/site/home/reviews'
import { FeedbackVideos } from '@/components/site/home/feedback-videos'
import { SocialVideos } from '@/components/site/home/social-videos'
import { GroupIntro } from '@/components/site/home/group-intro'
import { Partners } from '@/components/site/home/partners'
import { ContactBooking } from '@/components/site/home/contact-booking'
import { ProcessTimeline } from '@/components/site/home/process-timeline'
import { CONTAINER, SECTION_TITLE, SectionHeader } from '@/components/site/home/section-shell'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type ProcessStep = { num: string; title: string; text: string }
type ReferenceItem = {
  badge: string
  title: string
  duration: string
  result: string
  story: string
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('Home')
  const processSteps = t.raw('process.steps') as ProcessStep[]
  const references = t.raw('references.items') as ReferenceItem[]

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

      {/* Einleitung (AEO): beantwortet die implizite Frage der Seite als erstes */}
      <section className="bg-background py-16 md:py-24">
        <div className={`${CONTAINER} grid items-start gap-10 lg:grid-cols-2 lg:gap-16`}>
          <h2 className={`${SECTION_TITLE} text-balance`}>{t('intro.title')}</h2>
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground max-w-[68ch] text-[17px] leading-[1.6]">
              {t('intro.p1')}
            </p>
            <p className="text-muted-foreground max-w-[68ch] text-[17px] leading-[1.6]">
              {t('intro.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Leistungsübersicht */}
      <ServicesOverview />

      {/* USP: virtuelle Besichtigung */}
      <VirtualTour />

      {/* Prozess / Verkaufen */}
      <ProcessTimeline
        steps={processSteps}
        eyebrow={t('process.eyebrow')}
        title={t('process.title')}
        link={{ label: t('process.link'), href: '/services' }}
      />

      {/* Referenz-Teaser */}
      <section id="referenzen" className="bg-background scroll-mt-24 py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeader
            eyebrow={t('references.eyebrow')}
            title={t('references.title')}
            link={{ label: t('references.link'), href: '/services' }}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {references.map((reference) => (
              <article
                key={reference.title}
                className="border-border hover:border-foreground overflow-hidden border bg-white transition-colors"
              >
                <div className="bg-brand-100/60 relative flex h-[200px] items-center justify-center">
                  {/* Bildfläche: echtes Referenzfoto folgt */}
                  <span className="text-[13px] text-neutral-600">{t('references.photoAlt')}</span>
                  <span className="bg-surface-dark absolute top-0 left-0 px-3.5 py-[7px] text-[11px] font-semibold tracking-[0.12em] text-white uppercase">
                    {reference.badge}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 p-5 pb-6">
                  <h3 className="font-serif text-xl font-semibold">{reference.title}</h3>
                  <div className="grid grid-cols-2 gap-2 border-t border-neutral-100 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[13px] text-neutral-600">
                        {t('references.durationLabel')}
                      </span>
                      <span className="text-[17px] font-semibold">{reference.duration}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-neutral-600">
                        {t('references.resultLabel')}
                      </span>
                      <span className="text-primary text-[17px] font-semibold">
                        {reference.result}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm leading-[1.55]">
                    {reference.story}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Google- & Trustpilot-Bewertungen */}
      <Reviews />

      {/* Auszeichnung + Kundenfeedback-Video */}
      <FeedbackVideos />

      {/* Social-Media-Videos */}
      <SocialVideos />

      {/* Unternehmensgruppe */}
      <GroupIntro />

      {/* Partnerlogos */}
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
          <ValuationForm />
        </div>
      </section>

      {/* Kontakt & Terminbuchung */}
      <ContactBooking />
    </>
  )
}
