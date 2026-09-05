'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { SocialEmbedTile } from './social-embed-tile'
import type { SocialEmbedItem } from './social-embed-data'

const TILE_SIZES =
  '(min-width: 1280px) 20vw, (min-width: 768px) 30vw, (min-width: 640px) 45vw, 88vw'
/** Querformat-Kacheln belegen zwei Spalten, sind also doppelt so breit. */
const LANDSCAPE_SIZES =
  '(min-width: 1280px) 40vw, (min-width: 768px) 60vw, (min-width: 640px) 90vw, 92vw'

export type SocialWallFilter = { value: string; label: string; count: number }

/**
 * Die Wand echter Beiträge — das Herzstück der Social-Seite.
 *
 * Jede Kachel zeigt das echte Standbild des Beitrags und startet auf Klick den
 * echten Player der Plattform. Sortiert wird plattformübergreifend nach Aufrufen;
 * der Filter blendet einzelne Kanäle aus, entfernt aber nie einen Beitrag aus der
 * Grundmenge — die Auswahl bleibt nachvollziehbar.
 *
 * Client-Komponente wegen des Filters. Alle Beschriftungen kommen fertig übersetzt
 * aus `buildSocialEmbedItems`.
 */
export function SocialWall({
  items,
  filters,
  allLabel,
  filterGroupLabel,
}: {
  items: SocialEmbedItem[]
  filters: SocialWallFilter[]
  allLabel: string
  filterGroupLabel: string
}) {
  const [active, setActive] = useState<string>('all')

  const visible = useMemo(
    () =>
      [...items]
        .sort((a, b) => b.viewCount - a.viewCount)
        .filter((item) => active === 'all' || item.platform === active),
    [items, active],
  )

  const options = [{ value: 'all', label: allLabel, count: items.length }, ...filters]

  return (
    <div>
      <div role="group" aria-label={filterGroupLabel} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.value === active
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setActive(option.value)}
              aria-pressed={isActive}
              className={cn(
                'focus-visible:ring-brand-500 inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                isActive
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-border hover:border-neutral-500',
              )}
            >
              {option.label}
              <span
                className={cn(
                  'text-[11px] tabular-nums',
                  isActive ? 'text-white/60' : 'text-muted-foreground',
                )}
              >
                {option.count}
              </span>
            </button>
          )
        })}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-5">
        {visible.map((item, index) => {
          // Querformat-Videos bekommen zwei Spalten und ihr echtes 16:9 — in einen
          // 9:16-Rahmen gezwungen bliebe von einem 1280×720-Standbild nur der
          // mittlere Streifen übrig.
          const isLandscape = item.embed?.shape === 'landscape'
          return (
            <li key={item.id} className={isLandscape ? 'col-span-2' : undefined}>
              <SocialEmbedTile
                embed={item.embed}
                href={item.href}
                thumbnail={item.thumbnail}
                platformName={item.platformName}
                label={item.label}
                views={item.views}
                labels={item.labels}
                sizes={isLandscape ? LANDSCAPE_SIZES : TILE_SIZES}
                // Nur die erste Reihe früh laden — der Rest hängt am Lazy-Loading.
                priority={index < 5}
                className={isLandscape ? 'aspect-video w-full' : 'aspect-[9/16] w-full'}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
