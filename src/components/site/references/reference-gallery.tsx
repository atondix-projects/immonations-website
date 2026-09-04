'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ReferenceItem } from '@/lib/content/references'
import { ReferenceCard } from './reference-card'

export function ReferenceGallery({
  items,
  compact = false,
  referenceLabel,
  allLabel,
  filterLabel,
  cityFilterLabel,
  allCitiesLabel,
  typeFilterLabel,
}: {
  items: ReferenceItem[]
  compact?: boolean
  referenceLabel: string
  allLabel?: string
  filterLabel?: string
  cityFilterLabel?: string
  allCitiesLabel?: string
  typeFilterLabel?: string
}) {
  const [activeType, setActiveType] = useState<string | null>(null)
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const types = [...new Set(items.map((item) => item.type))]
  const cities = [...new Map(items.map((item) => [item.citySlug, item.location])).entries()]
  const visibleItems = compact
    ? items
    : items.filter(
        (item) =>
          (activeType === null || item.type === activeType) &&
          (activeCity === null || item.citySlug === activeCity),
      )
  const filterButton = (active: boolean, onClick: () => void, children: string) => (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'min-h-10 border px-4 text-xs font-semibold transition-colors',
        active
          ? 'border-brand-700 bg-brand-700 text-white'
          : 'border-neutral-300 hover:border-neutral-600',
      )}
    >
      {children}
    </button>
  )

  return (
    <div>
      {!compact ? (
        <div
          className="border-border mb-8 flex flex-wrap items-center gap-2 border-y py-4"
          aria-label={filterLabel}
        >
          {cityFilterLabel ? (
            <span className="mr-1 text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
              {cityFilterLabel}
            </span>
          ) : null}
          {cityFilterLabel
            ? filterButton(activeCity === null, () => setActiveCity(null), allCitiesLabel ?? '')
            : null}
          {cityFilterLabel
            ? cities.map(([slug, label]) => (
                <span key={slug}>
                  {filterButton(activeCity === slug, () => setActiveCity(slug), label)}
                </span>
              ))
            : null}
          <span className="mx-1 hidden h-5 w-px bg-neutral-200 md:block" aria-hidden="true" />
          {typeFilterLabel ? (
            <span className="mr-1 text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
              {typeFilterLabel}
            </span>
          ) : null}
          {filterButton(activeType === null, () => setActiveType(null), allLabel ?? '')}
          {types.map((type) => (
            <span key={type}>
              {filterButton(activeType === type, () => setActiveType(type), type)}
            </span>
          ))}
        </div>
      ) : null}
      <div className="grid auto-rows-auto gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {visibleItems.map((item, index) => (
          <ReferenceCard
            key={item.id}
            item={item}
            label={referenceLabel}
            featured={!compact && (index === 0 || index === 8 || index === 14)}
          />
        ))}
      </div>
    </div>
  )
}
