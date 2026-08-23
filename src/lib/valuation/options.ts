/**
 * Auswahllisten des Bewertungs-Wizards.
 *
 * Jede Option ist eine stabile ID. Die sichtbaren Beschriftungen liegen
 * ausschliesslich in `messages/{de,en}.json` unter `ValuationWizard.options`.
 * Nichts hier ist positionsabhaengig — die ID ist der einzige Schluessel.
 */

export const OPTION_SETS = {
  timing: ['concrete', 'one-to-two-years', 'interest-only'],
  condition: ['first-occupancy', 'renovated', 'maintained', 'needs-renovation'],
  houseType: ['detached', 'semi-detached', 'terraced-mid', 'terraced-end'],
  floorLevel: ['ground', 'upper-1', 'upper-2', 'upper-3', 'upper-4-plus', 'attic'],
  parking: ['none', 'outdoor', 'garage', 'underground'],
  fitout: ['simple', 'normal', 'upscale'],
  basement: ['none', 'unfinished', 'finished'],
  buildingRight: ['building-land', 'expectant-land', 'no-building-right'],
  development: ['full', 'partial', 'none'],
  heating: ['gas', 'oil', 'heat-pump', 'district', 'pellets', 'electric', 'other'],
  energyClass: ['a-plus', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'unknown'],
  modernisation: ['roof', 'windows', 'heating', 'bathroom'],
  commerceType: ['office', 'retail', 'hall', 'practice', 'gastronomy', 'special'],
  rentalStatus: ['vacant', 'rented'],
  tenure: ['owner-occupied', 'rented'],
  tenantCredit: ['strong', 'medium', 'weak', 'unknown'],
  salutation: ['mr', 'ms', 'none'],
  preferredChannel: ['phone', 'email'],
  preferredTime: ['morning', 'afternoon', 'evening'],
  role: ['owner', 'co-owner', 'heir', 'authorised', 'agent'],
  source: ['google', 'referral', 'portal', 'social', 'other'],
} as const satisfies Record<string, readonly string[]>

export type OptionSetId = keyof typeof OPTION_SETS

export const OPTION_SET_IDS = Object.keys(OPTION_SETS) as readonly OptionSetId[]

/** Optionen eines Sets — immer definiert, daher ohne Fallback nutzbar. */
export function optionsOf(setId: OptionSetId): readonly string[] {
  return OPTION_SETS[setId]
}
