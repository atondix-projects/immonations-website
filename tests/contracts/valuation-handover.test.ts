import { describe, expect, it } from 'vitest'
import { estimateValue } from '@/lib/valuation/estimate'
import { toOnOfficeLead } from '@/lib/valuation/onoffice'
import type { Answers } from '@/lib/valuation/types'

/**
 * Vertragstest für Ergebnis-Logik und onOffice-Abbildung.
 *
 * Die Abbildung überträgt nichts — sie erzeugt nur den Datensatz. Getestet
 * wird deshalb ausschließlich die Form der Ausgabe.
 */

const APARTMENT: Answers = {
  postcode: '90475',
  city: 'Nürnberg',
  timing: 'concrete',
  livingArea: '80',
  rooms: '3',
  constructionYear: '1995',
  floorLevel: 'upper-2',
  condition: 'maintained',
  rented: 'no',
  salutation: 'ms',
  firstName: 'Anna',
  lastName: 'Bauer',
  email: 'anna.bauer@example.de',
  phone: '0911 1234567',
  role: 'owner',
  consent: 'yes',
}

describe('valuation estimate', () => {
  it('derives a range from published district figures', () => {
    const estimate = estimateValue('apartment', APARTMENT)
    expect(estimate.kind).toBe('range')
    if (estimate.kind !== 'range') return

    expect(estimate.low).toBeLessThan(estimate.high)
    expect(estimate.low).toBeGreaterThan(0)
    expect(estimate.cityName).toBe('Nürnberg')
    expect(estimate.districts.length).toBeGreaterThan(0)
    // 80 m² zu mehreren tausend Euro je m² — Größenordnung muss stimmen.
    expect(estimate.low).toBeGreaterThan(100_000)
    expect(estimate.high).toBeLessThan(2_000_000)
  })

  it('never returns a point value', () => {
    const estimate = estimateValue('house', { ...APARTMENT, postcode: '90402' })
    expect(estimate.kind).toBe('range')
    if (estimate.kind !== 'range') return
    expect(estimate.high).toBeGreaterThan(estimate.low)
  })

  it('moves the range with the stated condition', () => {
    const poor = estimateValue('apartment', { ...APARTMENT, condition: 'needs-renovation' })
    const fresh = estimateValue('apartment', { ...APARTMENT, condition: 'first-occupancy' })
    if (poor.kind !== 'range' || fresh.kind !== 'range') throw new Error('expected ranges')
    expect(fresh.low).toBeGreaterThan(poor.low)
    expect(fresh.high).toBeGreaterThan(poor.high)
  })

  it('reports unavailability instead of inventing a figure', () => {
    for (const type of ['land', 'apartment-building', 'commerce'] as const) {
      const estimate = estimateValue(type, APARTMENT)
      expect(estimate.kind).toBe('unavailable')
      if (estimate.kind === 'unavailable') expect(estimate.reason).toBe('unsupported-type')
    }

    const unknown = estimateValue('apartment', { ...APARTMENT, postcode: '10115' })
    expect(unknown).toEqual({ kind: 'unavailable', reason: 'unknown-location' })

    const noArea = estimateValue('apartment', { ...APARTMENT, livingArea: '' })
    expect(noArea).toEqual({ kind: 'unavailable', reason: 'missing-area' })
  })
})

describe('onOffice handover mapping', () => {
  it('maps contact details onto address master data', () => {
    const lead = toOnOfficeLead('apartment', APARTMENT)
    expect(lead.address).toMatchObject({
      Anrede: 'Frau',
      Vorname: 'Anna',
      Name: 'Bauer',
      Email: 'anna.bauer@example.de',
      Telefon1: '0911 1234567',
      Plz: '90475',
      Ort: 'Nürnberg',
    })
  })

  it('maps object details onto estate master data', () => {
    const lead = toOnOfficeLead('apartment', APARTMENT)
    expect(lead.estate).toMatchObject({
      objektart: 'wohnung',
      wohnflaeche: '80',
      anzahl_zimmer: '3',
      baujahr: '1995',
      etage: '2',
      zustand: 'gepflegt',
      vermietet: '0',
    })
    expect(lead.estate.kaltmiete).toBeUndefined()
  })

  it('keeps role and time frame out of the master data — they prioritise the lead', () => {
    const lead = toOnOfficeLead('apartment', APARTMENT)
    expect(lead.notes).toMatchObject({ rolle: 'owner', zeithorizont: 'concrete' })
    expect(lead.estate.rolle).toBeUndefined()
    expect(lead.address.rolle).toBeUndefined()
  })

  it('records both consents separately', () => {
    const lead = toOnOfficeLead('apartment', APARTMENT)
    expect(lead.consent).toEqual({ valuationContact: true, marketing: false })

    const withMarketing = toOnOfficeLead('apartment', { ...APARTMENT, marketingConsent: 'yes' })
    expect(withMarketing.consent).toEqual({ valuationContact: true, marketing: true })
  })

  it('drops values whose field was hidden at the time of submission', () => {
    // Die Kaltmiete wurde getippt, danach aber auf "nicht vermietet" gewechselt.
    const lead = toOnOfficeLead('apartment', { ...APARTMENT, rented: 'no', coldRent: '850' })
    expect(lead.estate.kaltmiete).toBeUndefined()
    expect(lead.estate.vermietet).toBe('0')

    const rented = toOnOfficeLead('apartment', { ...APARTMENT, rented: 'yes', coldRent: '850' })
    expect(rented.estate.kaltmiete).toBe('850')
    expect(rented.estate.vermietet).toBe('1')
  })

  it('carries the commercial branch into its own onOffice fields', () => {
    const lead = toOnOfficeLead('commerce', {
      ...APARTMENT,
      commerceType: 'hall',
      usableArea: '1200',
      plotArea: '3000',
      tenure: 'rented',
      annualNetRent: '96000',
      leaseRemainingYears: '7',
      hallHeight: '9',
    })
    expect(lead.estate).toMatchObject({
      objektart: 'gewerbe',
      gewerbeart: 'hall',
      nutzflaeche: '1200',
      jahresnettomiete: '96000',
      restlaufzeit_mietvertrag: '7',
      hallenhoehe: '9',
      vermietet: '1',
    })
    // Wohnflaeche gehoert nicht zum Gewerbe-Datensatz.
    expect(lead.estate.wohnflaeche).toBeUndefined()
  })

  it('omits empty fields instead of writing blanks', () => {
    const lead = toOnOfficeLead('land', {
      postcode: '90513',
      city: 'Zirndorf',
      plotArea: '650',
      buildingRight: 'building-land',
      development: 'full',
      firstName: 'Max',
      lastName: 'Huber',
      email: 'max@example.de',
      consent: 'yes',
    })
    expect(Object.values(lead.address).every((value) => value !== '')).toBe(true)
    expect(Object.values(lead.estate).every((value) => value !== '')).toBe(true)
    expect(lead.address.Telefon1).toBeUndefined()
    expect(lead.estate.baujahr).toBeUndefined()
  })
})
