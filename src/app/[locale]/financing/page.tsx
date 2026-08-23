import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight, Calculator, Check, Info } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
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
type ToolItem = { name: string; text: string }

/**
 * Rechner-Hub des Finanzierungspartners. Bewusst als Link statt als Einbettung:
 * Der Hub bootet und leitet dann auf `id.drklein-plattform.de` weiter, das
 * `frame-ancestors 'self'` setzt — ein iframe bliebe für nicht angemeldete
 * Besucher leer. Die Kacheln unten tragen den Inhalt, der Link führt zum Tool.
 */
const CALCULATOR_URL = 'https://immonation-gmbh.drklein-plattform.de/tng/tools'

/** Logo liegt in 592.5 × 157.2 vor. */
const PARTNER_LOGO = { src: '/images/partners/dr-klein.svg', width: 593, height: 157 } as const

const RELATED_LINKS = [
  { key: 'properties', href: '/buy' },
  { key: 'partners', href: '/partners' },
  { key: 'valuation', href: '/property-valuation' },
  { key: 'floorPlans', href: '/floor-plans' },
] as const

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
  const t = await getTranslations({ locale, namespace: 'FinancingPage' })

  return buildMetadata({
    locale,
    path: '/financing',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/financing', 'de'),
      en: localizePath('/financing', 'en'),
    },
  })
}

const EYEBROW_LIGHT =
  'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
const EYEBROW_DARK =
  'text-brand-300 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
// `break-words hyphens-headline`: deutsche Komposita wie "Baufinanzierung" und
// "Finanzierungskonstellation" passen bei 2.35rem nicht in eine 375px-Spalte.
// `hyphens-headline` trennt nur Wörter ab 14 Zeichen, damit Ortsnamen wie
// "Nürnberg" und "Erlangen" ganz bleiben (siehe globals.css).
const SECTION_TITLE =
  'mt-4 font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words hyphens-headline md:text-[3.2rem]'
const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'

