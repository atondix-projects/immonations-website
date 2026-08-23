'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Home, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { estimateValue } from '@/lib/valuation/estimate'
import { LOCATION_FIELDS, PROPERTY_FIELDS } from '@/lib/valuation/fields'
import { fieldsForStep, visibleFields } from '@/lib/valuation/steps'
import {
  PROPERTY_TYPE_IDS,
  WIZARD_STEP_IDS,
  isPropertyTypeId,
  type AnswerValue,
  type Answers,
  type PropertyTypeId,
} from '@/lib/valuation/types'
import { hasErrors, validateFields, type FieldErrors } from '@/lib/valuation/validation'
import { ValuationField } from './valuation-field'
import { ValuationResult } from './valuation-result'

/**
 * Mehrstufiger, bedingter Bewertungs-Wizard.
 *
 * Reihenfolge: Objektart -> Lage -> Kern-Objektdaten -> optionale Details ->
 * Kontakt. Der Kontaktschritt steht bewusst am Ende: wer die Objektdaten schon
 * eingegeben hat, bricht seltener ab.
 *
 * Validiert wird immer nur gegen die *sichtbaren* Felder eines Schrittes, damit
 * ein ausgeblendetes Pflichtfeld den Abschluss nie blockiert.
 */

const CONTACT_STEP = WIZARD_STEP_IDS.length - 1

/** Setzt den Fokus auf das erste fehlerhafte Feld — auch bei Radiogruppen. */
function focusField(fieldId: string) {
  const selector = `vw-${fieldId}`
  const target =
    document.getElementById(selector) ?? document.querySelector<HTMLElement>(`[name="${selector}"]`)
  target?.focus()
  target?.scrollIntoView({ block: 'center', behavior: 'smooth' })
}

