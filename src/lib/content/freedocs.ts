export type FreeDocCategory = 'handover' | 'tenancy'

export type FreeDocId =
  | 'house-handover'
  | 'apartment-handover'
  | 'tenant-self-disclosure'
  | 'tenant-self-disclosure-commercial'
  | 'landlord-confirmation-nuremberg'

export type FreeDoc = {
  id: FreeDocId
  href: string
  category: FreeDocCategory
}

export const FREE_DOCS: readonly FreeDoc[] = [
  {
    id: 'house-handover',
    href: '/downloads/freedocs/protokoll-hausuebergabe.pdf',
    category: 'handover',
  },
  {
    id: 'apartment-handover',
    href: '/downloads/freedocs/protokoll-wohnungsuebergabe.pdf',
    category: 'handover',
  },
  {
    id: 'tenant-self-disclosure',
    href: '/downloads/freedocs/mieterselbstauskunft.pdf',
    category: 'tenancy',
  },
  {
    id: 'tenant-self-disclosure-commercial',
    href: '/downloads/freedocs/mieterselbstauskunft-gewerbe.pdf',
    category: 'tenancy',
  },
  {
    id: 'landlord-confirmation-nuremberg',
    href: '/downloads/freedocs/wohnungsgeberbestaetigung-nuernberg.pdf',
    category: 'tenancy',
  },
] as const

export const FREE_DOC_CATEGORIES: readonly FreeDocCategory[] = ['handover', 'tenancy']
