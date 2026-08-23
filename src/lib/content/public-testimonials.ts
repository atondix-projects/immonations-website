export type PublicTestimonial = {
  slug: string
  name: string
  date: string
  source: string
  sourceUrl: string
  rating: 5
  topic: string
  quote: string
}

export const PUBLIC_TESTIMONIALS: readonly PublicTestimonial[] = [
  {
    slug: 'carmen-verwold',
    name: 'Carmen Verwold',
    date: '2025-02-09',
    source: 'golocal',
    sourceUrl: 'https://www.golocal.de/zirndorf/immobilien/immonation-gmbh-MJm4N/',
    rating: 5,
    topic: 'Betreuung',
    quote:
      'Super Service und klasse Betreuung! Der Erstkontakt bis zum Abschluss alles sehr Kundenorientiert.',
  },
  {
    slug: 'golocal-nutzer-2022',
    name: 'golocal-Nutzer',
    date: '2022-03-17',
    source: 'golocal',
    sourceUrl: 'https://www.golocal.de/zirndorf/immobilien/immonation-gmbh-MJm4N/',
    rating: 5,
    topic: 'Hausverkauf',
    quote:
      'Qualität vor Quantität sowie Professionalität steht bei diesem Unternehmen an erster Stelle! Wurde bis zum Verkauf meiner Immobilie unterstützt und begleitet. Wer seine Immobilie verkaufen will, sollte sich nicht scheuen, sondern mit Herrn Karabacak einen Beratungstermin vereinbaren. Ein kompetenter Ansprechpartner. Kann die Firma nur weiter empfehlen!',
  },
]

export function getPublicTestimonial(slug: string) {
  return PUBLIC_TESTIMONIALS.find((testimonial) => testimonial.slug === slug)
}
