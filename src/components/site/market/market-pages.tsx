import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import {
  formatPercent,
  formatThousands,
  formatThousandsRange,
  getHousingComparison,
  getMarketDataCopy,
  getMarketDataGlance,
  getMarketOverviewCopy,
  MARKET_CITIES,
  type MarketCard,
} from '@/lib/content/market-insights'
import { DataProvenance } from '../data-provenance'
import { CtaBand } from '../templates/cta-band'
import { FaqSection } from '../templates/faq-section'
import { PageHero } from '../templates/page-hero'
import {
  ApartmentSpreadChart,
  ChartLegend,
  HouseCorridorChart,
  LevelShiftChart,
} from './market-charts'
import { DistrictTable, HouseCorridorTable } from './market-tables'

const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'
const EYEBROW = 'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
const SUBHEAD = 'font-serif text-2xl leading-tight font-medium tracking-[-0.02em] md:text-3xl'
const TAG = 'text-brand-700 text-[13px] font-semibold'
const PRIMARY_BUTTON =
  'bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] active:translate-y-px'
const SECONDARY_BUTTON =
  'border-border hover:border-brand-600 bg-background inline-flex min-h-12 items-center gap-2 border px-6 py-3 text-sm font-semibold transition-[border-color,transform] active:translate-y-px'

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

          <DataProvenance source={copy.source} />
        </div>
      </section>

      <section data-market-interpretation className="bg-surface-dark py-16 text-white md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.2rem]">
                {copy.interpretation.title}
              </h2>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.75] text-pretty text-neutral-300">
                {copy.interpretation.lede}
              </p>
            </div>
            <div className="border-t border-white/15">
              {copy.interpretation.items.map((item) => (
                <article
                  key={item.title}
                  className="grid gap-3 border-b border-white/15 py-7 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] sm:gap-8"
                >
                  <h3 className="font-serif text-xl leading-snug font-medium text-balance">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-[1.75] text-pretty text-neutral-300">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-market-factors className="py-16 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
            <h2 className="max-w-[19ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.2rem]">
              {copy.factors.title}
            </h2>
            <p className="text-muted-foreground max-w-[64ch] text-[17px] leading-[1.75] text-pretty">
              {copy.factors.lede}
            </p>
          </div>

          <dl className="border-border mt-12 grid border-t md:grid-cols-2 lg:grid-cols-3">
            {copy.factors.items.map((item, index) => (
              <div
                key={item.title}
                data-market-overview-factor
                className={cn(
                  'border-border border-b py-7 md:min-h-48 md:px-7',
                  index % 2 === 0 ? 'md:border-r' : '',
                  index % 3 !== 2 ? 'lg:border-r' : 'lg:border-r-0',
                  index % 2 !== 0 ? 'md:pl-7' : 'md:pr-7',
                )}
              >
                <dt className="font-serif text-[1.45rem] leading-tight font-medium">
                  {item.title}
                </dt>
                <dd className="text-muted-foreground mt-4 max-w-[42ch] text-[15px] leading-[1.7] text-pretty">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
            <h2 className="max-w-[20ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.2rem]">
              {copy.sellerPath.title}
            </h2>
            <p className="text-muted-foreground max-w-[64ch] text-[17px] leading-[1.75] text-pretty">
              {copy.sellerPath.lede}
            </p>
          </div>

          <ol className="border-border mt-12 grid border-t md:grid-cols-3">
            {copy.sellerPath.steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  'border-border border-b py-7 md:min-h-56 md:px-8',
                  index < copy.sellerPath.steps.length - 1 && 'md:border-r',
                  index === 0 && 'md:pl-0',
                  index === copy.sellerPath.steps.length - 1 && 'md:pr-0',
                )}
              >
                <span className="text-brand-700 text-sm font-semibold tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-serif text-[1.5rem] leading-tight font-medium text-balance">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-4 max-w-[38ch] text-[15px] leading-[1.7] text-pretty">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/market-data"
              className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              {copy.sellerPath.reportLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/price-atlas"
              className="border-border hover:border-brand-600 bg-background inline-flex min-h-12 items-center gap-2 border px-6 py-3 text-sm font-semibold transition-colors"
            >
              {copy.cta.atlas}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className={cn(CONTAINER, 'grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20')}>
          <h2 className="max-w-[17ch] font-serif text-[2rem] leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-[2.55rem]">
            {copy.methodology.title}
          </h2>
          <div>
            <div className="max-w-[70ch] space-y-4 text-[16px] leading-[1.8] text-pretty">
              {copy.methodology.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              href="/market-data"
              className="text-brand-700 mt-7 inline-flex items-center gap-2 text-sm font-semibold"
            >
              {copy.methodology.reportLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
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
      {eyebrow ? (
        /* Same CI marker as PageHero and the home SectionHeader. */
        <p className="flex items-center gap-2.5">
          <ImmonationMark className="h-5 shrink-0" />
          <span className={EYEBROW}>{eyebrow}</span>
        </p>
      ) : null}
      <h2
        className={cn(
          'max-w-[24ch] font-serif text-[2.2rem] leading-[1.06] font-medium tracking-[-0.025em] text-balance md:text-[3rem]',
          eyebrow && 'mt-4',
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p className="text-muted-foreground mt-5 max-w-[72ch] text-[17px] leading-[1.75] text-pretty">
          {lede}
        </p>
      ) : null}
    </div>
  )
}

function MarketGlance({ locale }: { locale: Locale }) {
  const { charts } = getMarketDataCopy(locale)
  const glance = getMarketDataGlance()
  const items = [
    { label: charts.glanceCities, value: String(glance.cityCount) },
    { label: charts.glancePeriod, value: `${glance.firstYear}–${glance.lastYear}` },
    { label: charts.glanceApartments, value: String(glance.apartmentCount) },
    {
      label: charts.glanceLevels,
      value: formatThousandsRange(glance.levelLowK, glance.levelHighK, locale),
      unit: charts.unitThousands,
    },
  ]

  return (
    <aside className="self-start border-t-2 border-neutral-900">
      <p className="py-4 text-[13px] font-semibold">{charts.glanceTitle}</p>
      <dl className="border-border grid grid-cols-2 border-t">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-border border-b py-5 odd:pr-5 even:border-l even:pl-5"
          >
            <dt className="text-muted-foreground text-[12.5px] leading-snug">{item.label}</dt>
            <dd className="mt-3 font-serif text-[2rem] leading-none font-medium tracking-[-0.03em] tabular-nums md:text-[2.4rem]">
              {item.value}
              {item.unit ? (
                <span className="text-muted-foreground ml-1.5 font-sans text-sm tracking-normal">
                  {item.unit}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

export function MarketDataPage({ locale }: { locale: Locale }) {
  const copy = getMarketDataCopy(locale)
  const comparison = getHousingComparison()
  const { labels, charts } = copy
  const pairedFactors = copy.factors.cards.slice(0, 2)
  const otherFactors = copy.factors.cards.slice(2)

  return (
    <main data-market-data-report className="bg-background">
      <PageHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        lede={copy.hero.lede}
        className="pb-14 md:pb-18 lg:pb-20"
      />

      <section className="border-border border-y py-14 md:py-20">
        <div className={cn(CONTAINER, 'grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20')}>
          <div>
            <SectionHeading eyebrow={copy.overview.badge} title={copy.overview.title} />
            <div className="mt-7 max-w-[68ch] space-y-4 text-[16px] leading-[1.8] text-pretty">
              {copy.overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <MarketGlance locale={locale} />
        </div>
      </section>

      <section data-market-trend className="bg-surface-dark py-16 text-white md:py-24">
        <div className={cn(CONTAINER, 'grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20')}>
          <div>
            <h2 className="max-w-[16ch] font-serif text-[2.4rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.4rem]">
              {copy.trend.title}
            </h2>
            <div className="mt-10 border-t border-white/15">
              {copy.trend.cards.map((card) => (
                <article key={card.title.de} className="border-b border-white/15 py-7">
                  <p className="text-brand-300 text-[13px] font-semibold">{card.tag[locale]}</p>
                  <h3 className="mt-2 font-serif text-[1.65rem] leading-[1.12] font-medium text-balance md:text-[1.9rem]">
                    {card.title[locale]}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-[15px] leading-[1.75] text-pretty text-neutral-300">
                    {card.text[locale]}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <figure className="self-start border border-white/15 p-5 sm:p-7 lg:sticky lg:top-28">
            <figcaption>
              <p className="font-serif text-xl leading-snug font-medium md:text-2xl">
                {charts.levelShiftTitle}
              </p>
              <p className="mt-2 max-w-[52ch] text-[13px] leading-[1.6] text-neutral-400">
                {charts.levelShiftCaption}
              </p>
            </figcaption>
            <LevelShiftChart
              locale={locale}
              cities={comparison}
              unit={charts.unitThousands}
              className="mt-6"
            />
          </figure>
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow={copy.houses.badge}
            title={copy.houses.title}
            lede={copy.houses.lede}
          />

          <div className="mt-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h3 className={SUBHEAD}>{copy.houses.comparisonTitle}</h3>
            <ChartLegend earlier={charts.corridorEarlier} latest={charts.corridorLatest} />
          </div>
          <HouseCorridorChart
            locale={locale}
            cities={comparison}
            labels={{
              level: labels.averageHouse,
              since: labels.since,
              unit: charts.unitThousands,
              highest: labels.highest,
              lowest: labels.lowest,
            }}
            className="mt-6"
          />

          <h3 className={cn(SUBHEAD, 'mt-16')}>{copy.houses.tableTitle}</h3>
          <HouseCorridorTable
            locale={locale}
            labels={{
              city: copy.houses.tableLabels.city,
              propertyType: copy.houses.tableLabels.propertyType,
              unit: charts.tableUnit,
            }}
            className="mt-5"
          />
          <p className="text-muted-foreground mt-6 max-w-[80ch] text-sm leading-[1.7]">
            {copy.houses.readingNote}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow={copy.apartments.badge}
            title={copy.apartments.title}
            lede={copy.apartments.lede}
          />
          <ApartmentSpreadChart
            locale={locale}
            labels={{ count: copy.apartments.countLabel, unit: charts.unitThousands }}
            className="mt-12"
          />
          <p className="border-brand-600 mt-8 max-w-[88ch] border-l-2 pl-5 text-[15px] leading-[1.75] text-pretty">
            {copy.apartments.note}
          </p>
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        {/* grid-cols-1 (= minmax(0,1fr)) keeps the table's min-width from widening the
            single mobile column; the table scrolls inside its own container instead. */}
        <div
          className={cn(
            CONTAINER,
            'grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20',
          )}
        >
          <div>
            <SectionHeading
              eyebrow={copy.districts.badge}
              title={copy.districts.title}
              lede={copy.districts.lede}
            />
            <p className="text-muted-foreground mt-5 text-sm leading-[1.7]">
              {copy.districts.note}
            </p>
          </div>
          <div>
            <DistrictTable
              locale={locale}
              labels={{
                district: labels.district,
                propertyType: copy.houses.tableLabels.propertyType,
                salePrice: labels.salePrice,
              }}
            />
            <Link
              href="/price-atlas"
              className="group mt-10 flex items-center justify-between gap-6 border-y border-neutral-900/80 py-5"
            >
              <span className="group-hover:text-brand-700 font-serif text-xl leading-snug font-medium transition-colors md:text-2xl">
                {copy.cta.atlas}
              </span>
              <ArrowRight
                className="text-brand-700 size-5 shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <DataProvenance source={copy.source} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading title={copy.factors.title} lede={copy.factors.lede} />
          <div className="mt-12 grid border-y border-neutral-900/80 md:grid-cols-2">
            {pairedFactors.map((card, index) => (
              <article
                key={card.title.de}
                data-market-factor
                className={cn(
                  'py-9 md:py-11',
                  index === 0
                    ? 'md:pr-12'
                    : 'border-border border-t md:border-t-0 md:border-l md:pl-12',
                )}
              >
                <p className={TAG}>{card.tag[locale]}</p>
                <h3 className="mt-3 font-serif text-[1.9rem] leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-[2.3rem]">
                  {card.title[locale]}
                </h3>
                <p className="text-muted-foreground mt-4 max-w-[58ch] text-[15.5px] leading-[1.75] text-pretty">
                  {card.text[locale]}
                </p>
              </article>
            ))}
          </div>
          {otherFactors.map((card) => (
            <article
              key={card.title.de}
              data-market-factor
              className="border-border grid gap-x-12 gap-y-2 border-b py-7 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            >
              <div>
                <p className={TAG}>{card.tag[locale]}</p>
                <h3 className="mt-1.5 font-serif text-2xl leading-tight font-medium tracking-[-0.02em] text-balance">
                  {card.title[locale]}
                </h3>
              </div>
              <p className="text-muted-foreground max-w-[64ch] text-[15px] leading-[1.75] text-pretty md:pt-6">
                {card.text[locale]}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className={cn(CONTAINER, 'grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20')}>
          <div className="self-start lg:sticky lg:top-28">
            <SectionHeading title={copy.why.title} lede={copy.why.lede} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/property-valuation" className={PRIMARY_BUTTON}>
                {copy.cta.primary}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/appointment" className={SECONDARY_BUTTON}>
                {copy.cta.secondary}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="border-t border-neutral-900/80">
            {copy.why.cards.map((card) => (
              <ReasonRow key={card.title.de} card={card} locale={locale} />
            ))}
          </ul>
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

function ReasonRow({ card, locale }: { card: MarketCard; locale: Locale }) {
  return (
    <li className="border-border grid gap-x-8 gap-y-1.5 border-b py-7 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
      <p className={cn(TAG, 'sm:pt-1.5')}>{card.tag[locale]}</p>
      <div>
        <h3 className="font-serif text-2xl leading-tight font-medium tracking-[-0.02em] text-balance">
          {card.title[locale]}
        </h3>
        <p className="text-muted-foreground mt-2.5 max-w-[62ch] text-[15px] leading-[1.75] text-pretty">
          {card.text[locale]}
        </p>
      </div>
    </li>
  )
}
