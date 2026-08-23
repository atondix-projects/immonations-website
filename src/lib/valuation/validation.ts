import type { Answers, FieldDescriptor } from './types'
import { listAnswer, textAnswer } from './types'

/**
 * Validierung des Bewertungs-Wizards.
 *
 * Geprüft wird immer nur gegen die *sichtbaren* Felder eines Schrittes
 * (siehe `steps.ts`). Ein ausgeblendetes Pflichtfeld — etwa die Kaltmiete bei
 * „nicht vermietet“ — kann den Abschluss deshalb nicht blockieren.
 */

export type FieldErrorCode = 'required' | 'min' | 'max' | 'postcode' | 'email' | 'futureYear'

export type FieldErrors = Readonly<Record<string, FieldErrorCode>>

/** Deutsche PLZ: genau fünf Ziffern. */
const POSTCODE_PATTERN = /^\d{5}$/

/** Bewusst tolerant — Zustellbarkeit prüft erst das Double-Opt-in. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Baujahre dürfen leicht in der Zukunft liegen (Neubau im Bau). */
const FUTURE_YEAR_TOLERANCE = 2

function isEmpty(field: FieldDescriptor, answers: Answers): boolean {
  if (field.kind === 'multi') return listAnswer(answers, field.id).length === 0
  return textAnswer(answers, field.id).trim() === ''
}

/**
 * Prüft ein einzelnes Feld. `currentYear` ist injizierbar, damit Tests nicht
 * von der Systemzeit abhängen.
 */
export function validateField(
  field: FieldDescriptor,
  answers: Answers,
  currentYear: number = new Date().getFullYear(),
): FieldErrorCode | null {
  const empty = isEmpty(field, answers)

  if (empty) {
    // Die Pflicht-Checkbox gilt nur als erfüllt, wenn sie aktiv gesetzt wurde.
    return field.status === 'required' ? 'required' : null
  }

  const raw = textAnswer(answers, field.id).trim()

  if (field.kind === 'postcode') {
    return POSTCODE_PATTERN.test(raw) ? null : 'postcode'
  }

  if (field.kind === 'email') {
    return EMAIL_PATTERN.test(raw) ? null : 'email'
  }

  if (field.kind === 'number') {
    const parsed = Number(raw.replace(/\s/g, '').replace(',', '.'))
    if (!Number.isFinite(parsed)) return 'min'
    if (field.min !== undefined && parsed < field.min) return 'min'
    if (field.max !== undefined && parsed > field.max) return 'max'
    if (field.unit === 'year' && parsed > currentYear + FUTURE_YEAR_TOLERANCE) return 'futureYear'
    return null
  }

  return null
}

/** Fehler aller sichtbaren Felder eines Schrittes, nach Feld-ID. */
export function validateFields(
  fields: readonly FieldDescriptor[],
  answers: Answers,
  currentYear?: number,
): FieldErrors {
  return fields.reduce<Record<string, FieldErrorCode>>((errors, field) => {
    const error = validateField(field, answers, currentYear)
    return error ? { ...errors, [field.id]: error } : errors
  }, {})
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0
}
