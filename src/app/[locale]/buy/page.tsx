import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import {
  AlertCircle,
  ArrowUpRight,
  BedDouble,
  HomeIcon,
  Info,
  MapPin,
  Ruler,
  Search,
} from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, service } from '@/lib/seo/jsonld'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'
import { Hero } from '@/components/site/home/hero'
import { ReferenceProofRail } from '@/components/site/references/reference-proof-rail'
import { OnOfficeImage } from '@/components/site/properties/onoffice-image'
import { listReferencesForListing } from '@/lib/content/references'
import { createOnOfficeProvider } from '@/lib/onoffice/provider'
import type { EstateListing } from '@/lib/onoffice/types'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const CONTAINER = 'mx-auto w-full max-w-[1240px] px-6 lg:px-10'
const EYEBROW = 'text-primary text-[13px] font-semibold uppercase tracking-[0.22em]'
const SECTION_TITLE = 'font-serif text-4xl font-semibold leading-[1.05] text-balance md:text-[58px]'

function ListingFacts({ listing, roomsLabel }: { listing: EstateListing; roomsLabel: string }) {
  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] md:text-sm">
      {listing.livingArea ? (
        <span className="inline-flex items-center gap-1.5">
          <Ruler className="text-primary size-4" aria-hidden="true" />
          {listing.livingArea} m²
        </span>
      ) : null}
      {listing.rooms ? (
        <span className="inline-flex items-center gap-1.5">
          <BedDouble className="text-primary size-4" aria-hidden="true" />
          {listing.rooms} {roomsLabel}
        </span>
      ) : null}
      <span className="inline-flex items-center gap-1.5">
        <HomeIcon className="text-primary size-4" aria-hidden="true" />
        {listing.propertyType}
      </span>
    </div>
  )
}

function ListingBadge({ label }: { label: string }) {
  return (
    <span className="bg-primary absolute top-0 left-0 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white uppercase">
      {label}
    </span>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: 'Home.buy' })
  return buildMetadata({
    locale,
    path: '/buy',
    title: t('metaTitle'),
    description: t('metaDescription'),
  })
}

