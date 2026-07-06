import type { Metadata } from 'next'
import Image from 'next/image'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { CalendarDays, Check, FileText, MapPin, ShieldCheck, Users } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { getService, listServiceSlugs } from '@/lib/content/services'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, faqPage, service as serviceLd } from '@/lib/seo/jsonld'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return listServiceSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const svc = await getService(locale, slug)
  if (!svc) notFound()

  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: svc.title,
    description: svc.lede,
    localizedPaths: { de: `/leistungen/${slug}`, en: `/services/${slug}` },
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const svc = await getService(locale, slug)
  if (!svc) notFound()

  const t = await getTranslations('Nav')
  const servicesPath = locale === 'de' ? '/leistungen' : '/services'
  const detailPath = `${servicesPath}/${slug}`
  const url = `${SITE.url}/${locale}${detailPath}`
  const labels =
    locale === 'de'
      ? {
          valuation: 'Wertspanne',
          market: 'Lokale Marktlage',
          comparables: 'Vergleichsobjekte',
          timeline: 'In 14 Tagen zur Klarheit',
          proof: 'Unverbindlich. Diskret. Ohne Verkaufsdruck.',
          faq: 'Häufige Fragen',
          ready: 'Bereit für ein erstes Gespräch?',
          request: 'Beratung anfragen',
          location: 'Zirndorf & Umgebung',
          day: 'Tag',
        }
      : {
          valuation: 'Value range',
          market: 'Local market',
          comparables: 'Comparable properties',
          timeline: 'Clarity in 14 days',
          proof: 'Non-binding. Discreet. No sales pressure.',
          faq: 'Frequently asked',
          ready: 'Ready for an initial conversation?',
          request: 'Request a consultation',
          location: 'Zirndorf & region',
          day: 'Day',
        }

  return (
    <article className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: t('home'), url: `${SITE.url}/${locale}` },
            { name: t('services'), url: `${SITE.url}/${locale}${servicesPath}` },
            { name: svc.title, url },
          ]),
          serviceLd({
            locale,
            url,
            name: svc.title,
            description: svc.lede,
            serviceType: svc.serviceType,
            areaServed: svc.areaServed,
          }),
          faqPage(svc.faq),
        ]}
      />

      <section className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="px-6 py-16 lg:px-20 lg:py-24">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.22em]">
            {svc.hero.eyebrow}
          </p>
          <h1 className="mt-8 max-w-[760px] font-serif text-5xl font-semibold leading-[1.02] text-balance md:text-7xl">
            {svc.title}
          </h1>
          <p className="text-muted-foreground mt-8 max-w-[68ch] text-lg leading-8">{svc.lede}</p>

          <ul className="border-border mt-12 grid gap-6 border-y py-8 md:grid-cols-3">
            {svc.hero.bullets.map((bullet, index) => (
              <li key={bullet} className="flex gap-4">
                <span className="bg-brand-100 text-primary flex size-11 shrink-0 items-center justify-center">
                  {index === 0 ? (
                    <FileText className="size-5" aria-hidden="true" />
                  ) : index === 1 ? (
                    <MapPin className="size-5" aria-hidden="true" />
                  ) : (
                    <Users className="size-5" aria-hidden="true" />
                  )}
                </span>
                <span className="text-sm font-medium leading-6">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-5">
            {svc.sections.map((section) => (
              <section key={section.heading} className="border-border grid gap-3 border-t pt-5 md:grid-cols-[220px_1fr]">
                <h2 className="flex items-center gap-3 text-base font-semibold">
                  <Check className="text-primary size-5" aria-hidden="true" />
                  {section.heading}
                </h2>
                <p className="text-muted-foreground text-sm leading-7">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Link
              href={svc.cta.href}
              className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-colors"
            >
              {svc.cta.label}
            </Link>
            <span className="text-muted-foreground inline-flex items-center gap-3 text-sm">
              <ShieldCheck className="text-primary size-5" aria-hidden="true" />
              {labels.proof}
            </span>
          </div>
        </div>

        <aside className="bg-muted relative overflow-hidden border-l border-border px-6 py-16 lg:px-12 lg:py-24">
          <div className="absolute inset-x-0 bottom-0 h-[42%]">
            <Image
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
              alt="Residential property used for market analysis"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-muted via-muted/55 to-transparent" />
          </div>

          <div className="relative z-10 grid gap-5">
            <div className="border-border bg-white p-7 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.16em]">
                    Immobilienbewertung
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">{labels.valuation}</h2>
                </div>
                <FileText className="text-primary size-6" aria-hidden="true" />
              </div>
              <p className="text-primary mt-8 text-4xl font-semibold tabular-nums">655.000 - 725.000</p>
              <div className="border-border mt-6 grid gap-3 border-t pt-6 text-sm">
                {[
                  ['Objekttyp', locale === 'de' ? 'Einfamilienhaus' : 'Single-family home'],
                  [locale === 'de' ? 'Wohnfläche' : 'Living space', '142 m²'],
                  ['Lage', labels.location],
                  ['Stand', 'April 2026'],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-2 gap-4">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="border-border bg-white p-6 shadow-sm">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.16em]">
                  {labels.market}
                </p>
                <div className="mt-5 flex min-h-36 items-center justify-center bg-brand-50">
                  <MapPin className="text-primary size-12" aria-hidden="true" />
                </div>
                <p className="text-muted-foreground mt-4 text-sm">{labels.location}</p>
              </div>

              <div className="border-border bg-white p-6 shadow-sm">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.16em]">
                  {labels.comparables}
                </p>
                <div className="mt-5 grid gap-3 text-sm">
                  {['675.000', '685.000', '665.000'].map((price, index) => (
                    <div key={price} className="border-border flex items-center justify-between border-b pb-3 last:border-b-0">
                      <span>{index + 1}. {labels.location}</span>
                      <span className="font-semibold tabular-nums">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-border bg-white p-6 shadow-sm">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.16em]">
                {labels.timeline}
              </p>
              <ol className="mt-6 grid gap-4 sm:grid-cols-4">
                {[1, 2, 6, 11].map((day, index) => (
                  <li key={day} className="flex flex-col gap-3">
                    <span className="bg-brand-100 text-primary flex size-10 items-center justify-center">
                      {index === 0 ? (
                        <CalendarDays className="size-5" aria-hidden="true" />
                      ) : (
                        <Check className="size-5" aria-hidden="true" />
                      )}
                    </span>
                    <span className="text-sm font-semibold">
                      {labels.day} {day}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight md:text-[42px]">
              {labels.faq}
            </h2>
            <p className="text-muted-foreground mt-4 leading-7">{labels.ready}</p>
          </div>
          <Accordion className="w-full">
            {svc.faq.map((entry, idx) => (
              <AccordionItem key={entry.question} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">{entry.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-7">
                  {entry.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </article>
  )
}
