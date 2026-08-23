import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, MapPin, Star } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import {
  getReferenceDetail,
  PUBLISH_REFERENCE_METRICS,
  REFERENCE_IDS,
  referenceImage,
  type ReferenceItem,
} from '@/lib/content/references'
import { getRouteById } from '@/lib/routing/route-catalog'
import { breadcrumbList, creativeWork } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

const COPY = {
  de: {
    eyebrow: 'Verkaufsreferenz',
    challenge: 'Die Ausgangslage',
    approach: 'Unser Vorgehen',
    result: 'Ergebnis',
    requests: 'Anfragen',
    viewings: 'Besichtigungen',
    weeks: 'Wochen',
    review: 'Freigegebene Kundenstimme',
    source: 'Quellennachweis',
    sourceText:
      'Die abgebildete Originalbewertung wurde mit den freigegebenen Referenzunterlagen bereitgestellt.',
    back: 'Alle Referenzen',
    previous: 'Vorherige Referenz',
    next: 'Nächste Referenz',
    ctaTitle: 'Welche Geschichte soll Ihre Immobilie erzählen?',
    ctaText:
      'Wir entwickeln eine belastbare Preis- und Vermarktungsstrategie für Ihre Ausgangslage.',
    cta: 'Kostenlose Bewertung starten',
    home: 'Start',
    overview: 'Referenzen',
  },
  en: {
    eyebrow: 'Sales reference',
    challenge: 'The starting point',
    approach: 'Our approach',
    result: 'Outcome',
    requests: 'Enquiries',
    viewings: 'Viewings',
    weeks: 'Weeks',
    review: 'Approved client feedback',
    source: 'Source evidence',
    sourceText: 'The original review shown here was supplied with the approved reference material.',
    back: 'All references',
    previous: 'Previous reference',
    next: 'Next reference',
    ctaTitle: 'What story should your property tell?',
    ctaText: 'We develop a robust pricing and marketing strategy for your situation.',
    cta: 'Start a free valuation',
    home: 'Home',
    overview: 'References',
  },
} as const

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => REFERENCE_IDS.map((slug) => ({ locale, slug })))
}

async function getPageData(locale: 'de' | 'en', slug: string) {
  const detail = getReferenceDetail(slug)
  if (!detail) notFound()
  const t = await getTranslations({ locale, namespace: 'ReferencesPage' })
  const item = (t.raw('items') as ReferenceItem[]).find((candidate) => candidate.id === detail.id)
  if (!item) notFound()
  const route = getRouteById(`reference:${detail.id}`)
  if (!route) notFound()
  return { detail, item, route }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const { detail, item, route } = await getPageData(locale, slug)
  return buildMetadata({
    locale,
    path: route.internal,
    localizedPaths: route.paths,
    title: `${item.title} | Immonation`,
    description: detail.challenge[locale],
    image: `${SITE.url}${referenceImage(detail.id)}`,
  })
}

