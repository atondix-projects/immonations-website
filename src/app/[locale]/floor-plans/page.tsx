import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight, Check, Ruler, X } from 'lucide-react'
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

type ScopeItem = { num: string; title: string; text: string }
type ImpactItem = { title: string; text: string }

/** Beide Pläne liegen in 2000 × 1216 vor. */
const PLAN_SIZE = { width: 2000, height: 1216 } as const

const PLAN_MEDIA = {
  accepted: '/images/engineering/floor-plan-bank-ready.jpg',
  rejected: '/images/engineering/floor-plan-not-bank-ready.jpg',
} as const

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
  const t = await getTranslations({ locale, namespace: 'FloorPlansPage' })

  return buildMetadata({
    locale,
    path: '/floor-plans',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: '/grundriss-und-wohnflaechenberechnung',
      en: '/floor-plans-and-living-area',
    },
  })
}

/**
 * Gegenüberstellung bankfähig / nicht bankfähig.
 * Die Begründung steht als Fließtext neben dem Bild — bewusst kein Slider und
 * kein Hover-Reveal, damit Crawler und Antwortmaschinen den Grund mitlesen.
 */
function PlanCard({
  variant,
  badge,
  title,
  text,
  alt,
  src,
  criteria,
  criteriaLabel,
}: {
  variant: 'accepted' | 'rejected'
  badge: string
  title: string
  text: string
  alt: string
  src: string
  criteria: string[]
  criteriaLabel: string
}) {
  const isAccepted = variant === 'accepted'
  const Mark = isAccepted ? Check : X

  return (
    <article className="border-border bg-background flex flex-col border">
      <div className="relative aspect-[2000/1216] overflow-hidden bg-neutral-100">
        <Image
          src={src}
          alt={alt}
          width={PLAN_SIZE.width}
          height={PLAN_SIZE.height}
          sizes="(min-width: 1024px) 46vw, 100vw"
          // `object-contain`: die Maßketten laufen bis an den Bildrand — ein
          // Beschnitt würde genau das entfernen, worum es auf dieser Seite geht.
          className="h-full w-full object-contain"
        />
        <span
          className={cn(
            'absolute top-0 left-0 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase',
            isAccepted ? 'bg-brand-600' : 'bg-neutral-800',
          )}
        >
          {badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="max-w-[26ch] font-serif text-2xl leading-snug font-medium text-balance md:text-[1.75rem]">
          {title}
        </h3>
        <p className="text-muted-foreground mt-4 max-w-[58ch] text-[15px] leading-[1.75] text-pretty">
          {text}
        </p>

        <div className="mt-auto pt-8">
          <h4 className="text-[11px] font-semibold tracking-[0.14em] uppercase">{criteriaLabel}</h4>
          <ul className="divide-border border-border mt-4 divide-y border-t">
            {criteria.map((item) => (
              <li key={item} className="flex items-start gap-3 py-3 text-sm leading-[1.6]">
                <Mark
                  className={cn(
                    'mt-0.5 size-4 shrink-0',
                    isAccepted ? 'text-brand-600' : 'text-neutral-400',
                  )}
                  aria-hidden="true"
                />
                <span className={isAccepted ? undefined : 'text-muted-foreground'}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default async function FloorPlansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('FloorPlansPage')
  const nav = await getTranslations('Nav')
  const scopeItems = t.raw('scope.items') as ScopeItem[]
  const impactItems = t.raw('impact.items') as ImpactItem[]
  const faqItems = t.raw('faq.items') as FaqItem[]
  const pageUrl = `${SITE.url}/${locale}${localizePath('/floor-plans', locale)}`

  return (
    <div className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('hero.title'), url: pageUrl },
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
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <p className="max-w-[88ch] text-[17px] leading-[1.75] text-pretty">{t('answer')}</p>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs">
                {t('comparison.eyebrow')}
              </p>
              <h2 className="mt-4 max-w-[16ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.2rem]">
                {t('comparison.title')}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-[62ch] text-[16px] leading-[1.75] text-pretty">
              {t('comparison.text')}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <PlanCard
              variant="accepted"
              badge={t('comparison.accepted.badge')}
              title={t('comparison.accepted.title')}
              text={t('comparison.accepted.text')}
              alt={t('comparison.accepted.alt')}
              src={PLAN_MEDIA.accepted}
              criteria={t.raw('comparison.accepted.criteria') as string[]}
              criteriaLabel={t('comparison.criteriaLabel')}
            />
            <PlanCard
              variant="rejected"
              badge={t('comparison.rejected.badge')}
              title={t('comparison.rejected.title')}
              text={t('comparison.rejected.text')}
              alt={t('comparison.rejected.alt')}
              src={PLAN_MEDIA.rejected}
              criteria={t.raw('comparison.rejected.criteria') as string[]}
              criteriaLabel={t('comparison.criteriaLabel')}
            />
          </div>

          <p className="text-muted-foreground mt-6 max-w-[80ch] text-[13px] leading-[1.7] text-pretty">
            {t('comparison.disclaimer')}
          </p>
        </div>
      </section>

      <section className="border-border bg-surface-dark border-y py-18 text-white md:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-brand-300 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs">
                {t('scope.eyebrow')}
              </p>
              <h2 className="mt-4 max-w-[16ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.2rem]">
                {t('scope.title')}
              </h2>
            </div>
            <p className="max-w-[62ch] text-[16px] leading-[1.75] text-pretty text-neutral-300">
              {t('scope.text')}
            </p>
          </div>

          <ol className="mt-12 grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {scopeItems.map((item) => (
              <li key={item.num} className="bg-surface-dark flex flex-col p-6 lg:min-h-[300px]">
                <div className="flex items-center justify-between">
                  <span className="text-brand-300 font-mono text-xs tracking-[0.16em] tabular-nums">
                    {item.num}
                  </span>
                  <Ruler className="size-5 text-neutral-600" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-10 max-w-[18ch] text-lg leading-snug font-semibold text-balance">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-pretty text-neutral-400">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs">
                {t('impact.eyebrow')}
              </p>
              <h2 className="mt-4 max-w-[16ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.2rem]">
                {t('impact.title')}
              </h2>
            </div>
            <div className="grid gap-px bg-neutral-950/10 sm:grid-cols-2">
              {impactItems.map((item) => (
                <article key={item.title} className="bg-background p-6 sm:p-7">
                  <h3 className="max-w-[24ch] text-lg leading-snug font-semibold text-balance">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-[1.7] text-pretty">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-5 sm:px-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-12">
          <div>
            <p className="text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs">
              {t('related.eyebrow')}
            </p>
            <h2 className="mt-4 max-w-[18ch] font-serif text-[2rem] leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-[2.6rem]">
              {t('related.title')}
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground max-w-[62ch] text-[16px] leading-[1.75] text-pretty">
              {t('related.text')}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/sales-process"
                className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px"
              >
                {t('related.process')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/sell"
                className="border-border inline-flex min-h-12 items-center gap-2 border px-6 py-3 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px"
              >
                {t('related.guides')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection title={t('faq.title')} items={faqItems} />

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/contact' }}
      />
    </div>
  )
}
