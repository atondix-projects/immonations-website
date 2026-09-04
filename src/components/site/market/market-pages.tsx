import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import {
  APARTMENT_MARKET,
  formatCurrency,
  formatPercent,
  formatThousands,
  getApartmentSummary,
  getHousingComparison,
  getMarketDataCopy,
  getMarketOverviewCopy,
  MARKET_CITIES,
  NUREMBERG_DISTRICT_TRANSACTIONS,
  type MarketCard,
} from '@/lib/content/market-insights'
import { DATA_AS_OF } from '@/lib/content/provenance'
import { DataProvenance } from '../data-provenance'
import { CtaBand } from '../templates/cta-band'
import { FaqSection } from '../templates/faq-section'
import { PageHero } from '../templates/page-hero'

const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'
const COMPACT_CONTAINER = 'mx-auto w-full max-w-[1240px] px-6 lg:px-10'
const EYEBROW = 'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
const CARD = 'border-border bg-background border p-7 md:p-8'
const BAR_WIDTHS = ['w-full', 'w-[88%]', 'w-[76%]', 'w-[64%]', 'w-[52%]', 'w-[40%]']

function LocalizedCard({ card, locale }: { card: MarketCard; locale: Locale }) {
  return (
    <article className={CARD}>
      <span className="text-brand-700 border-brand-200 bg-brand-50 inline-flex border px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
        {card.tag[locale]}
      </span>
      <h3 className="mt-4 font-serif text-2xl leading-tight font-medium tracking-[-0.02em] text-balance">
        {card.title[locale]}
      </h3>
      <p className="text-muted-foreground mt-3 text-[15px] leading-[1.75] text-pretty">
        {card.text[locale]}
      </p>
    </article>
  )
}

export function MarketOverviewPage({ locale }: { locale: Locale }) {
  const copy = getMarketOverviewCopy(locale)
  const labels = copy.labels

  return (
    <main className="bg-background">
      <PageHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} lede={copy.hero.lede} />

      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div className={CONTAINER}>
          <p className="max-w-[86ch] text-[17px] leading-[1.75] text-pretty">{copy.answer}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={EYEBROW}>{labels.citySectionEyebrow}</p>
              <h2 className="mt-4 max-w-[20ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.2rem]">
                {labels.citySectionTitle}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-[52ch] text-[15px] leading-[1.7] text-pretty md:text-right">
              {labels.citySectionText}
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-neutral-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {MARKET_CITIES.map((city, index) => (
              <Link
                key={city.id}
                href={{ pathname: '/locations/[slug]', params: { slug: city.id } }}
                className={cn(
                  'group bg-background hover:bg-brand-50 flex min-h-64 flex-col p-6 transition-colors md:p-7',
                  index === MARKET_CITIES.length - 1 &&
                    'sm:col-span-2 sm:min-h-0 lg:col-span-1 lg:min-h-64',
                )}
              >
                <span className="text-brand-700 text-xs font-semibold tracking-[0.16em] uppercase">
                  {city.name[locale]}
                </span>
                <div className="mt-7 space-y-4">
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase">
                      {labels.apartment}
                    </span>
                    <strong className="mt-1 block font-serif text-[1.75rem] leading-none font-medium tracking-[-0.035em]">
                      {formatThousands(city.apartmentPrice, locale)}{' '}
                      <span className="font-sans text-sm tracking-normal">€/m²</span>
                    </strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase">
                      {labels.house}
                    </span>
                    <strong className="mt-1 block font-serif text-[1.75rem] leading-none font-medium tracking-[-0.035em]">
                      {formatThousands(city.housePrice, locale)}{' '}
                      <span className="font-sans text-sm tracking-normal">€/m²</span>
                    </strong>
                  </div>
                </div>
                <span className="text-brand-700 bg-brand-50 border-brand-100 mt-auto inline-flex w-fit border px-2.5 py-1 text-xs font-semibold">
                  {formatPercent(city.trend, locale)}{' '}
                  <span className="ml-1 font-normal">{labels.trend}</span>
                </span>
                {city.source ? (
                  <span className="text-muted-foreground mt-3 block text-[11px] leading-[1.5]">
                    {city.source[locale]}
                  </span>
                ) : null}
                <span className="text-brand-700 mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  {labels.cityLink}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>

          <DataProvenance asOf={DATA_AS_OF[locale]} note={copy.source} />
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-20">
        <div className={CONTAINER}>
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className={EYEBROW}>{labels.moreEyebrow}</p>
              <h2 className="mt-4 max-w-[18ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.2rem]">
                {copy.cta.title}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-[66ch] text-[17px] leading-[1.75] text-pretty lg:justify-self-end">
              {copy.cta.text}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/price-atlas"
              className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              {copy.cta.atlas}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/property-valuation"
              className="border-border hover:border-brand-600 bg-background inline-flex min-h-12 items-center gap-2 border px-6 py-3 text-sm font-semibold transition-colors"
            >
              {copy.cta.valuation}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection title={copy.faqTitle} items={copy.faq} />
      <CtaBand
        title={labels.valuationTitle}
        text={copy.cta.text}
        primary={{ label: copy.cta.valuation, href: '/property-valuation' }}
        secondary={{ label: copy.cta.cityLink, href: '/locations' }}
      />
    </main>
  )
}

function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string
  title: string
  lede?: string
}) {
  return (
    <div className="max-w-[84ch]">
      {eyebrow ? <p className={EYEBROW}>{eyebrow}</p> : null}
      <h2 className="mt-4 max-w-[24ch] font-serif text-[2.2rem] leading-[1.06] font-medium tracking-[-0.025em] text-balance md:text-[3rem]">
        {title}
      </h2>
      {lede ? (
        <p className="text-muted-foreground mt-5 max-w-[84ch] text-[17px] leading-[1.75] text-pretty">
          {lede}
        </p>
      ) : null}
    </div>
  )
}

