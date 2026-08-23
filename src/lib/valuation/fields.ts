import type { Answers, FieldDescriptor, PropertyTypeId } from './types'
import { listAnswer, textAnswer } from './types'

/**
 * Felddefinitionen des Bewertungs-Wizards.
 *
 * `status` erfüllt zwei Aufgaben: es steuert die Validierung *und* die
 * Aufteilung auf die Schritte „Kern-Objektdaten“ (required) und
 * „optionale Details“ (optional). Deshalb gibt es keine zweite Gruppierung.
 *
 * Bedingte Felder tragen `visibleWhen`. Die Regeln folgen Abschnitt 4 der
 * Spezifikation: Aufzug nur ab Obergeschoss, Keller nur beim Haus, Mietfelder
 * nur bei „vermietet“, Hallenfelder nur bei Gewerbeart „Halle“.
 */

// ---------------------------------------------------------------------------
// Wiederverwendete Bausteine
// ---------------------------------------------------------------------------

const constructionYear: FieldDescriptor = {
  id: 'constructionYear',
  kind: 'number',
  status: 'required',
  unit: 'year',
  min: 1500,
  span: 'half',
}

const plotArea: FieldDescriptor = {
  id: 'plotArea',
  kind: 'number',
  status: 'required',
  unit: 'sqm',
  min: 1,
  span: 'half',
}

const condition: FieldDescriptor = {
  id: 'condition',
  kind: 'choice',
  status: 'required',
  optionSet: 'condition',
  span: 'full',
}

const energyClass: FieldDescriptor = {
  id: 'energyClass',
  kind: 'choice',
  status: 'optional',
  optionSet: 'energyClass',
  span: 'full',
}

const parkingSpaces: FieldDescriptor = {
  id: 'parkingSpaces',
  kind: 'number',
  status: 'optional',
  unit: 'count',
  min: 0,
  span: 'half',
}

// ---------------------------------------------------------------------------
// Gemeinsame Felder (Schritt „Lage“)
// ---------------------------------------------------------------------------

export const LOCATION_FIELDS: readonly FieldDescriptor[] = [
  { id: 'postcode', kind: 'postcode', status: 'required', span: 'half' },
  { id: 'city', kind: 'text', status: 'required', maxLength: 80, span: 'half' },
  { id: 'street', kind: 'text', status: 'optional', maxLength: 120, span: 'full' },
  { id: 'timing', kind: 'choice', status: 'required', optionSet: 'timing', span: 'full' },
]

// ---------------------------------------------------------------------------
// Felder je Objektart
// ---------------------------------------------------------------------------

const APARTMENT_FIELDS: readonly FieldDescriptor[] = [
  { id: 'livingArea', kind: 'number', status: 'required', unit: 'sqm', min: 10, span: 'half' },
  { id: 'rooms', kind: 'number', status: 'required', min: 1, span: 'half' },
  constructionYear,
  { id: 'floorLevel', kind: 'choice', status: 'required', optionSet: 'floorLevel', span: 'full' },
  condition,
  { id: 'rented', kind: 'boolean', status: 'required', span: 'full' },
  {
    id: 'coldRent',
    kind: 'number',
    status: 'required',
    unit: 'eurPerMonth',
    min: 0,
    span: 'half',
    visibleWhen: (answers) => textAnswer(answers, 'rented') === 'yes',
  },
  // Optionale Details
  {
    id: 'elevator',
    kind: 'boolean',
    status: 'optional',
    span: 'full',
    // „Aufzug“ nur bei Wohnung ab dem Obergeschoss.
    visibleWhen: (answers) => {
      const floor = textAnswer(answers, 'floorLevel')
      return floor !== '' && floor !== 'ground'
    },
  },
  { id: 'balcony', kind: 'boolean', status: 'optional', span: 'full' },
  {
    id: 'balconyArea',
    kind: 'number',
    status: 'optional',
    unit: 'sqm',
    min: 0,
    span: 'half',
    visibleWhen: (answers) => textAnswer(answers, 'balcony') === 'yes',
  },
  { id: 'garden', kind: 'boolean', status: 'optional', span: 'full' },
  { id: 'parking', kind: 'choice', status: 'optional', optionSet: 'parking', span: 'full' },
  { id: 'fitout', kind: 'choice', status: 'optional', optionSet: 'fitout', span: 'full' },
  {
    id: 'serviceCharge',
    kind: 'number',
    status: 'optional',
    unit: 'eurPerMonth',
    min: 0,
    span: 'half',
  },
  energyClass,
]

