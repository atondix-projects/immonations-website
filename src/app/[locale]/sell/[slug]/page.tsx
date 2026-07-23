import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import {
  getSellerGuide,
  getSellerGuideAlternates,
  listAllSellerGuides,
} from '@/lib/content/seller-guides'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return listAllSellerGuides().map(({ locale, slug }) => ({ locale, slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const guide = getSellerGuide(locale, slug)
  if (!guide) notFound()

  const alternates = getSellerGuideAlternates(guide)
  const localizedPaths = Object.fromEntries(
    Object.entries(alternates).map(([alternateLocale, alternateSlug]) => [
      alternateLocale,
      localizePath('/sell/[slug]', alternateLocale as (typeof routing.locales)[number]).replace(
        '[slug]',
        alternateSlug,
      ),
    ]),
  )

  return buildMetadata({
    locale,
    path: `/sell/${slug}`,
    title: guide.title,
    description: guide.description,
    localizedPaths,
  })
}

export default async function SellerGuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const guide = getSellerGuide(locale, slug)
  if (!guide) notFound()

  const nav = await getTranslations('Nav')
  const t = await getTranslations('SellerGuidePage')
  const detailPath = localizePath('/sell/[slug]', locale).replace('[slug]', slug)
  const url = `${SITE.url}/${locale}${detailPath}`

  return (
    <article className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('hub'), url: `${SITE.url}/${locale}${localizePath('/sell', locale)}` },
            { name: guide.title, url },
          ]),
          service({
            locale,
            url,
            name: guide.title,
            description: guide.description,
            serviceType: guide.serviceType,
            areaServed: t('areaServed'),
          }),
          faqPage(guide.faq),
        ]}
      />

      <PageHero eyebrow={guide.eyebrow} title={guide.title} lede={guide.lede} />

      <section className="border-border bg-muted/45 border-y py-10">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <p className="max-w-[78ch] text-[17px] leading-[1.7] text-pretty">{guide.answer}</p>
          <Link
            href="/property-valuation"
            className="bg-primary hover:bg-primary/90 inline-flex min-h-11 items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-[background-color,scale] duration-150 active:scale-[0.96] motion-reduce:transition-none"
          >
            {t('valuationCta')}
          </Link>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <ul className="grid gap-px bg-neutral-900/10 md:grid-cols-3">
            {guide.highlights.map((highlight) => (
              <li key={highlight} className="bg-background flex min-h-28 items-start gap-3 p-6">
                <span className="bg-brand-100 text-primary mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="font-medium text-pretty">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-16 md:pb-22">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
          <div>
            <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
              {t('processEyebrow')}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-balance">
              {t('processTitle')}
            </h2>
          </div>
          <div className="divide-border divide-y border-y">
            {guide.sections.map((section, index) => (
              <section key={section.heading} className="grid gap-4 py-7 sm:grid-cols-[48px_1fr]">
                <span className="text-primary font-mono text-xs tracking-[0.14em] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-balance">
                    {section.heading}
                  </h3>
                  <p className="text-muted-foreground mt-3 leading-[1.7] text-pretty">
                    {section.body}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <FaqSection title={t('faqTitle')} items={guide.faq} />
      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/contact' }}
      />
    </article>
  )
}
