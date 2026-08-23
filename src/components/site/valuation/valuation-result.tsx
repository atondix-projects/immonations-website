'use client'

import { Check, Info, Sparkles } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import type { ValuationEstimate } from '@/lib/valuation/estimate'
import type { Answers, FieldDescriptor, PropertyTypeId } from '@/lib/valuation/types'

/**
 * Ergebnisdarstellung: grobe Online-Spanne plus Zusammenfassung der Angaben.
 * Es wird bewusst nie ein fixer Wert gezeigt — der belastbare Wert entsteht
 * im Vor-Ort-Termin.
 */

type ValuationResultProps = {
  estimate: ValuationEstimate
  propertyType: PropertyTypeId
  fields: readonly FieldDescriptor[]
  answers: Answers
}

export function ValuationResult({
  estimate,
  propertyType,
  fields,
  answers,
}: ValuationResultProps) {
  const t = useTranslations('ValuationWizard')
  const format = useFormatter()

  const euro = (value: number) =>
    format.number(value, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

  /** Anzeigewert eines Feldes — Optionen werden über ihre ID übersetzt. */
  function displayValue(field: FieldDescriptor): string {
    const value = answers[field.id]

    if (field.kind === 'multi') {
      const list = Array.isArray(value) ? value : []
      if (list.length === 0) return t('summary.empty')
      return list.map((option) => t(`options.${field.optionSet}.${option}`)).join(', ')
    }

    const raw = typeof value === 'string' ? value.trim() : ''
    if (raw === '') return t('summary.empty')

    if (field.kind === 'boolean') return t(`boolean.${raw}`)
    if (field.kind === 'checkbox') return t('boolean.yes')
    if (field.kind === 'choice' && field.optionSet) {
      return t(`options.${field.optionSet}.${raw}`)
    }
    if (field.unit === 'sqm') return `${raw} m²`
    if (field.unit === 'metre') return `${raw} m`

    return raw
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Sparkles className="text-brand-700 size-6" aria-hidden="true" />
        <p className="text-brand-700 mt-4 text-[10px] font-semibold tracking-[0.2em] uppercase">
          {t('result.eyebrow')}
        </p>
        <h3 className="mt-2 font-serif text-3xl leading-tight font-medium">{t('result.title')}</h3>

        {estimate.kind === 'range' ? (
          <div className="border-border bg-muted/50 mt-6 border p-5">
            <p className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
              {t('result.rangeLabel')}
            </p>
            <p className="mt-2 font-serif text-[2rem] leading-tight font-medium tabular-nums md:text-[2.6rem]">
              {euro(estimate.low)} – {euro(estimate.high)}
            </p>
            <p className="text-muted-foreground mt-3 text-sm">
              {t('result.perSqm', {
                low: estimate.perSqmLow,
                high: estimate.perSqmHigh,
                city: estimate.cityName,
              })}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {t('result.districts', { districts: estimate.districts.join(', ') })}
            </p>
            {!estimate.reliable ? (
              <p className="text-foreground/80 mt-3 flex items-start gap-2 text-xs leading-relaxed">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {t('result.thinData')}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="border-border bg-muted/50 mt-6 border p-5">
            <p className="text-foreground/90 text-[15px] leading-relaxed">
              {t(`result.unavailable.${estimate.reason}`)}
            </p>
          </div>
        )}

        <p className="text-muted-foreground mt-4 text-xs leading-relaxed">{t('result.derived')}</p>
        <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed font-semibold">
          <Check className="text-brand-700 mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('result.onSite')}
        </p>
      </div>

      <div>
        <h4 className="text-sm font-semibold">{t('summary.title')}</h4>
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{t('summary.text')}</p>
        <dl className="mt-5 divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
          <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
            <dt className="text-neutral-600">{t('summary.propertyType')}</dt>
            <dd className="text-right font-semibold">{t(`propertyTypes.${propertyType}`)}</dd>
          </div>
          {fields.map((field) => (
            <div key={field.id} className="grid grid-cols-[1fr_auto] gap-4 py-3">
              <dt className="text-neutral-600">{t(`fields.${field.id}.label`)}</dt>
              <dd className="text-right font-semibold">{displayValue(field)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