const HOUSE_FIELDS: readonly FieldDescriptor[] = [
  { id: 'houseType', kind: 'choice', status: 'required', optionSet: 'houseType', span: 'full' },
  { id: 'livingArea', kind: 'number', status: 'required', unit: 'sqm', min: 10, span: 'half' },
  plotArea,
  { id: 'rooms', kind: 'number', status: 'required', min: 1, span: 'half' },
  constructionYear,
  condition,
  {
    id: 'rentalStatus',
    kind: 'choice',
    status: 'required',
    optionSet: 'rentalStatus',
    span: 'full',
  },
  {
    id: 'coldRent',
    kind: 'number',
    status: 'required',
    unit: 'eurPerMonth',
    min: 0,
    span: 'half',
    visibleWhen: (answers) => textAnswer(answers, 'rentalStatus') === 'rented',
  },
  // Optionale Details
  { id: 'floors', kind: 'number', status: 'optional', unit: 'count', min: 1, span: 'half' },
  // „Keller (ausgebaut)“ nur beim Haus — daher ausschließlich in dieser Liste.
  { id: 'basement', kind: 'choice', status: 'optional', optionSet: 'basement', span: 'full' },
  { id: 'parking', kind: 'choice', status: 'optional', optionSet: 'parking', span: 'full' },
  {
    id: 'modernisations',
    kind: 'multi',
    status: 'optional',
    optionSet: 'modernisation',
    span: 'full',
  },
  {
    id: 'modernisationYear',
    kind: 'number',
    status: 'optional',
    unit: 'year',
    min: 1500,
    span: 'half',
    visibleWhen: (answers) => listAnswer(answers, 'modernisations').length > 0,
  },
  { id: 'heating', kind: 'choice', status: 'optional', optionSet: 'heating', span: 'full' },
  energyClass,
]

const LAND_FIELDS: readonly FieldDescriptor[] = [
  plotArea,
  {
    id: 'buildingRight',
    kind: 'choice',
    status: 'required',
    optionSet: 'buildingRight',
    span: 'full',
  },
  { id: 'development', kind: 'choice', status: 'required', optionSet: 'development', span: 'full' },
  // Optionale Details
  { id: 'existingBuilding', kind: 'boolean', status: 'optional', span: 'full' },
  { id: 'plotShape', kind: 'text', status: 'optional', maxLength: 160, span: 'full' },
  { id: 'planningNotes', kind: 'text', status: 'optional', maxLength: 240, span: 'full' },
]

const APARTMENT_BUILDING_FIELDS: readonly FieldDescriptor[] = [
  {
    id: 'unitsResidential',
    kind: 'number',
    status: 'required',
    unit: 'count',
    min: 1,
    span: 'half',
  },
  {
    id: 'unitsCommercial',
    kind: 'number',
    status: 'required',
    unit: 'count',
    min: 0,
    span: 'half',
  },
  { id: 'totalArea', kind: 'number', status: 'required', unit: 'sqm', min: 10, span: 'half' },
  plotArea,
  constructionYear,
  // Zentraler Werttreiber beim Zinshaus — deshalb Pflicht nur hier.
  {
    id: 'annualNetRent',
    kind: 'number',
    status: 'required',
    unit: 'eurPerYear',
    min: 0,
    span: 'half',
  },
  // Optionale Details
  { id: 'vacancy', kind: 'boolean', status: 'optional', span: 'full' },
  {
    id: 'vacancyExtent',
    kind: 'text',
    status: 'optional',
    maxLength: 160,
    span: 'full',
    visibleWhen: (answers) => textAnswer(answers, 'vacancy') === 'yes',
  },
  { id: 'maintenanceBacklog', kind: 'boolean', status: 'optional', span: 'full' },
  {
    id: 'maintenanceNote',
    kind: 'text',
    status: 'optional',
    maxLength: 240,
    span: 'full',
    visibleWhen: (answers) => textAnswer(answers, 'maintenanceBacklog') === 'yes',
  },
  parkingSpaces,
  energyClass,
]