export default async function ReferenceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const copy = COPY[locale]
  const { detail, item, route } = await getPageData(locale, slug)
  const index = REFERENCE_IDS.indexOf(detail.id)
  const previous = index > 0 ? REFERENCE_IDS[index - 1] : undefined
  const next = index < REFERENCE_IDS.length - 1 ? REFERENCE_IDS[index + 1] : undefined
  const pageUrl = `${SITE.url}/${locale}${route.paths[locale]}`

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: copy.home, url: `${SITE.url}/${locale}` },
            {
              name: copy.overview,
              url: `${SITE.url}/${locale}${getRouteById('references')?.paths[locale]}`,
            },
            { name: item.title, url: pageUrl },
          ]),
          creativeWork({
            locale,
            url: pageUrl,
            name: item.title,
            description: detail.challenge[locale],
            image: `${SITE.url}${referenceImage(detail.id)}`,
          }),
        ]}
      />

      <section className="border-border border-b pt-16 md:pt-24">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 pb-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end lg:px-10 lg:pb-16">
          <div>
            <p className="text-brand-700 text-sm font-semibold">{copy.eyebrow}</p>
            <h1 className="hyphens-headline mt-4 max-w-[14ch] font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-balance">
              {item.title}
            </h1>
            <p className="text-muted-foreground mt-6 inline-flex items-center gap-2 text-base">
              <MapPin className="size-4" aria-hidden="true" />
              {item.type} · {item.location}
            </p>
          </div>
          <p className="max-w-[62ch] text-lg leading-[1.7] text-pretty lg:justify-self-end">
            {detail.challenge[locale]}
          </p>
        </div>
        <div className="relative mx-auto aspect-[16/9] w-full max-w-[1440px] bg-neutral-900 md:aspect-[2.2/1]">
          <Image
            src={referenceImage(detail.id)}
            alt={item.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {PUBLISH_REFERENCE_METRICS ? (
        <section className="border-border bg-surface-dark border-b py-8 text-white">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-3 gap-px bg-white/20 px-6 lg:px-10">
            {[
              [detail.requests, copy.requests],
              [detail.viewings, copy.viewings],
              [detail.duration, copy.weeks],
            ].map(([value, label]) => (
              <div key={label} className="bg-surface-dark px-4 py-5">
                <p className="font-serif text-3xl font-semibold tabular-nums">{value}</p>
                <p className="mt-1 text-sm text-neutral-300">{label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1080px] gap-12 px-6 md:grid-cols-2 lg:px-10">
          <div>
            <h2 className="font-serif text-3xl font-semibold">{copy.challenge}</h2>
            <p className="text-muted-foreground mt-5 text-[17px] leading-[1.75] text-pretty">
              {detail.challenge[locale]}
            </p>
          </div>
          <div>
            <h2 className="font-serif text-3xl font-semibold">{copy.approach}</h2>
            <p className="text-muted-foreground mt-5 text-[17px] leading-[1.75] text-pretty">
              {detail.approach[locale]}
            </p>
          </div>
          <div className="border-border border-y py-7 md:col-span-2 md:grid md:grid-cols-[0.45fr_1fr] md:gap-10">
            <h2 className="font-serif text-2xl font-semibold">{copy.result}</h2>
            <p className="mt-3 text-lg font-semibold md:mt-0">{detail.result[locale]}</p>
          </div>
        </div>
      </section>

      {detail.review ? (
        <section className="border-border bg-muted border-y py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-[1080px] gap-10 px-6 md:grid-cols-[1fr_0.8fr] md:items-center lg:px-10">
            <div>
              <p className="text-brand-700 text-sm font-semibold">{copy.review}</p>
              <div className="mt-5 flex gap-1" aria-label={`${detail.review.rating} / 5`}>
                {Array.from({ length: detail.review.rating }, (_, star) => (
                  <Star
                    key={star}
                    className="fill-brand-600 text-brand-600 size-5"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-6 font-serif text-2xl leading-[1.5] text-pretty italic">
                “{detail.review.quote[locale]}”
              </blockquote>
              <p className="mt-5 text-sm font-semibold">
                {detail.review.reviewer} · {detail.review.date[locale]}
              </p>
              <h3 className="mt-8 text-sm font-semibold">{copy.source}</h3>
              <p className="text-muted-foreground mt-2 max-w-[58ch] text-sm leading-relaxed">
                {copy.sourceText}
              </p>
            </div>
            <Image
              src={detail.review.screenshot.src}
              width={detail.review.screenshot.width}
              height={detail.review.screenshot.height}
              alt={detail.review.screenshot.alt[locale]}
              className="h-auto w-full border border-neutral-300"
            />
          </div>
        </section>
      ) : null}

      <nav
        className="mx-auto flex w-full max-w-[1080px] items-center justify-between gap-4 px-6 py-10 lg:px-10"
        aria-label={copy.overview}
      >
        {previous ? (
          <Link
            href={{ pathname: '/references/[slug]', params: { slug: previous } }}
            className="text-brand-700 inline-flex min-h-11 items-center gap-2 font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {copy.previous}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={{ pathname: '/references/[slug]', params: { slug: next } }}
            className="text-brand-700 inline-flex min-h-11 items-center gap-2 text-right font-semibold"
          >
            {copy.next}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        ) : (
          <Link
            href="/references"
            className="text-brand-700 inline-flex min-h-11 items-center gap-2 font-semibold"
          >
            {copy.back}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </nav>
      <CtaBand
        title={copy.ctaTitle}
        text={copy.ctaText}
        primary={{ label: copy.cta, href: '/property-valuation' }}
      />
    </main>
  )
}
