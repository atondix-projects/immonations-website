'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Home, Ruler, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { PROPERTY_TYPE_IDS } from './valuation-entry-card'

type WizardData = {
  propertyType: string
  postcode: string
  city: string
  area: string
  rooms: string
  condition: string
  timing: string
}

const initialData: WizardData = {
  propertyType: '',
  postcode: '',
  city: '',
  area: '',
  rooms: '',
  condition: '',
  timing: '',
}

function ChoiceButton({
  label,
  selected,
  onClick,
  children,
}: {
  label: string
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'min-h-14 border px-4 py-3 text-left text-sm font-semibold transition-[background-color,border-color,color,transform] active:translate-y-px',
        selected
          ? 'border-brand-700 bg-brand-700 text-white'
          : 'bg-neutral-0 border-neutral-200 text-neutral-900 hover:border-neutral-500',
      )}
    >
      {children}
    </button>
  )
}

export function ValuationWizard() {
  const t = useTranslations('ValuationWizard')
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyTypes = t.raw('propertyTypes') as string[]
  const conditions = t.raw('conditions') as string[]
  const timings = t.raw('timings') as string[]
  const initialTypeIndex = PROPERTY_TYPE_IDS.findIndex((id) => id === searchParams.get('type'))
  const initialPropertyType =
    initialTypeIndex >= 0 ? (propertyTypes[initialTypeIndex] ?? '') : initialData.propertyType
  const [step, setStep] = useState(initialPropertyType ? 1 : 0)
  const [data, setData] = useState<WizardData>({
    ...initialData,
    propertyType: initialPropertyType,
  })
  const [showErrors, setShowErrors] = useState(false)

  const stepValid = useMemo(() => {
    if (step === 0) return Boolean(data.propertyType)
    if (step === 1) return /^\d{5}$/.test(data.postcode) && data.city.trim().length >= 2
    if (step === 2) return Number(data.area) >= 20 && Number(data.rooms) >= 1
    if (step === 3) return Boolean(data.condition && data.timing)
    return true
  }, [data, step])

  function update<K extends keyof WizardData>(key: K, value: WizardData[K]) {
    setData((current) => ({ ...current, [key]: value }))
    setShowErrors(false)
  }

  function next() {
    if (!stepValid) {
      setShowErrors(true)
      return
    }
    setStep((current) => Math.min(current + 1, 4))
  }

  return (
    <form
      className="border-border bg-neutral-0 flex min-h-[580px] flex-col border p-5 sm:p-7"
      onSubmit={(event) => {
        event.preventDefault()
        if (step < 4) {
          next()
          return
        }
        router.push('/property-valuation/thank-you')
      }}
    >
      <div className="flex items-start justify-between gap-6 border-b border-neutral-200 pb-5">
        <div>
          <p className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase">
            {t('prototypeLabel')}
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight font-medium">{t('title')}</h2>
        </div>
        <span className="font-mono text-xs text-neutral-500 tabular-nums">{step + 1} / 5</span>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1" aria-label={t('progressLabel')}>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={cn('h-1', index <= step ? 'bg-brand-700' : 'bg-neutral-200')}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col pt-8">
        {step === 0 ? (
          <fieldset>
            <legend className="font-serif text-3xl leading-tight font-medium">
              {t('steps.type.title')}
            </legend>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {t('steps.type.text')}
            </p>
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {propertyTypes.map((type) => (
                <ChoiceButton
                  key={type}
                  label={type}
                  selected={data.propertyType === type}
                  onClick={() => update('propertyType', type)}
                >
                  <span className="flex items-center gap-3">
                    <Home className="size-4" aria-hidden="true" />
                    {type}
                  </span>
                </ChoiceButton>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend className="font-serif text-3xl leading-tight font-medium">
              {t('steps.location.title')}
            </legend>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {t('steps.location.text')}
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-[0.7fr_1.3fr]">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                {t('steps.location.postcode')}
                <input
                  value={data.postcode}
                  onChange={(event) =>
                    update('postcode', event.target.value.replace(/\D/g, '').slice(0, 5))
                  }
                  inputMode="numeric"
                  autoComplete="postal-code"
                  className="border-input bg-neutral-0 focus:border-brand-700 min-h-12 border px-4 text-base outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold">
                {t('steps.location.city')}
                <input
                  value={data.city}
                  onChange={(event) => update('city', event.target.value)}
                  autoComplete="address-level2"
                  className="border-input bg-neutral-0 focus:border-brand-700 min-h-12 border px-4 text-base outline-none"
                />
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="font-serif text-3xl leading-tight font-medium">
              {t('steps.details.title')}
            </legend>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {t('steps.details.text')}
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                {t('steps.details.area')}
                <span className="relative">
                  <input
                    value={data.area}
                    onChange={(event) =>
                      update('area', event.target.value.replace(/\D/g, '').slice(0, 4))
                    }
                    inputMode="numeric"
                    className="border-input bg-neutral-0 focus:border-brand-700 min-h-12 w-full border px-4 pr-12 text-base outline-none"
                  />
                  <Ruler
                    className="absolute top-1/2 right-4 size-4 -translate-y-1/2 text-neutral-500"
                    aria-hidden="true"
                  />
                </span>
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold">
                {t('steps.details.rooms')}
                <input
                  value={data.rooms}
                  onChange={(event) =>
                    update('rooms', event.target.value.replace(/[^\d.,]/g, '').slice(0, 4))
                  }
                  inputMode="decimal"
                  className="border-input bg-neutral-0 focus:border-brand-700 min-h-12 border px-4 text-base outline-none"
                />
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-8">
            <fieldset>
              <legend className="font-serif text-3xl leading-tight font-medium">
                {t('steps.context.title')}
              </legend>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t('steps.context.condition')}
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {conditions.map((condition) => (
                  <ChoiceButton
                    key={condition}
                    label={condition}
                    selected={data.condition === condition}
                    onClick={() => update('condition', condition)}
                  >
                    {condition}
                  </ChoiceButton>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">{t('steps.context.timing')}</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {timings.map((timing) => (
                  <ChoiceButton
                    key={timing}
                    label={timing}
                    selected={data.timing === timing}
                    onClick={() => update('timing', timing)}
                  >
                    {timing}
                  </ChoiceButton>
                ))}
              </div>
            </fieldset>
          </div>
        ) : null}

        {step === 4 ? (
          <div>
            <Sparkles className="text-brand-700 size-6" aria-hidden="true" />
            <h3 className="mt-5 font-serif text-3xl leading-tight font-medium">
              {t('steps.summary.title')}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {t('steps.summary.text')}
            </p>
            <dl className="mt-7 divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
              <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
                <dt className="text-neutral-600">{t('summary.type')}</dt>
                <dd className="font-semibold">{data.propertyType}</dd>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
                <dt className="text-neutral-600">{t('summary.location')}</dt>
                <dd className="font-semibold">
                  {data.postcode} {data.city}
                </dd>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
                <dt className="text-neutral-600">{t('summary.details')}</dt>
                <dd className="font-semibold">
                  {data.area} m² · {data.rooms} {t('summary.rooms')}
                </dd>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 py-3">
                <dt className="text-neutral-600">{t('summary.context')}</dt>
                <dd className="text-right font-semibold">
                  {data.condition} · {data.timing}
                </dd>
              </div>
            </dl>
            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-neutral-600">
              <Check className="text-brand-700 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t('localOnly')}
            </p>
          </div>
        ) : null}

        {showErrors ? (
          <p className="text-destructive mt-5 text-sm font-semibold" role="alert">
            {t('error')}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-neutral-200 pt-5">
        <button
          type="button"
          onClick={() => {
            setShowErrors(false)
            setStep((current) => Math.max(current - 1, 0))
          }}
          disabled={step === 0}
          className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-neutral-700 disabled:pointer-events-none disabled:opacity-0"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t('back')}
        </button>
        <button
          type="submit"
          className="bg-brand-700 hover:bg-brand-800 inline-flex min-h-12 items-center gap-2 px-6 text-sm font-semibold text-white transition-colors active:translate-y-px"
        >
          {step === 4 ? t('finish') : t('next')}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
