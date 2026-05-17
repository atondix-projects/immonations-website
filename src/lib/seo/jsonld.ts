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
}): Thing {
  return {
    ...ctx,
    '@type': 'LocalBusiness',
    name: input.name,
    inLanguage: input.locale,
    address: { '@type': 'PostalAddress', ...input.address },
    geo: input.geo ? { '@type': 'GeoCoordinates', ...input.geo } : undefined,
    telephone: input.telephone ?? SITE.contact.phone,
    url: SITE.url,
  }
}