const isRentedCommerce = (answers: Answers) => textAnswer(answers, 'tenure') === 'rented'
const isHall = (answers: Answers) => textAnswer(answers, 'commerceType') === 'hall'

const COMMERCE_FIELDS: readonly FieldDescriptor[] = [
  {
    id: 'commerceType',
    kind: 'choice',
    status: 'required',
    optionSet: 'commerceType',
    span: 'full',
  },
  // „Nutzfläche“ statt „Wohnfläche“ — nur beim Gewerbe.
  { id: 'usableArea', kind: 'number', status: 'required', unit: 'sqm', min: 10, span: 'half' },
  plotArea,
  constructionYear,
  condition,
  { id: 'tenure', kind: 'choice', status: 'required', optionSet: 'tenure', span: 'full' },
  {
    id: 'annualNetRent',
    kind: 'number',
    status: 'required',
    unit: 'eurPerYear',
    min: 0,
    span: 'half',
    visibleWhen: isRentedCommerce,
  },
  {
    id: 'leaseRemainingYears',
    kind: 'number',
    status: 'required',
    unit: 'count',
    min: 0,
    span: 'half',
    visibleWhen: isRentedCommerce,
  },
  // Optionale Details
  {
    id: 'tenantCredit',
    kind: 'choice',
    status: 'optional',
    optionSet: 'tenantCredit',
    span: 'full',
    visibleWhen: isRentedCommerce,
  },
  {
    id: 'hallHeight',
    kind: 'number',
    status: 'optional',
    unit: 'metre',
    min: 0,
    span: 'half',
    visibleWhen: isHall,
  },
  { id: 'loadingRamp', kind: 'boolean', status: 'optional', span: 'full', visibleWhen: isHall },
  parkingSpaces,
  { id: 'technicalFitout', kind: 'text', status: 'optional', maxLength: 240, span: 'full' },
  energyClass,
]

/** Objektbezogene Felder je Objektart — vollständige Abbildung, kein Index-Zugriff. */
export const PROPERTY_FIELDS: Record<PropertyTypeId, readonly FieldDescriptor[]> = {
  house: HOUSE_FIELDS,
  apartment: APARTMENT_FIELDS,
  land: LAND_FIELDS,
  'apartment-building': APARTMENT_BUILDING_FIELDS,
  commerce: COMMERCE_FIELDS,
}

// ---------------------------------------------------------------------------
// Kontaktschritt (bewusst am Ende)
// ---------------------------------------------------------------------------

export const CONTACT_FIELDS: readonly FieldDescriptor[] = [
  { id: 'salutation', kind: 'choice', status: 'optional', optionSet: 'salutation', span: 'full' },
  { id: 'firstName', kind: 'text', status: 'required', maxLength: 80, span: 'half' },
  { id: 'lastName', kind: 'text', status: 'required', maxLength: 80, span: 'half' },
  { id: 'email', kind: 'email', status: 'required', maxLength: 160, span: 'half' },
  { id: 'phone', kind: 'tel', status: 'optional', maxLength: 40, span: 'half' },
  {
    id: 'preferredChannel',
    kind: 'choice',
    status: 'optional',
    optionSet: 'preferredChannel',
    span: 'full',
  },
  {
    id: 'preferredTime',
    kind: 'choice',
    status: 'optional',
    optionSet: 'preferredTime',
    span: 'full',
  },
  { id: 'role', kind: 'choice', status: 'optional', optionSet: 'role', span: 'full' },
  { id: 'source', kind: 'choice', status: 'optional', optionSet: 'source', span: 'full' },
  // Pflicht-Einwilligung für Bewertung/Kontakt — nie vorangekreuzt.
  { id: 'consent', kind: 'checkbox', status: 'required', span: 'full' },
  // Marketing strikt getrennt, optional, ohne Kopplung an die Pflicht-Einwilligung.
  { id: 'marketingConsent', kind: 'checkbox', status: 'optional', span: 'full' },
]