export function ValuationWizard() {
  const t = useTranslations('ValuationWizard')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Der Query-Parameter ist ungeprüfte Eingabe — nur bekannte IDs zählen.
  const seededType = searchParams.get('type')
  const initialType: PropertyTypeId | null = isPropertyTypeId(seededType) ? seededType : null

  const [propertyType, setPropertyType] = useState<PropertyTypeId | null>(initialType)
  const [step, setStep] = useState(initialType ? 1 : 0)
  const [answers, setAnswers] = useState<Answers>({})
  const [errors, setErrors] = useState<FieldErrors>({})
  const [typeError, setTypeError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const headingRef = useRef<HTMLParagraphElement>(null)

  const stepId = WIZARD_STEP_IDS[step] ?? 'type'
  const stepFields = useMemo(
    () => fieldsForStep(stepId, propertyType, answers),
    [stepId, propertyType, answers],
  )

  // Fokus beim Schrittwechsel auf die Überschrift — sonst bleibt er am Button.
  useEffect(() => {
    headingRef.current?.focus()
  }, [step, submitted])

  const update = useCallback((fieldId: string, value: AnswerValue) => {
    setAnswers((current) => ({ ...current, [fieldId]: value }))
    // Ein korrigiertes Feld verliert seinen Fehler sofort — nicht erst beim Weiter.
    setErrors((current) => {
      if (!(fieldId in current)) return current
      return Object.fromEntries(Object.entries(current).filter(([key]) => key !== fieldId))
    })
  }, [])

  function goBack() {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }

  function submitStep() {
    if (stepId === 'type') {
      if (!propertyType) {
        setTypeError(true)
        return
      }
      setStep(1)
      return
    }

    const found = validateFields(stepFields, answers)
    if (hasErrors(found)) {
      setErrors(found)
      const firstInvalid = stepFields.find((field) => field.id in found)
      if (firstInvalid) focusField(firstInvalid.id)
      return
    }

    setErrors({})
    if (step < CONTACT_STEP) {
      setStep(step + 1)
      return
    }

    setSubmitted(true)
  }

  // --- Ergebnisansicht ------------------------------------------------------
  if (submitted && propertyType) {
    const estimate = estimateValue(propertyType, answers)
    const summaryFields = [
      ...visibleFields(LOCATION_FIELDS, answers),
      ...visibleFields(PROPERTY_FIELDS[propertyType], answers),
    ]

    return (
      <div className="border-border bg-neutral-0 flex min-h-[580px] flex-col border p-5 sm:p-7">
        <p
          ref={headingRef}
          tabIndex={-1}
          className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase outline-none"
        >
          {t('prototypeLabel')}
        </p>
        <div className="mt-6 flex-1">
          <ValuationResult
            estimate={estimate}
            propertyType={propertyType}
            fields={summaryFields}
            answers={answers}
          />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-5">
          <button
            type="button"
            onClick={() => router.push('/property-valuation/thank-you')}
            className="bg-brand-700 hover:bg-brand-800 inline-flex min-h-12 items-center gap-2 px-6 text-sm font-semibold text-white transition-colors active:translate-y-px"
          >
            {t('finish')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setStep(0)
              setPropertyType(null)
              setAnswers({})
              setErrors({})
            }}
            className="inline-flex min-h-12 items-center px-2 text-sm font-semibold text-neutral-700 underline underline-offset-4"
          >
            {t('restart')}
          </button>
        </div>
        <p className="text-muted-foreground mt-4 text-xs leading-relaxed">{t('localOnly')}</p>
      </div>
    )
  }

  return (
    <form
      noValidate
      className="border-border bg-neutral-0 flex min-h-[580px] flex-col border p-5 sm:p-7"
      onSubmit={(event) => {
        event.preventDefault()
        submitStep()
      }}
    >
      <div className="flex items-start justify-between gap-6 border-b border-neutral-200 pb-5">
        <div>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase outline-none"
          >
            {t('prototypeLabel')}
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight font-medium">{t('title')}</h2>
        </div>
        <span className="font-mono text-xs text-neutral-500 tabular-nums">
          {t('stepLabel', { current: step + 1, total: WIZARD_STEP_IDS.length })}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1" aria-label={t('progressLabel')}>
        {WIZARD_STEP_IDS.map((id, index) => (
          <span
            key={id}
            className={cn('h-1', index <= step ? 'bg-brand-700' : 'bg-neutral-200')}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col pt-8">
        <h3 id="vw-step-title" className="font-serif text-3xl leading-tight font-medium">
          {t(`steps.${stepId}.title`)}
        </h3>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {t(`steps.${stepId}.text`)}
        </p>

        {/* Das Objektart-Fieldset wird von der sichtbaren Schrittüberschrift
            beschriftet — sonst liest ein Screenreader den Titel doppelt vor. */}
        {stepId === 'type' ? (
          <fieldset className="mt-7" aria-labelledby="vw-step-title">
            <div className="grid gap-2 sm:grid-cols-2">
              {PROPERTY_TYPE_IDS.map((id) => {
                const selected = propertyType === id

                return (
                  <label key={id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="vw-propertyType"
                      value={id}
                      checked={selected}
                      onChange={() => {
                        setPropertyType(id)
                        setTypeError(false)
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        'peer-focus-visible:outline-brand-700 flex min-h-14 items-center gap-3 border px-4 py-3 text-sm font-semibold transition-[background-color,border-color,color] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
                        selected
                          ? 'border-brand-700 bg-brand-700 text-white'
                          : 'bg-neutral-0 border-neutral-200 text-neutral-900 hover:border-neutral-500',
                      )}
                    >
                      <Home className="size-4 shrink-0" aria-hidden="true" />
                      {t(`propertyTypes.${id}`)}
                    </span>
                  </label>
                )
              })}
            </div>
            {typeError ? (
              <p role="alert" className="text-destructive mt-4 text-sm font-semibold">
                {t('errors.required')}
              </p>
            ) : null}
          </fieldset>
        ) : (
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            {stepFields.map((field) => (
              <div
                key={field.id}
                className={cn(field.span === 'half' ? 'sm:col-span-1' : 'sm:col-span-2')}
              >
                <ValuationField
                  field={field}
                  value={answers[field.id]}
                  error={errors[field.id]}
                  onChange={(value) => update(field.id, value)}
                />
              </div>
            ))}
          </div>
        )}

        {stepId === 'details' ? (
          <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
            {t('optionalStepNote')}
          </p>
        ) : null}

        {stepId === 'contact' ? (
          <div className="border-border bg-muted/50 mt-6 border p-4">
            <p className="flex items-start gap-2 text-sm leading-relaxed font-semibold">
              <ShieldCheck className="text-brand-700 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t('trust.headline')}
            </p>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              {t('trust.doubleOptIn')}
            </p>
          </div>
        ) : null}

        {hasErrors(errors) ? (
          <p className="text-destructive mt-6 text-sm font-semibold" role="alert">
            {t('errors.summary')}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-neutral-200 pt-5">
        <button
          type="button"
          onClick={goBack}
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
          {step === CONTACT_STEP ? t('finish') : t('next')}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
