import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Mail, Phone } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, organization } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
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
          organization({ locale, url: SITE.url, name: SITE.legalName }),
        ]}
      />

      <section className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 py-16 lg:grid-cols-[1fr_0.85fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.16em]">
            {t('eyebrow')}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] text-balance md:text-6xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[68ch] text-lg leading-8">
            {t('lede')}
          </p>
        </div>

        <aside className="border-border bg-muted flex flex-col gap-5 border p-7">
          <a
            href={`tel:${SITE.contact.phone.replaceAll(' ', '')}`}
            className="border-border bg-white flex items-center gap-4 border p-4 transition-colors hover:border-foreground"
          >
            <Phone className="text-primary size-5" />
            <span className="flex flex-col">
              <span className="text-muted-foreground text-sm">{t('phoneLabel')}</span>
              <span className="font-semibold">{SITE.contact.phone}</span>
            </span>
          </a>
          <a
            href={`mailto:${SITE.contact.email}`}
            className="border-border bg-white flex items-center gap-4 border p-4 transition-colors hover:border-foreground"
          >
            <Mail className="text-primary size-5" />
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
      </section>

      <section className="border-border bg-muted border-y py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <h2 className="font-serif text-3xl font-semibold">{t('steps.title')}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="border-border bg-white p-7">
                <span className="text-primary font-serif text-sm font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-3 leading-7">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
