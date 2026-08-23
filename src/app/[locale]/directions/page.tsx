import type { Metadata } from 'next'
import { Bike, Bus, Car, Clock, MapPin, Phone, Route } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { routing } from '@/i18n/routing'
import { breadcrumbList, faqPage, localBusiness, OFFICE_OPENING_HOURS } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { SITE } from '@/lib/seo/site'

const COPY = {
  de: {
    title: 'Anfahrt zum Immonation-Büro in Zirndorf',
    eyebrow: 'Besuch planen',
    lede: 'Adresse, Erreichbarkeit und Terminrahmen für Ihren Besuch – ohne unbestätigte Reisezeiten oder Barrierefreiheitsversprechen.',
    home: 'Start',
    intro:
      'Unser Büro befindet sich in der Nürnberger Straße 18 in 90513 Zirndorf. Bitte stimmen Sie Ihren Besuch vorab ab, damit der passende Ansprechpartner Zeit für Ihr Anliegen einplant.',
    address: 'Adresse',
    hours: 'Öffnungszeiten',
    weekdays: 'Montag bis Freitag',
    saturday: 'Samstag',
    appointment: 'Termine außerhalb dieser Zeiten nach persönlicher Abstimmung.',
    travelTitle: 'So bereiten Sie die Anreise vor',
    travel: [
      [
        'Auto & Parken',
        'Nutzen Sie für die aktuelle Route einen Kartendienst. Eine bestimmte Stellplatzverfügbarkeit können wir nicht zusagen; fragen Sie bei der Terminbestätigung nach der aktuellen Parksituation.',
      ],
      [
        'Bus & Bahn',
        'Prüfen Sie Verbindungen und mögliche Einschränkungen unmittelbar vor der Fahrt beim jeweiligen Verkehrsverbund.',
      ],
      [
        'Fahrrad',
        'Die individuelle Route hängt von Ihrem Startpunkt ab. Fragen Sie vor dem Besuch nach einer sicheren Abstellmöglichkeit am Büro.',
      ],
      [
        'Barrierearme Ankunft',
        'Konkrete bauliche Zugänglichkeit ist hier nicht pauschal zugesichert. Teilen Sie uns Ihren Bedarf vorab mit, damit wir eine passende Lösung abstimmen.',
      ],
    ],
    route: 'Route in Google Maps öffnen',
    call: 'Büro anrufen',
    faq: [
      {
        question: 'Kann ich ohne Termin vorbeikommen?',
        answer:
          'Bitte vereinbaren Sie vorab einen Termin, damit der richtige Ansprechpartner verfügbar ist.',
      },
      {
        question: 'Gibt es reservierte Parkplätze?',
        answer:
          'Eine feste Verfügbarkeit wird nicht zugesagt. Fragen Sie bei der Terminbestätigung nach der aktuellen Parksituation.',
      },
      {
        question: 'Ist das Büro barrierefrei?',
        answer:
          'Die konkrete Zugänglichkeit ist nicht pauschal bestätigt. Nennen Sie uns Ihren Bedarf vorab, damit wir den Besuch passend organisieren.',
      },
    ],
    ctaTitle: 'Besuch persönlich abstimmen',
    ctaText: 'Rufen Sie uns an oder senden Sie eine Nachricht mit Ihrem Anliegen.',
    cta: 'Kontakt aufnehmen',
  },
  en: {
    title: 'Directions to the Immonation office in Zirndorf',
    eyebrow: 'Plan your visit',
    lede: 'Address, contact details, and appointment guidance for your visit—without unverified travel-time or accessibility claims.',
    home: 'Home',
    intro:
      'Our office is at Nürnberger Straße 18, 90513 Zirndorf. Please arrange your visit in advance so the right contact can set aside time for your enquiry.',
    address: 'Address',
    hours: 'Opening hours',
    weekdays: 'Monday to Friday',
    saturday: 'Saturday',
    appointment: 'Appointments outside these times can be arranged personally.',
    travelTitle: 'Prepare your journey',
    travel: [
      [
        'Driving & parking',
        'Use a mapping service for the current route. We cannot promise a specific parking space; ask about the current situation when confirming your appointment.',
      ],
      [
        'Public transport',
        'Check connections and current disruption with the relevant transport operator immediately before travelling.',
      ],
      [
        'Cycling',
        'The best route depends on your starting point. Ask about a suitable place to leave your bicycle before visiting.',
      ],
      [
        'Accessible arrival',
        'Specific step-free access is not promised here. Tell us what you need in advance so we can arrange a suitable solution.',
      ],
    ],
    route: 'Open route in Google Maps',
    call: 'Call the office',
    faq: [
      {
        question: 'Can I visit without an appointment?',
        answer: 'Please arrange an appointment so the right contact is available.',
      },
      {
        question: 'Are reserved parking spaces available?',
        answer:
          'Availability is not guaranteed. Ask about the current situation when confirming your appointment.',
      },
      {
        question: 'Is the office step-free?',
        answer:
          'Specific accessibility has not been confirmed here. Tell us your needs in advance so the visit can be organised appropriately.',
      },
    ],
    ctaTitle: 'Arrange your visit personally',
    ctaText: 'Call us or send a message outlining your enquiry.',
    cta: 'Contact us',
  },
} as const

