import { describe, expect, it } from 'vitest'
import de from '../../messages/de.json'
import en from '../../messages/en.json'
import { CONTACT_FIELDS, LOCATION_FIELDS, PROPERTY_FIELDS } from '@/lib/valuation/fields'
import { OPTION_SETS, type OptionSetId } from '@/lib/valuation/options'
import { fieldsForStep, visibleFields } from '@/lib/valuation/steps'
import {
  PROPERTY_TYPE_IDS,
  WIZARD_STEP_IDS,
  type Answers,
  type FieldDescriptor,
  type PropertyTypeId,
} from '@/lib/valuation/types'
import { hasErrors, validateFields } from '@/lib/valuation/validation'

/**
 * Vertragstest des Bewertungs-Wizards.
 *
 * Der bilinguale Vertrag ist die eigentliche Bruchstelle: ein fehlendes
 * englisches Label fällt in keinem UI-Snapshot auf. Deshalb wird hier jede
 * Feld- und Options-ID gegen *beide* Sprachdateien geprüft.
 */

const LOCALES = { de, en } as const

type MessageNode = Record<string, unknown>

/** Löst einen Punkt-Pfad in der Sprachdatei auf. */
function lookup(bundle: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (node, key) => (node && typeof node === 'object' ? (node as MessageNode)[key] : undefined),
      bundle,
    )
}

function expectStringInBothLocales(path: string) {
  for (const [locale, bundle] of Object.entries(LOCALES)) {
    const value = lookup(bundle.ValuationWizard, path)
    expect(typeof value, `${locale}: ValuationWizard.${path} must be a string`).toBe('string')
    expect(
      (value as string).trim(),
      `${locale}: ValuationWizard.${path} must not be empty`,
    ).not.toBe('')
  }
}

/** Jede Feld-ID, die der Wizard überhaupt erheben kann. */
const ALL_FIELDS: readonly FieldDescriptor[] = [
  ...LOCATION_FIELDS,
  ...PROPERTY_TYPE_IDS.flatMap((id) => PROPERTY_FIELDS[id]),
  ...CONTACT_FIELDS,
]

describe('valuation schema — bilingual contract', () => {
  it('labels every property type in both locales', () => {
    for (const id of PROPERTY_TYPE_IDS) {
      expectStringInBothLocales(`propertyTypes.${id}`)
    }
  })

  it('titles and describes every step in both locales', () => {
    for (const step of WIZARD_STEP_IDS) {
      expectStringInBothLocales(`steps.${step}.title`)
      expectStringInBothLocales(`steps.${step}.text`)
    }
  })

  it('labels every field in both locales', () => {
    for (const field of ALL_FIELDS) {
      expectStringInBothLocales(`fields.${field.id}.label`)
    }
  })

  it('labels every option of every referenced option set in both locales', () => {
    const referenced = new Set<OptionSetId>()
    for (const field of ALL_FIELDS) {
      if (field.optionSet) referenced.add(field.optionSet)
    }

    // Jedes definierte Set wird auch benutzt — sonst ist es toter Ballast.
    expect([...referenced].sort()).toEqual((Object.keys(OPTION_SETS) as OptionSetId[]).sort())

    for (const setId of referenced) {
      for (const option of OPTION_SETS[setId]) {
        expectStringInBothLocales(`options.${setId}.${option}`)
      }
    }
  })

  it('provides units, boolean labels and error messages in both locales', () => {
    for (const unit of ['sqm', 'eur', 'eurPerMonth', 'eurPerYear', 'year', 'metre', 'count']) {
      expectStringInBothLocales(`units.${unit}`)
    }
    for (const flag of ['yes', 'no']) {
      expectStringInBothLocales(`boolean.${flag}`)
    }
    for (const code of ['required', 'min', 'max', 'postcode', 'email', 'futureYear', 'summary']) {
      expectStringInBothLocales(`errors.${code}`)
    }
    for (const reason of ['unsupported-type', 'unknown-location', 'missing-area']) {
      expectStringInBothLocales(`result.unavailable.${reason}`)
    }
  })

  it('keeps the consent label pointing at the privacy policy', () => {
    for (const [locale, bundle] of Object.entries(LOCALES)) {
      const label = lookup(bundle.ValuationWizard, 'fields.consent.label')
      expect(label, `${locale}: consent label must link the privacy policy`).toContain('<link>')
    }
  })

  it('uses unique field ids per property type', () => {
    for (const id of PROPERTY_TYPE_IDS) {
      const ids = PROPERTY_FIELDS[id].map((field) => field.id)
      expect(new Set(ids).size, `${id} has duplicate field ids`).toBe(ids.length)
    }
  })
})

