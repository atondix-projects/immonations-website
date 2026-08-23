import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PartnerFaq } from '@/components/site/partner-faq'
import { JsonLd } from '@/components/site/json-ld'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

type Metric = { value: string; text: string }
type ContentCard = { tag: string; title: string; text: string }
type ModelCard = ContentCard & { noteLabel: string; note: string }
type FaqItem = { question: string; answer: string }

const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'
const EYEBROW = 'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'

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
  const t = await getTranslations({ locale, namespace: 'PartnerAgentsPage' })

  return {
    ...buildMetadata({
      locale,
      path: '/partners',
      title: t('metadata.title'),
      description: t('metadata.description'),
      localizedPaths: {
        de: localizePath('/partners', 'de'),
        en: localizePath('/partners', 'en'),
      },
    }),
    title: { absolute: t('metadata.title') },
    keywords: t.raw('metadata.keywords') as string[],
  }
}

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string
  title: string
  lead: string
}) {
  return (
    <div className="max-w-[760px]">
      {eyebrow ? <p className={EYEBROW}>{eyebrow}</p> : null}
      <h2
        className={`hyphens-headline max-w-[19ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.35rem] ${eyebrow ? 'mt-4' : ''}`}
      >
        {title}
      </h2>
      <p className="text-muted-foreground mt-6 max-w-[68ch] text-[17px] leading-[1.75] text-pretty">
        {lead}
      </p>
    </div>
  )
}

function ContentCardGrid({ items }: { items: ContentCard[] }) {
  return (
    <div className="mt-10 grid gap-px bg-neutral-200 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className="bg-background min-w-0 p-7 md:p-9">
          <span className="bg-brand-100 text-brand-800 inline-flex px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase">
            {item.tag}
          </span>
          <h3 className="mt-6 font-serif text-2xl leading-tight font-semibold text-balance">
            {item.title}
          </h3>
          <p className="text-muted-foreground mt-4 text-[15px] leading-[1.75] text-pretty">
            {item.text}
          </p>
        </article>
      ))}
    </div>
  )
}

export default async function PartnerAgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('PartnerAgentsPage')
  const nav = await getTranslations('Nav')
  const metrics = t.raw('metrics.items') as Metric[]
  const ownerItems = t.raw('owners.items') as ContentCard[]
  const models = t.raw('models.items') as ModelCard[]
  const packageItems = t.raw('package.items') as ContentCard[]
  const steps = t.raw('process.items') as ContentCard[]
  const faq = t.raw('faq.items') as FaqItem[]
  const pageUrl = `${SITE.url}/${locale}${localizePath('/partners', locale)}`

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('hero.eyebrow'), url: pageUrl },
          ]),
          service({
            locale,
            url: pageUrl,
            name: t('metadata.serviceName'),
            description: t('metadata.description'),
            areaServed: t('metadata.areaServed'),
            serviceType: t('metadata.serviceType'),
          }),
          faqPage(faq),
        ]}
      />

      <section className={`${CONTAINER} py-16 md:py-24 lg:py-28`}>
        <div className="min-w-0">
          <p className={EYEBROW}>{t('hero.eyebrow')}</p>
          <h1 className="hyphens-headline mt-5 max-w-[1100px] font-serif text-[2.8rem] leading-[0.98] font-medium tracking-[-0.035em] text-balance break-words md:text-[4.25rem] lg:text-[4.8rem]">
            {t('hero.title')}
          </h1>
        </div>
        <div className="mt-9 md:mt-11">
          <p className="text-muted-foreground max-w-[66ch] text-[17px] leading-[1.75] text-pretty">
            {t('hero.lead')}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              className="bg-brand-700 hover:bg-brand-800 inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors active:translate-y-px"
            >
              {t('actions.contact')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="border-border hover:bg-muted inline-flex min-h-12 items-center justify-center border px-7 py-3 text-sm font-semibold whitespace-nowrap transition-colors active:translate-y-px"
            >
              {t('actions.about')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-dark border-y border-white/8 text-white">
        <div className={`${CONTAINER} grid md:grid-cols-3 md:divide-x md:divide-white/15`}>
          {metrics.map((metric) => (
            <article
              key={metric.value}
              className="border-b border-white/15 py-10 last:border-b-0 md:border-b-0 md:px-9 md:py-12 first:md:pl-0 last:md:pr-0"
            >
              <p className="font-mono text-4xl font-medium tracking-[-0.04em] text-white md:text-5xl">
                {metric.value}
              </p>
              <p className="mt-3 max-w-[28ch] text-sm leading-6 text-neutral-300">{metric.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted border-border border-b py-18 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow={t('owners.eyebrow')}
            title={t('owners.title')}
            lead={t('owners.lead')}
          />
          <ContentCardGrid items={ownerItems} />
        </div>
      </section>

      <section className="border-border border-b py-18 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow={t('models.eyebrow')}
            title={t('models.title')}
            lead={t('models.lead')}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {models.map((model) => (
              <article
                key={model.title}
                className="border-border border-t-brand-600 border border-t-4 p-8 md:p-10"
              >
                <span className="text-brand-700 font-mono text-xs font-semibold tracking-[0.12em] uppercase">
                  {model.tag}
                </span>
                <h3 className="mt-5 font-serif text-3xl leading-tight font-semibold text-balance">
                  {model.title}
                </h3>
                <p className="text-muted-foreground mt-5 text-[15px] leading-[1.75] text-pretty">
                  {model.text}
                </p>
                <p className="bg-brand-50 text-brand-800 mt-7 p-5 text-sm leading-7">
                  <strong>{model.noteLabel}:</strong> {model.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted border-border border-b py-18 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading
            eyebrow={t('package.eyebrow')}
            title={t('package.title')}
            lead={t('package.lead')}
          />
          <ContentCardGrid items={packageItems} />
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <SectionHeading title={t('process.title')} lead={t('process.lead')} />
          <ContentCardGrid items={steps} />

          <div className="border-border mt-18 border-t pt-18 md:mt-24 md:pt-24">
            <PartnerFaq title={t('faq.title')} items={faq} />
          </div>

          <div className="border-border mt-16 flex flex-col items-start justify-between gap-8 border-t pt-10 lg:flex-row lg:items-end">
            <div>
              <h2 className="max-w-[20ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-[2.6rem]">
                {t('closing.title')}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-[58ch] leading-7">
                {t('closing.text')}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Link
                href="/referrers"
                className="border-border hover:bg-muted inline-flex min-h-12 items-center justify-center border px-7 py-3 text-sm font-semibold whitespace-nowrap transition-colors active:translate-y-px"
              >
                {t('actions.referrers')}
              </Link>
              <Link
                href="/contact"
                className="bg-brand-700 hover:bg-brand-800 inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors active:translate-y-px"
              >
                {t('actions.contact')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