const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${SITE.address.streetAddress}, ${SITE.address.postalCode} ${SITE.address.addressLocality}`)}`

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const copy = COPY[locale]
  return buildMetadata({
    locale,
    path: '/directions',
    localizedPaths: { de: '/anfahrt', en: '/directions' },
    title: `${copy.title} | Immonation`,
    description: copy.lede,
  })
}

export default async function DirectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const copy = COPY[locale]
  const url = `${SITE.url}/${locale}${locale === 'de' ? '/anfahrt' : '/directions'}`
  const icons = [Car, Bus, Bike, Route]
  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: copy.home, url: `${SITE.url}/${locale}` },
            { name: copy.title, url },
          ]),
          localBusiness({
            locale,
            name: SITE.legalName,
            address: { ...SITE.address, addressCountry: 'DE' },
            telephone: SITE.contact.phone,
            email: SITE.contact.email,
            openingHours: OFFICE_OPENING_HOURS,
          }),
          faqPage([...copy.faq]),
        ]}
      />
      <PageHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <section className="border-border bg-muted border-y py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1080px] px-6 lg:px-10">
          <p className="max-w-[72ch] text-lg leading-[1.75] text-pretty">{copy.intro}</p>
          <div className="mt-10 grid gap-px bg-neutral-300 md:grid-cols-2">
            <div className="bg-background p-7">
              <MapPin className="text-brand-700 size-5" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl font-semibold">{copy.address}</h2>
              <address className="mt-3 leading-7 not-italic">
                {SITE.legalName}
                <br />
                {SITE.address.streetAddress}
                <br />
                {SITE.address.postalCode} {SITE.address.addressLocality}
              </address>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 mt-6 inline-flex min-h-11 items-center font-semibold"
              >
                {copy.route}
              </a>
            </div>
            <div className="bg-background p-7">
              <Clock className="text-brand-700 size-5" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl font-semibold">{copy.hours}</h2>
              <dl className="mt-3 space-y-2">
                <div className="flex justify-between gap-4">
                  <dt>{copy.weekdays}</dt>
                  <dd className="tabular-nums">09:00–18:00</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>{copy.saturday}</dt>
                  <dd className="tabular-nums">10:30–14:00</dd>
                </div>
              </dl>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {copy.appointment}
              </p>
              <a
                href={`tel:${SITE.contact.phone.replaceAll(' ', '')}`}
                className="text-brand-700 mt-5 inline-flex min-h-11 items-center gap-2 font-semibold"
              >
                <Phone className="size-4" aria-hidden="true" />
                {copy.call}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1080px] px-6 lg:px-10">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">{copy.travelTitle}</h2>
          <div className="divide-border mt-8 divide-y border-y">
            {copy.travel.map(([title, text], index) => {
              const Icon = icons[index] ?? Route
              return (
                <article
                  key={title}
                  className="grid gap-4 py-7 md:grid-cols-[48px_0.6fr_1.4fr] md:items-start"
                >
                  <Icon className="text-brand-700 size-5" aria-hidden="true" />
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-muted-foreground max-w-[68ch] leading-7">{text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      <FaqSection title="FAQ" items={[...copy.faq]} />
      <CtaBand
        title={copy.ctaTitle}
        text={copy.ctaText}
        primary={{ label: copy.cta, href: '/contact' }}
      />
    </main>
  )
}
