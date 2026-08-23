import Image from 'next/image'
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpenText,
  Bot,
  Building2,
  ChartNoAxesCombined,
  CircleHelp,
  FileCheck2,
  Handshake,
  House,
  LibraryBig,
  Map,
  MapPin,
  Newspaper,
  Ruler,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { CatalogPreview } from '@/components/site/catalog-preview'
import { FaqSection } from '@/components/site/templates/faq-section'
import { VideoDialog } from '@/components/site/video-dialog'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { toFaqSectionItems, selectFaqsForPage } from '@/lib/content/faqs'
import { listLocations } from '@/lib/content/locations'
import { PROPERTY_LISTINGS } from '@/lib/content/property-listings'
import { listSellerGuides } from '@/lib/content/seller-guides'
import { cn } from '@/lib/utils'
import { CONTAINER, EYEBROW, SECTION_LINK, SECTION_TITLE, SectionHeader } from './section-shell'

const PRESENTATION_MEDIA = {
  src: '/immonation-presentation-video.mp4',
  poster: '/videos/immonation-presentation-poster.webp',
  width: 1920,
  height: 1080,
} as const

const PROPERTY_ICONS = [House, Building2, Map, ChartNoAxesCombined] as const

export async function PropertyTypePaths({
  locale,
  compact = false,
}: {
  locale: Locale
  compact?: boolean
}) {
  const t = await getTranslations('Home.clientSections.propertyTypes')
  const guides = listSellerGuides(locale)

  return (
    <section
      id="objektarten"
      className={cn('bg-background scroll-mt-24', compact ? 'py-14 md:py-18' : 'py-16 md:py-24')}
    >
      <div className={CONTAINER}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <div>
            <p className={EYEBROW}>{t('eyebrow')}</p>
            <h3 className="mt-4 max-w-[18ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-[40px]">
              {t('title')}
            </h3>
          </div>
          <Link href="/sell" className={SECTION_LINK}>
            {t('link')}
          </Link>
        </div>
        <p className="text-muted-foreground mb-10 max-w-[66ch] text-[17px] leading-[1.7] md:mb-12">
          {t('text')}
        </p>
        <ul className="grid gap-px bg-neutral-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide, index) => {
            const Icon = PROPERTY_ICONS[index] ?? House

            return (
              <li key={guide.translationKey} className="bg-background">
                <Link
                  href={{ pathname: '/sell/[slug]', params: { slug: guide.slug } }}
                  className="group hover:bg-muted/55 flex h-full min-h-[310px] flex-col p-7 transition-colors duration-200 md:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <Icon className="text-brand-700 size-6" strokeWidth={1.6} aria-hidden="true" />
                    <span className="font-mono text-[11px] text-neutral-500 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-9 font-serif text-2xl leading-tight font-semibold text-balance">
                    {guide.eyebrow}
                  </h3>
                  <p className="text-muted-foreground mt-4 line-clamp-4 text-sm leading-[1.65]">
                    {guide.answer}
                  </p>
                  <span className="text-brand-700 mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold">
                    {t('cardLink')}
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

type VerifiedPoint = { title: string; text: string }

export async function VerifiedResults({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations('Home.clientSections.verified')
  const tVideo = await getTranslations('VideoDialog')
  const points = t.raw('points') as VerifiedPoint[]
  const pointIcons = [FileCheck2, ShieldCheck, Scale] as const
  const Heading = compact ? 'h3' : 'h2'

  return (
    <section
      id="beurkundet"
      className={cn(
        'bg-surface-dark scroll-mt-24 overflow-hidden text-white',
        compact ? 'py-14 md:py-18' : 'py-18 md:py-26',
      )}
    >
      <div
        className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-18`}
      >
        <div>
          <p className="text-brand-200 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
            {t('eyebrow')}
          </p>
          <Heading className="mt-5 max-w-[13ch] font-serif text-[2.4rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance sm:text-[3rem] md:text-[3.8rem]">
            {t('title')}
          </Heading>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.75] text-pretty text-neutral-300">
            {t('text')}
          </p>
          <div className="mt-9 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {points.map((point, index) => {
              const Icon = pointIcons[index] ?? BadgeCheck
              return (
                <div key={point.title} className="flex gap-4 border-t border-white/15 pt-5">
                  <Icon
                    className="text-brand-200 mt-0.5 size-5 shrink-0"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">{point.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border border-white/12 bg-white/[0.04] p-3 sm:p-5">
          <VideoDialog
            src={PRESENTATION_MEDIA.src}
            poster={PRESENTATION_MEDIA.poster}
            width={PRESENTATION_MEDIA.width}
            height={PRESENTATION_MEDIA.height}
            title={t('videoTitle')}
            fallback={t('videoFallback')}
            labels={{ play: tVideo('play'), close: tVideo('close') }}
            className="aspect-video w-full"
            posterSizes="(min-width: 1024px) 55vw, 100vw"
          />
          <div className="border-t border-white/10 px-2 pt-4 pb-1 sm:px-3">
            <p className="font-medium text-white">{t('videoTitle')}</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-400">{t('videoNote')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

type MarketPoint = { title: string; text: string }

export async function PriceAtlasTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home.clientSections.priceAtlas')
  const points = t.raw('points') as MarketPoint[]

  return (
    <section
      id="preisatlas"
      className="border-border bg-muted/55 scroll-mt-24 border-y py-16 md:py-24"
    >
      <div
        className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16`}
      >
        <div>
          <p className={EYEBROW}>{t('eyebrow')}</p>
          <h2 className={`${SECTION_TITLE} mt-4 max-w-[16ch] text-balance`}>{t('title')}</h2>
          <p className="text-muted-foreground mt-6 max-w-[60ch] text-[17px] leading-[1.7]">
            {t('text')}
          </p>
          <Link
            href="/price-atlas"
            className={`${SECTION_LINK} mt-7 inline-flex items-center gap-2`}
          >
            {t('link')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <dl className="mt-10 grid gap-px bg-neutral-900/10 sm:grid-cols-2">
            {points.map((point) => (
              <div key={point.title} className="bg-background p-5">
                <dt className="font-serif text-xl font-semibold">{point.title}</dt>
                <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">{point.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <CatalogPreview kind="atlas" locale={locale} embedded />
      </div>
    </section>
  )
}

export async function MarketDataTeaser({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations('Home.clientSections.marketData')
  const points = t.raw('points') as MarketPoint[]
  const icons = [FileCheck2, MapPin, ChartNoAxesCombined] as const
  const Heading = compact ? 'h3' : 'h2'

  return (
    <section
      id="marktdaten"
      className={cn(
        'bg-surface-dark scroll-mt-24 text-white',
        compact ? 'py-14 md:py-18' : 'py-18 md:py-24',
      )}
    >
      <div className={CONTAINER}>
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-brand-200 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
              {t('eyebrow')}
            </p>
            <Heading className="mt-5 max-w-[15ch] font-serif text-[2.25rem] leading-[1.05] font-medium tracking-[-0.025em] text-balance md:text-[3.35rem]">
              {t('title')}
            </Heading>
          </div>
          <div>
            <p className="max-w-[62ch] text-[17px] leading-[1.75] text-pretty text-neutral-300">
              {t('text')}
            </p>
            <Link
              href="/market-data"
              className="text-brand-200 border-brand-200/35 mt-6 inline-flex items-center gap-2 border-b pb-1 text-sm font-semibold"
            >
              {t('link')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="mt-12 grid gap-px bg-white/12 md:grid-cols-3">
          {points.map((point, index) => {
            const Icon = icons[index] ?? FileCheck2
            return (
              <article key={point.title} className="bg-surface-dark min-h-56 p-7 md:p-8">
                <Icon className="text-brand-200 size-6" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-8 font-serif text-2xl font-medium">{point.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-neutral-400">{point.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const KNOWLEDGE_LINKS = ['/blog', '/glossary', '/faq', '/downloads'] as const
const KNOWLEDGE_ICONS = [Newspaper, LibraryBig, CircleHelp, BookOpenText] as const

type LinkedCard = { title: string; text: string; link: string }

export async function OwnerKnowledge() {
  const t = await getTranslations('Home.clientSections.knowledge')
  const items = t.raw('items') as LinkedCard[]

  return (
    <section id="wissen" className="border-border bg-muted/45 scroll-mt-24 border-y py-16 md:py-24">
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          link={{ label: t('link'), href: '/blog' }}
        />
        <ul className="grid gap-px bg-neutral-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = KNOWLEDGE_ICONS[index] ?? BookOpenText
            const href = KNOWLEDGE_LINKS[index] ?? '/blog'
            return (
              <li key={item.title} className="bg-background">
                <Link
                  href={href}
                  className="group hover:bg-muted/55 flex h-full min-h-64 flex-col p-7 transition-colors"
                >
                  <Icon className="text-brand-700 size-6" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-8 font-serif text-2xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-[1.65]">{item.text}</p>
                  <span className="text-brand-700 mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
                    {item.link}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export async function RegionPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home.clientSections.regions')
  const locations = listLocations(locale)

  return (
    <section id="regionen" className="bg-background scroll-mt-24 py-16 md:py-24">
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          link={{ label: t('link'), href: '/locations' }}
        />
        <ul className="grid gap-px bg-neutral-900/10 sm:grid-cols-2 lg:grid-cols-5">
          {locations.map((location) => (
            <li key={location.slug} className="bg-background">
              <Link
                href={{ pathname: '/locations/[slug]', params: { slug: location.slug } }}
                className="group hover:bg-muted/55 flex h-full min-h-72 flex-col p-7 transition-colors"
              >
                <MapPin className="text-brand-700 size-5" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-9 font-serif text-2xl font-semibold">{location.name}</h3>
                <p className="text-muted-foreground mt-3 line-clamp-4 text-sm leading-[1.65]">
                  {location.lede}
                </p>
                <span className="text-brand-700 mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
                  {t('cardLink')}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

type PropertyCopy = { type: string; title: string }

const PROPERTY_IMAGES = [
  '/images/references/zirndorf-gartenwohnung.webp',
  '/images/references/fuerth-altbauwohnung.webp',
  '/images/references/erlangen-eigentumswohnung.webp',
] as const

export async function CurrentProperties({
  locale,
  compact = false,
}: {
  locale: Locale
  compact?: boolean
}) {
  const t = await getTranslations('Home.clientSections.properties')
  const items = t.raw('items') as PropertyCopy[]
  const listings = PROPERTY_LISTINGS.filter((listing) => listing.status === 'available').slice(0, 3)
  const priceFormatter = new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })

  return (
    <section
      id="angebote"
      className={cn(
        'border-border bg-muted/55 scroll-mt-24 border-y',
        compact ? 'py-14 md:py-18' : 'py-16 md:py-24',
      )}
    >
      <div className={CONTAINER}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <p className={EYEBROW}>{t('eyebrow')}</p>
            <h3 className="mt-4 max-w-[18ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-[40px]">
              {t('title')}
            </h3>
          </div>
          <Link href="/buy" className={SECTION_LINK}>
            {t('link')}
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {listings.map((listing, index) => {
            const copy = items[index]
            return (
              <Link
                key={listing.slug}
                href={{ pathname: '/properties/[slug]', params: { slug: listing.slug } }}
                className="group border-border hover:border-foreground bg-background overflow-hidden border transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <Image
                    src={PROPERTY_IMAGES[index] ?? PROPERTY_IMAGES[0]}
                    alt={`${copy?.title ?? listing.title}, ${listing.location}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  <span className="bg-surface-dark absolute top-0 left-0 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
                    {copy?.type ?? listing.type}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
                    <MapPin className="text-brand-700 size-4" aria-hidden="true" />
                    {listing.location}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight font-semibold">
                    {copy?.title ?? listing.title}
                  </h3>
                  <div className="text-muted-foreground mt-5 flex gap-5 text-sm">
                    <span className="flex items-center gap-2">
                      <Ruler className="text-brand-700 size-4" aria-hidden="true" />
                      {listing.livingArea}
                    </span>
                    <span>
                      {listing.rooms} {t('rooms')}
                    </span>
                  </div>
                  <div className="border-border mt-6 flex items-end justify-between gap-5 border-t pt-5">
                    <p className="text-xl font-semibold tabular-nums">
                      {priceFormatter.format(listing.price)}
                    </p>
                    <ArrowUpRight className="text-brand-700 size-4" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export async function DigitalAssistant({
  locale,
  compact = false,
}: {
  locale: Locale
  compact?: boolean
}) {
  const t = await getTranslations('Home.clientSections.assistant')
  const capabilities = t.raw('capabilities') as string[]
  const Heading = compact ? 'h3' : 'h2'

  return (
    <section
      id="immobilien-assistent"
      className={cn(
        'bg-surface-dark scroll-mt-24 text-white',
        compact ? 'py-14 md:py-18' : 'py-18 md:py-24',
      )}
    >
      <div className={CONTAINER}>
        <div className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
          <span className="border border-white/15 bg-white/[0.05] p-3.5">
            <Bot className="text-brand-200 size-7" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p className="text-brand-200 mt-7 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
            {t('eyebrow')}
          </p>
          <Heading className="mt-5 max-w-[17ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.35rem]">
            {t('title')}
          </Heading>
          <p className="mt-6 text-[17px] leading-[1.75] text-pretty text-neutral-300">
            {t('text')}
          </p>
        </div>

        <div className="mx-auto mt-11 w-full max-w-[60rem] md:mt-14">
          <CatalogPreview
            kind="assistant"
            locale={locale}
            embedded
            className="border border-white/12 bg-white/[0.04]"
          />

          <ul className="grid gap-px border-x border-b border-white/12 bg-white/12 sm:grid-cols-3">
            {capabilities.map((capability, index) => (
              <li key={capability} className="flex flex-col gap-3 bg-white/[0.04] p-6 md:p-7">
                <span className="text-brand-200/70 font-mono text-[11px] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-[1.65] text-neutral-300">{capability}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <Link
              href="/ai"
              className="text-brand-200 border-brand-200/35 hover:border-brand-200 inline-flex items-center gap-2 border-b pb-1 text-sm font-semibold transition-colors"
            >
              {t('link')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const ABOUT_LINKS = ['/about', '/group', '/engagement'] as const
const ABOUT_ICONS = [Users, Building2, Handshake] as const

export async function CompanyOverview() {
  const t = await getTranslations('Home.clientSections.about')
  const items = t.raw('items') as LinkedCard[]

  return (
    <section id="wer-wir-sind" className="bg-background scroll-mt-24 py-16 md:py-24">
      <div className={CONTAINER}>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          link={{ label: t('link'), href: '/about' }}
        />
        <p className="text-muted-foreground -mt-7 mb-10 max-w-[68ch] text-[17px] leading-[1.7] md:-mt-10 md:mb-14">
          {t('text')}
        </p>
        <div className="grid gap-px bg-neutral-900/10 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ABOUT_ICONS[index] ?? Users
            const href = ABOUT_LINKS[index] ?? '/about'
            return (
              <Link
                key={item.title}
                href={href}
                className="group hover:bg-muted/55 bg-background flex min-h-64 flex-col p-7 transition-colors md:p-8"
              >
                <Icon className="text-brand-700 size-6" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-8 font-serif text-2xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-[1.7]">{item.text}</p>
                <span className="text-brand-700 mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
                  {item.link}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const COLLABORATION_LINKS = ['/partners', '/referrers'] as const
const COLLABORATION_ICONS = [Handshake, Users] as const

export async function CollaborationPaths({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations('Home.clientSections.collaboration')
  const items = t.raw('items') as LinkedCard[]

  return (
    <section
      id="zusammenarbeiten"
      className={cn(
        'border-border bg-muted/55 scroll-mt-24 border-y',
        compact ? 'py-14 md:py-18' : 'py-16 md:py-24',
      )}
    >
      <div className={CONTAINER}>
        <p className={EYEBROW}>{t('eyebrow')}</p>
        <h3 className="mt-4 mb-10 max-w-[22ch] font-serif text-3xl leading-tight font-semibold text-balance md:mb-12 md:text-[40px]">
          {t('title')}
        </h3>
        <div className="grid gap-px bg-neutral-900/10 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = COLLABORATION_ICONS[index] ?? Handshake
            const href = COLLABORATION_LINKS[index] ?? '/partners'
            return (
              <Link
                key={item.title}
                href={href}
                className="group hover:bg-background/80 bg-background flex min-h-72 flex-col p-8 transition-colors md:p-10"
              >
                <div className="flex items-start justify-between">
                  <Icon className="text-brand-700 size-7" strokeWidth={1.6} aria-hidden="true" />
                  <ArrowUpRight
                    className="text-brand-700 size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="mt-10 max-w-[18ch] font-serif text-3xl leading-tight font-semibold">
                  {item.title}
                </h4>
                <p className="text-muted-foreground mt-4 max-w-[56ch] leading-[1.7]">{item.text}</p>
                <span className="text-brand-700 mt-auto pt-7 text-sm font-semibold">
                  {item.link}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export async function HomeFaq({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home.clientSections.faq')
  const items = toFaqSectionItems(
    selectFaqsForPage(locale, 'sell', {
      forceIds: ['valuation-cost-free', 'broker-cost-nuremberg', 'sale-duration', 'discreet-sale'],
      limit: 4,
    }),
  )

  return (
    <FaqSection
      id="faq"
      title={t('title')}
      items={items}
      className="scroll-mt-24"
      footer={
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <p className="text-muted-foreground max-w-[58ch] text-sm leading-relaxed">{t('text')}</p>
          <Link href="/faq" className={SECTION_LINK}>
            {t('link')}
          </Link>
        </div>
      }
    />
  )
}
