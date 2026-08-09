import type { Metadata } from 'next'
import { ArrowDown, ArrowUpRight, Check, MailCheck, ShieldCheck } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ReferrerIntake } from '@/components/site/referrers/referrer-intake'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { JsonLd } from '@/components/site/json-ld'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { breadcrumbList, faqPage } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

type ContentItem = { title: string; text: string }

const STEP_ICONS = [ArrowUpRight, ShieldCheck, MailCheck] as const

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
  const t = await getTranslations({ locale, namespace: 'ReferrersPage' })

  return buildMetadata({
    locale,
    path: '/referrers',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/referrers', 'de'),
      en: localizePath('/referrers', 'en'),
    },
  })
}

export default async function ReferrersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('ReferrersPage')
  const nav = await getTranslations('Nav')
  const steps = t.raw('process.items') as ContentItem[]
  const safeguards = t.raw('safeguards.items') as string[]
  const faq = t.raw('faq.items') as FaqItem[]
  const pageUrl = `${SITE.url}/${locale}${localizePath('/referrers', locale)}`

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('title'), url: pageUrl },
          ]),
          faqPage(faq),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border bg-muted/45 border-y py-10">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <p className="max-w-[74ch] text-[17px] leading-[1.75] text-pretty">{t('answer')}</p>
          <a
            href="#tipp-geben"
            className="bg-primary hover:bg-primary/90 focus-visible:outline-brand-700 inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t('heroCta')}
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <h2 className="max-w-[17ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-[2.8rem]">
            {t('process.title')}
          </h2>
          <ol className="border-border mt-10 grid border-y md:grid-cols-3 md:divide-x">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? ArrowUpRight
              return (
                <li
                  key={step.title}
                  className="border-border border-b p-6 last:border-b-0 md:border-b-0 md:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-brand-700 font-mono text-xs tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon className="text-primary size-5" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3 className="mt-10 font-serif text-2xl leading-tight font-semibold text-balance">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-7 text-pretty">
                    {step.text}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="border-border bg-muted/35 border-y py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-start lg:gap-14 lg:px-10">
          <ReferrerIntake />

          <aside className="lg:sticky lg:top-28">
            <h2 className="max-w-[15ch] font-serif text-3xl leading-tight font-semibold text-balance">
              {t('safeguards.title')}
            </h2>
            <ul className="border-border mt-7 divide-y border-y">
              {safeguards.map((item) => (
                <li key={item} className="flex gap-3 py-5 text-sm leading-7">
                  <Check className="text-primary mt-1 size-4 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-surface-dark mt-8 p-6 text-white">
              <h3 className="font-serif text-2xl leading-tight font-semibold">
                {t('safeguards.ownerTitle')}
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-300">{t('safeguards.ownerText')}</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/45 underline-offset-4 hover:decoration-white"
              >
                {t('safeguards.ownerCta')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <FaqSection title={t('faq.title')} items={faq} />
      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/contact' }}
      />
    </main>
  )
}
