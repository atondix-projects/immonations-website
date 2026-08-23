import type { Metadata } from 'next'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { Directions } from '@/components/site/contact/directions'
import { OfficeVisit } from '@/components/site/contact/office-visit'
import { PrototypeContactForm } from '@/components/site/contact/prototype-contact-form'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { TestimonialSpotlight } from '@/components/site/testimonial-spotlight'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { selectFaqsForPage, toFaqSectionItems } from '@/lib/content/faqs'
import { breadcrumbList, faqPage, localBusiness, OFFICE_OPENING_HOURS } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

type ContactStep = {
  title: string
  text: string
}

const CONTAINER = 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12'
const EYEBROW = 'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'

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
  const faqItems = toFaqSectionItems(selectFaqsForPage(locale, 'contact'))
  const pageUrl = `${SITE.url}/${locale}${localizePath('/contact', locale)}`

  const channels = [
    {
      key: 'phone' as const,
      icon: Phone,
      value: SITE.contact.phoneDisplay,
      href: `tel:${SITE.contact.phone.replaceAll(' ', '')}`,
    },
    {
      key: 'email' as const,
      icon: Mail,
      value: SITE.contact.email,
      href: `mailto:${SITE.contact.email}`,
    },
    {
      key: 'office' as const,
      icon: MapPin,
      value: `${SITE.address.streetAddress}, ${SITE.address.postalCode} ${SITE.address.addressLocality}`,
      href: undefined,
    },
  ]

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: nav('contact'), url: pageUrl },
          ]),
          localBusiness({
            locale,
            name: SITE.legalName,
            address: SITE.address,
            telephone: SITE.contact.phone,
            email: SITE.contact.email,
            openingHours: OFFICE_OPENING_HOURS,
          }),
          faqPage(faqItems),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      {/* Direct channels — the page's core job sits above every other block. */}
      <section className="border-border border-y">
        <div className={CONTAINER}>
          <ul className="divide-border grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
            {channels.map((channel, index) => {
              const body = (
                <>
                  <channel.icon
                    className="text-brand-600 size-5 shrink-0"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-neutral-600 uppercase">
                      {t(`channels.${channel.key}.label`)}
                    </span>
                    <span className="text-[17px] leading-snug font-semibold break-words">
                      {channel.value}
                    </span>
                    <span className="text-muted-foreground text-sm leading-[1.6]">
                      {t(`channels.${channel.key}.note`)}
                    </span>
                  </span>
                </>
              )

              return (
                <li key={channel.key} className={index > 0 ? 'md:pl-8 lg:pl-10' : ''}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="hover:bg-muted/50 flex h-full items-start gap-4 py-7 transition-colors md:py-9 md:pr-8"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex h-full items-start gap-4 py-7 md:py-9 md:pr-8">{body}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-muted/45 py-18 md:py-24">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16`}>
          <PrototypeContactForm />
          <div className="lg:pt-4">
            <p className={EYEBROW}>{t('steps.eyebrow')}</p>
            <h2 className="mt-4 max-w-[16ch] font-serif text-[2.1rem] leading-[1.06] font-medium tracking-[-0.025em] text-balance break-words hyphens-auto md:text-[2.6rem]">
              {t('steps.title')}
            </h2>
            <ol className="divide-border border-border mt-10 grid divide-y border-t">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-3 py-6 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6"
                >
                  <span className="text-brand-700 font-mono text-xs tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg leading-snug font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground mt-2 max-w-[58ch] text-[15px] leading-[1.7] text-pretty">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/sell"
              className="border-border mt-8 inline-flex min-h-11 items-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px"
            >
              {t('serviceLink')}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className={CONTAINER}>
          <OfficeVisit />
        </div>
      </section>

      <section className="border-border bg-muted/45 border-y py-18 md:py-24">
        <div className={CONTAINER}>
          <Directions />
        </div>
      </section>

      {/* Das Kundeninterview steht bewusst vor den FAQ: Wer bis hierher liest,
          sucht den letzten Anstoß für die Kontaktaufnahme. `bg-background` hält
          den Wechsel zur vorangehenden Anfahrt-Sektion sichtbar. */}
      <TestimonialSpotlight id="viktor-emter" className="bg-background" />

      <FaqSection title={t('faqTitle')} items={faqItems} className="bg-muted/45" />

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/faq' }}
      />
    </main>
  )
}
