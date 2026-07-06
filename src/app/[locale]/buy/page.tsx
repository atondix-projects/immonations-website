import type { Metadata } from 'next'
import Image from 'next/image'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ArrowUpRight, BedDouble, Car, HomeIcon, MapPin, Ruler } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, service } from '@/lib/seo/jsonld'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'
import { Hero } from '@/components/site/home/hero'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type ListingItem = {
  isNew: boolean
  title: string
  location: string
  area: string
  rooms: string
  extra: string
  price: string
}

const CONTAINER = 'mx-auto w-full max-w-[1240px] px-6 lg:px-10'
const EYEBROW = 'text-primary text-[13px] font-semibold uppercase tracking-[0.22em]'
const SECTION_TITLE = 'font-serif text-4xl font-semibold leading-[1.05] text-balance md:text-[58px]'

const listingVisuals = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=82',
    alt: 'Modern single-family home with illuminated garden',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=82',
    alt: 'Bright apartment with open living area',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=82',
    alt: 'Renovated residential house with garage and garden',
  },
] as const

function listingVisual(index: number) {
  return listingVisuals[index] ?? listingVisuals[0]
}

function ListingFacts({ listing }: { listing: ListingItem }) {
  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] md:text-sm">
      <span className="inline-flex items-center gap-1.5">
        <Ruler className="text-primary size-4" aria-hidden="true" />
        {listing.area}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <BedDouble className="text-primary size-4" aria-hidden="true" />
        {listing.rooms}
      </span>
      <span className="inline-flex items-center gap-1.5">
        {listing.extra.toLowerCase().includes('garage') ? (
          <Car className="text-primary size-4" aria-hidden="true" />
        ) : (
          <HomeIcon className="text-primary size-4" aria-hidden="true" />
        )}
        {listing.extra}
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
  const listings = t.raw('items') as ListingItem[]
  const featured = listings[0]
  const secondaryListings = listings.slice(1)
  const priceLabel = locale === 'de' ? 'Kaufpreis' : 'Purchase price'
  const buyPath = localizePath('/buy', locale)
  const pageUrl = `${SITE.url}/${locale}${buyPath}`

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

          <div className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
            {featured ? (
              <article className="group border-border hover:border-foreground overflow-hidden border bg-white transition-colors">
                <div className="relative min-h-[360px] overflow-hidden md:min-h-[560px]">
                  <Image
                    src={listingVisual(0).src}
                    alt={listingVisual(0).alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/45 via-black/10 to-transparent p-6">
                    <Link
                      href="/contact"
                      className="bg-surface-dark/90 hover:bg-surface-dark inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white transition-colors"
                    >
                      {t('exposeLink')}
                    </Link>
                  </div>
                  {featured.isNew ? <ListingBadge label={t('newBadge')} /> : null}
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
                      <ListingFacts listing={featured} />
                    </div>
                  </div>
                  <div className="border-border pt-5 md:border-l md:pt-0 md:pl-8">
                    <span className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                      {priceLabel}
                    </span>
                    <p className="mt-2 text-3xl font-semibold tabular-nums">{featured.price}</p>
                  </div>
                </div>
              </article>
            ) : null}

            <div className="grid gap-6">
              {secondaryListings.map((listing, index) => (
                <article
                  key={listing.title}
                  className="group border-border hover:border-foreground overflow-hidden border bg-white transition-colors"
                >
                  <div className="relative min-h-[230px] overflow-hidden">
                    <Image
                      src={listingVisual(index + 1).src}
                      alt={listingVisual(index + 1).alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                    {listing.isNew ? <ListingBadge label={t('newBadge')} /> : null}
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
                        <ListingFacts listing={listing} />
                      </div>
                    </div>
                    <div className="border-border flex items-end justify-between gap-5 border-t pt-4 md:block md:border-t-0 md:border-l md:pt-0 md:pl-6">
                      <div>
                        <span className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                          {priceLabel}
                        </span>
                        <p className="mt-1 text-2xl font-semibold tabular-nums">{listing.price}</p>
                      </div>
                      <Link
                        href="/contact"
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
        </div>
      </section>
    </>
  )
}
