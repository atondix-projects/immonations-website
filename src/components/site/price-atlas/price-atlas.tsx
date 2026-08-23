'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  PRICE_ATLAS_CATEGORIES,
  type PriceAtlasCategory,
  type PriceAtlasCityId,
  type PriceAtlasGroup,
} from '@/lib/content/price-atlas'
import { cn } from '@/lib/utils'
import { AtlasGroup } from './atlas-group'

/**
 * Interaktiver Preisatlas.
 *
 * Der Datensatz kommt vollständig vom Server und wird auch vollständig
 * gerendert; dieser Client-Layer hält ausschließlich den Ansichtszustand
 * (Stadt, Objektart, Suche, geöffnete Zeile).
 */
export function PriceAtlas({
  groups,
  defaultCity = 'nuernberg',
}: {
  groups: readonly PriceAtlasGroup[]
  defaultCity?: PriceAtlasCityId
}) {
  const t = useTranslations('PriceAtlasPage')
  const [city, setCity] = useState<PriceAtlasCityId>(defaultCity)
  const [category, setCategory] = useState<PriceAtlasCategory>('apartment')
  const [query, setQuery] = useState('')
  const [openDistrict, setOpenDistrict] = useState<string | null>(null)

  const cities = useMemo(() => {
    const seen = new Map<PriceAtlasCityId, { id: PriceAtlasCityId; name: string }>()
    for (const group of groups) {
      seen.set(group.city, { id: group.city, name: group.cityName })
    }
    return [...seen.values()]
  }, [groups])

  const select = (next: Partial<{ city: PriceAtlasCityId; category: PriceAtlasCategory }>) => {
    if (next.city) setCity(next.city)
    if (next.category) setCategory(next.category)
    setOpenDistrict(null)
  }

  return (
    <div>
      <div className="bg-background/95 border-border sticky top-[68px] z-40 -mx-5 border-b px-5 backdrop-blur-md sm:-mx-7 sm:px-7 lg:-mx-12 lg:px-12">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-2.5 md:gap-y-3 md:py-3">
          {/* Die Stadtauswahl bekommt auf schmalen Viewports eine eigene Zeile,
              sonst schrumpft der Scroller auf wenige sichtbare Städte. */}
          <div
            className="-mx-1 flex basis-full [scrollbar-width:none] gap-0.5 overflow-x-auto px-1 sm:flex-1 sm:basis-auto [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label={t('atlas.cityGroupLabel')}
          >
            {cities.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => select({ city: entry.id })}
                aria-pressed={entry.id === city}
                className={cn(
                  'min-h-9 shrink-0 px-3.5 text-sm font-semibold whitespace-nowrap transition-colors',
                  'focus-visible:ring-brand-600 focus-visible:ring-2 focus-visible:outline-none',
                  entry.id === city
                    ? 'bg-brand-700 text-white'
                    : 'text-muted-foreground hover:bg-brand-50 hover:text-foreground',
                )}
              >
                {entry.name}
              </button>
            ))}
          </div>

          <div
            className="border-border flex shrink-0 border"
            role="group"
            aria-label={t('atlas.categoryGroupLabel')}
          >
            {PRICE_ATLAS_CATEGORIES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => select({ category: value })}
                aria-pressed={value === category}
                className={cn(
                  'min-h-9 px-4 text-[13px] font-semibold transition-colors',
                  'focus-visible:ring-brand-600 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
                  value === category
                    ? 'bg-brand-600 text-white'
                    : 'text-muted-foreground hover:bg-brand-50 hover:text-foreground',
                )}
              >
                {t(`atlas.category.${value}`)}
              </button>
            ))}
          </div>

          {/* Auf schmalen Viewports teilt sich die Suche die Zeile mit dem
              Objektart-Schalter, damit die klebende Leiste zwei statt drei
              Zeilen hoch bleibt. */}
          <div className="relative min-w-[132px] flex-1 sm:w-64 sm:flex-none sm:shrink-0">
            <label className="sr-only" htmlFor="atlas-search">
              {t('atlas.searchLabel')}
            </label>
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <input
              id="atlas-search"
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setOpenDistrict(null)
              }}
              placeholder={t('atlas.searchPlaceholder')}
              className="border-border focus-visible:border-brand-600 focus-visible:ring-brand-600/30 min-h-9 w-full border bg-white py-2 pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="text-muted-foreground mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px]">
        <LegendSwatch className="bg-brand-700" label={t('atlas.legend.upper')} />
        <LegendSwatch className="bg-brand-500" label={t('atlas.legend.mid')} />
        <LegendSwatch className="bg-brand-300" label={t('atlas.legend.lower')} />
        <span className="flex items-center gap-2">
          <span className="inline-block h-3.5 w-0.5 bg-neutral-900/80" aria-hidden="true" />
          {t('atlas.legend.median')}
        </span>
      </div>

      <div className="mt-6">
        {groups.map((group) => (
          <AtlasGroup
            key={`${group.city}-${group.category}`}
            group={group}
            active={group.city === city && group.category === category}
            query={query}
            openDistrict={openDistrict}
            onToggleDistrict={(district) =>
              setOpenDistrict((current) => (current === district ? null : district))
            }
          />
        ))}
      </div>
    </div>
  )
}

function LegendSwatch({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={cn('inline-block h-2.5 w-7', className)} aria-hidden="true" />
      {label}
    </span>
  )
}
