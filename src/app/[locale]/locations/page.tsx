import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CONTAINER, SectionHeader } from '@/components/site/home/section-shell'
import { JsonLd } from '@/components/site/json-ld'
import { CityCard, FeaturedCityCard } from '@/components/site/locations/city-card'
import { DistrictIndex } from '@/components/site/locations/district-index'
import { RegionOverview } from '@/components/site/locations/region-overview'
import { RegionTowns } from '@/components/site/locations/region-towns'
import { CtaBand } from '@/components/site/templates/cta-band'
import { PageHero } from '@/components/site/templates/page-hero'
import { routing } from '@/i18n/routing'
import { getLocationHub, type LocationHubCity } from '@/lib/content/location-hub'
import { breadcrumbList, itemList } from '@/lib/seo/jsonld'
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
  const hub = getLocationHub(locale)
  const cityUrl = (slug: string) =>
    `${SITE.url}/${locale}${localizePath('/locations/[slug]', locale).replace('[slug]', slug)}`

  const cardMeta = ({ references, districts }: LocationHubCity) =>
    [
      references.length > 0 ? t('card.references', { count: references.length }) : null,
      t('card.districts', { count: districts.length }),
    ]
      .filter(Boolean)
      .join(' · ')

  const stats = [
    { value: String(hub.stats.cities), label: t('stats.cities') },
    { value: String(hub.stats.districts), label: t('stats.districts') },
    { value: String(hub.stats.references), label: t('stats.references') },
    { value: String(hub.stats.towns), label: t('stats.towns') },
  ]

  const districtGroups = hub.cities
    .filter((city) => city.districts.length > 0)
    .map(({ location, districts }) => ({
      citySlug: location.slug,
      cityName: location.name,
      countLabel: t('districts.count', { count: districts.length }),
      cityLinkLabel: t('districts.cityLink', { city: location.name }),
      districts,
    }))

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            {
              name: t('title'),
              url: `${SITE.url}/${locale}${localizePath('/locations', locale)}`,
            },
          ]),
          itemList(
            hub.cities.map(({ location }) => ({
              name: location.title,
              description: location.description,
              url: cityUrl(location.slug),
            })),
          ),
        ]}
      />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <RegionOverview answer={t('answer')} stats={stats} />

      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <SectionHeader eyebrow={t('cities.eyebrow')} title={t('cities.title')} />
          <ul className="border-border bg-border grid gap-px border md:grid-cols-2">
            {hub.cities.map((city, index) => {
              const copy = {
                meta: cardMeta(city),
                link: t('link'),
                soldIn: t('card.soldIn', { city: city.location.name }),
                headquarters: t('card.headquarters'),
              }
              return (
                <li
                  key={city.location.slug}
                  className={cn('bg-background', city.isHeadquarters && 'md:col-span-2')}
                >
                  {city.isHeadquarters ? (
                    <FeaturedCityCard city={city} index={index} copy={copy} />
                  ) : (
                    <CityCard city={city} index={index} copy={copy} />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-18 md:py-24">
        <div className={CONTAINER}>
          <SectionHeader eyebrow={t('districts.eyebrow')} title={t('districts.title')} />
          <DistrictIndex groups={districtGroups} />
        </div>
      </section>

      {hub.outerReferences.length > 0 ? (
        <section className="py-18 md:py-24">
          <div className={CONTAINER}>
            <SectionHeader
              eyebrow={t('towns.eyebrow')}
              title={t('towns.title')}
              link={{ label: t('towns.link'), href: '/references' }}
            />
            <RegionTowns references={hub.outerReferences} />
          </div>
        </section>
      ) : null}

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/sell' }}
      />
    </main>
  )
}
