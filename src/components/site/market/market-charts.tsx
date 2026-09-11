import type { CSSProperties } from 'react'
import type { Locale } from '@/i18n/routing'
import {
  APARTMENT_MARKET,
  formatCurrency,
  formatPercent,
  formatThousands,
  formatThousandsRange,
  getApartmentSummary,
  type HousingComparison,
} from '@/lib/content/market-insights'
import { cn } from '@/lib/utils'

/*
 * Charts for the market-data report. Every bar sits on a shared € axis, so a longer
 * bar really is a wider price range — the earlier version sized its bars by rank.
 * Positions come from the data and are the only inline styles here, the same
 * exception the price atlas makes (price-atlas/atlas-row.tsx). Every value is also
 * printed as text beside its graphic, so the graphics are hidden from assistive tech.
 */

type Scale = { min: number; max: number; ticks: number[] }

/** Rounds the data extent out to whole steps so the axis ticks land on round values. */
function buildScale(values: number[], step: number, fromZero = false): Scale {
  const min = fromZero ? 0 : Math.floor(Math.min(...values) / step) * step
  const max = Math.ceil(Math.max(...values) / step) * step
  const count = Math.round((max - min) / step) + 1
  return { min, max, ticks: Array.from({ length: count }, (_, index) => min + index * step) }
}

function toPercent(value: number, scale: Scale) {
  return ((value - scale.min) / (scale.max - scale.min)) * 100
}

function at(value: number, scale: Scale): CSSProperties {
  return { left: `${toPercent(value, scale)}%` }
}

function between(low: number, high: number, scale: Scale): CSSProperties {
  const left = toPercent(low, scale)
  return { left: `${left}%`, width: `${toPercent(high, scale) - left}%` }
}

/** Shared lane geometry. The axis row reuses it, so tick labels line up with the bars. */
const GROUP_GRID = 'grid gap-x-10 gap-y-4 md:grid-cols-[11rem_minmax(0,1fr)]'
const LANE_GRID =
  'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-2 lg:grid-cols-[8rem_minmax(0,1fr)_7rem]'
const TRACK_CELL = 'order-3 col-span-2 lg:order-none lg:col-span-1'
const SHIFT_GRID =
  'grid grid-cols-[4.75rem_minmax(0,1fr)_5.25rem] items-center gap-x-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_6rem]'

function Gridlines({ scale, className }: { scale: Scale; className: string }) {
  return (
    <>
      {scale.ticks.map((tick) => (
        <span
          key={tick}
          className={cn('absolute inset-y-0 w-px', className)}
          style={at(tick, scale)}
        />
      ))}
    </>
  )
}

function TickLabels({
  scale,
  locale,
  className,
}: {
  scale: Scale
  locale: Locale
  className?: string
}) {
  return (
    <span className={cn('relative block h-4', className)}>
      {scale.ticks.map((tick, index) => (
        <span
          key={tick}
          // Auf schmalen Screens nur jeder zweite Wert, sonst stoßen die Zahlen aneinander.
          className={cn(
            'absolute top-0 -translate-x-1/2 text-[11px] leading-none tabular-nums',
            index % 2 === 1 && 'max-sm:hidden',
          )}
          style={at(tick, scale)}
        >
          {formatThousands(tick, locale)}
        </span>
      ))}
    </span>
  )
}

function LaneAxis({ scale, locale, unit }: { scale: Scale; locale: Locale; unit: string }) {
  return (
    <div className={cn(GROUP_GRID, 'text-muted-foreground py-3')} aria-hidden="true">
      <span className="hidden md:block" />
      <div className={LANE_GRID}>
        <span className="text-[11px] leading-none font-medium">{unit}</span>
        <TickLabels scale={scale} locale={locale} className={TRACK_CELL} />
        <span />
      </div>
    </div>
  )
}

