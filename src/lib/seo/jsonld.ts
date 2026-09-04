import { SITE } from './site'

type Thing = Record<string, unknown>

const ctx = { '@context': 'https://schema.org' as const }

export function organization(input: { locale: string; url: string; name: string }): Thing {
  return {
    ...ctx,
    '@type': 'Organization',
    '@id': `${input.url}/#organization`,
    name: input.name,
    legalName: SITE.legalName,
    url: input.url,
    inLanguage: input.locale,
    sameAs: Object.values(SITE.socials),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE.contact.email,
        telephone: SITE.contact.phone,
        availableLanguage: [...SITE.locales],
      },
    ],
  }
}

export function website(input: { locale: string; url: string; name: string }): Thing {
  return {
    ...ctx,
    '@type': 'WebSite',
    '@id': `${input.url}/#website`,
    url: input.url,
    name: input.name,
    inLanguage: input.locale,
    publisher: { '@id': `${input.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${input.url}/${input.locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbList(items: Array<{ name: string; url: string }>): Thing {
  return {
    ...ctx,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function itemList(
  items: Array<{ name: string; description?: string; image?: string; url?: string }>,
): Thing {
  return {
    ...ctx,
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.name,
        description: item.description,
        image: item.image,
        url: item.url,
      },
    })),
  }
}

export function definedTermSet(input: {
  locale: string
  url: string
  name: string
  description: string
  terms: Array<{ name: string; description: string }>
}): Thing {
  return {
    ...ctx,
    '@type': 'DefinedTermSet',
    '@id': `${input.url}#glossary`,
    url: input.url,
    name: input.name,
    description: input.description,
    inLanguage: input.locale,
    hasDefinedTerm: input.terms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.name,
      description: term.description,
      inDefinedTermSet: `${input.url}#glossary`,
    })),
  }
}

export function creativeWork(input: {
  locale: string
  url: string
  name: string
  description: string
  image?: string
}): Thing {
  return {
    ...ctx,
    '@type': 'CreativeWork',
    '@id': input.url,
    url: input.url,
    name: input.name,
    description: input.description,
    image: input.image,
    inLanguage: input.locale,
    publisher: { '@id': `${SITE.url}/#organization` },
  }
}

export function faqPage(qa: Array<{ question: string; answer: string }>): Thing {
  return {
    ...ctx,
    '@type': 'FAQPage',
    mainEntity: qa.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  }
}

export function article(input: {
  locale: string
  url: string
  title: string
  description: string
  datePublished: string
  dateModified?: string
  image?: string
  authorName?: string
}): Thing {
  return {
    ...ctx,
    '@type': 'Article',
    inLanguage: input.locale,
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@type': 'Person', name: input.authorName ?? SITE.legalName },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
  }
}

export function service(input: {
  locale: string
  url: string
  name: string
  description: string
  areaServed?: string
  serviceType?: string
}): Thing {
  return {
    ...ctx,
    '@type': 'Service',
    inLanguage: input.locale,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    areaServed: input.areaServed,
    provider: { '@id': `${SITE.url}/#organization` },
    url: input.url,
  }
}

/**
 * Named specialist employed by the organization. Used where a page's authority
 * rests on a specific, identifiable person (E-E-A-T signal).
 */
export function person(input: {
  locale: string
  url: string
  name: string
  jobTitle: string
  description: string
  knowsAbout?: string[]
  alumniOf?: string
}): Thing {
  return {
    ...ctx,
    '@type': 'Person',
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    inLanguage: input.locale,
    knowsAbout: input.knowsAbout,
    alumniOf: input.alumniOf ? { '@type': 'CollegeOrUniversity', name: input.alumniOf } : undefined,
    worksFor: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
  }
}

/** `dayOfWeek` uses schema.org DayOfWeek names; times are local `HH:MM`. */
export type OpeningHours = {
  dayOfWeek: string[]
  opens: string
  closes: string
}

export function localBusiness(input: {
  locale: string
  name: string
  address: {
    streetAddress: string
    postalCode: string
    addressLocality: string
    addressCountry: string
  }
  geo?: { latitude: number; longitude: number }
  telephone?: string
  email?: string
  openingHours?: OpeningHours[]
}): Thing {
  return {
    ...ctx,
    '@type': 'LocalBusiness',
    name: input.name,
    inLanguage: input.locale,
    address: { '@type': 'PostalAddress', ...input.address },
    geo: input.geo ? { '@type': 'GeoCoordinates', ...input.geo } : undefined,
    telephone: input.telephone ?? SITE.contact.phone,
    email: input.email,
    openingHoursSpecification: input.openingHours?.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.dayOfWeek,
      opens: slot.opens,
      closes: slot.closes,
    })),
    url: SITE.url,
  }
}

/**
 * Real-estate agent entity with a published aggregate rating and the public
 * review profiles that back it. Used on `/reviews` so answer engines can cite
 * the same figures the page shows.
 */
export function realEstateAgent(input: {
  locale: string
  url: string
  name: string
  description: string
  ratingValue: number
  reviewCount: number
  sameAs: string[]
}): Thing {
  return {
    ...ctx,
    '@type': 'RealEstateAgent',
    '@id': `${input.url}#agent`,
    name: input.name,
    legalName: SITE.legalName,
    url: input.url,
    inLanguage: input.locale,
    description: input.description,
    address: { '@type': 'PostalAddress', ...SITE.address },
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: input.ratingValue,
      reviewCount: input.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: input.sameAs,
  }
}

/**
 * Office hours of the Zirndorf branch, for structured data.
 * These times are also stated as prose in `ContactPage.office.hours` and
 * `ContactPage.channels.phone.note` (both locales), in the `opening-hours` FAQ
 * entry, and in `public/llms-full.txt` — change them together.
 */
export const OFFICE_OPENING_HOURS: OpeningHours[] = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  { dayOfWeek: ['Saturday'], opens: '10:30', closes: '14:00' },
]
