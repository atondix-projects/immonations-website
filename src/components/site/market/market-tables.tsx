import type { Locale } from '@/i18n/routing'
import {
  formatCurrency,
  formatThousandsRange,
  HOUSING_MARKET,
  NUREMBERG_DISTRICT_TRANSACTIONS,
  type HousingSeries,
} from '@/lib/content/market-insights'
import { cn } from '@/lib/utils'

const HEAD_CELL = 'text-muted-foreground px-3 pb-3 text-[12px] font-semibold first:pl-0'

/**
 * House ranges pivoted to one row per city and type with the years as columns —
 * twelve rows instead of the 36 a flat list needs, and the latest year reads down
 * a single highlighted column.
 */
export function HouseCorridorTable({
  locale,
  labels,
  className,
}: {
  locale: Locale
  labels: { city: string; propertyType: string; unit: string }
  className?: string
}) {
  const years = [...new Set(HOUSING_MARKET.flatMap((s) => s.years.map((y) => y.year)))].sort(
    (a, b) => a - b,
  )
  const latest = Math.max(...years)

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-[620px] border-collapse text-left text-sm">
        <caption className="text-muted-foreground pb-4 text-left text-[12.5px]">
          {labels.unit}
        </caption>
        <thead>
          <tr className="border-b border-neutral-900/80">
            <th scope="col" className={HEAD_CELL}>
              {labels.city}
            </th>
            <th scope="col" className={HEAD_CELL}>
              {labels.propertyType}
            </th>
            {years.map((year) => (
              <th
                key={year}
                scope="col"
                className={cn(
                  HEAD_CELL,
                  'text-right tabular-nums',
                  year === latest && 'text-brand-700',
                )}
              >
                {year}
              </th>
            ))}
          </tr>
        </thead>
        {groupByCity(HOUSING_MARKET).map((group) => (
          <tbody key={group.key} className="border-border border-b">
            {group.series.map((series, index) => (
              <tr key={series.propertyType.de}>
                {index === 0 ? (
                  <th
                    scope="rowgroup"
                    rowSpan={group.series.length}
                    className="py-3 pr-3 align-top font-serif text-[17px] font-medium"
                  >
                    {series.city[locale]}
                  </th>
                ) : null}
                <td className="text-muted-foreground px-3 py-3">{series.propertyType[locale]}</td>
                {years.map((year) => {
                  const value = series.years.find((item) => item.year === year)
                  return (
                    <td
                      key={year}
                      className={cn(
                        'px-3 py-3 text-right tabular-nums',
                        year === latest
                          ? 'bg-brand-50 text-foreground font-semibold'
                          : 'text-muted-foreground',
                      )}
                    >
                      {value ? formatThousandsRange(value.lowK, value.highK, locale) : '–'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}

function groupByCity(series: readonly HousingSeries[]) {
  const keys = [...new Set(series.map((item) => item.city.de))]
  return keys.map((key) => ({ key, series: series.filter((item) => item.city.de === key) }))
}

/** Nuremberg district sales grouped by year, newest first, each price on a 0-based bar. */
export function DistrictTable({
  locale,
  labels,
  className,
}: {
  locale: Locale
  labels: { district: string; propertyType: string; salePrice: string }
  className?: string
}) {
  const rows = NUREMBERG_DISTRICT_TRANSACTIONS
  const years = [...new Set(rows.map((row) => row.year))].sort((a, b) => b - a)
  const scaleMax = Math.ceil(Math.max(...rows.map((row) => row.price)) / 100_000) * 100_000

  return (
    <div className={cn('overflow-x-auto', className)}>
      {/* No min-width: below sm the bars are hidden and three text columns fit, so the
          sale price stays on screen instead of behind a horizontal scroll. */}
      <table className="w-full border-collapse text-left text-[13px] sm:text-sm">
        <thead>
          <tr className="border-b border-neutral-900/80">
            <th scope="col" className={HEAD_CELL}>
              {labels.district}
            </th>
            <th scope="col" className={HEAD_CELL}>
              {labels.propertyType}
            </th>
            <th scope="col" className={cn(HEAD_CELL, 'text-right')}>
              {labels.salePrice}
            </th>
          </tr>
        </thead>
        {years.map((year) => (
          <tbody key={year}>
            <tr>
              <th
                scope="rowgroup"
                colSpan={3}
                className="text-brand-700 pt-6 pb-2 text-left text-[13px] font-semibold tabular-nums"
              >
                {year}
              </th>
            </tr>
            {rows
              .filter((row) => row.year === year)
              .sort((a, b) => b.price - a.price)
              .map((row) => (
                <tr
                  key={`${row.district.de}-${row.propertyType.de}`}
                  className="border-border border-t"
                >
                  <th scope="row" className="py-3 pr-3 font-semibold">
                    {row.district[locale]}
                  </th>
                  <td className="text-muted-foreground px-2 py-3 sm:px-3">
                    {row.propertyType[locale]}
                  </td>
                  <td className="py-3 pl-2 sm:pl-3">
                    <span className="flex items-center justify-end gap-4">
                      <span
                        aria-hidden="true"
                        className="bg-brand-100 relative hidden h-1.5 w-28 sm:block md:w-40"
                      >
                        {/* Datengetriebene Breite — einzige Inline-Style-Ausnahme, wie im Preisatlas. */}
                        <span
                          className="bg-brand-600 absolute inset-y-0 left-0"
                          style={{ width: `${(row.price / scaleMax) * 100}%` }}
                        />
                      </span>
                      <span className="text-right font-semibold whitespace-nowrap tabular-nums sm:min-w-[6.5rem]">
                        {formatCurrency(row.price, locale)}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
