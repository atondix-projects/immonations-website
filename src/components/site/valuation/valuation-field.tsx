'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { optionsOf } from '@/lib/valuation/options'
import type { AnswerValue, FieldDescriptor } from '@/lib/valuation/types'
import type { FieldErrorCode } from '@/lib/valuation/validation'

/**
 * Rendert genau ein Feld des Bewertungs-Wizards.
 *
 * Auswahlfelder nutzen echte Radio- bzw. Checkbox-Inputs (visuell verborgen),
 * damit Tastatur- und Screenreader-Verhalten nativ bleibt. Die sichtbare
 * Chip-Optik liegt auf dem `<span>` daneben.
 */

const INPUT_CLASS =
  'border-input bg-neutral-0 focus:border-brand-700 min-h-12 w-full border px-4 text-base outline-none aria-[invalid=true]:border-destructive'

const CHIP_CLASS =
  'flex min-h-12 items-center justify-center border px-4 py-2 text-center text-sm font-semibold transition-[background-color,border-color,color] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-700'

const CHIP_SELECTED = 'border-brand-700 bg-brand-700 text-white'
const CHIP_IDLE = 'bg-neutral-0 border-neutral-200 text-neutral-900 hover:border-neutral-500'

type ValuationFieldProps = {
  field: FieldDescriptor
  value: AnswerValue | undefined
  error?: FieldErrorCode
  onChange: (value: AnswerValue) => void
}

function digitsOnly(value: string, maxLength: number): string {
  return value.replace(/\D/g, '').slice(0, maxLength)
}

export function ValuationField({ field, value, error, onChange }: ValuationFieldProps) {
  const t = useTranslations('ValuationWizard')
  const fieldId = `vw-${field.id}`
  const errorId = `${fieldId}-error`
  const hintId = `${fieldId}-hint`
  const text = typeof value === 'string' ? value : ''
  const list = Array.isArray(value) ? value : []
  const hint = t.has(`fields.${field.id}.hint`) ? t(`fields.${field.id}.hint`) : null
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ')

  const label = t(`fields.${field.id}.label`)
  const optionalSuffix =
    field.status === 'optional' && field.kind !== 'checkbox' ? (
      <span className="text-muted-foreground ml-2 text-xs font-normal">{t('optionalBadge')}</span>
    ) : null

  const errorNode = error ? (
    <p id={errorId} role="alert" className="text-destructive text-sm font-semibold">
      {t(`errors.${error}`)}
    </p>
  ) : null

  const hintNode = hint ? (
    <p id={hintId} className="text-muted-foreground text-xs leading-relaxed">
      {hint}
    </p>
  ) : null

  // --- Einwilligungen -------------------------------------------------------
  if (field.kind === 'checkbox') {
    return (
      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
          <input
            id={fieldId}
            type="checkbox"
            checked={text === 'yes'}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            onChange={(event) => onChange(event.target.checked ? 'yes' : '')}
            className="accent-brand-700 mt-0.5 size-5 shrink-0"
          />
          <span>
            {t.rich(`fields.${field.id}.label`, {
              link: (chunks) => (
                <Link href="/privacy" className="underline underline-offset-2">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errorNode}
      </div>
    )
  }

  // --- Einfach- und Mehrfachauswahl ----------------------------------------
  if (field.kind === 'choice' || field.kind === 'multi' || field.kind === 'boolean') {
    const options =
      field.kind === 'boolean' ? ['yes', 'no'] : field.optionSet ? optionsOf(field.optionSet) : []
    const isMulti = field.kind === 'multi'

    const optionLabel = (option: string) =>
      field.kind === 'boolean' ? t(`boolean.${option}`) : t(`options.${field.optionSet}.${option}`)

    return (
      <fieldset aria-describedby={describedBy || undefined}>
        <legend className="text-sm font-semibold">
          {label}
          {optionalSuffix}
        </legend>
        {hintNode}
        <div
          className={cn(
            'mt-3 grid gap-2',
            options.length <= 2
              ? 'grid-cols-2'
              : options.length <= 4
                ? 'sm:grid-cols-2'
                : 'sm:grid-cols-3',
          )}
        >
          {options.map((option) => {
            const selected = isMulti ? list.includes(option) : text === option

            return (
              <label key={option} className="cursor-pointer">
                <input
                  type={isMulti ? 'checkbox' : 'radio'}
                  name={fieldId}
                  value={option}
                  checked={selected}
                  aria-invalid={error ? true : undefined}
                  onChange={() => {
                    if (!isMulti) {
                      onChange(option)
                      return
                    }
                    onChange(
                      selected ? list.filter((entry) => entry !== option) : [...list, option],
                    )
                  }}
                  className="peer sr-only"
                />
                <span className={cn(CHIP_CLASS, selected ? CHIP_SELECTED : CHIP_IDLE)}>
                  {optionLabel(option)}
                </span>
              </label>
            )
          })}
        </div>
        {errorNode}
      </fieldset>
    )
  }

  // --- Freitext und Zahlen --------------------------------------------------
  // "Jahr" und "Anzahl" sind Beschreibungen, keine Einheiten — sie stehen im
  // Label und nicht als Suffix im Eingabefeld.
  const showsUnitSuffix =
    field.unit !== undefined && field.unit !== 'year' && field.unit !== 'count'
  const unit = showsUnitSuffix && field.unit ? t(`units.${field.unit}`) : null
  const isNumeric = field.kind === 'number' || field.kind === 'postcode'

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm font-semibold">
        {label}
        {optionalSuffix}
      </label>
      {hintNode}
      <span className="relative block">
        <input
          id={fieldId}
          type={field.kind === 'email' ? 'email' : field.kind === 'tel' ? 'tel' : 'text'}
          value={text}
          inputMode={
            field.kind === 'postcode'
              ? 'numeric'
              : field.kind === 'number'
                ? 'decimal'
                : field.kind === 'email'
                  ? 'email'
                  : field.kind === 'tel'
                    ? 'tel'
                    : 'text'
          }
          autoComplete={
            field.id === 'postcode'
              ? 'postal-code'
              : field.id === 'city'
                ? 'address-level2'
                : field.id === 'street'
                  ? 'street-address'
                  : field.id === 'firstName'
                    ? 'given-name'
                    : field.id === 'lastName'
                      ? 'family-name'
                      : field.id === 'email'
                        ? 'email'
                        : field.id === 'phone'
                          ? 'tel'
                          : 'off'
          }
          maxLength={field.maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => {
            const raw = event.target.value
            if (field.kind === 'postcode') {
              onChange(digitsOnly(raw, 5))
              return
            }
            if (field.kind === 'number') {
              onChange(raw.replace(/[^\d.,]/g, '').slice(0, 12))
              return
            }
            onChange(raw)
          }}
          className={cn(INPUT_CLASS, unit && isNumeric && 'pr-20')}
        />
        {unit && isNumeric ? (
          <span
            className="text-muted-foreground pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm"
            aria-hidden="true"
          >
            {unit}
          </span>
        ) : null}
      </span>
      {errorNode}
    </div>
  )
}
