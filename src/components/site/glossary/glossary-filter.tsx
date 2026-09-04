'use client'

import { useMemo, useState } from 'react'
import { GLOSSARY_LETTERS, type LocalizedGlossaryEntry } from '@/lib/content/glossary'
import { cn } from '@/lib/utils'

function groupByLetter(entries: LocalizedGlossaryEntry[]) {
  const groups = new Map<string, LocalizedGlossaryEntry[]>()
  for (const entry of entries) {
    const bucket = groups.get(entry.letter)
    if (bucket) bucket.push(entry)
    else groups.set(entry.letter, [entry])
  }
  return groups
}

export function GlossaryFilter({
  entries,
  allLabel,
  filterLabel,
  filterHint,
  countSingular,
  countPlural,
}: {
  entries: LocalizedGlossaryEntry[]
  allLabel: string
  filterLabel: string
  filterHint: string
  countSingular: string
  countPlural: string
}) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null)
  const grouped = useMemo(() => groupByLetter(entries), [entries])
  const availableLetters = useMemo(() => new Set(grouped.keys()), [grouped])
  const visibleGroups = useMemo(
    () =>
      GLOSSARY_LETTERS.flatMap((letter) => {
        const list = grouped.get(letter)
        if (!list) return []
        if (activeLetter && activeLetter !== letter) return []
        return [{ letter, entries: list }]
      }),
    [activeLetter, grouped],
  )
  const visibleCount = activeLetter ? (grouped.get(activeLetter)?.length ?? 0) : entries.length

  return (
    <div>
      <div className="border-border bg-background/96 border-y py-5 backdrop-blur-sm md:sticky md:top-[var(--header-height)] md:z-10">
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
          <p className="text-foreground mb-4 max-w-[62ch] text-[1.05rem] leading-[1.7] font-semibold text-pretty">
            {filterHint}
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label={filterLabel}>
            <button
              type="button"
              aria-pressed={activeLetter === null}
              onClick={() => setActiveLetter(null)}
              className={cn(
                'inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors',
                'focus-visible:ring-brand-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                'active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
                activeLetter === null
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-700',
              )}
            >
              {allLabel}
            </button>
            {GLOSSARY_LETTERS.map((letter) => {
              const available = availableLetters.has(letter)
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!available}
                  aria-pressed={activeLetter === letter}
                  onClick={() => setActiveLetter(letter)}
                  className={cn(
                    'inline-flex size-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                    'focus-visible:ring-brand-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                    'active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
                    activeLetter === letter
                      ? 'border-brand-700 bg-brand-700 text-white'
                      : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-700',
                    !available &&
                      'cursor-not-allowed border-neutral-200 bg-white text-neutral-300 hover:border-neutral-200 active:scale-100',
                  )}
                >
                  {letter}
                </button>
              )
            })}
          </div>
          <p className="text-muted-foreground mt-3 text-sm" aria-live="polite">
            {visibleCount} {visibleCount === 1 ? countSingular : countPlural}
          </p>
        </div>
      </div>

      <div className="bg-muted/35">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-14 px-5 py-14 sm:px-7 md:gap-16 md:py-20 lg:px-12">
          {visibleGroups.map((group) => (
            <section
              key={group.letter}
              aria-labelledby={`glossary-letter-${group.letter}`}
              className="scroll-mt-[calc(var(--header-height)+7.5rem)]"
            >
              <h2
                id={`glossary-letter-${group.letter}`}
                className="text-brand-600 font-serif text-[3.25rem] leading-none font-semibold tracking-[-0.04em] md:text-[4.25rem]"
              >
                {group.letter}
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {group.entries.map((entry) => (
                  <li key={entry.id} className="min-w-0">
                    <article className="hover:border-brand-300 h-full rounded-[10px] border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(38,36,34,0.04)] transition-colors md:p-7">
                      <h3 className="min-w-0 font-serif text-[1.2rem] leading-snug font-semibold text-pretty break-words md:text-[1.25rem]">
                        {entry.term}
                      </h3>
                      <p className="text-muted-foreground mt-3 text-[15px] leading-[1.7] text-pretty md:text-base">
                        {entry.definition}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
