import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, organization } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

type ValueItem = {
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

  const t = await getTranslations({ locale, namespace: 'AboutPage' })

  return buildMetadata({
    locale,
    path: '/about',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: { de: '/ueber-uns', en: '/about' },
  })
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('AboutPage')
  const nav = await getTranslations('Nav')
  const values = t.raw('values.items') as ValueItem[]
  const path = locale === 'de' ? '/ueber-uns' : '/about'

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

      <section className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.16em]">
            {t('eyebrow')}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] text-balance md:text-6xl">
            {t('title')}
          </h1>
        </div>
        <div className="border-accent flex flex-col gap-5 border-l-2 pl-6 md:pl-8">
          <p className="text-muted-foreground text-lg leading-8">{t('lede')}</p>
          <p className="text-muted-foreground text-lg leading-8">{t('body')}</p>
        </div>
      </section>

      <section className="border-border bg-muted border-y py-16">
        <div className="mx-auto grid w-full max-w-[1240px] gap-6 px-6 md:grid-cols-3 lg:px-10">
          {values.map((item) => (
            <article key={item.title} className="border-border bg-white p-7">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-muted-foreground mt-3 leading-7">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1240px] flex-col items-start justify-between gap-6 px-6 py-16 lg:flex-row lg:items-center lg:px-10">
        <div>
          <h2 className="font-serif text-3xl font-semibold">{t('cta.title')}</h2>
          <p className="text-muted-foreground mt-2 max-w-[62ch] leading-7">
            {t('cta.text')}
          </p>
        </div>
        <Link
          href="/contact"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex px-6 py-3 text-sm font-semibold transition-colors"
        >
          {t('cta.label')}
        </Link>
      </section>
    </main>
  )
}
