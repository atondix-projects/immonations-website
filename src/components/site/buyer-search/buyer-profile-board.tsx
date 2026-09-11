'use client'

import { useId, useState, useSyncExternalStore } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type {
  BuyerProfile,
  BuyerProfileCity,
  BuyerPropertyType,
  FilterOption,
} from '@/lib/content/buyer-profiles'
import { normalizeSearchTerm, profileMatchesQuery } from '@/lib/content/buyer-profile-search'
import { BuyerProfileCard, type BuyerProfileCardLabels } from './buyer-profile-card'

const ALL = 'all'
type All = typeof ALL

/** So viele Karten zeigt die ungefilterte Übersicht, bevor „Alle anzeigen“ nötig ist. */
const INITIAL_VISIBLE = 9

export type BuyerProfileBoardLabels = BuyerProfileCardLabels & {
  cityGroup: string
  typeGroup: string
  districtLabel: string
  districtPlaceholder: string
  all: string
  empty: string
  reset: string
  showAll: string
  /** Enthält `{count}`; wird Screenreadern nach jeder Filteränderung angesagt. */
  results: string
}

export type DistrictOption = { name: string; cities: string }

const subscribeToLocation = (onChange: () => void) => {
  window.addEventListener('popstate', onChange)
  return () => window.removeEventListener('popstate', onChange)
}

/**
 * Query-String der Adresse. Bewusst nicht `useSearchParams`: Die Seite ist statisch erzeugt,
 * und so braucht es keine Suspense-Grenze. Der Server rendert ungefiltert (leerer Snapshot).
 */
function useLocationSearch() {
  return useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search,
    () => '',
  )
}

/** Deep Link von der Stadtteilseite: `?stadt=fuerth&stadtteil=Altstadt`. */
function parseDeepLink(search: string, cities: FilterOption<BuyerProfileCity>[]) {
  const params = new URLSearchParams(search)
  return {
    city: cities.find((option) => option.value === params.get('stadt'))?.value,
    query: params.get('stadtteil') ?? undefined,
  }
}

/**
 * Filter und Stadtteilsuche über die Suchprofile. Jede Karte steht im Server-HTML; Filter und
 * „Alle anzeigen“ blenden nur aus (`hidden`), damit Crawler und Antwortmaschinen alle Profile
 * lesen können (CLAUDE.md § 8). Stadtteilseiten verlinken mit `?stadt=…&stadtteil=…` hierher.
 * Der Filter verändert die Adresse nicht; der Deep Link gilt, bis der Nutzer selbst filtert.
 */
export function BuyerProfileBoard({
  profiles,
  cities,
  types,
  districtOptions,
  labels,
}: {
  profiles: BuyerProfile[]
  cities: FilterOption<BuyerProfileCity>[]
  types: FilterOption<BuyerPropertyType>[]
  districtOptions: DistrictOption[]
  labels: BuyerProfileBoardLabels
}) {
  const inputId = useId()
  const listId = useId()
  const linked = parseDeepLink(useLocationSearch(), cities)
  // `null` heißt „noch nicht angefasst“: Bis dahin gilt, was der Deep Link vorgibt.
  const [cityChoice, setCityChoice] = useState<BuyerProfileCity | All | null>(null)
  const [queryChoice, setQueryChoice] = useState<string | null>(null)
  const [type, setType] = useState<BuyerPropertyType | All>(ALL)
  const [expanded, setExpanded] = useState(false)
  const city = cityChoice ?? linked.city ?? ALL
  const query = queryChoice ?? linked.query ?? ''

  const normalizedQuery = normalizeSearchTerm(query)
  const isFiltered = city !== ALL || type !== ALL || normalizedQuery !== ''
  const matches = profiles.filter(
    (profile) =>
      (city === ALL || profile.city === city) &&
      (type === ALL || profile.propertyType === type) &&
      profileMatchesQuery(profile, normalizedQuery),
  )
  const shown = isFiltered || expanded ? matches : matches.slice(0, INITIAL_VISIBLE)
  const shownIds = new Set(shown.map((profile) => profile.id))

  const reset = () => {
    setCityChoice(ALL)
    setType(ALL)
    setQueryChoice('')
  }

  return (
    <div>
      <div className="border-border grid gap-4 border-y py-5">
        <FilterGroup
          label={labels.cityGroup}
          options={[{ value: ALL, label: labels.all }, ...cities]}
          value={city}
          onChange={setCityChoice}
        />
        <FilterGroup
          label={labels.typeGroup}
          options={[{ value: ALL, label: labels.all }, ...types]}
          value={type}
          onChange={setType}
        />
        <div className="flex flex-wrap items-center gap-2">
          <label
            htmlFor={inputId}
            className="text-muted-foreground mr-2 w-full text-[11px] font-semibold tracking-[0.16em] uppercase sm:w-32 sm:shrink-0"
          >
            {labels.districtLabel}
          </label>
          <div className="relative w-full sm:w-80">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              id={inputId}
              type="search"
              list={listId}
              value={query}
              autoComplete="off"
              placeholder={labels.districtPlaceholder}
              onChange={(event) => setQueryChoice(event.target.value)}
              className="border-border bg-background focus-visible:outline-brand-600 placeholder:text-muted-foreground min-h-10 w-full border pr-3 pl-9 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            />
            <datalist id={listId}>
              {districtOptions.map((option) => (
                <option key={option.name} value={option.name} label={option.cities} />
              ))}
            </datalist>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {labels.results.replace('{count}', String(matches.length))}
      </p>

      <ul role="list" className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {profiles.map((profile) => (
          <li key={profile.id} hidden={!shownIds.has(profile.id)}>
            <BuyerProfileCard profile={profile} labels={labels} />
          </li>
        ))}
      </ul>

      {shown.length < matches.length ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="border-foreground hover:bg-foreground hover:text-background focus-visible:outline-brand-600 min-h-12 border px-7 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {labels.showAll}
          </button>
        </div>
      ) : null}

      {matches.length === 0 ? (
        <div className="border-border bg-muted/45 mt-8 flex flex-col items-start gap-5 border p-7 md:p-9">
          <p className="max-w-[62ch] text-[15px] leading-[1.7]">{labels.empty}</p>
          <button
            type="button"
            onClick={reset}
            className="border-foreground hover:bg-foreground hover:text-background focus-visible:outline-brand-600 min-h-11 border px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {labels.reset}
          </button>
        </div>
      ) : null}
    </div>
  )
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: FilterOption<T>[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span
        aria-hidden="true"
        className="text-muted-foreground mr-2 w-full text-[11px] font-semibold tracking-[0.16em] uppercase sm:w-32 sm:shrink-0"
      >
        {label}
      </span>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'focus-visible:outline-brand-600 min-h-10 border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
              active
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-background hover:border-foreground/50',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
