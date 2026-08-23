import { CONTACT_FIELDS, LOCATION_FIELDS, PROPERTY_FIELDS } from './fields'
import { visibleFields } from './steps'
import type { Answers, PropertyTypeId } from './types'
import { listAnswer, textAnswer } from './types'

/**
 * Abbildung der Formularantworten auf onOffice-Stammdatenfelder.
 *
 * WICHTIG: Dies ist ausschließlich eine Abbildung — es wird nichts übertragen.
 * Die Seite ist ein Frontend-Prototyp ohne Backend; die Vertrauenszusage am
 * Formular sagt zu, dass Eingaben im Browser bleiben. Die Funktion existiert,
 * damit die Feldnamen bereits den Stammdaten entsprechen und aus dem Formular
 * später ohne Nacharbeit ein sauberer Kontakt- und Objektdatensatz wird.
 *
 * `role` und `timing` gehören nicht in die Stammdaten, sondern dienen der
 * Lead-Priorisierung — sie landen deshalb in `notes` (Merkmal/Notiz).
 */

export type OnOfficeLead = {
  /** onOffice-Adressdatensatz. */
  readonly address: Readonly<Record<string, string>>
  /** onOffice-Objektdatensatz. */
  readonly estate: Readonly<Record<string, string>>
  /** Merkmale und Notizen zur Lead-Priorisierung. */
  readonly notes: Readonly<Record<string, string>>
  /** Einwilligungen, getrennt dokumentiert. */
  readonly consent: {
    readonly valuationContact: boolean
    readonly marketing: boolean
  }
}

const OBJEKTART: Record<PropertyTypeId, string> = {
  house: 'haus',
  apartment: 'wohnung',
  land: 'grundstueck',
  'apartment-building': 'zinshaus_renditeobjekt',
  commerce: 'gewerbe',
}

const ANREDE: Record<string, string> = {
  mr: 'Herr',
  ms: 'Frau',
  none: 'Keine Angabe',
}

const ZUSTAND: Record<string, string> = {
  'first-occupancy': 'erstbezug',
  renovated: 'saniert',
  maintained: 'gepflegt',
  'needs-renovation': 'renovierungsbeduerftig',
}

const HAUSTYP: Record<string, string> = {
  detached: 'einfamilienhaus',
  'semi-detached': 'doppelhaushaelfte',
  'terraced-mid': 'reihenmittelhaus',
  'terraced-end': 'reihenendhaus',
}

const ETAGE: Record<string, string> = {
  ground: '0',
  'upper-1': '1',
  'upper-2': '2',
  'upper-3': '3',
  'upper-4-plus': '4',
  attic: 'dachgeschoss',
}

const HEIZUNGSART: Record<string, string> = {
  gas: 'gas',
  oil: 'oel',
  'heat-pump': 'waermepumpe',
  district: 'fernwaerme',
  pellets: 'pellet',
  electric: 'elektro',
  other: 'sonstiges',
}

/** Nur gesetzte Werte übernehmen — leere Felder erzeugen keinen Stammdateneintrag. */
function put(
  target: Record<string, string>,
  key: string,
  value: string | undefined,
): Record<string, string> {
  if (!value || value.trim() === '') return target
  return { ...target, [key]: value.trim() }
}

/** Ja/Nein-Felder als onOffice-Boolean („1“ / „0“), sonst kein Eintrag. */
function putFlag(target: Record<string, string>, key: string, raw: string): Record<string, string> {
  if (raw !== 'yes' && raw !== 'no') return target
  return { ...target, [key]: raw === 'yes' ? '1' : '0' }
}

function buildAddress(answers: Answers): Readonly<Record<string, string>> {
  let address: Record<string, string> = {}
  address = put(address, 'Anrede', ANREDE[textAnswer(answers, 'salutation')])
  address = put(address, 'Vorname', textAnswer(answers, 'firstName'))
  address = put(address, 'Name', textAnswer(answers, 'lastName'))
  address = put(address, 'Email', textAnswer(answers, 'email'))
  address = put(address, 'Telefon1', textAnswer(answers, 'phone'))
  address = put(address, 'Strasse', textAnswer(answers, 'street'))
  address = put(address, 'Plz', textAnswer(answers, 'postcode'))
  address = put(address, 'Ort', textAnswer(answers, 'city'))
  return address
}

