import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { DataProvenance } from '@/components/site/data-provenance'
import { JsonLd } from '@/components/site/json-ld'
import {
  RegionValuesGrid,
  type RegionLandValue,
} from '@/components/site/land-value/region-values-grid'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { CLAIM_REGISTRY, DATA_AS_OF } from '@/lib/content/provenance'
import { listSellerGuides } from '@/lib/content/seller-guides'
import { breadcrumbList, faqPage } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'
import { cn } from '@/lib/utils'

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
  const t = await getTranslations({ locale, namespace: 'LandValuePage' })

  return buildMetadata({
    locale,
    path: '/land-value',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/land-value', 'de'),
      en: localizePath('/land-value', 'en'),
    },
  })
}

const EYEBROW_LIGHT =
  'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
const SECTION_TITLE =
  'mt-4 font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words hyphens-headline md:text-[3.2rem]'
const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'

function sellerSlug(locale: Locale, translationKey: string) {
  return listSellerGuides(locale).find((guide) => guide.translationKey === translationKey)?.slug
}

export default async function LandValuePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('LandValuePage')
  const nav = await getTranslations('Nav')
  const valueRows = t.raw('values.rows') as RegionLandValue[]
  const faqItems = t.raw('faq.items') as FaqItem[]
  const pageUrl = `${SITE.url}/${locale}${localizePath('/land-value', locale)}`

  const houseSlug = sellerSlug(locale, 'sell-house')
  const landSlug = sellerSlug(locale, 'sell-land')

  const relatedLinks = [
    houseSlug
      ? {
          key: 'sellHouse' as const,
          href: { pathname: '/sell/[slug]' as const, params: { slug: houseSlug } },
        }
      : null,
    landSlug
      ? {
          key: 'sellLand' as const,
          href: { pathname: '/sell/[slug]' as const, params: { slug: landSlug } },
        }
      : null,
    { key: 'valuation' as const, href: '/property-valuation' as const },
    { key: 'faq' as const, href: '/faq' as const },
  ].filter((link): link is NonNullable<typeof link> => link !== null)

  return (
    <div className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('metadata.title'), url: pageUrl },
          ]),
          faqPage(faqItems),
        ]}
      />

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} lede={t('hero.lede')} />

      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div className={CONTAINER}>
          <p className="max-w-[88ch] text-[17px] leading-[1.75] text-pretty">{t('answer')}</p>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('values.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[18ch]')}>{t('values.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-[64ch] text-[16px] leading-[1.75] text-pretty">
              {t('values.intro')}
            </p>
          </div>

          <RegionValuesGrid className="mt-12" rows={valueRows} unit={t('values.unit')} />

          <DataProvenance
            asOf={DATA_AS_OF[locale]}
            source={CLAIM_REGISTRY['land-value:rows'].source}
            note={t('values.disclaimer')}
          />
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('method.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[16ch]')}>{t('method.title')}</h2>
            </div>
            <p className="text-muted-foreground max-w-[68ch] text-[16px] leading-[1.75] text-pretty lg:pt-10">
              {t('method.text')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={EYEBROW_LIGHT}>{t('vsPrice.eyebrow')}</p>
              <h2 className={cn(SECTION_TITLE, 'max-w-[16ch]')}>{t('vsPrice.title')}</h2>
            </div>
            <p className="max-w-[68ch] text-[16px] leading-[1.75] text-pretty lg:pt-10">
              {t('vsPrice.text')}
            </p>
          </div>
        </div>
      </section>

      <section className="border-border border-t py-16 md:py-20">
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
              {relatedLinks.map((link) => (
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
        secondary={{ label: t('cta.secondary'), href: '/contact' }}
      />
    </div>
  )
}
