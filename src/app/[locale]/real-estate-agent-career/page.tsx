import type { Metadata } from 'next'
import { ArrowUpRight, BriefcaseBusiness, Check, Compass, FileStack, Users } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { breadcrumbList, faqPage } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

type RecruitingItem = { title: string; text: string }

const BENEFIT_ICONS = [BriefcaseBusiness, FileStack, Users, Compass] as const

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
  const t = await getTranslations({ locale, namespace: 'RecruitingPage' })
  return buildMetadata({
    locale,
    path: '/real-estate-agent-career',
    title: t('metadata.title'),
    description: t('metadata.description'),
  })
}

export default async function RecruitingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('RecruitingPage')
  const nav = await getTranslations('Nav')
  const benefits = t.raw('benefits.items') as RecruitingItem[]
  const profile = t.raw('profile.items') as RecruitingItem[]
  const steps = t.raw('steps.items') as RecruitingItem[]
  const faq = t.raw('faq.items') as FaqItem[]
  const pageUrl = `${SITE.url}/${locale}${localizePath('/real-estate-agent-career', locale)}`

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            {
              name: nav('careers'),
              url: `${SITE.url}/${locale}${localizePath('/careers', locale)}`,
            },
            { name: t('title'), url: pageUrl },
          ]),
          faqPage(faq),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border bg-muted/45 border-y py-10">
        <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <p className="max-w-[78ch] text-[17px] leading-[1.7] text-pretty">{t('answer')}</p>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-[background-color,scale] duration-150 active:scale-[0.96] motion-reduce:transition-none"
          >
            {t('heroCta')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
            {t('benefits.eyebrow')}
          </p>
          <h2 className="mt-3 max-w-[16ch] font-serif text-3xl font-semibold text-balance md:text-[42px]">
            {t('benefits.title')}
          </h2>
          <ul className="mt-10 grid gap-px bg-neutral-900/10 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => {
              const Icon = BENEFIT_ICONS[index] ?? BriefcaseBusiness
              return (
                <li key={item.title} className="bg-background min-h-[230px] p-6">
                  <Icon className="text-primary size-6" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-9 font-serif text-xl font-semibold text-balance">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-[1.65] text-pretty">
                    {item.text}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="border-border bg-muted/35 border-y py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
          <div>
            <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
              {t('profile.eyebrow')}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-[40px]">
              {t('profile.title')}
            </h2>
            <p className="text-muted-foreground mt-5 max-w-[52ch] leading-[1.7] text-pretty">
              {t('profile.text')}
            </p>
          </div>
          <ul className="divide-border bg-background divide-y border-y px-6">
            {profile.map((item) => (
              <li key={item.title} className="grid gap-3 py-6 sm:grid-cols-[28px_1fr]">
                <Check className="text-primary mt-0.5 size-5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-[1.65] text-pretty">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <h2 className="font-serif text-3xl font-semibold text-balance md:text-[40px]">
            {t('steps.title')}
          </h2>
          <ol className="mt-10 grid gap-px bg-neutral-900/10 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-background min-h-[220px] p-7">
                <span className="text-primary font-mono text-xs tracking-[0.16em] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 font-serif text-2xl font-semibold text-balance">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-3 leading-[1.65] text-pretty">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection title={t('faq.title')} items={faq} />
      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/contact' }}
        secondary={{ label: t('cta.secondary'), href: '/careers' }}
      />
    </main>
  )
}
