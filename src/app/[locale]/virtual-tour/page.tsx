import type { Metadata } from 'next'
import { Activity, ArrowUpRight, Eye, Globe, ScanLine, ShieldCheck, Users } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { TourExample } from '@/components/site/virtual-tour/tour-example'
import { TourVoices } from '@/components/site/virtual-tour/tour-voices'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import {
  getCuratedReview,
  GOOGLE_PROFILE,
  PUBLISHED_GOOGLE_RATING,
  PUBLISHED_GOOGLE_REVIEW_COUNT,
  type DisplayReview,
} from '@/lib/content/google-reviews'
import { VIRTUAL_TOUR_REVIEW_IDS } from '@/lib/content/virtual-tour'
import { breadcrumbList, faqPage, service as serviceJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'
import { cn } from '@/lib/utils'

type TitledItem = { title: string; text: string }

const BENEFIT_ICONS = [Users, Eye, Globe, Activity] as const

export const dynamic = 'force-static'

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
  const t = await getTranslations({ locale, namespace: 'VirtualTourPage' })

  return buildMetadata({
    locale,
    path: '/virtual-tour',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/virtual-tour', 'de'),
      en: localizePath('/virtual-tour', 'en'),
    },
  })
}

const EYEBROW_LIGHT =
  'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
const SECTION_TITLE =
  'mt-4 font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words hyphens-headline md:text-[3.2rem]'
const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'
const SECONDARY_LINK =
  'border-border inline-flex min-h-11 items-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px'

export default async function VirtualTourPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('VirtualTourPage')
  const nav = await getTranslations('Nav')

  const benefits = t.raw('benefits.items') as TitledItem[]
  const steps = t.raw('process.steps') as TitledItem[]
  const rules = t.raw('privacy.rules') as string[]
  const faqItems = t.raw('faq.items') as FaqItem[]
  const reviews = VIRTUAL_TOUR_REVIEW_IDS.map((id) => getCuratedReview(id)).filter(
    (review): review is DisplayReview => Boolean(review),
  )
  const rating = new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    minimumFractionDigits: 1,
  }).format(PUBLISHED_GOOGLE_RATING)

  const pageUrl = `${SITE.url}/${locale}${localizePath('/virtual-tour', locale)}`

  return (
    <div className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('metadata.title'), url: pageUrl },
          ]),
          serviceJsonLd({
            locale,
            url: pageUrl,
            name: t('metadata.title'),
            description: t('metadata.description'),
            serviceType: t('serviceType'),
            areaServed: t('areaServed'),
          }),
          faqPage(faqItems),
        ]}
      />

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} lede={t('hero.lede')} />

      {/* Antwort + erster Einstieg: wer hier schon überzeugt ist, muss nicht bis zum Ende scrollen */}
      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div
          className={cn(CONTAINER, 'grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16')}
        >
          <p className="max-w-[82ch] text-[17px] leading-[1.75] text-pretty">{t('answer')}</p>
          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
            <Link
              href="/property-valuation"
              className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px"
            >
              {t('answerCta.primary')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="#tour-beispiel"
              className="border-brand-700 text-brand-800 hover:bg-brand-100 inline-flex min-h-12 items-center justify-center gap-2 border px-6 py-3 text-sm font-semibold transition-colors active:translate-y-px"
            >
              <ScanLine className="size-4" aria-hidden="true" />
              {t('answerCta.secondary')}
            </a>
          </div>
        </div>
      </section>

      {/* Der Beleg vor der Erklärung: echter Rundgang, echtes Ergebnis */}
      <TourExample locale={locale} />

      {/* Was sich für Eigentümer ändert */}
      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <p className={EYEBROW_LIGHT}>{t('benefits.eyebrow')}</p>
          <h2 className={cn(SECTION_TITLE, 'max-w-[18ch]')}>{t('benefits.title')}</h2>

          <div className="mt-12 grid gap-px bg-neutral-950/10 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index] ?? Eye

              return (
                <article key={benefit.title} className="bg-background p-6 sm:p-8">
                  <Icon className="text-brand-600 size-5" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="mt-6 max-w-[24ch] text-lg leading-snug font-semibold text-balance">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-pretty">
                    {benefit.text}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <TourVoices
        reviews={reviews}
        locale={locale}
        googleUrl={GOOGLE_PROFILE}
        labels={{
          eyebrow: t('voices.eyebrow'),
          title: t('voices.title'),
          intro: t('voices.intro'),
          rating: t('voices.rating', { rating, count: PUBLISHED_GOOGLE_REVIEW_COUNT }),
          fullReview: t('voices.fullReview'),
          source: t('voices.source'),
          allReviews: t('voices.allReviews'),
          stars: (value) => t('voices.stars', { rating: value }),
        }}
      />

      {/* Ablauf */}
      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('process.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[20ch]')}>{t('process.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
              {t('process.intro')}
            </p>
          </div>

          <ol className="border-border mt-12 grid gap-px border bg-neutral-950/10 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-background flex flex-col p-6 sm:p-8">
                <span className="text-brand-700 font-mono text-xs tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 max-w-[24ch] text-lg leading-snug font-semibold text-balance">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-[52ch] text-[15px] leading-[1.7] text-pretty">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Privatsphäre — die Grenzen als Zusage, nicht als Einschränkung */}
      <section className="border-border bg-muted/45 border-y py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('privacy.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[16ch]')}>{t('privacy.title')}</h2>
            </div>
            <div>
              <p className="max-w-[62ch] font-serif text-xl leading-[1.5] text-pretty md:text-2xl">
                {t('privacy.text')}
              </p>
              <h3 className="mt-9 text-[11px] font-semibold tracking-[0.14em] uppercase">
                {t('privacy.rulesLabel')}
              </h3>
              <ul className="divide-border border-border mt-4 divide-y border-y">
                {rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-4 py-4">
                    <ShieldCheck
                      className="text-brand-600 mt-0.5 size-4 shrink-0"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <p className="max-w-[70ch] text-[15px] leading-[1.7] text-pretty">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interne Verlinkung */}
      <section className="py-16 md:py-20">
        <div
          className={cn(CONTAINER, 'grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16')}
        >
          <div>
            <p className={EYEBROW_LIGHT}>{t('related.eyebrow')}</p>
            <h2 className="hyphens-headline mt-4 max-w-[18ch] font-serif text-[2rem] leading-[1.08] font-medium tracking-[-0.02em] text-balance break-words md:text-[2.6rem]">
              {t('related.title')}
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground max-w-[62ch] text-[16px] leading-[1.75] text-pretty">
              {t('related.text')}
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {(
                [
                  { key: 'valuation', href: '/property-valuation' },
                  { key: 'staging', href: '/staging' },
                  { key: 'video', href: '/video' },
                  { key: 'floorPlans', href: '/floor-plans' },
                ] as const
              ).map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className={SECONDARY_LINK}>
                    {t(`related.${link.key}`)}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection title={t('faq.title')} items={faqItems} />

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/appointment' }}
      />
    </div>
  )
}