describe('valuation schema — required fields per property type', () => {
  /** Pflichtfelder, die ohne jede Vorauswahl sichtbar sind. */
  function baseRequired(propertyType: PropertyTypeId): readonly string[] {
    return fieldsForStep('core', propertyType, {}).map((field) => field.id)
  }

  it('matches the specification for Wohnung', () => {
    expect(baseRequired('apartment')).toEqual([
      'livingArea',
      'rooms',
      'constructionYear',
      'floorLevel',
      'condition',
      'rented',
    ])
  })

  it('matches the specification for Haus', () => {
    expect(baseRequired('house')).toEqual([
      'houseType',
      'livingArea',
      'plotArea',
      'rooms',
      'constructionYear',
      'condition',
      'rentalStatus',
    ])
  })

  it('matches the specification for Grundstück', () => {
    expect(baseRequired('land')).toEqual(['plotArea', 'buildingRight', 'development'])
  })

  it('matches the specification for Mehrfamilienhaus', () => {
    expect(baseRequired('apartment-building')).toEqual([
      'unitsResidential',
      'unitsCommercial',
      'totalArea',
      'plotArea',
      'constructionYear',
      'annualNetRent',
    ])
  })

  it('matches the specification for Gewerbe', () => {
    expect(baseRequired('commerce')).toEqual([
      'commerceType',
      'usableArea',
      'plotArea',
      'constructionYear',
      'condition',
      'tenure',
    ])
  })

  it('requires first name, last name, email and consent — nothing else', () => {
    const required = CONTACT_FIELDS.filter((field) => field.status === 'required').map(
      (field) => field.id,
    )
    expect(required).toEqual(['firstName', 'lastName', 'email', 'consent'])
  })

  it('keeps the marketing consent optional and separate from the required one', () => {
    const marketing = CONTACT_FIELDS.find((field) => field.id === 'marketingConsent')
    expect(marketing?.status).toBe('optional')
    expect(marketing?.visibleWhen).toBeUndefined()
  })
})

describe('valuation schema — conditional visibility (spec §4)', () => {
  const visibleIds = (propertyType: PropertyTypeId, answers: Answers) =>
    visibleFields(PROPERTY_FIELDS[propertyType], answers).map((field) => field.id)

  it('shows the lift only for an apartment above the ground floor', () => {
    expect(visibleIds('apartment', {})).not.toContain('elevator')
    expect(visibleIds('apartment', { floorLevel: 'ground' })).not.toContain('elevator')
    expect(visibleIds('apartment', { floorLevel: 'upper-1' })).toContain('elevator')
    expect(visibleIds('apartment', { floorLevel: 'attic' })).toContain('elevator')
  })

  it('offers a basement only for houses', () => {
    expect(visibleIds('house', {})).toContain('basement')
    for (const other of ['apartment', 'land', 'apartment-building', 'commerce'] as const) {
      expect(visibleIds(other, {})).not.toContain('basement')
    }
  })

  it('asks for rent only once "rented" is chosen', () => {
    expect(visibleIds('apartment', {})).not.toContain('coldRent')
    expect(visibleIds('apartment', { rented: 'no' })).not.toContain('coldRent')
    expect(visibleIds('apartment', { rented: 'yes' })).toContain('coldRent')

    expect(visibleIds('house', { rentalStatus: 'vacant' })).not.toContain('coldRent')
    expect(visibleIds('house', { rentalStatus: 'rented' })).toContain('coldRent')

    expect(visibleIds('commerce', { tenure: 'owner-occupied' })).not.toContain('annualNetRent')
    const rentedCommerce = visibleIds('commerce', { tenure: 'rented' })
    expect(rentedCommerce).toContain('annualNetRent')
    expect(rentedCommerce).toContain('leaseRemainingYears')
    expect(rentedCommerce).toContain('tenantCredit')
  })

  it('uses usable area instead of living area for commercial property only', () => {
    expect(visibleIds('commerce', {})).toContain('usableArea')
    expect(visibleIds('commerce', {})).not.toContain('livingArea')
    expect(visibleIds('apartment', {})).toContain('livingArea')
    expect(visibleIds('apartment', {})).not.toContain('usableArea')
  })

  it('requires the annual net rent only for the apartment building', () => {
    const requiredEverywhere = PROPERTY_TYPE_IDS.filter((id) =>
      PROPERTY_FIELDS[id].some(
        (field) =>
          field.id === 'annualNetRent' &&
          field.status === 'required' &&
          field.visibleWhen === undefined,
      ),
    )
    expect(requiredEverywhere).toEqual(['apartment-building'])
  })

  it('shows hall specifics only for the hall commercial type', () => {
    expect(visibleIds('commerce', { commerceType: 'office' })).not.toContain('hallHeight')
    const hall = visibleIds('commerce', { commerceType: 'hall' })
    expect(hall).toContain('hallHeight')
    expect(hall).toContain('loadingRamp')
  })
})

