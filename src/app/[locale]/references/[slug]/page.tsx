import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import {
  getReferenceDetail,
  REFERENCE_DETAILS,
  referenceImage,
  type ReferenceItem,
} from '@/lib/content/references'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(REFERENCE_DETAILS).map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const detail = getReferenceDetail(slug)
  if (!detail) notFound()
  const t = await getTranslations({ locale, namespace: 'ReferencesPage' })
  const items = t.raw('items') as ReferenceItem[]
  const item = items.find((candidate) => candidate.id === detail.id)
  if (!item) notFound()

  return buildMetadata({
    locale,
    path: `/references/${slug}`,
    title: item.title,
    description: `${item.type} in ${item.location}: ${detail.result[locale]}.`,
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
  const detail = getReferenceDetail(slug)
  if (!detail) notFound()

  const t = await getTranslations('ReferencesPage')
  const labels = await getTranslations('ReferenceDetailPage')
  const nav = await getTranslations('Nav')
  const items = t.raw('items') as ReferenceItem[]
  const item = items.find((candidate) => candidate.id === detail.id)
  if (!item) notFound()

  const pagePath = localizePath(`/references/${slug}`, locale)
  const referencesPath = localizePath('/references', locale)
  const metrics = [
    { value: detail.requests, label: labels('metrics.requests') },
    { value: detail.viewings, label: labels('metrics.viewings') },
    { value: detail.duration, label: labels('metrics.weeks') },
  ]

  return (
    <article className="bg-background">
      <JsonLd
        data={breadcrumbList([
          { name: nav('home'), url: `${SITE.url}/${locale}` },
          { name: nav('references'), url: `${SITE.url}/${locale}${referencesPath}` },
          { name: item.title, url: `${SITE.url}/${locale}${pagePath}` },
        ])}
      />

      <section className="border-border border-b">
        <div className="mx-auto grid w-full max-w-[1320px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between px-5 py-12 sm:px-7 md:py-18 lg:min-h-[650px] lg:px-12 lg:py-16">
            <Link
              href="/references"
              className="text-brand-700 inline-flex w-fit items-center gap-2 text-sm font-semibold"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {labels('back')}
            </Link>
            <div className="mt-16">
              <p className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
                {labels('eyebrow')}
              </p>
              <h1 className="mt-5 max-w-[13ch] font-serif text-[2.8rem] leading-[0.98] font-medium tracking-[-0.035em] text-balance md:text-[4.5rem]">
                {item.title}
              </h1>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                {item.type} · {item.location}
              </p>
            </div>
            <p className="text-brand-800 mt-16 max-w-[28ch] font-serif text-2xl leading-snug font-medium">
              {detail.result[locale]}
            </p>
          </div>
          <div className="relative min-h-[460px] overflow-hidden bg-neutral-900 lg:min-h-[650px]">
            <Image
              src={referenceImage(item.id)}
              alt={item.alt}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02] motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="border-border border-b py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-3 gap-5 px-5 sm:px-7 lg:px-12">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <span className="font-serif text-3xl font-medium tabular-nums md:text-5xl">
                {metric.value}
              </span>
              <p className="text-muted-foreground mt-2 text-xs leading-snug sm:text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-18 md:py-28">
        <div className="mx-auto grid w-full max-w-[1120px] gap-14 px-5 sm:px-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
              {labels('caseEyebrow')}
            </p>
            <h2 className="mt-4 font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] md:text-[3.35rem]">
              {labels('caseTitle')}
            </h2>
          </div>
          <div className="divide-border border-border border-y">
            <section className="grid gap-4 py-8 md:grid-cols-[8rem_1fr] md:py-10">
              <h3 className="text-sm font-semibold">{labels('challenge')}</h3>
              <p className="text-muted-foreground text-[17px] leading-[1.75]">
                {detail.challenge[locale]}
              </p>
            </section>
            <section className="grid gap-4 border-t border-neutral-200 py-8 md:grid-cols-[8rem_1fr] md:py-10">
              <h3 className="text-sm font-semibold">{labels('approach')}</h3>
              <p className="text-muted-foreground text-[17px] leading-[1.75]">
                {detail.approach[locale]}
              </p>
            </section>
            <section className="grid gap-4 border-t border-neutral-200 py-8 md:grid-cols-[8rem_1fr] md:py-10">
              <h3 className="text-sm font-semibold">{labels('result')}</h3>
              <p className="font-serif text-2xl leading-snug font-medium">
                {detail.result[locale]}
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="bg-muted/65 border-y border-neutral-200 py-14">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col justify-between gap-6 px-5 sm:px-7 md:flex-row md:items-center">
          <p className="max-w-[52ch] text-sm leading-relaxed text-neutral-600">
            {labels('prototypeNote')}
          </p>
          <Link
            href="/references"
            className="text-brand-700 inline-flex items-center gap-2 text-sm font-semibold"
          >
            {labels('allReferences')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand
        title={labels('cta.title')}
        text={labels('cta.text')}
        primary={{ label: labels('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: labels('cta.secondary'), href: '/sales-process' }}
      />
    </article>
  )
}
