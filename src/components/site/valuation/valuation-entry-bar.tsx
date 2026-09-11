'use client'

import { useId } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { PROPERTY_TYPE_IDS, WIZARD_STEP_IDS } from '@/lib/valuation/types'
import { useValuationEntry } from './use-valuation-entry'

/**
 * Where the choices fit on one line they do; below that they split 3 + 2
 * (never 4 + 1), both rows filling the width. Keyed on the form's own width via
 * a container query, because the hero column — not the viewport — decides.
 */
const FIRST_ROW_COUNT = 3

/**
 * Compact valuation entry for the homepage hero, on dark ground: the same first
 * question as `ValuationEntryCard`, laid out as a row of choices so it fits
 * under the headline instead of needing its own column.
 */
export function ValuationEntryBar({ className }: { className?: string }) {
  const t = useTranslations('ValuationWizard')
  const homeT = useTranslations('Home.valuation')
  const titleId = useId()
  const groupName = useId()
  const { selectedType, showError, select, submit } = useValuationEntry()

  return (
    <form
      className={cn(
        '@container relative w-full border border-white/15 bg-white/[0.06] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_28px_70px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-5',
        className,
      )}
      onSubmit={submit}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={titleId} className="font-serif text-lg leading-snug font-medium sm:text-xl">
          {t('steps.type.title')}
        </h2>
        <span
          className="font-mono text-[11px] whitespace-nowrap text-neutral-400 tabular-nums"
          aria-label={t('progressLabel')}
        >
          {t('stepLabel', { current: 1, total: WIZARD_STEP_IDS.length })}
        </span>
      </div>

      {/* Beschriftet durch die sichtbare Überschrift — sonst doppelter Vorlesetext. */}
      <fieldset
        className="mt-4 grid grid-cols-6 gap-2 @min-[33rem]:grid-cols-[repeat(5,auto)]"
        aria-labelledby={titleId}
      >
        {PROPERTY_TYPE_IDS.map((id, index) => {
          const selected = selectedType === id

          return (
            <label
              key={id}
              className={cn(
                'min-w-0 cursor-pointer @min-[33rem]:col-span-1',
                index < FIRST_ROW_COUNT ? 'col-span-2' : 'col-span-3',
              )}
            >
              <input
                type="radio"
                name={groupName}
                value={id}
                checked={selected}
                onChange={() => select(id)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  'flex min-h-11 w-full items-center justify-center border px-1.5 text-center text-sm leading-tight font-semibold transition-[background-color,border-color] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white @min-[33rem]:px-3.5 @min-[33rem]:whitespace-nowrap',
                  selected
                    ? 'border-brand-400 bg-brand-500'
                    : 'border-white/15 bg-white/[0.05] hover:border-white/40 hover:bg-white/10',
                )}
              >
                {t(`propertyTypes.${id}`)}
              </span>
            </label>
          )
        })}
      </fieldset>

      {showError ? (
        <p className="mt-3 text-sm font-semibold text-red-300" role="alert">
          {t('errors.required')}
        </p>
      ) : null}

      <div className="mt-4 flex flex-col-reverse gap-3 @min-[33rem]:flex-row @min-[33rem]:items-center @min-[33rem]:justify-between @min-[33rem]:gap-6">
        <p className="text-[11px] leading-relaxed text-neutral-400">{homeT('localOnly')}</p>
        <button
          type="submit"
          className="bg-brand-500 hover:bg-brand-400 inline-flex min-h-11 shrink-0 items-center justify-between gap-3 px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px @min-[33rem]:min-w-36"
        >
          {t('next')}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
