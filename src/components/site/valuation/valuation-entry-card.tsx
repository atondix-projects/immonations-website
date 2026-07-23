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
}

export function ValuationEntryCard({ className }: ValuationEntryCardProps) {
  const t = useTranslations('ValuationWizard')
  const homeT = useTranslations('Home.valuation')
  const router = useRouter()
  const propertyTypes = t.raw('propertyTypes') as string[]
  const [selectedType, setSelectedType] = useState<PropertyTypeId | null>(null)
  const [showError, setShowError] = useState(false)

  return (
    <form
      className={cn(
        'bg-neutral-0 border-border flex w-full flex-col border p-5 text-neutral-900 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.65)] sm:p-6',
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
      <div className="flex items-start justify-between gap-5 border-b border-neutral-200 pb-4">
        <div>
          <p className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase">
            {homeT('prototypeLabel')}
          </p>
          <h2 className="mt-2 max-w-[20ch] font-serif text-2xl leading-tight font-medium">
            {t('steps.type.title')}
          </h2>
        </div>
        <span
          className="font-mono text-xs text-neutral-500 tabular-nums"
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
                'focus-visible:outline-brand-700 min-h-12 border px-3 py-2 text-left text-sm font-semibold transition-[background-color,border-color,color,transform] focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px',
                selectedType === id
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-500',
              )}
            >
              {label}
            </button>
          )
        })}
      </div>

      {showError ? (
        <p className="text-destructive mt-3 text-sm font-semibold" role="alert">
          {t('error')}
        </p>
      ) : null}

      <button
        type="submit"
        className="bg-brand-700 hover:bg-brand-800 mt-5 inline-flex min-h-12 w-full items-center justify-between gap-3 px-5 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px"
      >
        {t('next')}
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>

      <p className="mt-3 text-xs leading-relaxed text-neutral-500">{homeT('localOnly')}</p>
    </form>
  )
}