export function MarketDataPage({ locale }: { locale: Locale }) {
  const copy = getMarketDataCopy(locale)
  const comparison = getHousingComparison()
  const labels = copy.labels

  return (
    <main className="bg-background">
      <PageHero eyebrow={copy.hero.eyebrow} title={copy.hero.title} lede={copy.hero.lede} />

      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div className={CONTAINER}>
          <div className="border-brand-100 bg-background max-w-[100ch] border p-7 md:p-9">
            <span className="text-brand-700 bg-brand-50 border-brand-100 inline-flex border px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
              {copy.overview.badge}
            </span>
            <h2 className="mt-5 max-w-[30ch] font-serif text-2xl leading-tight font-medium tracking-[-0.02em] md:text-3xl">
              {copy.overview.title}
            </h2>
            <div className="mt-4 space-y-3 text-[15px] leading-[1.75] text-pretty">
              {copy.overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading title={copy.trend.title} />
          <div className="mt-10 grid gap-px bg-neutral-900/10 md:grid-cols-3">
            {copy.trend.cards.map((card) => (
              <LocalizedCard key={card.title.de} card={card} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={copy.houses.badge}
              title={copy.houses.title}
              lede={copy.houses.lede}
            />
            <span className="text-brand-700 border-brand-200 bg-brand-50 inline-flex w-fit shrink-0 border px-3 py-2 text-xs font-semibold">
              {labels.selected}
            </span>
          </div>

          <h3 className="mt-14 font-serif text-2xl leading-tight font-medium tracking-[-0.02em] md:text-3xl">
            {copy.houses.comparisonTitle}
          </h3>
          <div className="mt-7 grid gap-px bg-neutral-900/10 sm:grid-cols-2 xl:grid-cols-3">
            {comparison.map((city, index) => {
              const cityName = city.series[0]?.city[locale] ?? city.city
              return (
                <article key={city.city} className={CARD}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-brand-700 bg-brand-50 border-brand-100 inline-flex border px-2.5 py-1 text-[11px] font-semibold uppercase">
                        {index === 0
                          ? labels.highest
                          : index === comparison.length - 1
                            ? labels.lowest
                            : `${labels.rank} ${index + 1}`}
                      </span>
                      <h4 className="mt-4 font-serif text-2xl leading-tight font-medium">
                        {cityName}
                      </h4>
                    </div>
                    <strong className="text-xl tracking-[-0.03em]">
                      {formatCurrency(city.level * 1000, locale)}
                    </strong>
                  </div>
                  <div className="bg-brand-100 mt-6 h-2" aria-hidden="true">
                    <span className={`bg-brand-600 block h-full ${BAR_WIDTHS[index] ?? 'w-1/3'}`} />
                  </div>
                  <div className="text-muted-foreground mt-3 flex items-center justify-between gap-3 text-xs">
                    <span>{labels.averageHouse}</span>
                    <span className="text-brand-700 bg-brand-50 border-brand-100 border px-2 py-1 font-semibold">
                      {formatPercent(city.trend, locale)} {labels.since}
                    </span>
                  </div>
                </article>
              )
            })}
          </div>

          <h3 className="mt-14 font-serif text-2xl leading-tight font-medium tracking-[-0.02em] md:text-3xl">
            {copy.houses.tableTitle}
          </h3>
          <div className="border-border mt-5 overflow-x-auto border">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-neutral-900 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">{copy.houses.tableLabels.city}</th>
                  <th className="px-4 py-3 font-semibold">
                    {copy.houses.tableLabels.propertyType}
                  </th>
                  <th className="px-4 py-3 font-semibold">{copy.houses.tableLabels.year}</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    {copy.houses.tableLabels.range}
                  </th>
                </tr>
              </thead>
              <tbody>
                {copy.houses.table.map((row, index) => (
                  <tr
                    key={`${row.city}-${row.propertyType}-${row.year}`}
                    className={index % 2 === 0 ? 'bg-background' : 'bg-muted/55'}
                  >
                    <td className="border-border border-t px-4 py-3 font-semibold">{row.city}</td>
                    <td className="border-border border-t px-4 py-3">{row.propertyType}</td>
                    <td className="text-muted-foreground border-border border-t px-4 py-3 tabular-nums">
                      {row.year}
                    </td>
                    <td className="border-border border-t px-4 py-3 text-right font-semibold tabular-nums">
                      {row.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 max-w-[92ch] text-sm leading-[1.7]">
            {copy.houses.readingNote}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={copy.apartments.badge}
              title={copy.apartments.title}
              lede={copy.apartments.lede}
            />
            <span className="text-brand-700 border-brand-200 bg-brand-50 inline-flex w-fit shrink-0 border px-3 py-2 text-xs font-semibold">
              {labels.selected}
            </span>
          </div>
          <div className="mt-10 grid gap-px bg-neutral-900/10 sm:grid-cols-2 xl:grid-cols-3">
            {APARTMENT_MARKET.map((city) => {
              const summary = getApartmentSummary(city)
              return (
                <article key={city.city.de} className={CARD}>
                  <h3 className="font-serif text-2xl leading-tight font-medium">
                    {city.city[locale]}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {summary.count} {copy.apartments.countLabel}
                  </p>
                  <strong className="mt-5 block font-serif text-xl leading-tight font-medium tracking-[-0.025em]">
                    {formatCurrency(summary.lowK * 1000, locale)} –{' '}
                    {formatCurrency(summary.highK * 1000, locale)}
                  </strong>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {city.years.map((year) => (
                      <span
                        key={year.year}
                        className="border-border bg-muted text-muted-foreground border px-2.5 py-1.5 text-xs tabular-nums"
                      >
                        {year.year}: {year.count}× · {formatThousands(year.lowK, locale)}–
                        {formatThousands(year.highK, locale)}K
                      </span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
          <p className="text-muted-foreground mt-5 max-w-[100ch] text-sm leading-[1.7]">
            {copy.apartments.note}
          </p>
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={copy.districts.badge}
              title={copy.districts.title}
              lede={copy.districts.lede}
            />
            <span className="text-brand-700 border-brand-200 bg-brand-50 inline-flex w-fit shrink-0 border px-3 py-2 text-xs font-semibold">
              {labels.selected}
            </span>
          </div>
          <div className="border-border mt-8 overflow-x-auto border">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-neutral-900 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">{labels.district}</th>
                  <th className="px-4 py-3 font-semibold">{copy.houses.tableLabels.year}</th>
                  <th className="px-4 py-3 font-semibold">
                    {copy.houses.tableLabels.propertyType}
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">{labels.salePrice}</th>
                </tr>
              </thead>
              <tbody>
                {getDistrictRows(locale).map((row, index) => (
                  <tr
                    key={`${row.district}-${row.year}-${row.price}`}
                    className={index % 2 === 0 ? 'bg-background' : 'bg-muted/55'}
                  >
                    <td className="border-border border-t px-4 py-3 font-semibold">
                      {row.district}
                    </td>
                    <td className="text-muted-foreground border-border border-t px-4 py-3 tabular-nums">
                      {row.year}
                    </td>
                    <td className="border-border border-t px-4 py-3">{row.propertyType}</td>
                    <td className="border-border border-t px-4 py-3 text-right font-semibold tabular-nums">
                      {formatCurrency(row.price, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-sm leading-[1.7]">{copy.districts.note}</p>

          <DataProvenance asOf={DATA_AS_OF[locale]} note={copy.source} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading title={copy.factors.title} lede={copy.factors.lede} />
          <div className="mt-10 grid gap-px bg-neutral-900/10 md:grid-cols-2">
            {copy.factors.cards.map((card) => (
              <LocalizedCard key={card.title.de} card={card} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading title={copy.why.title} lede={copy.why.lede} />
          <div className="mt-10 grid gap-px bg-neutral-900/10 md:grid-cols-2 xl:grid-cols-3">
            {copy.why.cards.map((card) => (
              <LocalizedCard key={card.title.de} card={card} locale={locale} />
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/property-valuation"
              className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              {copy.cta.primary}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/appointment"
              className="border-border hover:border-brand-600 bg-background inline-flex min-h-12 items-center gap-2 border px-6 py-3 text-sm font-semibold transition-colors"
            >
              {copy.cta.secondary}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className={COMPACT_CONTAINER}>
          <p className="border-brand-600 text-muted-foreground border-l-2 pl-5 text-[15px] leading-[1.75] text-pretty">
            <Link
              href="/price-atlas"
              className="text-brand-700 decoration-brand-200 hover:decoration-brand-700 font-semibold underline underline-offset-4"
            >
              {copy.cta.atlas}
            </Link>
          </p>
        </div>
      </section>

      <FaqSection title={copy.faqTitle} items={copy.faq} />
      <CtaBand
        title={copy.cta.title}
        text={copy.cta.text}
        primary={{ label: copy.cta.primary, href: '/property-valuation' }}
        secondary={{ label: copy.cta.secondary, href: '/appointment' }}
      />
    </main>
  )
}

function getDistrictRows(locale: Locale) {
  return NUREMBERG_DISTRICT_TRANSACTIONS.map((row) => ({
    district: row.district[locale],
    year: row.year,
    propertyType: row.propertyType[locale],
    price: row.price,
  }))
}
