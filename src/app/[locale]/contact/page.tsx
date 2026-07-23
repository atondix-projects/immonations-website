import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Mail, Phone } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, localBusiness } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { PageHero } from '@/components/site/templates/page-hero'
import { SITE } from '@/lib/seo/site'
import { PrototypeContactForm } from '@/components/site/contact/prototype-contact-form'

export const dynamic = 'force-static'

type ContactStep = {
  title: string
  text: string
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

  const t = await getTranslations({ locale, namespace: 'ContactPage' })

  return buildMetadata({
    locale,
    path: '/contact',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: { de: '/kontakt', en: '/contact' },
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('ContactPage')
  const nav = await getTranslations('Nav')
  const steps = t.raw('steps.items') as ContactStep[]
  const path = locale === 'de' ? '/kontakt' : '/contact'

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: nav('contact'), url: `${SITE.url}/${locale}${path}` },
          ]),
          localBusiness({
            locale,
            name: SITE.legalName,
            address: SITE.address,
            telephone: SITE.contact.phone,
          }),
        ]}
      />

      <section className="border-border border-b">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-14 lg:px-10 lg:py-20">
          <PageHero
            eyebrow={t('eyebrow')}
            title={t('title')}
            lede={t('lede')}
            className="!px-0 !py-0 lg:grid-cols-1"
          />

          <aside className="flex flex-col gap-4 lg:sticky lg:top-28">
            <a
              href={`tel:${SITE.contact.phone.replaceAll(' ', '')}`}
              className="border-border hover:border-foreground flex items-center gap-4 border bg-white p-5 transition-colors"
            >
              <Phone className="text-primary size-5 shrink-0" />
              <span className="flex flex-col">
                <span className="text-muted-foreground text-sm">{t('phoneLabel')}</span>
                <span className="font-semibold">{SITE.contact.phone}</span>
              </span>
            </a>
            <a
              href={`mailto:${SITE.contact.email}`}
              className="border-border hover:border-foreground flex items-center gap-4 border bg-white p-5 transition-colors"
            >
              <Mail className="text-primary size-5 shrink-0" />
              <span className="flex flex-col">
                <span className="text-muted-foreground text-sm">{t('emailLabel')}</span>
                <span className="font-semibold">{SITE.contact.email}</span>
              </span>
            </a>
            <Link
              href="/services"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex justify-center px-6 py-3 text-sm font-semibold transition-colors"
            >
              {t('serviceLink')}
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-muted/45 py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-5 sm:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12">
          <PrototypeContactForm />
          <div className="lg:pt-8">
            <p className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
              {t('steps.eyebrow')}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium">{t('steps.title')}</h2>
            <ol className="mt-10 grid gap-8">
              {steps.map((step, index) => (
                <li key={step.title} className="grid gap-3 md:grid-cols-[3rem_1fr] md:gap-6">
                  <span className="text-primary font-serif text-2xl font-semibold tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground mt-2 leading-7">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  )
}
