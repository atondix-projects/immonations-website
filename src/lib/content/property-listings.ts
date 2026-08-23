export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'withdrawn'

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
  description: string
}

export const PROPERTY_LISTINGS: readonly PropertyListing[] = [
  { slug: 'zirndorf-weiherhof-maisonette', location: 'Zirndorf · Weiherhof', postalCode: '90513', type: 'Wohnung', title: 'Maisonette mit Balkon', livingArea: '96 m²', rooms: 3, price: 389000, status: 'available', description: 'Maisonette-Wohnung mit Balkon in ruhiger Lage von Zirndorf-Weiherhof, Fußbodenheizung, Bad und separatem Gäste-WC über zwei Ebenen.' },
  { slug: 'nuernberg-st-johannis-3zi', location: 'Nürnberg · St. Johannis', postalCode: '90419', type: 'Wohnung', title: '3-Zimmer mit Balkon', livingArea: '84 m²', rooms: 3, price: 379000, status: 'available', description: '3-Zimmer-Wohnung mit Balkon im beliebten St. Johannis und kurzen Wegen in die Nürnberger Altstadt.' },
  { slug: 'erlangen-roethelheim-etw', location: 'Erlangen · Röthelheimpark', postalCode: '91052', type: 'Wohnung', title: 'ETW im Röthelheimpark', livingArea: '78 m²', rooms: 3, price: 429000, status: 'available', description: 'Gepflegte Eigentumswohnung im Röthelheimpark, einer ruhigen und stark nachgefragten Wohnlage in Erlangen.' },
  { slug: 'oberasbach-petershoehe-efh', location: 'Oberasbach · Petershöhe', postalCode: '90522', type: 'Haus', title: 'Modernisiertes EFH mit Einliegerwohnung', livingArea: '180 m²', rooms: 6, price: 895000, status: 'available', description: 'Modernisiertes Einfamilienhaus mit großem Grundstück, Einliegerwohnung, Garage, Carport und Kamin.' },
  { slug: 'deining-neubau-maisonette', location: 'Deining', postalCode: '92364', type: 'Wohnung', title: 'Neubau-Maisonette mit Garten', livingArea: '112 m²', rooms: 4, price: 695000, status: 'available', description: 'Neubau-Maisonette mit Terrasse, großem Garten, Fußbodenheizung, Wärmepumpe und modernem Energiestandard.' },
  { slug: 'nuernberg-zerzabelshof-reh', location: 'Nürnberg · Zerzabelshof', postalCode: '90480', type: 'Haus', title: 'Reihenendhaus mit Kino & Sauna', livingArea: '148 m²', rooms: 5, price: 749000, status: 'available', description: 'Modernisiertes Reihenendhaus mit eigenem Kino, Sauna und gehobener Ausstattung in Zerzabelshof.' },
]

export function getPropertyListing(slug: string) {
  return PROPERTY_LISTINGS.find((listing) => listing.slug === slug)
}

