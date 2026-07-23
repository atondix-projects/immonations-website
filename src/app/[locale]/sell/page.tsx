import type { Metadata } from 'next'
import { ArrowUpRight, Building2, House, Landmark, MapPinned } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { listSellerGuides } from '@/lib/content/seller-guides'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

const GUIDE_ICONS = [House, Building2, MapPinned, Landmark] as const

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
  const t = await getTranslations({ locale, namespace: 'SellerHubPage' })

  return buildMetadata({
    locale,
    path: '/sell',
    title: t('metadata.title'),
    description: t('metadata.description'),
  })
}

export default async function SellerHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('SellerHubPage')
  const nav = await getTranslations('Nav')
  const guides = listSellerGuides(locale).filter((guide) => guide.translationKey !== 'sell-land')
  const pageUrl = `${SITE.url}/${locale}${localizePath('/sell', locale)}`

  return (
    <main className="bg-background">
      <JsonLd
        data={breadcrumbList([
          { name: nav('home'), url: `${SITE.url}/${locale}` },
          { name: t('title'), url: pageUrl },
        ])}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border bg-muted/45 border-y py-10">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="max-w-[82ch] text-[17px] leading-[1.7] text-pretty">{t('answer')}</p>
          <Link
            href="/sales-process"
            className="text-primary mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
          >
            {t('processLink')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
                {t('guides.eyebrow')}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-[40px]">
                {t('guides.title')}
              </h2>
            </div>
          </div>

          <ul className="grid gap-px bg-neutral-900/10 md:grid-cols-2">
            {guides.map((guide, index) => {
              const Icon = GUIDE_ICONS[index] ?? House
              return (
                <li key={guide.slug} className="bg-background">
                  <Link
                    href={{ pathname: '/sell/[slug]', params: { slug: guide.slug } }}
                    className="group hover:bg-muted/55 flex h-full min-h-[280px] flex-col p-7 transition-[background-color] duration-150 motion-reduce:transition-none md:p-9"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="text-primary size-6" strokeWidth={1.6} aria-hidden="true" />
                      <ArrowUpRight
                        className="text-muted-foreground size-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-12 max-w-[18ch] font-serif text-2xl leading-tight font-semibold text-balance md:text-3xl">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground mt-4 max-w-[58ch] text-[15px] leading-[1.65] text-pretty">
                      {guide.lede}
                    </p>
                    <span className="text-primary mt-auto pt-8 text-sm font-semibold">
                      {t('guides.link')}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="border-border border-t py-14 md:py-18">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10">
          <h2 className="font-serif text-3xl font-semibold text-balance">{t('local.title')}</h2>
          <div>
            <p className="text-muted-foreground max-w-[64ch] leading-[1.7] text-pretty">
              {t('local.text')}
            </p>
            <Link
              href="/locations"
              className="text-primary mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
            >
              {t('local.link')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/contact' }}
      />
    </main>
  )
}
