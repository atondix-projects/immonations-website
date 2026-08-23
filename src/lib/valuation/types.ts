import type { OptionSetId } from './options'

/**
 * Objektarten des Wizards — erste Weiche der Abfrage.
 * Reihenfolge entspricht der Spezifikation (Haus zuerst).
 */
export const PROPERTY_TYPE_IDS = [
  'house',
  'apartment',
  'land',
  'apartment-building',
  'commerce',
] as const

export type PropertyTypeId = (typeof PROPERTY_TYPE_IDS)[number]

export function isPropertyTypeId(value: unknown): value is PropertyTypeId {
  return typeof value === 'string' && (PROPERTY_TYPE_IDS as readonly string[]).includes(value)
}

/** Schrittfolge: Objektart -> Lage -> Kerndaten -> optionale Details -> Kontakt. */
export const WIZARD_STEP_IDS = ['type', 'location', 'core', 'details', 'contact'] as const

export type WizardStepId = (typeof WIZARD_STEP_IDS)[number]

export const WIZARD_STEP_COUNT = WIZARD_STEP_IDS.length

export type FieldKind =
  | 'number'
  | 'text'
  | 'choice'
  | 'boolean'
  | 'multi'
  | 'checkbox'
  | 'email'
  | 'tel'
  | 'postcode'

/** Einheit hinter einem Zahlenfeld — rein fuer die Darstellung. */
export type FieldUnit = 'sqm' | 'eur' | 'eurPerMonth' | 'eurPerYear' | 'year' | 'metre' | 'count'

export type AnswerValue = string | readonly string[]

export type Answers = Readonly<Record<string, AnswerValue | undefined>>

export type FieldDescriptor = {
  readonly id: string
  readonly kind: FieldKind
  readonly status: 'required' | 'optional'
  readonly optionSet?: OptionSetId
  readonly unit?: FieldUnit
  readonly min?: number
  readonly max?: number
  readonly maxLength?: number
  readonly span?: 'half' | 'full'
  /**
   * Bedingte Sichtbarkeit. Fehlt das Praedikat, ist das Feld immer sichtbar.
   * Unsichtbare Pflichtfelder werden nicht validiert — siehe `validation.ts`.
   */
  readonly visibleWhen?: (answers: Answers) => boolean
}

/** Textwert eines Feldes — leerer String, wenn nicht gesetzt. */
export function textAnswer(answers: Answers, id: string): string {
  const value = answers[id]
  return typeof value === 'string' ? value : ''
}

/** Mehrfachauswahl eines Feldes — leere Liste, wenn nicht gesetzt. */
export function listAnswer(answers: Answers, id: string): readonly string[] {
  const value = answers[id]
  return Array.isArray(value) ? value : []
}

/**
 * Zahlwert eines Feldes. Akzeptiert Komma als Dezimaltrenner (DE-Eingabe)
 * und liefert `null`, wenn nichts Verwertbares eingegeben wurde.
 */
export function numberAnswer(answers: Answers, id: string): number | null {
  const raw = textAnswer(answers, id).replace(/\s/g, '').replace(',', '.')
  if (raw === '') return null
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : null
}

/** Ja/Nein-Felder speichern `'yes'` bzw. `'no'`. */
export function isYes(answers: Answers, id: string): boolean {
  return textAnswer(answers, id) === 'yes'
}
