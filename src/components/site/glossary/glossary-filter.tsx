'use client'

import { useState } from 'react'
import { GLOSSARY_LETTERS, type LocalizedGlossaryEntry } from '@/lib/content/glossary'
import { cn } from '@/lib/utils'

export function GlossaryFilter({
  entries,
  allLabel,
  filterLabel,
  countSingular,
  countPlural,
}: {
  entries: LocalizedGlossaryEntry[]
  allLabel: string
  filterLabel: string
  countSingular: string
  countPlural: string
}) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null)
  const availableLetters = new Set(entries.map((entry) => entry.letter))
  const visibleCount = activeLetter
    ? entries.filter((entry) => entry.letter === activeLetter).length
    : entries.length

  return (
    <div>
      <div className="border-border bg-background/96 border-y py-4 backdrop-blur-sm md:sticky md:top-[var(--header-height)] md:z-10">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label={filterLabel}>
            <button
              type="button"
              aria-pressed={activeLetter === null}
              onClick={() => setActiveLetter(null)}
              className={cn(
                'min-h-11 border px-4 text-sm font-semibold transition-colors',
                activeLetter === null
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'bg-background border-neutral-300 hover:border-neutral-700',
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
                    'size-11 border text-sm font-semibold transition-colors',
                    activeLetter === letter
                      ? 'border-brand-700 bg-brand-700 text-white'
                      : 'bg-background border-neutral-300 hover:border-neutral-700',
                    !available &&
                      'cursor-not-allowed border-neutral-200 text-neutral-400 opacity-55',
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
      <div className="mx-auto w-full max-w-[1240px] px-6 py-14 md:py-20 lg:px-10">
        <div className="divide-border border-border divide-y border-y">
          {entries.map((entry) => (
            <article
              key={entry.id}
              hidden={activeLetter !== null && entry.letter !== activeLetter}
              className="grid gap-4 py-7 md:grid-cols-[minmax(220px,0.72fr)_1.28fr] md:gap-10 md:py-9"
            >
              <div className="flex min-w-0 items-baseline gap-4">
                <span className="text-brand-700 font-mono text-xs" aria-hidden="true">
                  {entry.letter}
                </span>
                <h2 className="min-w-0 font-serif text-2xl leading-tight font-semibold text-pretty break-words md:text-[28px]">
                  {entry.term}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-[72ch] text-[16px] leading-[1.75] text-pretty">
                {entry.definition}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
