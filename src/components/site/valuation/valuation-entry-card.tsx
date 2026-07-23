'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export const PROPERTY_TYPE_IDS = ['house', 'apartment', 'apartment-building', 'land'] as const

export type PropertyTypeId = (typeof PROPERTY_TYPE_IDS)[number]

type ValuationEntryCardProps = {
  className?: string
  variant?: 'light' | 'glass'
}

export function ValuationEntryCard({
  className,
  variant = 'light',
}: ValuationEntryCardProps) {
  const t = useTranslations('ValuationWizard')
  const homeT = useTranslations('Home.valuation')
  const router = useRouter()
  const propertyTypes = t.raw('propertyTypes') as string[]
  const [selectedType, setSelectedType] = useState<PropertyTypeId | null>(null)
  const [showError, setShowError] = useState(false)
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
      onSubmit={(event) => {
        event.preventDefault()
        if (!selectedType) {
          setShowError(true)
          return
        }

        router.push({
          pathname: '/property-valuation',
          query: { type: selectedType },
        })
      }}
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
          <h2 className="mt-2 max-w-[20ch] font-serif text-2xl leading-tight font-medium">
            {t('steps.type.title')}
          </h2>
        </div>
        <span
          className={cn(
            'font-mono text-xs tabular-nums',
            isGlass ? 'text-neutral-300' : 'text-neutral-500',
          )}
          aria-label={t('progressLabel')}
        >
          1 / 5
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {PROPERTY_TYPE_IDS.map((id, index) => {
          const label = propertyTypes[index]
          if (!label) return null

          return (
            <button
              key={id}
              type="button"
              aria-pressed={selectedType === id}
              onClick={() => {
                setSelectedType(id)
                setShowError(false)
              }}
              className={cn(
                'min-h-12 border px-3 py-2 text-left text-sm font-semibold transition-[background-color,border-color,color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px',
                selectedType === id
                  ? isGlass
                    ? 'border-brand-400 bg-brand-500 text-white focus-visible:outline-white'
                    : 'border-brand-700 bg-brand-700 text-white focus-visible:outline-brand-700'
                  : isGlass
                    ? 'border-white/15 bg-white/[0.06] text-white hover:border-white/40 hover:bg-white/10 focus-visible:outline-white'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-500 focus-visible:outline-brand-700',
              )}
            >
              {label}
            </button>
          )
        })}
      </div>

      {showError ? (
        <p
          className={cn(
            'mt-3 text-sm font-semibold',
            isGlass ? 'text-red-300' : 'text-destructive',
          )}
          role="alert"
        >
          {t('error')}
        </p>
      ) : null}

      <button
        type="submit"
        className={cn(
          'mt-5 inline-flex min-h-12 w-full items-center justify-between gap-3 px-5 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px',
          isGlass
            ? 'bg-brand-500 hover:bg-brand-400'
            : 'bg-brand-700 hover:bg-brand-800',
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
