import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, organization } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { PageHero } from '@/components/site/templates/page-hero'
import { CtaBand } from '@/components/site/templates/cta-band'
import { SITE } from '@/lib/seo/site'
import { localizePath } from '@/lib/seo/routes'
import { Link } from '@/i18n/navigation'
import { TrademarkCertificate } from '@/components/site/trademark-certificate'
import { Awards } from '@/components/site/home/awards'

export const dynamic = 'force-static'

type ValueItem = {
  title: string
  text: string
}

type StatItem = {
  value: string
  label: string
}

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

  const t = await getTranslations({ locale, namespace: 'AboutPage' })

  return buildMetadata({
    locale,
    path: '/about',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: { de: localizePath('/about', 'de'), en: localizePath('/about', 'en') },
  })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('AboutPage')
  const nav = await getTranslations('Nav')
  const values = t.raw('values.items') as ValueItem[]
  const companyStats = t.raw('companyProfile.stats') as StatItem[]
  const path = localizePath('/about', locale)

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: nav('about'), url: `${SITE.url}/${locale}${path}` },
          ]),
          organization({ locale, url: SITE.url, name: SITE.legalName }),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border border-t py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="text-muted-foreground max-w-[68ch] text-lg leading-8">{t('body')}</p>
        </div>
      </section>

      <section className="border-border bg-muted border-y py-16">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 md:grid-cols-3 lg:px-10">
          {values.map((item) => (
            <article key={item.title} className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-muted-foreground leading-7">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="unternehmensprofil"
        className="bg-surface-dark border-y border-white/8 py-16 text-white md:py-24"
      >
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
            <div className="min-w-0">
              <Image
                src="/brand/immonation-logo-inverse.svg"
                alt={t('companyProfile.logoAlt')}
                width={849}
                height={163}
                sizes="(min-width: 1024px) 360px, 85vw"
                className="h-auto w-full max-w-[360px]"
              />
              <div className="mt-12 border-t border-white/15 pt-6">
                <p className="text-sm font-semibold text-white">
                  {t('companyProfile.resourceTitle')}
                </p>
                <p className="mt-2 max-w-[34ch] text-sm leading-7 text-neutral-300">
                  {t('companyProfile.resourceText')}
                </p>
                <Link
                  href="/downloads"
                  className="text-brand-200 hover:text-brand-100 mt-5 inline-flex min-h-11 items-center text-sm font-semibold transition-colors"
                >
                  {t('companyProfile.resourceLink')}
                  <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-brand-200 text-[11px] font-semibold tracking-[0.2em] uppercase md:text-xs">
                {t('companyProfile.eyebrow')}
              </p>
              <h2 className="mt-5 max-w-[18ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-[42px]">
                {t('companyProfile.title')}
              </h2>
              <p className="mt-5 max-w-[62ch] text-[17px] leading-8 text-pretty text-neutral-300">
                {t('companyProfile.text')}
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-px bg-white/15 sm:grid-cols-4">
                {companyStats.map((stat) => (
                  <div key={stat.label} className="bg-surface-dark min-w-0 p-5 md:p-6">
                    <dt className="font-serif text-2xl leading-none font-semibold text-white md:text-3xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-3 text-xs leading-5 text-neutral-300">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section
        id="unternehmensgruppe"
        className="border-border bg-muted/45 border-b py-16 md:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-10">
          <div className="flex flex-col gap-4">
            <span className="text-brand-700 font-mono text-xs tracking-[0.18em] uppercase">
              {t('group.eyebrow')}
            </span>
            <h2 className="max-w-[18ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-4xl">
              {t('group.title')}
            </h2>
            <p className="text-muted-foreground max-w-[58ch] text-[17px] leading-8 text-pretty">
              {t('group.text')}
            </p>
            <Link
              href="/group"
              className="text-brand-700 hover:text-brand-800 mt-2 inline-flex items-center gap-2 self-start text-sm font-semibold transition-colors"
            >
              {t('group.link')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <figure className="border-border bg-background overflow-hidden border p-2">
            <Image
              src="/images/partners/northdata-network.png"
              alt={t('group.imageAlt')}
              width={799}
              height={333}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="text-muted-foreground flex flex-wrap justify-between gap-x-4 gap-y-1 border-t px-2 pt-3 text-xs leading-5">
              <span>{t('group.caption')}</span>
              <a
                href="https://www.northdata.de/"
                target="_blank"
                rel="noreferrer"
                className="text-brand-700 hover:text-brand-800 font-medium transition-colors"
              >
                {t('group.sourceLabel')}
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      <TrademarkCertificate
        copy={{
          eyebrow: t('trademark.eyebrow'),
          title: t('trademark.title'),
          text: t('trademark.text'),
          registrationLabel: t('trademark.registrationLabel'),
          registration: t('trademark.registration'),
        }}
      />

      <section className="border-border border-b py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <Link
            href="/partners"
            className="group border-border hover:border-brand-300 grid gap-5 border p-7 transition-colors md:grid-cols-[1fr_auto] md:items-end md:p-9"
          >
            <div>
              <h2 className="max-w-[24ch] font-serif text-3xl leading-tight font-semibold text-balance">
                {t('partnerTrack.title')}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-[70ch] leading-7 text-pretty">
                {t('partnerTrack.text')}
              </p>
            </div>
            <span className="text-brand-700 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
              {t('partnerTrack.link')}
              <ArrowUpRight
                className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </section>

      <Awards compact />

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.label'), href: '/contact' }}
      />
    </main>
  )
}
