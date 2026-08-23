'use client'

import { useLocale, useTranslations } from 'next-intl'
import { matchesQuery, type PriceAtlasGroup } from '@/lib/content/price-atlas'
import { AtlasRow } from './atlas-row'
import { formatValue } from './format'

/**
 * Eine Stadt/Objektart-Kombination des Atlas.
 *
 * Alle Gruppen werden gerendert, auch die inaktiven: der vollständige Datensatz
 * steht damit im ausgelieferten HTML und ist für Suchmaschinen und Antwort-
 * maschinen lesbar (CLAUDE.md §8). Der Client blendet nur um.
 */
export function AtlasGroup({
  group,
  active,
  query,
  openDistrict,
  onToggleDistrict,
}: {
  group: PriceAtlasGroup
  active: boolean
  query: string
  openDistrict: string | null
  onToggleDistrict: (district: string) => void
}) {
  const locale = useLocale()
  const t = useTranslations('PriceAtlasPage')
  const unit = t('atlas.unit')
  const groupId = `atlas-${group.city}-${group.category}`
  const categoryLabel = t(`atlas.category.${group.category}`)

  // Gefiltert wird nur die sichtbare Gruppe — die übrigen bleiben vollständig
  // im DOM, damit die Suche den indexierbaren Datenbestand nicht beschneidet.
  const visible = active
    ? group.entries.filter((entry) => matchesQuery(entry, query))
    : group.entries

  // Typ-Guard: jede erfasste Stadt hat Werte, eine leere Gruppe kann es nur
  // geben, solange eine neue Stadt noch ohne Datensatz im Katalog steht.
  if (!group.scale || !group.top || !group.bottom || group.cityMedian === null) return null

  const { scale, top, bottom, cityMedian } = group

  return (
    <section id={groupId} hidden={!active} aria-label={`${group.cityName} · ${categoryLabel}`}>
      <h3 className="sr-only">{`${group.cityName} · ${categoryLabel}`}</h3>

      <div className="grid gap-px border border-neutral-900/10 bg-neutral-900/10 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label={t('atlas.stats.range')}
          value={`${formatValue(scale.low, locale)} – ${formatValue(scale.high, locale)}`}
          suffix={unit}
        />
        <Stat
          label={t('atlas.stats.middle')}
          value={formatValue(cityMedian, locale)}
          suffix={unit}
        />
        <Stat label={t('atlas.stats.highest')} value={top.district} compact />
        <Stat label={t('atlas.stats.lowest')} value={bottom.district} compact />
      </div>

      {/* Fließtext-Antwort: die Kernaussage der Gruppe steht als Prosa im DOM. */}
      <p className="text-muted-foreground mt-7 max-w-[80ch] text-[15px] leading-[1.75] text-pretty">
        {t('atlas.summary', {
          city: group.cityName,
          category: t(`atlas.categoryInline.${group.category}`),
          count: group.entries.length,
          low: formatValue(scale.low, locale),
          high: formatValue(scale.high, locale),
          median: formatValue(cityMedian, locale),
          top: top.district,
          topValue: formatValue(top.median, locale),
          bottom: bottom.district,
          bottomValue: formatValue(bottom.median, locale),
          unit,
        })}
      </p>

      <div className="border-border text-muted-foreground mt-9 flex items-baseline justify-between gap-4 border-b pb-2.5 text-[11px] tabular-nums">
        <span>{`${formatValue(scale.low, locale)} ${unit}`}</span>
        <span className="tracking-[0.12em] uppercase">{t('atlas.scaleLabel')}</span>
        <span>{`${formatValue(scale.high, locale)} ${unit}`}</span>
      </div>

      {visible.length ? (
        <ul className="list-none">
          {visible.map((entry) => (
            <AtlasRow
              key={entry.district}
              entry={entry}
              scale={scale}
              rowId={`${groupId}-${entry.district.replace(/\W+/g, '-')}`}
              open={active && openDistrict === entry.district}
              onToggle={() => onToggleDistrict(entry.district)}
            />
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground px-2 py-14 text-center text-sm">{t('atlas.empty')}</p>
      )}
    </section>
  )
}

function Stat({
  label,
  value,
  suffix,
  compact = false,
}: {
  label: string
  value: string
  suffix?: string
  compact?: boolean
}) {
  return (
    <div className="bg-background p-5 md:p-6">
      <p className="text-muted-foreground text-[10.5px] font-semibold tracking-[0.14em] uppercase">
        {label}
      </p>
      <p
        className={
          compact
            ? 'mt-2 font-serif text-[1.2rem] leading-tight font-medium tracking-[-0.02em] text-balance'
            : 'mt-2 font-serif text-[1.55rem] leading-none font-medium tracking-[-0.025em] tabular-nums'
        }
      >
        {value}
        {suffix ? (
          <span className="text-muted-foreground ml-1.5 font-sans text-[11px] font-semibold tracking-[0.06em]">
            {suffix}
          </span>
        ) : null}
      </p>
    </div>
  )
}
