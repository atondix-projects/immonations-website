import { getTranslations } from 'next-intl/server'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  getBand,
  getPriceAtlasCoverage,
  getPriceAtlasGroup,
  type PriceAtlasEntry,
  type PriceTier,
} from '@/lib/content/price-atlas'
import { formatValue } from './format'

/** Preisniveau als Blau-Intensität — identisch zum Atlas selbst. */
const TIER_CLASS: Record<PriceTier, string> = {
  upper: 'bg-brand-700',
  mid: 'bg-brand-500',
  lower: 'bg-brand-300',
}

/** Stadt, die auf der Startseite als Beispiel dient. */
const TEASER_CITY = 'nuernberg'

/**
 * Startseiten-Vorschau des Preisatlas.
 *
 * Zeigt echte Werte: die beiden teuersten und die beiden günstigsten Lagen
 * einer Stadt auf gemeinsamer Skala. Genau das ist die Kernaussage des Atlas —
 * die Spanne innerhalb einer Stadt, nicht ein einzelner Quadratmeterpreis.
 */
export async function AtlasTeaserPanel({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home.clientSections.priceAtlas.panel')
  const group = getPriceAtlasGroup(TEASER_CITY, 'apartment')
  const coverage = getPriceAtlasCoverage()

  if (!group.scale) return null
  const { scale, entries } = group
  const top = entries.slice(0, 2)
  const bottom = entries.slice(-2)

  return (
    <div className="border-border bg-background border p-6 md:p-8">
      <div className="border-border flex items-baseline justify-between gap-4 border-b pb-4">
        <p className="text-brand-700 text-[11px] font-semibold tracking-[0.16em] uppercase">
          {t('title', { city: group.cityName })}
        </p>
        <p className="text-muted-foreground text-[11px] tabular-nums">
          {`${formatValue(scale.low, locale)} – ${formatValue(scale.high, locale)} ${t('unit')}`}
        </p>
      </div>

      <ul className="mt-5 list-none">
        {top.map((entry) => (
          <TeaserRow key={entry.district} entry={entry} scale={scale} locale={locale} />
        ))}
        <li aria-hidden="true" className="text-muted-foreground py-2 text-center text-xs">
          ···
        </li>
        {bottom.map((entry) => (
          <TeaserRow key={entry.district} entry={entry} scale={scale} locale={locale} />
        ))}
      </ul>

      <p className="text-muted-foreground border-border mt-5 border-t pt-4 text-[13px] leading-[1.6] text-pretty">
        {t('note', { districts: coverage.districts, cities: coverage.cities })}
      </p>

      <Link
        href="/price-atlas"
        className="text-brand-700 hover:text-brand-800 mt-4 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
      >
        {t('link')}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  )
}

function TeaserRow({
  entry,
  scale,
  locale,
}: {
  entry: PriceAtlasEntry
  scale: { low: number; high: number }
  locale: Locale
}) {
  const band = getBand(entry, scale)

  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 py-2">
      <span className="truncate text-[14px] font-semibold">{entry.district}</span>
      <span className="text-right text-[12.5px] font-semibold whitespace-nowrap tabular-nums">
        {`${formatValue(entry.low, locale)} – ${formatValue(entry.high, locale)}`}
      </span>
      {/* Prozentwerte aus den Daten — der zulässige Inline-Style-Fall. */}
      <span className="relative col-span-2 block h-2.5" aria-hidden="true">
        <span className="bg-border absolute inset-x-0 top-1/2 h-px -translate-y-1/2" />
        <span
          className={`absolute top-1/2 h-2 -translate-y-1/2 ${TIER_CLASS[band.tier]}`}
          style={{ left: `${band.left}%`, width: `${band.width}%` }}
        />
        <span
          className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-neutral-900/80"
          style={{ left: `${band.median}%` }}
        />
      </span>
    </li>
  )
}
