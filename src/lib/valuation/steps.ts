import { CONTACT_FIELDS, LOCATION_FIELDS, PROPERTY_FIELDS } from './fields'
import type { Answers, FieldDescriptor, PropertyTypeId, WizardStepId } from './types'

/**
 * Auflösung der Schritte auf konkrete Feldlisten.
 *
 * Sichtbarkeit wird immer gegen die *aktuellen* Antworten berechnet. Alles,
 * was validiert oder übergeben wird, leitet sich aus diesen Funktionen ab —
 * ein ausgeblendetes Pflichtfeld darf den Abschluss nie blockieren.
 */

/** Behält nur Felder, deren Bedingung zu den aktuellen Antworten passt. */
export function visibleFields(
  fields: readonly FieldDescriptor[],
  answers: Answers,
): readonly FieldDescriptor[] {
  return fields.filter((field) => field.visibleWhen?.(answers) ?? true)
}

/**
 * Sichtbare Felder eines Schrittes.
 * Der Schritt „type“ hat kein Feld im Sinne dieser Liste — die Objektart wird
 * als eigene Weiche gerendert.
 */
export function fieldsForStep(
  step: WizardStepId,
  propertyType: PropertyTypeId | null,
  answers: Answers,
): readonly FieldDescriptor[] {
  if (step === 'type') return []
  if (step === 'location') return visibleFields(LOCATION_FIELDS, answers)
  if (step === 'contact') return visibleFields(CONTACT_FIELDS, answers)
  if (!propertyType) return []

  const objectFields = PROPERTY_FIELDS[propertyType]
  const wanted = step === 'core' ? 'required' : 'optional'

  return visibleFields(
    objectFields.filter((field) => field.status === wanted),
    answers,
  )
}
