import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { getService, listServiceSlugs } from '@/lib/content/services'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, faqPage, service as serviceLd } from '@/lib/seo/jsonld'
import { buttonVariants } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
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

  return (
    <article className="container mx-auto max-w-3xl px-6 py-16">
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
      <header className="mb-12">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
          {svc.hero.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{svc.title}</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-7">{svc.lede}</p>
        <ul className="mt-6 grid gap-2 text-sm md:grid-cols-3">
          {svc.hero.bullets.map((b) => (
            <li key={b} className="border-border/60 bg-muted/30 rounded-md border px-3 py-2">
              {b}
            </li>
          ))}
        </ul>
      </header>

      <div className="space-y-12">
        {svc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 text-2xl font-semibold tracking-tight">{section.heading}</h2>
            <p className="text-foreground/90 leading-7">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          {locale === 'de' ? 'Häufige Fragen' : 'Frequently asked'}
        </h2>
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
      </section>

      <section className="border-border/60 mt-16 flex flex-col items-start gap-4 rounded-lg border p-8 md:flex-row md:items-center md:justify-between">
        <p className="text-lg font-medium">
          {locale === 'de'
            ? 'Bereit für ein erstes Gespräch?'
            : 'Ready for an initial conversation?'}
        </p>
        <Link
          href={svc.cta.href}
          className={cn(buttonVariants({ size: 'lg' }), 'px-6')}
        >
          {svc.cta.label}
        </Link>
      </section>
    </article>
  )
}
