import type { Metadata } from 'next'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { listLocations } from '@/lib/content/locations'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

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
  const t = await getTranslations({ locale, namespace: 'LocationsPage' })
  return buildMetadata({
    locale,
    path: '/locations',
    title: t('metadata.title'),
    description: t('metadata.description'),
  })
}

export default async function LocationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('LocationsPage')
  const nav = await getTranslations('Nav')
  const locations = listLocations(locale)

  return (
    <main className="bg-background">
      <JsonLd
        data={breadcrumbList([
          { name: nav('home'), url: `${SITE.url}/${locale}` },
          {
            name: t('title'),
            url: `${SITE.url}/${locale}${localizePath('/locations', locale)}`,
          },
        ])}
      />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border bg-muted/45 border-y py-10">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="max-w-[82ch] text-[17px] leading-[1.7] text-pretty">{t('answer')}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <ul className="grid gap-px bg-neutral-900/10 md:grid-cols-2">
            {locations.map((location) => (
              <li key={location.slug} className="bg-background">
                <Link
                  href={{ pathname: '/locations/[slug]', params: { slug: location.slug } }}
                  className="group hover:bg-muted/55 flex h-full min-h-[260px] flex-col p-7 transition-[background-color] duration-150 motion-reduce:transition-none md:p-9"
                >
                  <div className="flex items-center justify-between">
                    <MapPin className="text-primary size-6" strokeWidth={1.6} aria-hidden="true" />
                    <ArrowUpRight
                      className="text-muted-foreground size-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="mt-10 font-serif text-3xl font-semibold text-balance">
                    {location.name}
                  </h2>
                  <p className="text-muted-foreground mt-4 max-w-[58ch] leading-[1.65] text-pretty">
                    {location.lede}
                  </p>
                  <span className="text-primary mt-auto pt-7 text-sm font-semibold">
                    {t('link')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/sell' }}
      />
    </main>
  )
}
