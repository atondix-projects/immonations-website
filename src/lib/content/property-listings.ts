type PropertyStatus = 'available' | 'reserved' | 'sold' | 'withdrawn'

export type PropertyListing = {
  slug: string
  location: string
  postalCode: string
  type: string
  title: string
  livingArea: string
  rooms: number
  price: number
  status: PropertyStatus
  description: { de: string; en: string }
}

export const PROPERTY_LISTINGS: readonly PropertyListing[] = [
  {
    slug: 'zirndorf-weiherhof-maisonette',
    location: 'Zirndorf · Weiherhof',
    postalCode: '90513',
    type: 'Wohnung',
    title: 'Maisonette mit Balkon',
    livingArea: '96 m²',
    rooms: 3,
    price: 389000,
    status: 'available',
    description: {
      de: 'Maisonette-Wohnung mit Balkon in ruhiger Lage von Zirndorf-Weiherhof, Fußbodenheizung, Bad und separatem Gäste-WC über zwei Ebenen.',
      en: 'Maisonette apartment with a balcony in quiet Zirndorf-Weiherhof, featuring underfloor heating, a bathroom and a separate guest WC across two levels.',
    },
  },
  {
    slug: 'nuernberg-st-johannis-3zi',
    location: 'Nürnberg · St. Johannis',
    postalCode: '90419',
    type: 'Wohnung',
    title: '3-Zimmer mit Balkon',
    livingArea: '84 m²',
    rooms: 3,
    price: 379000,
    status: 'available',
    description: {
      de: '3-Zimmer-Wohnung mit Balkon im beliebten St. Johannis und kurzen Wegen in die Nürnberger Altstadt.',
      en: "Three-room apartment with a balcony in popular St. Johannis, within easy reach of Nuremberg's historic centre.",
    },
  },
  {
    slug: 'erlangen-roethelheim-etw',
    location: 'Erlangen · Röthelheimpark',
    postalCode: '91052',
    type: 'Wohnung',
    title: 'ETW im Röthelheimpark',
    livingArea: '78 m²',
    rooms: 3,
    price: 429000,
    status: 'available',
    description: {
      de: 'Gepflegte Eigentumswohnung im Röthelheimpark, einer ruhigen und stark nachgefragten Wohnlage in Erlangen.',
      en: 'Well-maintained apartment in Röthelheimpark, a quiet and highly sought-after residential area in Erlangen.',
    },
  },
  {
    slug: 'oberasbach-petershoehe-efh',
    location: 'Oberasbach · Petershöhe',
    postalCode: '90522',
    type: 'Haus',
    title: 'Modernisiertes EFH mit Einliegerwohnung',
    livingArea: '180 m²',
    rooms: 6,
    price: 895000,
    status: 'available',
    description: {
      de: 'Modernisiertes Einfamilienhaus mit großem Grundstück, Einliegerwohnung, Garage, Carport und Kamin.',
      en: 'Modernised detached home with a generous plot, separate apartment, garage, carport and fireplace in Oberasbach.',
    },
  },
  {
    slug: 'deining-neubau-maisonette',
    location: 'Deining',
    postalCode: '92364',
    type: 'Wohnung',
    title: 'Neubau-Maisonette mit Garten',
    livingArea: '112 m²',
    rooms: 4,
    price: 695000,
    status: 'available',
    description: {
      de: 'Neubau-Maisonette mit Terrasse, großem Garten, Fußbodenheizung, Wärmepumpe und modernem Energiestandard.',
      en: 'New-build maisonette with a terrace, large garden, underfloor heating, heat pump and modern energy standard in Deining.',
    },
  },
  {
    slug: 'nuernberg-zerzabelshof-reh',
    location: 'Nürnberg · Zerzabelshof',
    postalCode: '90480',
    type: 'Haus',
    title: 'Reihenendhaus mit Kino & Sauna',
    livingArea: '148 m²',
    rooms: 5,
    price: 749000,
    status: 'available',
    description: {
      de: 'Modernisiertes Reihenendhaus mit eigenem Kino, Sauna und gehobener Ausstattung in Zerzabelshof.',
      en: 'Modernised end-terrace house with a private cinema, sauna and high-quality fittings in Nuremberg-Zerzabelshof.',
    },
  },
]

export function getPropertyListing(slug: string) {
  return PROPERTY_LISTINGS.find((listing) => listing.slug === slug)
}