describe('valuation validation', () => {
  const CURRENT_YEAR = 2026

  it('never blocks on a hidden required field', () => {
    // "nicht vermietet" blendet die Kaltmiete aus — sie darf nicht gefordert werden.
    const answers: Answers = {
      livingArea: '90',
      rooms: '3',
      constructionYear: '1998',
      floorLevel: 'upper-1',
      condition: 'maintained',
      rented: 'no',
    }
    const fields = fieldsForStep('core', 'apartment', answers)
    expect(fields.map((field) => field.id)).not.toContain('coldRent')
    expect(hasErrors(validateFields(fields, answers, CURRENT_YEAR))).toBe(false)
  })

  it('does demand the rent once the field becomes visible', () => {
    const answers: Answers = {
      livingArea: '90',
      rooms: '3',
      constructionYear: '1998',
      floorLevel: 'upper-1',
      condition: 'maintained',
      rented: 'yes',
    }
    const errors = validateFields(
      fieldsForStep('core', 'apartment', answers),
      answers,
      CURRENT_YEAR,
    )
    expect(errors.coldRent).toBe('required')
  })

  it('rejects malformed postcodes and email addresses', () => {
    const answers: Answers = { postcode: '905', city: 'Zirndorf', timing: 'concrete' }
    const errors = validateFields(fieldsForStep('location', null, answers), answers, CURRENT_YEAR)
    expect(errors.postcode).toBe('postcode')

    const contact: Answers = {
      firstName: 'Anna',
      lastName: 'Bauer',
      email: 'anna@example',
      consent: 'yes',
    }
    const contactErrors = validateFields(
      fieldsForStep('contact', null, contact),
      contact,
      CURRENT_YEAR,
    )
    expect(contactErrors.email).toBe('email')
  })

  it('accepts a complete contact step without the marketing consent', () => {
    const contact: Answers = {
      firstName: 'Anna',
      lastName: 'Bauer',
      email: 'anna@example.de',
      consent: 'yes',
    }
    const errors = validateFields(fieldsForStep('contact', null, contact), contact, CURRENT_YEAR)
    expect(hasErrors(errors)).toBe(false)
  })

  it('blocks submission while the required consent is unchecked', () => {
    const contact: Answers = {
      firstName: 'Anna',
      lastName: 'Bauer',
      email: 'anna@example.de',
      marketingConsent: 'yes',
    }
    const errors = validateFields(fieldsForStep('contact', null, contact), contact, CURRENT_YEAR)
    expect(errors.consent).toBe('required')
  })

  it('rejects construction years far in the future', () => {
    const answers: Answers = { constructionYear: '2099' }
    const field = PROPERTY_FIELDS.apartment.find((entry) => entry.id === 'constructionYear')
    expect(field).toBeDefined()
    const errors = validateFields(field ? [field] : [], answers, CURRENT_YEAR)
    expect(errors.constructionYear).toBe('futureYear')
  })

  it('leaves the optional details step passable when nothing is filled in', () => {
    for (const id of PROPERTY_TYPE_IDS) {
      const fields = fieldsForStep('details', id, {})
      expect(hasErrors(validateFields(fields, {}, CURRENT_YEAR)), `${id} details`).toBe(false)
    }
  })
})
