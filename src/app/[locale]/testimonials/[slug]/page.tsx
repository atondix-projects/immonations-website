import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CatalogPage } from '@/components/site/templates/catalog-page'
import { routing } from '@/i18n/routing'
import { getPublicTestimonial, PUBLIC_TESTIMONIALS } from '@/lib/content/public-testimonials'
import { getRouteById } from '@/lib/routing/route-catalog'
import { article, breadcrumbList } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PUBLIC_TESTIMONIALS.map((testimonial) => ({ locale, slug: testimonial.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const testimonial = getPublicTestimonial(slug)
  const routeRecord = getRouteById(`testimonial:${slug}`)
  if (!testimonial || !routeRecord) notFound()
  const title =
    locale === 'de'
      ? `Erfahrung von ${testimonial.name}`
      : `Experience shared by ${testimonial.name}`
  const description =
    locale === 'de'
      ? `Geprüfte Kundenstimme von ${testimonial.name} über die Zusammenarbeit mit Immonation, veröffentlicht mit Quelle und Datum.`
      : `Verified client testimonial from ${testimonial.name} about working with Immonation, published with its source and date.`
  return buildMetadata({
    locale,
    path: routeRecord.internal,
    localizedPaths: routeRecord.paths,
    title: `${title} | Immonation`,
    description,
  })
}

export default async function TestimonialPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const testimonial = getPublicTestimonial(slug)
  const routeRecord = getRouteById(`testimonial:${slug}`)
  if (!testimonial || !routeRecord) notFound()
  const isGerman = locale === 'de'
  const url = `${SITE.url}/${locale}${routeRecord.paths[locale]}`

  return (
    <>
      <JsonLd
        data={[
          breadcrumbList([
            { name: isGerman ? 'Start' : 'Home', url: `${SITE.url}/${locale}` },
            {
              name: isGerman ? 'Kundenstimmen' : 'Testimonials',
              url: `${SITE.url}/${locale}${getRouteById('testimonials')?.paths[locale] ?? ''}`,
            },
            { name: testimonial.name, url },
          ]),
          article({
            locale,
            url,
            title: `${testimonial.name} · ${testimonial.topic}`,
            description: testimonial.quote,
            datePublished: testimonial.date,
            authorName: testimonial.name,
          }),
        ]}
      />
      <CatalogPage
        eyebrow={`${testimonial.rating}/5 · ${testimonial.source}`}
        title={
          isGerman
            ? `Erfahrung von ${testimonial.name}`
            : `Experience shared by ${testimonial.name}`
        }
        lede={testimonial.quote}
        answer={
          isGerman
            ? 'Die Kundenstimme wird mit Quelle und Datum veröffentlicht, damit Herkunft und Wortlaut nachvollziehbar bleiben.'
            : 'This testimonial is published with its source and date so its origin and wording remain transparent.'
        }
        sections={[
          { title: isGerman ? 'Thema' : 'Topic', text: testimonial.topic },
          {
            title: isGerman ? 'Quelle' : 'Source',
            text: `${testimonial.source} · ${testimonial.date}`,
          },
          {
            title: isGerman ? 'Original prüfen' : 'Check the original',
            text: testimonial.sourceUrl,
          },
        ]}
        cta={{
          title: isGerman
            ? 'Ihre Immobilie professionell verkaufen'
            : 'Sell your property professionally',
          text: isGerman
            ? 'Starten Sie mit einer kostenlosen Bewertung.'
            : 'Start with a free valuation.',
          label: isGerman ? 'Bewertung starten' : 'Start valuation',
          href: '/property-valuation',
        }}
      />
    </>
  )
}