export function ChartLegend({ earlier, latest }: { earlier: string; latest: string }) {
  return (
    <ul className="text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
      <li className="flex items-center gap-2.5">
        <span aria-hidden="true" className="bg-brand-200 h-3.5 w-7" />
        {earlier}
      </li>
      <li className="flex items-center gap-2.5">
        <span aria-hidden="true" className="bg-brand-600 h-1.5 w-7" />
        {latest}
      </li>
    </ul>
  )
}

/** House ranges per city and type: the earliest year as a pale band, the latest on top. */
export function HouseCorridorChart({
  locale,
  cities,
  labels,
  className,
}: {
  locale: Locale
  cities: readonly HousingComparison[]
  labels: { level: string; since: string; unit: string; highest: string; lowest: string }
  className?: string
}) {
  const allYears = cities.flatMap((city) => city.series.flatMap((series) => series.years))
  const earliest = Math.min(...allYears.map((year) => year.year))
  const latest = Math.max(...allYears.map((year) => year.year))
  const scale = buildScale(
    allYears.flatMap((year) => [year.lowK, year.highK]),
    100,
  )

  return (
    <div className={cn('border-t border-neutral-900/80', className)}>
      <LaneAxis scale={scale} locale={locale} unit={labels.unit} />
      {cities.map((city, index) => {
        const rank =
          index === 0 ? labels.highest : index === cities.length - 1 ? labels.lowest : null
        return (
          <div key={city.city} className={cn(GROUP_GRID, 'border-border border-t py-6')}>
            <div>
              <p className="font-serif text-2xl leading-tight font-medium tracking-[-0.02em]">
                {city.series[0]?.city[locale] ?? city.city}
              </p>
              <p className="mt-2 text-[13px] tabular-nums">
                <span className="text-muted-foreground">{labels.level}</span>{' '}
                <span className="font-semibold">{formatCurrency(city.level * 1000, locale)}</span>
              </p>
              <p
                className={cn(
                  'mt-0.5 text-[13px] font-semibold tabular-nums',
                  city.trend >= 0 ? 'text-brand-700' : 'text-muted-foreground',
                )}
              >
                {formatPercent(city.trend, locale)} {labels.since}
              </p>
              {rank ? <p className="text-muted-foreground mt-2 text-[12px]">{rank}</p> : null}
            </div>
            <div className="space-y-3 md:pt-1">
              {city.series.map((series) => {
                const earlier = series.years.find((year) => year.year === earliest)
                const current = series.years.find((year) => year.year === latest)
                if (!current) return null
                return (
                  <div key={series.propertyType.de} className={LANE_GRID}>
                    <span className="text-[13px] font-medium">{series.propertyType[locale]}</span>
                    <span aria-hidden="true" className={cn('relative block h-7', TRACK_CELL)}>
                      <Gridlines scale={scale} className="bg-neutral-900/[0.07]" />
                      {earlier ? (
                        <span
                          className="bg-brand-200 absolute top-1/2 h-3.5 -translate-y-1/2"
                          style={between(earlier.lowK, earlier.highK, scale)}
                        />
                      ) : null}
                      <span
                        className="bg-brand-600 absolute top-1/2 h-1.5 -translate-y-1/2"
                        style={between(current.lowK, current.highK, scale)}
                      />
                    </span>
                    <span className="text-right text-[13px] font-semibold tabular-nums">
                      {formatThousandsRange(current.lowK, current.highK, locale)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Dumbbell chart on a dark ground: average house level per city, earliest → latest year. */
export function LevelShiftChart({
  locale,
  cities,
  unit,
  className,
}: {
  locale: Locale
  cities: readonly HousingComparison[]
  unit: string
  className?: string
}) {
  const scale = buildScale(
    cities.flatMap((city) => [city.base, city.level]),
    50,
  )

  return (
    <div className={className}>
      <ul className="border-y border-white/15">
        {cities.map((city) => {
          const from = toPercent(city.base, scale)
          const to = toPercent(city.level, scale)
          const rising = city.level >= city.base
          return (
            <li
              key={city.city}
              className={cn(SHIFT_GRID, 'border-t border-white/10 py-3 first:border-t-0')}
            >
              <span className="truncate text-[14px] font-medium">
                {city.series[0]?.city[locale] ?? city.city}
              </span>
              <span aria-hidden="true" className="relative block h-6">
                <Gridlines scale={scale} className="bg-white/[0.08]" />
                <span
                  className={cn(
                    'absolute top-1/2 h-0.5 -translate-y-1/2',
                    rising ? 'bg-brand-300/60' : 'bg-white/30',
                  )}
                  style={{ left: `${Math.min(from, to)}%`, width: `${Math.abs(to - from)}%` }}
                />
                <span
                  className="bg-surface-dark absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
                  style={{ left: `${from}%` }}
                />
                <span
                  className={cn(
                    'absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full',
                    rising ? 'bg-brand-300' : 'bg-neutral-300',
                  )}
                  style={{ left: `${to}%` }}
                />
              </span>
              <span className="text-right leading-tight tabular-nums">
                <span className="block text-[13.5px] font-semibold">
                  {formatCurrency(city.level * 1000, locale)}
                </span>
                <span
                  className={cn(
                    'block text-[12px]',
                    rising ? 'text-brand-300' : 'text-neutral-400',
                  )}
                >
                  {formatPercent(city.trend, locale)}
                </span>
              </span>
            </li>
          )
        })}
      </ul>
      <div className={cn(SHIFT_GRID, 'pt-3 text-neutral-400')} aria-hidden="true">
        <span className="text-[11px] leading-none">{unit}</span>
        <TickLabels scale={scale} locale={locale} />
        <span />
      </div>
    </div>
  )
}

/** Apartment closings per city, one lane per year, on an axis that starts at zero. */
export function ApartmentSpreadChart({
  locale,
  labels,
  className,
}: {
  locale: Locale
  labels: { count: string; unit: string }
  className?: string
}) {
  const scale = buildScale(
    APARTMENT_MARKET.flatMap((city) => city.years.flatMap((year) => [year.lowK, year.highK])),
    100,
    true,
  )

  return (
    <div className={cn('border-t border-neutral-900/80', className)}>
      <LaneAxis scale={scale} locale={locale} unit={labels.unit} />
      {APARTMENT_MARKET.map((city) => {
        const summary = getApartmentSummary(city)
        return (
          <div key={city.city.de} className={cn(GROUP_GRID, 'border-border border-t py-6')}>
            <div>
              <p className="font-serif text-2xl leading-tight font-medium tracking-[-0.02em]">
                {city.city[locale]}
              </p>
              <p className="mt-2 text-[13px] font-semibold tabular-nums">
                {formatCurrency(summary.lowK * 1000, locale)} –{' '}
                {formatCurrency(summary.highK * 1000, locale)}
              </p>
              <p className="text-muted-foreground mt-0.5 text-[13px]">
                {summary.count} {labels.count}
              </p>
            </div>
            <div className="space-y-1 md:pt-1">
              {city.years.map((year) => (
                <div key={year.year} className={LANE_GRID}>
                  <span className="text-muted-foreground text-[13px] tabular-nums">
                    {year.year}
                  </span>
                  <span aria-hidden="true" className={cn('relative block h-6', TRACK_CELL)}>
                    <Gridlines scale={scale} className="bg-neutral-900/[0.07]" />
                    {year.lowK === year.highK ? (
                      <span
                        className="bg-brand-600 absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={at(year.lowK, scale)}
                      />
                    ) : (
                      <span
                        className="bg-brand-600 absolute top-1/2 h-1.5 -translate-y-1/2"
                        style={between(year.lowK, year.highK, scale)}
                      />
                    )}
                  </span>
                  <span className="text-right text-[13px] tabular-nums">
                    <span className="text-muted-foreground">{year.count}×</span>{' '}
                    <span className="font-semibold">
                      {formatThousandsRange(year.lowK, year.highK, locale)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
