export type EstateStatus = 'available' | 'reserved'

export type EstateListing = {
  id: string
  externalId: string
  slug: string
  title: string
  location: string
  postalCode: string
  propertyType: string
  livingArea?: number
  rooms?: number
  price?: number
  status: EstateStatus
  description: string
  images: readonly string[]
  updatedAt?: string
}

export type LeadKind = 'contact' | 'valuation'

export type OnOfficeLeadInput = {
  kind: LeadKind
  locale: 'de' | 'en'
  address: Readonly<Record<string, string>>
  estate?: Readonly<Record<string, string>>
  notes: Readonly<Record<string, string>>
  consent: Readonly<Record<string, boolean>>
}

export type LeadReceipt = {
  provider: 'onoffice'
  recordId: string
}

export interface OnOfficeProvider {
  listEstates(): Promise<readonly EstateListing[]>
  submitLead(input: OnOfficeLeadInput): Promise<LeadReceipt>
}