export default async function BuyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('Home.buy')
  const tNav = await getTranslations('Nav')
  const provider = createOnOfficeProvider()
  let providerFailed = false
  const listings = provider
    ? await provider.listEstates().catch(() => {
        providerFailed = true
        return []
      })
    : []
  const featured = listings[0]
  const secondaryListings = listings.slice(1)
  const priceLabel = locale === 'de' ? 'Kaufpreis' : 'Purchase price'
  const buyPath = localizePath('/buy', locale)
  const pageUrl = `${SITE.url}/${locale}${buyPath}`
  const listingReferences = [
    ...new Map(
      listings
        .flatMap((listing) =>
          listReferencesForListing({ location: listing.location, type: listing.propertyType }),
        )
        .map((reference) => [reference.id, reference]),
    ).values(),
  ]

  return (
    <>
      <JsonLd
        data={[
          breadcrumbList([
            { name: tNav('home'), url: `${SITE.url}/${locale}` },
            {
              name: tNav('buy'),
              url: pageUrl,
            },
          ]),
          service({
            locale,
            url: pageUrl,
            name: t('title'),
            description: t('metaDescription'),
            serviceType: locale === 'de' ? 'Immobilie kaufen' : 'Buy property',
            areaServed: 'Zirndorf, Nurnberg, Furth, Erlangen',
          }),
        ]}
      />

      <Hero mode="buyer" />

      <section className="bg-surface-dark border-y border-white/10 py-10 text-white">
        <div className={`${CONTAINER} flex flex-wrap items-center justify-between gap-5`}>
          <div className="flex items-center gap-3 text-sm text-neutral-200">
            <Info className="text-brand-300 size-4" aria-hidden="true" />
            {provider ? t('providerNotice') : t('providerNotConfigured')}
          </div>
          <span className="font-mono text-xs text-neutral-400">
            {t('liveCount', { count: listings.length })}
          </span>
        </div>
      </section>

      <section id="angebote" className="bg-background scroll-mt-24 py-16 md:py-24">
        <div className={CONTAINER}>
          <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="flex max-w-[760px] flex-col gap-4">
              <span className={EYEBROW}>{t('eyebrow')}</span>
              <h2 className={SECTION_TITLE}>{t('title')}</h2>
              <p className="text-muted-foreground max-w-[66ch] text-[17px] leading-[1.7] md:text-lg">
                {t('subtitle')}
              </p>
            </div>
            <Link
              href="/contact"
              className="border-primary text-primary hover:bg-primary inline-flex items-center justify-center gap-3 border px-7 py-4 text-[15px] font-semibold transition-colors hover:text-white"
            >
              {t('ctaSearch')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {providerFailed || !provider ? (
            <div
              data-estate-state={providerFailed ? 'error' : 'not-configured'}
              className="border-border bg-muted/45 border p-7 md:p-10"
            >
              <AlertCircle className="text-brand-700 size-6" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-3xl font-medium">{t('unavailableTitle')}</h3>
              <p className="text-muted-foreground mt-3 max-w-[64ch] leading-relaxed">
                {providerFailed ? t('providerErrorText') : t('providerNotConfiguredText')}
              </p>
            </div>
          ) : listings.length === 0 ? (
            <div data-estate-state="empty" className="border-border bg-muted/45 border p-7 md:p-10">
              <Search className="text-brand-700 size-6" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-3xl font-medium">{t('emptyTitle')}</h3>
              <p className="text-muted-foreground mt-3 max-w-[64ch] leading-relaxed">
                {t('emptyText')}
              </p>
            </div>
          ) : (
            <div data-estate-state="live" className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
              {featured ? (
                <article className="group border-border hover:border-foreground overflow-hidden border bg-white transition-colors">
                  <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-neutral-200 md:min-h-[560px]">
                    {featured.images[0] ? (
                      <OnOfficeImage
                        src={featured.images[0]}
                        alt={`${featured.title}, ${featured.location}`}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        priority
                      />
                    ) : (
                      <HomeIcon className="size-16 text-neutral-400" aria-hidden="true" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/45 via-black/10 to-transparent p-6">
                      <Link
                        href={{ pathname: '/properties/[slug]', params: { slug: featured.slug } }}
                        className="bg-surface-dark/90 inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white"
                      >
                        {t('exposeLink')}
                      </Link>
                    </div>
                    <ListingBadge label={t(`status.${featured.status}`)} />
                  </div>
                  <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-7">
                    <div>
                      <span className="text-muted-foreground inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
                        <MapPin className="text-primary size-4" aria-hidden="true" />
                        {featured.location}
                      </span>
                      <h3 className="mt-3 font-serif text-2xl leading-tight font-semibold md:text-[30px]">
                        {featured.title}
                      </h3>
                      <div className="mt-4">
                        <ListingFacts listing={featured} roomsLabel={t('rooms')} />
                      </div>
                    </div>
                    <div className="border-border pt-5 md:border-l md:pt-0 md:pl-8">
                      <span className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                        {priceLabel}
                      </span>
                      <p className="mt-2 text-3xl font-semibold tabular-nums">
                        {featured.price
                          ? new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-US', {
                              style: 'currency',
                              currency: 'EUR',
                              maximumFractionDigits: 0,
                            }).format(featured.price)
                          : t('priceOnRequest')}
                      </p>
                    </div>
                  </div>
                </article>
              ) : null}

              <div className="grid gap-6">
                {secondaryListings.map((listing) => (
                  <article
                    key={listing.title}
                    className="group border-border hover:border-foreground overflow-hidden border bg-white transition-colors"
                  >
                    <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden bg-neutral-200">
                      {listing.images[0] ? (
                        <OnOfficeImage
                          src={listing.images[0]}
                          alt={`${listing.title}, ${listing.location}`}
                          sizes="(min-width: 1024px) 38vw, 100vw"
                        />
                      ) : (
                        <HomeIcon className="size-12 text-neutral-400" aria-hidden="true" />
                      )}
                      <ListingBadge label={t(`status.${listing.status}`)} />
                    </div>
                    <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-end">
                      <div>
                        <span className="text-muted-foreground inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase">
                          <MapPin className="text-primary size-4" aria-hidden="true" />
                          {listing.location}
                        </span>
                        <h3 className="mt-3 font-serif text-2xl leading-tight font-semibold">
                          {listing.title}
                        </h3>
                        <div className="mt-4">
                          <ListingFacts listing={listing} roomsLabel={t('rooms')} />
                        </div>
                      </div>
                      <div className="border-border flex items-end justify-between gap-5 border-t pt-4 md:block md:border-t-0 md:border-l md:pt-0 md:pl-6">
                        <div>
                          <span className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                            {priceLabel}
                          </span>
                          <p className="mt-1 text-2xl font-semibold tabular-nums">
                            {listing.price
                              ? new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-US', {
                                  style: 'currency',
                                  currency: 'EUR',
                                  maximumFractionDigits: 0,
                                }).format(listing.price)
                              : t('priceOnRequest')}
                          </p>
                        </div>
                        <Link
                          href={{ pathname: '/properties/[slug]', params: { slug: listing.slug } }}
                          className="text-primary inline-flex items-center gap-2 text-sm font-semibold"
                        >
                          {t('exposeLink')}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ReferenceProofRail
        references={listingReferences}
        locale={locale}
        eyebrow={t('references.eyebrow')}
        title={t('references.title')}
        text={t('references.text')}
        referenceLabel={t('references.referenceLabel')}
      />

      <section className="border-border bg-muted/55 border-y py-16 md:py-20">
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center`}>
          <div>
            <p className={EYEBROW}>{t('financing.eyebrow')}</p>
            <h2 className="mt-4 max-w-[18ch] font-serif text-3xl leading-tight font-medium md:text-[2.8rem]">
              {t('financing.title')}
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground max-w-[62ch] text-[17px] leading-[1.75]">
              {t('financing.text')}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              {t('financing.prototypeNote')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
