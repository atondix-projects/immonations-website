import type { Metadata } from 'next'
import {
  ArrowUpRight,
  Eye,
  LandPlot,
  ShieldCheck,
  Sofa,
  Timer,
  Trees,
  TrendingUp,
  WandSparkles,
} from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import {
  PAIR_SLUGS,
  VisualizationCompare,
  type VisualizationPair,
} from '@/components/site/staging/visualization-compare'
import {
  FILM_IDS,
  VisualizationFilms,
  type Film,
} from '@/components/site/staging/visualization-films'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { breadcrumbList, faqPage, service as serviceJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'
import { cn } from '@/lib/utils'

type TitledItem = { title: string; text: string }

const PILLAR_ICONS = [Sofa, WandSparkles, Trees, LandPlot] as const

const BENEFIT_ICONS = [Eye, TrendingUp, Timer] as const

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
  const t = await getTranslations({ locale, namespace: 'StagingPage' })

  return buildMetadata({
    locale,
    path: '/staging',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/staging', 'de'),
      en: localizePath('/staging', 'en'),
    },
  })
}

const EYEBROW_LIGHT =
  'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
const EYEBROW_DARK =
  'text-brand-300 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
// `break-words hyphens-headline`: Komposita wie „Bebauungspotenzial" passen bei
// 2.35rem sonst nicht in eine 375px-Spalte (siehe globals.css).
const SECTION_TITLE =
  'mt-4 font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words hyphens-headline md:text-[3.2rem]'
const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'

export default async function StagingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('StagingPage')
  const nav = await getTranslations('Nav')
  const videoLabels = await getTranslations('VideoDialog')

  const pillars = t.raw('pillars.items') as TitledItem[]
  const fitItems = t.raw('fit.items') as TitledItem[]
  const benefits = t.raw('benefits.items') as TitledItem[]
  const rules = t.raw('honesty.rules') as string[]
  const faqItems = t.raw('faq.items') as FaqItem[]

  const pairs: VisualizationPair[] = PAIR_SLUGS.map((slug) => ({
    slug,
    title: t(`compare.items.${slug}.title`),
    text: t(`compare.items.${slug}.text`),
    beforeAlt: t(`compare.items.${slug}.beforeAlt`),
    afterAlt: t(`compare.items.${slug}.afterAlt`),
  }))

  const films: Film[] = FILM_IDS.map((id) => ({
    id,
    title: t(`video.items.${id}.title`),
    text: t(`video.items.${id}.text`),
  }))

  const pageUrl = `${SITE.url}/${locale}${localizePath('/staging', locale)}`

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

      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div className={CONTAINER}>
          <p className="max-w-[88ch] text-[17px] leading-[1.75] text-pretty">{t('answer')}</p>
        </div>
      </section>

      {/* Vorher / Nachher — der Beleg steht vor der Erklärung */}
      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('compare.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[16ch]')}>{t('compare.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
              {t('compare.intro')}
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-10 md:gap-14">
            {pairs.map((pair, index) => (
              <VisualizationCompare
                key={pair.slug}
                pair={pair}
                index={index}
                beforeLabel={t('compare.beforeLabel')}
                afterLabel={t('compare.afterLabel')}
              />
            ))}
          </div>

          <p className="text-muted-foreground mt-10 max-w-[80ch] text-[13px] leading-[1.7] text-pretty">
            {t('compare.disclaimer')}
          </p>
        </div>
      </section>

      {/* Was wir sichtbar machen */}
      <section className="border-border bg-muted/45 border-y py-18 md:py-24">
        <div className={CONTAINER}>
          <p className={EYEBROW_LIGHT}>{t('pillars.eyebrow')}</p>
          <h2 className={cn(SECTION_TITLE, 'max-w-[20ch]')}>{t('pillars.title')}</h2>

          <div className="mt-12 grid gap-px bg-neutral-950/10 md:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index] ?? Sofa

              return (
                <article key={pillar.title} className="bg-background p-6 sm:p-8">
                  <Icon className="text-brand-600 size-5" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="mt-6 max-w-[30ch] text-lg leading-snug font-semibold text-balance">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 max-w-[58ch] text-[15px] leading-[1.7] text-pretty">
                    {pillar.text}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bewegtbild */}
      <section className="border-border bg-surface-dark border-y py-18 text-white md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW_DARK}>{t('video.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[18ch]')}>{t('video.title')}</h2>
            </div>
            <p className="max-w-[64ch] text-[16px] leading-[1.75] text-pretty text-neutral-300">
              {t('video.intro')}
            </p>
          </div>

          <div className="mt-14">
            <VisualizationFilms
              films={films}
              badge={t('video.badge')}
              fallback={t('video.fallback')}
              labels={{ play: videoLabels('play'), close: videoLabels('close') }}
            />
          </div>
        </div>
      </section>

      {/* Wann es sich lohnt */}
      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('fit.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[18ch]')}>{t('fit.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
              {t('fit.intro')}
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-neutral-950/10 md:grid-cols-2">
            {fitItems.map((item) => (
              <article
                key={item.title}
                className="bg-background border-brand-600 border-l-[3px] p-6 sm:p-8"
              >
                <h3 className="max-w-[30ch] text-lg leading-snug font-semibold text-balance">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-[58ch] text-[15px] leading-[1.7] text-pretty">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/selling-situations"
              className="border-border inline-flex min-h-11 items-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px"
            >
              {t('fit.link')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Warum das überzeugt */}
      <section className="border-border bg-muted/45 border-y py-18 md:py-24">
        <div className={CONTAINER}>
          <p className={EYEBROW_LIGHT}>{t('benefits.eyebrow')}</p>
          <h2 className={cn(SECTION_TITLE, 'max-w-[18ch]')}>{t('benefits.title')}</h2>

          <div className="mt-12 grid gap-px bg-neutral-950/10 md:grid-cols-3">
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

      {/* Unser Anspruch */}
      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('honesty.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[16ch]')}>{t('honesty.title')}</h2>
            </div>
            <div>
              <p className="max-w-[62ch] font-serif text-xl leading-[1.5] text-pretty md:text-2xl">
                {t('honesty.text')}
              </p>
              <h3 className="mt-9 text-[11px] font-semibold tracking-[0.14em] uppercase">
                {t('honesty.rulesLabel')}
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
                  { key: 'virtualTour', href: '/virtual-tour' },
                  { key: 'video', href: '/video' },
                  { key: 'floorPlans', href: '/floor-plans' },
                ] as const
              ).map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="border-border inline-flex min-h-11 items-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px"
                  >
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
