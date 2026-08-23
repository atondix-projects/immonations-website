'use client'

import { ChevronDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getBand, type PriceAtlasEntry, type PriceTier } from '@/lib/content/price-atlas'
import { cn } from '@/lib/utils'
import { formatValue } from './format'

/** Referenzfläche für das Rechenbeispiel im Detailbereich. */
const EXAMPLE_AREA = 80

/**
 * Preisniveau als einfarbiger Blau-Verlauf. Das System kennt genau einen Akzent,
 * deshalb kodiert die Stufe die Intensität, nicht den Farbton.
 */
const TIER_CLASS: Record<PriceTier, string> = {
  upper: 'bg-brand-700',
  mid: 'bg-brand-500',
  lower: 'bg-brand-300',
}

export function AtlasRow({
  entry,
  scale,
  open,
  onToggle,
  rowId,
}: {
  entry: PriceAtlasEntry
  scale: { low: number; high: number }
  open: boolean
  onToggle: () => void
  rowId: string
}) {
  const locale = useLocale()
  const t = useTranslations('PriceAtlasPage')
  const band = getBand(entry, scale)
  const panelId = `${rowId}-detail`
  const unit = t('atlas.unit')

  return (
    <li className="border-border border-b last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          'grid w-full grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2.5 px-2 py-3.5 text-left transition-colors',
          'hover:bg-brand-50/70 focus-visible:ring-brand-600 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
          'md:grid-cols-[minmax(150px,230px)_1fr_minmax(132px,auto)_auto]',
          open && 'bg-brand-50',
        )}
      >
        <span className="min-w-0">
          <span className="text-[15px] leading-tight font-semibold">{entry.district}</span>
          <span className="text-muted-foreground ml-2 text-[11.5px] tabular-nums">
            {entry.postalCode}
          </span>
          {!entry.reliable ? (
            <span className="border-border text-muted-foreground ml-2 inline-block border px-1.5 py-px text-[10px] font-semibold tracking-[0.1em] uppercase">
              {t('atlas.thinData')}
            </span>
          ) : null}
        </span>

        {/* Spanne auf der Stadtskala. Die Prozentwerte kommen aus den Daten und
            sind der einzige zulässige Inline-Style in dieser Komponente. */}
        <span
          className="relative order-3 col-span-2 block h-5 w-full md:order-none md:col-span-1"
          aria-hidden="true"
        >
          <span className="bg-border absolute inset-x-0 top-1/2 h-px -translate-y-1/2" />
          <span
            className={cn(
              'absolute top-1/2 h-2.5 -translate-y-1/2 transition-[filter]',
              TIER_CLASS[band.tier],
            )}
            style={{ left: `${band.left}%`, width: `${band.width}%` }}
          />
          <span
            className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-neutral-900/80"
            style={{ left: `${band.median}%` }}
          />
        </span>

        <span className="text-right text-[13px] font-semibold whitespace-nowrap tabular-nums">
          {formatValue(entry.low, locale)}
          <span className="text-muted-foreground font-normal"> – </span>
          {formatValue(entry.high, locale)}
          <span className="text-muted-foreground ml-1 font-normal">{unit}</span>
        </span>

        <ChevronDown
          className={cn(
            'text-muted-foreground hidden size-4 shrink-0 transition-transform md:block',
            open && 'rotate-180',
          )}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div id={panelId} className="border-border bg-brand-50/40 border-t px-2 py-6 md:px-5">
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <Figure
              label={t('atlas.detail.from')}
              value={`${formatValue(entry.low, locale)} ${unit}`}
            />
            <Figure
              label={t('atlas.detail.to')}
              value={`${formatValue(entry.high, locale)} ${unit}`}
            />
            <Figure
              label={t('atlas.detail.median')}
              value={`${formatValue(entry.median, locale)} ${unit}`}
            />
            <Figure
              label={t('atlas.detail.sample')}
              value={formatValue(entry.sampleSize, locale)}
            />
          </dl>

          <p className="text-muted-foreground border-border mt-6 max-w-[78ch] border-t pt-5 text-[13.5px] leading-[1.7] text-pretty">
            {entry.reliable
              ? t('atlas.detail.example', {
                  area: EXAMPLE_AREA,
                  district: entry.district,
                  median: formatValue(entry.median * EXAMPLE_AREA, locale),
                  low: formatValue(entry.low * EXAMPLE_AREA, locale),
                  high: formatValue(entry.high * EXAMPLE_AREA, locale),
                })
              : t('atlas.detail.thinDataNote', {
                  district: entry.district,
                  count: entry.sampleSize,
                })}
          </p>

          {entry.districtLink ? (
            <Link
              href={{
                pathname: '/districts/[city]/[slug]',
                params: { city: entry.city, slug: entry.districtLink.slug },
              }}
              className="text-brand-700 hover:text-brand-800 mt-5 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
            >
              {t('atlas.detail.districtLink', { district: entry.districtLink.name })}
            </Link>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground text-[10.5px] font-semibold tracking-[0.14em] uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 font-serif text-xl font-medium tracking-[-0.02em] tabular-nums md:text-[1.6rem]">
        {value}
      </dd>
    </div>
  )
}