function buildEstate(
  propertyType: PropertyTypeId,
  answers: Answers,
): Readonly<Record<string, string>> {
  let estate: Record<string, string> = { objektart: OBJEKTART[propertyType] }

  estate = put(estate, 'plz', textAnswer(answers, 'postcode'))
  estate = put(estate, 'ort', textAnswer(answers, 'city'))
  estate = put(estate, 'strasse', textAnswer(answers, 'street'))

  estate = put(estate, 'objekttyp', HAUSTYP[textAnswer(answers, 'houseType')])
  estate = put(estate, 'gewerbeart', textAnswer(answers, 'commerceType'))

  estate = put(estate, 'wohnflaeche', textAnswer(answers, 'livingArea'))
  estate = put(estate, 'nutzflaeche', textAnswer(answers, 'usableArea'))
  estate = put(estate, 'gesamtflaeche', textAnswer(answers, 'totalArea'))
  estate = put(estate, 'grundstuecksflaeche', textAnswer(answers, 'plotArea'))
  estate = put(estate, 'anzahl_zimmer', textAnswer(answers, 'rooms'))
  estate = put(estate, 'baujahr', textAnswer(answers, 'constructionYear'))
  estate = put(estate, 'etage', ETAGE[textAnswer(answers, 'floorLevel')])
  estate = put(estate, 'anzahl_etagen', textAnswer(answers, 'floors'))
  estate = put(estate, 'zustand', ZUSTAND[textAnswer(answers, 'condition')])
  estate = put(estate, 'ausstattung', textAnswer(answers, 'fitout'))
  estate = put(estate, 'heizungsart', HEIZUNGSART[textAnswer(answers, 'heating')])
  estate = put(estate, 'energieausweis_klasse', textAnswer(answers, 'energyClass'))
  estate = put(estate, 'stellplatz', textAnswer(answers, 'parking'))
  estate = put(estate, 'anzahl_stellplaetze', textAnswer(answers, 'parkingSpaces'))
  estate = put(estate, 'unterkellert', textAnswer(answers, 'basement'))
  estate = put(estate, 'hausgeld', textAnswer(answers, 'serviceCharge'))
  estate = put(estate, 'balkon_terrasse_flaeche', textAnswer(answers, 'balconyArea'))
  estate = put(estate, 'anzahl_wohneinheiten', textAnswer(answers, 'unitsResidential'))
  estate = put(estate, 'anzahl_gewerbeeinheiten', textAnswer(answers, 'unitsCommercial'))
  estate = put(estate, 'baurecht', textAnswer(answers, 'buildingRight'))
  estate = put(estate, 'erschliessung', textAnswer(answers, 'development'))
  estate = put(estate, 'hallenhoehe', textAnswer(answers, 'hallHeight'))
  estate = put(estate, 'restlaufzeit_mietvertrag', textAnswer(answers, 'leaseRemainingYears'))
  estate = put(estate, 'mieterbonitaet', textAnswer(answers, 'tenantCredit'))

  estate = putFlag(estate, 'aufzug', textAnswer(answers, 'elevator'))
  estate = putFlag(estate, 'balkon', textAnswer(answers, 'balcony'))
  estate = putFlag(estate, 'gartennutzung', textAnswer(answers, 'garden'))
  estate = putFlag(estate, 'rampe', textAnswer(answers, 'loadingRamp'))
  estate = putFlag(estate, 'bestandsbebauung', textAnswer(answers, 'existingBuilding'))
  estate = putFlag(estate, 'leerstand', textAnswer(answers, 'vacancy'))
  estate = putFlag(estate, 'instandhaltungsstau', textAnswer(answers, 'maintenanceBacklog'))

  // Vermietungsstand — drei Quellen, ein onOffice-Feld.
  const rented =
    textAnswer(answers, 'rented') === 'yes' ||
    textAnswer(answers, 'rentalStatus') === 'rented' ||
    textAnswer(answers, 'tenure') === 'rented'
  const rentalKnown =
    textAnswer(answers, 'rented') !== '' ||
    textAnswer(answers, 'rentalStatus') !== '' ||
    textAnswer(answers, 'tenure') !== ''
  if (rentalKnown) estate = { ...estate, vermietet: rented ? '1' : '0' }

  estate = put(estate, 'kaltmiete', textAnswer(answers, 'coldRent'))
  estate = put(estate, 'jahresnettomiete', textAnswer(answers, 'annualNetRent'))

  const modernisations = listAnswer(answers, 'modernisations')
  if (modernisations.length > 0) {
    estate = { ...estate, modernisierung: modernisations.join(',') }
    estate = put(estate, 'modernisierung_jahr', textAnswer(answers, 'modernisationYear'))
  }

  return estate
}

function buildNotes(answers: Answers): Readonly<Record<string, string>> {
  let notes: Record<string, string> = {}
  notes = put(notes, 'zeithorizont', textAnswer(answers, 'timing'))
  notes = put(notes, 'rolle', textAnswer(answers, 'role'))
  notes = put(notes, 'kontaktweg', textAnswer(answers, 'preferredChannel'))
  notes = put(notes, 'kontaktzeit', textAnswer(answers, 'preferredTime'))
  notes = put(notes, 'aufmerksam_durch', textAnswer(answers, 'source'))
  notes = put(notes, 'zuschnitt', textAnswer(answers, 'plotShape'))
  notes = put(notes, 'bplan_grz_gfz', textAnswer(answers, 'planningNotes'))
  notes = put(notes, 'leerstand_umfang', textAnswer(answers, 'vacancyExtent'))
  notes = put(notes, 'instandhaltung_beschreibung', textAnswer(answers, 'maintenanceNote'))
  notes = put(notes, 'technische_ausstattung', textAnswer(answers, 'technicalFitout'))
  return notes
}

/**
 * Baut den Datensatz aus den Antworten. Es werden nur Felder berücksichtigt,
 * die für die gewählte Objektart tatsächlich sichtbar waren — ausgeblendete
 * Eingaben (etwa eine zuvor getippte Kaltmiete) gelangen nicht in die Übergabe.
 */
export function toOnOfficeLead(propertyType: PropertyTypeId, answers: Answers): OnOfficeLead {
  // Erlaubt ist, was für *diese* Objektart tatsächlich sichtbar war — plus die
  // gemeinsamen Lage- und Kontaktfelder. Damit fallen sowohl ausgeblendete
  // Felder als auch Reste einer zuvor gewählten Objektart heraus.
  const allowed = new Set([
    ...LOCATION_FIELDS.map((field) => field.id),
    ...CONTACT_FIELDS.map((field) => field.id),
    ...visibleFields(PROPERTY_FIELDS[propertyType], answers).map((field) => field.id),
  ])

  const scoped: Record<string, string | readonly string[] | undefined> = {}
  for (const [key, value] of Object.entries(answers)) {
    if (!allowed.has(key)) continue
    scoped[key] = value
  }

  return {
    address: buildAddress(scoped),
    estate: buildEstate(propertyType, scoped),
    notes: buildNotes(scoped),
    consent: {
      valuationContact: textAnswer(scoped, 'consent') === 'yes',
      marketing: textAnswer(scoped, 'marketingConsent') === 'yes',
    },
  }
}