export default async function FinancingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('FinancingPage')
  const nav = await getTranslations('Nav')
  const metrics = t.raw('metrics.items') as TitledItem[]
  const partnerBenefits = t.raw('partner.card.items') as string[]
  const appraisalCards = t.raw('appraisal.cards') as TitledItem[]
  const tools = t.raw('calculator.tools') as ToolItem[]
  const faqItems = t.raw('faq.items') as FaqItem[]
  const pageUrl = `${SITE.url}/${locale}${localizePath('/financing', locale)}`

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

      {/* Band 1 — Hero */}
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} lede={t('hero.lede')} />

      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div className={cn(CONTAINER, 'flex flex-col gap-7')}>
          <p className="max-w-[88ch] text-[17px] leading-[1.75] text-pretty">{t('answer')}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/appointment"
              className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center justify-center px-7 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px"
            >
              {t('hero.primary')}
            </Link>
            <Link
              href="/buy"
              className="border-border inline-flex min-h-12 items-center justify-center border px-7 py-3 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px"
            >
              {t('hero.secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Band 2 — Kennzahlen */}
      <section className="border-border bg-surface-dark border-y py-18 text-white md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW_DARK}>{t('metrics.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[18ch]')}>{t('metrics.title')}</h2>
            </div>
            <p className="max-w-[64ch] text-[16px] leading-[1.75] text-pretty text-neutral-300">
              {t('metrics.intro')}
            </p>
          </div>

          <ul className="mt-14 grid gap-px bg-white/12 md:grid-cols-3">
            {metrics.map((item) => (
              <li key={item.title} className="bg-surface-dark flex flex-col p-6 sm:p-8">
                <h3 className="text-brand-300 max-w-[20ch] font-serif text-[1.6rem] leading-tight font-medium text-balance md:text-[1.9rem]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.7] text-pretty text-neutral-300">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Band 3 — Ansprechpartner */}
      <section className="border-border bg-muted/45 border-y py-18 md:py-24">
        <div className={CONTAINER}>
          <p className={EYEBROW_LIGHT}>{t('partner.eyebrow')}</p>
          <h2 className={cn(SECTION_TITLE, 'max-w-[16ch]')}>{t('partner.title')}</h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="flex flex-col gap-5">
              <p className="max-w-[62ch] font-serif text-xl leading-[1.5] text-pretty md:text-[1.45rem]">
                {t('partner.intro')}
              </p>
              <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
                {t('partner.advice')}
              </p>
              <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
                {t('partner.brokers')}
              </p>
            </div>

            <aside className="border-border bg-background flex flex-col border p-7 sm:p-9">
              <Image
                src={PARTNER_LOGO.src}
                alt={t('partner.logoAlt')}
                width={PARTNER_LOGO.width}
                height={PARTNER_LOGO.height}
                className="h-9 w-auto"
              />
              <h3 className="mt-8 max-w-[24ch] font-serif text-2xl leading-snug font-medium text-balance">
                {t('partner.card.title')}
              </h3>
              <ul className="divide-border border-border mt-6 divide-y border-t">
                {partnerBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-4 text-[15px] leading-[1.65]">
                    <Check
                      className="text-brand-600 mt-0.5 size-4 shrink-0"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/appointment"
                className="border-border mt-8 inline-flex min-h-11 w-fit items-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px"
              >
                {t('partner.card.cta')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Band 4 — Bank-Vorabbewertung */}
      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('appraisal.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[18ch]')}>{t('appraisal.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
              {t('appraisal.lead')}
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-neutral-950/10 md:grid-cols-2">
            {appraisalCards.map((card) => (
              <article key={card.title} className="bg-background p-6 sm:p-8">
                <h3 className="max-w-[26ch] font-serif text-[1.6rem] leading-snug font-medium text-balance md:text-[1.8rem]">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mt-4 max-w-[58ch] text-[15px] leading-[1.75] text-pretty">
                  {card.text}
                </p>
              </article>
            ))}
          </div>

          {/* Hinweisbox — die beiden Begriffe, an denen Finanzierungen scheitern. */}
          <aside className="border-brand-600 bg-muted/60 mt-8 border-l-2 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <Info
                className="text-brand-700 mt-0.5 size-5 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-[11px] font-semibold tracking-[0.14em] uppercase">
                  {t('appraisal.note.title')}
                </h3>
                <p className="mt-3 max-w-[80ch] text-[15px] leading-[1.75] text-pretty">
                  {t('appraisal.note.text')}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Band 5 — Rechner */}
      <section className="border-border bg-muted/45 border-y py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('calculator.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[16ch]')}>{t('calculator.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
              {t('calculator.lead')}
            </p>
          </div>

          {/* Die Kacheln stehen serverseitig im DOM: Sie erklären, welche Frage
              jeder Rechner beantwortet — auch ohne geladene Einbettung. */}
          <ul className="mt-12 grid gap-px bg-neutral-950/10 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.name} className="bg-background flex flex-col p-6">
                <h3 className="max-w-[22ch] text-[15px] leading-snug font-semibold text-balance">
                  {tool.name}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-[46ch] text-sm leading-[1.7] text-pretty">
                  {tool.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="border-border bg-background mt-8 flex flex-col items-start gap-5 border p-7 sm:p-10">
            <span
              className="border-brand-600 text-brand-700 flex size-14 items-center justify-center border"
              aria-hidden="true"
            >
              <Calculator className="size-6" strokeWidth={1.6} />
            </span>
            <h3 className="max-w-[26ch] font-serif text-2xl leading-snug font-medium text-balance md:text-[1.9rem]">
              {t('calculator.panel.title')}
            </h3>
            <p className="text-muted-foreground max-w-[62ch] text-[15px] leading-[1.75] text-pretty">
              {t('calculator.panel.text')}
            </p>
            <a
              href={CALCULATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px"
            >
              {t('calculator.panel.cta')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <p className="text-muted-foreground mt-5 max-w-[80ch] text-[13px] leading-[1.7] text-pretty">
            {t('calculator.disclaimer')}
          </p>
        </div>
      </section>

      {/* Interne Verlinkung */}
      <section className="py-16 md:py-20">
        <div
          className={cn(CONTAINER, 'grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16')}
        >
          <div>
            <p className={EYEBROW_LIGHT}>{t('related.eyebrow')}</p>
            <h2 className="mt-4 max-w-[18ch] font-serif text-[2rem] leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-[2.6rem]">
              {t('related.title')}
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground max-w-[62ch] text-[16px] leading-[1.75] text-pretty">
              {t('related.text')}
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {RELATED_LINKS.map((link) => (
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

      {/* Band 6 — FAQ */}
      <FaqSection title={t('faq.title')} items={faqItems} />

      {/* Band 7 — Abschluss */}
      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/appointment' }}
        secondary={{ label: t('cta.secondary'), href: '/property-valuation' }}
      />
    </div>
  )
}
