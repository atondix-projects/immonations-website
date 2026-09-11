'use client'

import { useId } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { PROPERTY_TYPE_IDS, WIZARD_STEP_IDS } from '@/lib/valuation/types'
import { useValuationEntry } from './use-valuation-entry'

/**
 * Einstiegskarte auf Startseite und Hero: nur die erste Weiche (Objektart).
 * Die Auswahl wird als `?type=` an den Wizard übergeben, der dort mit Schritt 2
 * fortsetzt. Die Schrittzahl kommt aus dem Schema und kann nicht veralten.
 */

type ValuationEntryCardProps = {
  className?: string
  variant?: 'light' | 'glass'
}

/** Bei ungerader Anzahl füllt die letzte Kachel beide Spalten. */
const SPANS_FULL_WIDTH = PROPERTY_TYPE_IDS.length % 2 === 1

export function ValuationEntryCard({ className, variant = 'light' }: ValuationEntryCardProps) {
  const t = useTranslations('ValuationWizard')
  const homeT = useTranslations('Home.valuation')
  // Die Karte erscheint mehrfach pro Seite (Hero mobil/desktop) — die IDs
  // muessen deshalb je Instanz eindeutig sein.
  const titleId = useId()
  const groupName = useId()
  const { selectedType, showError, select, submit } = useValuationEntry()
  const isGlass = variant === 'glass'

  return (
    <form
      className={cn(
        'relative flex w-full flex-col overflow-hidden border p-5 sm:p-6',
        isGlass
          ? 'border-white/20 bg-[rgba(24,31,31,0.72)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_32px_80px_-36px_rgba(0,0,0,0.9)] backdrop-blur-xl'
          : 'bg-neutral-0 border-border text-neutral-900 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.65)]',
        className,
      )}
      onSubmit={submit}
    >
      <div
        className={cn(
          'flex items-start justify-between gap-5 border-b pb-4',
          isGlass ? 'border-white/15' : 'border-neutral-200',
        )}
      >
        <div>
          <p
            className={cn(
              'text-[10px] font-semibold tracking-[0.2em] uppercase',
              isGlass ? 'text-brand-200' : 'text-brand-700',
            )}
          >
            {homeT('prototypeLabel')}
          </p>
          <h2
            id={titleId}
            className="mt-2 max-w-[20ch] font-serif text-2xl leading-tight font-medium"
          >
            {t('steps.type.title')}
          </h2>
        </div>
        <span
          className={cn(
            'font-mono text-xs whitespace-nowrap tabular-nums',
            isGlass ? 'text-neutral-300' : 'text-neutral-500',
          )}
          aria-label={t('progressLabel')}
        >
          {t('stepLabel', { current: 1, total: WIZARD_STEP_IDS.length })}
        </span>
      </div>

      {/* Beschriftet durch die sichtbare Überschrift — sonst doppelter Vorlesetext. */}
      <fieldset className="mt-5" aria-labelledby={titleId}>
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPE_IDS.map((id, index) => {
            const selected = selectedType === id
            const isLast = index === PROPERTY_TYPE_IDS.length - 1

            return (
              <label
                key={id}
                className={cn('cursor-pointer', SPANS_FULL_WIDTH && isLast && 'col-span-2')}
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
                    'flex min-h-12 items-center border px-3 py-2 text-left text-sm font-semibold transition-[background-color,border-color,color] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
                    selected
                      ? isGlass
                        ? 'border-brand-400 bg-brand-500 text-white peer-focus-visible:outline-white'
                        : 'border-brand-700 bg-brand-700 peer-focus-visible:outline-brand-700 text-white'
                      : isGlass
                        ? 'border-white/15 bg-white/[0.06] text-white peer-focus-visible:outline-white hover:border-white/40 hover:bg-white/10'
                        : 'peer-focus-visible:outline-brand-700 border-neutral-200 bg-white text-neutral-900 hover:border-neutral-500',
                  )}
                >
                  {t(`propertyTypes.${id}`)}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {showError ? (
        <p
          className={cn(
            'mt-3 text-sm font-semibold',
            isGlass ? 'text-red-300' : 'text-destructive',
          )}
          role="alert"
        >
          {t('errors.required')}
        </p>
      ) : null}

      <button
        type="submit"
        className={cn(
          'mt-5 inline-flex min-h-12 w-full items-center justify-between gap-3 px-5 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px',
          isGlass ? 'bg-brand-500 hover:bg-brand-400' : 'bg-brand-700 hover:bg-brand-800',
        )}
      >
        {t('next')}
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>

      <p
        className={cn(
          'mt-3 text-xs leading-relaxed',
          isGlass ? 'text-neutral-300' : 'text-neutral-500',
        )}
      >
        {homeT('localOnly')}
      </p>
    </form>
  )
}
