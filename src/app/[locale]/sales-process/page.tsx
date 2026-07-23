import type { Metadata } from 'next'
import { ArrowDown, ArrowUpRight, Check, FileSearch, Route, UsersRound } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { SalesProcessStep } from '@/components/site/home/process-timeline'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { breadcrumbList, faqPage, howTo, service as serviceJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

type OwnerItem = { title: string; text: string }
type FaqItem = { question: string; answer: string }

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: 'SalesProcess' })

  return buildMetadata({
    locale,
    path: '/sales-process',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: '/immobilie-verkaufen/ablauf',
      en: '/sell-property/process',
    },
  })
}

export default async function SalesProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('SalesProcess')
  const nav = await getTranslations('Nav')
  const steps = t.raw('steps') as SalesProcessStep[]
  const ownerItems = t.raw('owner.items') as OwnerItem[]
  const faqItems = t.raw('faq.items') as FaqItem[]
  const pageUrl = `${SITE.url}/${locale}${localizePath('/sales-process', locale)}`

  return (
    <div className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('hero.title'), url: pageUrl },
          ]),
          serviceJsonLd({
            locale,
            url: pageUrl,
            name: t('metadata.title'),
            description: t('metadata.description'),
            serviceType: t('serviceType'),
            areaServed: t('areaServed'),
          }),
          howTo({
            locale,
            url: pageUrl,
            name: t('hero.title'),
            description: t('answer'),
            steps: steps.map((step) => ({
              name: step.title,
              text: step.summary,
              url: `${pageUrl}#step-${step.id}`,
            })),
          }),
          faqPage(faqItems),
        ]}
      />

      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} lede={t('hero.lede')} />

      <section className="border-border bg-muted/45 border-y py-10 md:py-12">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="max-w-[88ch] text-[17px] leading-[1.75] text-pretty">{t('answer')}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
            {t('indexEyebrow')}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-[42px]">
            {t('indexTitle')}
          </h2>

          <nav aria-label={t('indexLabel')} className="mt-9">
            <ol className="grid gap-px bg-neutral-950/10 p-px sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((step) => (
                <li key={step.id} className="bg-background">
                  <a
                    href={`#step-${step.id}`}
                    className="group hover:bg-surface-dark focus-visible:outline-brand-500 flex min-h-[150px] flex-col justify-between p-5 transition-[background-color,color] duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] motion-reduce:transition-none"
                  >
                    <span className="text-primary font-mono text-xs tracking-[0.12em]">
                      {step.num}
                    </span>
                    <span className="mt-8 flex items-end justify-between gap-4">
                      <span className="max-w-[17ch] text-[15px] leading-snug font-semibold text-balance">
                        {step.title}
                      </span>
                      <ArrowDown
                        className="text-muted-foreground group-hover:text-brand-300 size-4 shrink-0 transition-transform group-hover:translate-y-1 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      <section className="border-border bg-muted/40 border-y py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 lg:px-10">
          {steps.map((step) => (
            <article
              key={step.id}
              id={`step-${step.id}`}
              className="border-border bg-background scroll-mt-24 border shadow-[0_12px_36px_rgba(0,0,0,0.045)]"
            >
              <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
                <header className="border-border flex flex-col justify-between border-b p-7 sm:p-9 lg:min-h-[360px] lg:border-r lg:border-b-0 lg:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-primary font-mono text-sm tracking-[0.15em]">
                      {step.num} / 10
                    </span>
                    <span className="text-muted-foreground max-w-[22ch] text-right text-[11px] font-semibold tracking-[0.13em] uppercase">
                      {step.phase}
                    </span>
                  </div>
                  <div className="mt-14">
                    <h2 className="font-serif text-3xl leading-[1.08] font-semibold text-balance md:text-[40px]">
                      {step.title}
                    </h2>
                    <p className="text-muted-foreground mt-5 text-[16px] leading-[1.7] text-pretty">
                      {step.summary}
                    </p>
                  </div>
                </header>

                <div className="p-7 sm:p-9 lg:p-10">
                  <p className="max-w-[72ch] text-[16px] leading-[1.75] text-pretty">
                    {step.detail}
                  </p>

                  <div className="mt-8">
                    <h3 className="text-[11px] font-semibold tracking-[0.14em] uppercase">
                      {t('activities')}
                    </h3>
                    <ul className="mt-4 grid gap-3 md:grid-cols-3">
                      {step.activities.map((activity) => (
                        <li
                          key={activity}
                          className="border-border flex gap-3 border-t pt-4 text-sm leading-[1.6] text-pretty"
                        >
                          <Check
                            className="text-primary mt-0.5 size-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <aside className="border-primary bg-muted/65 mt-8 border-l-2 px-5 py-4">
                    <p className="text-primary text-[11px] font-semibold tracking-[0.14em] uppercase">
                      {t('outcome')}
                    </p>
                    <p className="mt-2 max-w-[70ch] text-sm leading-[1.65] text-pretty">
                      {step.outcome}
                    </p>
                  </aside>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <div>
              <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
                {t('owner.eyebrow')}
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight font-semibold text-balance md:text-[40px]">
                {t('owner.title')}
              </h2>
            </div>
            <div className="grid gap-px bg-neutral-950/10 md:grid-cols-3">
              {ownerItems.map((item, index) => {
                const icons = [Route, FileSearch, UsersRound]
                const Icon = icons[index] ?? Route
                return (
                  <article key={item.title} className="bg-background p-6">
                    <Icon className="text-primary size-6" strokeWidth={1.6} aria-hidden="true" />
                    <h3 className="mt-8 text-lg font-semibold text-balance">{item.title}</h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-[1.65] text-pretty">
                      {item.text}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-border bg-surface-dark border-y py-16 text-white md:py-20">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-10">
          <div>
            <p className="text-brand-300 text-[12px] font-semibold tracking-[0.16em] uppercase">
              {t('related.eyebrow')}
            </p>
            <h2 className="mt-3 max-w-[18ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-[40px]">
              {t('related.title')}
            </h2>
          </div>
          <div>
            <p className="max-w-[62ch] text-[16px] leading-[1.7] text-pretty text-neutral-300">
              {t('related.text')}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/property-valuation"
                className="bg-brand-500 hover:bg-brand-400 inline-flex min-h-12 items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                {t('related.valuation')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/sell"
                className="inline-flex min-h-12 items-center gap-2 border border-white/35 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                {t('related.guides')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-[1240px] gap-9 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10">
          <h2 className="font-serif text-3xl leading-tight font-semibold text-balance md:text-[40px]">
            {t('faq.title')}
          </h2>
          <div className="divide-border border-border divide-y border-y">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold marker:content-none">
                  <span>{item.question}</span>
                  <span
                    className="text-primary mt-1 text-xl leading-none transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground max-w-[76ch] pt-4 pr-10 text-[15px] leading-[1.7] text-pretty">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/contact' }}
      />
    </div>
  )
}
