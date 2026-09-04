import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { listBellVideos } from '@/lib/content/bell-videos'
import { listSoldVideos } from '@/lib/content/sold-videos'
import { listLocalizedReferences } from '@/lib/content/references'
import { Awards } from './home/awards'
import { ContactBooking } from './home/contact-booking'
import { DigitalAssistant } from './home/client-wish-sections'
import { FeedbackReviews } from './home/feedback-reviews'
import { FeedbackVideos } from './home/feedback-videos'
import { PremiumMarketing } from './home/premium-marketing'
import { SocialMedia } from './home/social-media'
import { ReferenceGallery } from './references/reference-gallery'
import { PropertyTourSection } from './social/property-tour'
import { BellVideoWall } from './sold/bell-video-wall'
import { SoldVideoReel } from './sold/sold-video-reel'
import { CatalogPreview } from './catalog-preview'
import { MagazineSection } from './magazine-section'

export async function BuyerSearchContent({ locale }: { locale: Locale }) {
  const isGerman = locale === 'de'
  const copy = isGerman
    ? {
        eyebrow: 'So funktioniert der Abgleich',
        title: 'Vom Suchprofil zum passenden Gespräch',
        steps: [
          [
            '01',
            'Profil verstehen',
            'Objektart, Lage, Budget und Zeitplan werden mit Ihrer Immobilie abgeglichen.',
          ],
          [
            '02',
            'Interesse prüfen',
            'Wir klären, ob die Anfrage ernsthaft ist und zum Objekt passt.',
          ],
          [
            '03',
            'Kontakt abstimmen',
            'Sie entscheiden, welche Informationen und welcher nächste Schritt freigegeben werden.',
          ],
        ],
        link: 'Suchauftrag für Käufer anlegen',
      }
    : {
        eyebrow: 'How the match works',
        title: 'From a search profile to the right conversation',
        steps: [
          [
            '01',
            'Understand the profile',
            'We match property type, location, budget, and timing with your property.',
          ],
          [
            '02',
            'Check the interest',
            'We clarify whether the enquiry is serious and fits the property.',
          ],
          ['03', 'Agree the contact', 'You decide which information and next step are approved.'],
        ],
        link: 'Create a buyer search request',
      }

  return (
    <section className="border-border bg-muted/45 border-y py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <div className="grid gap-px bg-neutral-900/10 md:grid-cols-3">
          {copy.steps.map(([number, title, text]) => (
            <article key={number} className="bg-background flex min-h-56 flex-col p-7 md:p-9">
              <span className="text-brand-700 font-mono text-xs tabular-nums">{number}</span>
              <h2 className="mt-7 font-serif text-2xl leading-tight font-semibold text-balance">
                {title}
              </h2>
              <p className="text-muted-foreground mt-4 text-[15px] leading-[1.75]">{text}</p>
            </article>
          ))}
        </div>
        <Link
          href="/buy"
          className="text-brand-700 mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
        >
          {copy.link}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export async function AiContent({ locale }: { locale: Locale }) {
  return <DigitalAssistant locale={locale} />
}

export async function AppointmentContent({ locale }: { locale: Locale }) {
  const isGerman = locale === 'de'
  const copy = isGerman
    ? {
        eyebrow: 'Persönlich statt automatisch',
        title: 'Das Erstgespräch bleibt auf Ihre Situation zugeschnitten.',
        text: 'Die Online-Vorschau zeigt den Ablauf. Für die verbindliche Terminabstimmung meldet sich unser Team persönlich bei Ihnen.',
      }
    : {
        eyebrow: 'Personal, not automatic',
        title: 'The initial conversation stays tailored to your situation.',
        text: 'The online preview shows the flow. Our team coordinates the actual appointment with you personally.',
      }

  return (
    <>
      <section className="border-border border-b py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <CatalogPreview kind="appointment" locale={locale} />
        </div>
      </section>
      <section className="bg-muted/45 border-border border-b py-16 md:py-20">
        <div className="mx-auto grid w-full max-w-[1240px] gap-6 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10">
          <p className="text-primary text-[11px] font-semibold tracking-[0.18em] uppercase">
            {copy.eyebrow}
          </p>
          <div>
            <h2 className="font-serif text-3xl leading-tight font-semibold text-balance md:text-4xl">
              {copy.title}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-[66ch] text-[17px] leading-[1.7]">
              {copy.text}
            </p>
          </div>
        </div>
      </section>
      <ContactBooking />
    </>
  )
}

export async function MagazineContent() {
  const t = await getTranslations('Magazine')
  const points = t.raw('points') as Array<{ title: string; text: string }>

  return (
    <>
      <MagazineSection />
      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="grid gap-px bg-neutral-900/10 md:grid-cols-3">
            {points.map((point, index) => (
              <article
                key={point.title}
                className="bg-background flex min-h-56 flex-col p-7 md:p-9"
              >
                <span className="text-brand-700 font-mono text-xs tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-7 font-serif text-2xl font-semibold">{point.title}</h2>
                <p className="text-muted-foreground mt-4 text-[15px] leading-[1.75]">
                  {point.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export async function SoldContent({ locale }: { locale: Locale }) {
  const soldT = await getTranslations('SoldVideos')
  const items = listLocalizedReferences(locale)
  const isGerman = locale === 'de'

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-primary text-[13px] font-semibold tracking-[0.16em] uppercase">
                {isGerman ? 'Ausgewählte Abschlüsse' : 'Selected completions'}
              </p>
              <h2 className="mt-3 max-w-[18ch] font-serif text-3xl leading-[1.12] font-semibold text-balance md:text-[42px]">
                {isGerman ? 'Ausgangslage, Weg und Ergebnis' : 'Starting point, route, and outcome'}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-[66ch] text-[16px] leading-[1.65] lg:justify-self-end">
              {isGerman
                ? 'Jede Referenz zeigt einen freigegebenen Verkaufsfall mit konkretem Objektbezug. Die Auswahl bleibt bewusst persönlich und schützt vertrauliche Angaben.'
                : 'Each reference shows an approved sales case with a concrete property context. The selection remains deliberate and protects confidential information.'}
            </p>
          </div>
          <ReferenceGallery
            items={items}
            referenceLabel={isGerman ? 'Verkaufsreferenz' : 'Sales reference'}
            allLabel={isGerman ? 'Alle Objekte' : 'All properties'}
            filterLabel={
              isGerman ? 'Referenzen nach Objektart filtern' : 'Filter references by property type'
            }
          />
        </div>
      </section>
      <SoldVideoReel
        items={listSoldVideos()}
        eyebrow={soldT('eyebrow')}
        title={soldT('title')}
        text={soldT('text')}
        showCta={false}
      />
      <BellVideoWall items={listBellVideos()} className="bg-muted border-border border-y" />
      <FeedbackVideos />
      <FeedbackReviews className="bg-muted border-border border-y" />
    </>
  )
}

export async function AwardsContent({ locale }: { locale: Locale }) {
  const isGerman = locale === 'de'
  const copy = isGerman
    ? {
        eyebrow: 'Fachliche Qualifikation',
        title: 'Ein fest angestellter Ingenieur im Team',
        text: 'Hubert Christian Mahlich unterstützt Aufmaß, Wohnflächenberechnung und Grundrisserstellung. Die fachliche Vorbereitung ergänzt die öffentliche Anerkennung um einen konkreten Nutzen für den Verkaufsprozess.',
        name: 'Hubert Christian Mahlich — Ingenieur',
        detail:
          'Studium an der Technischen Hochschule Nürnberg Georg Simon Ohm, Abschluss 2024 als Bachelor of Arts.',
      }
    : {
        eyebrow: 'Professional qualification',
        title: 'A permanently employed engineer on the team',
        text: 'Hubert Christian Mahlich supports measurement, floor-area calculation, and plan preparation. This practical qualification complements public recognition with a concrete benefit for the sales process.',
        name: 'Hubert Christian Mahlich — Engineer',
        detail:
          'Studied at Nuremberg Institute of Technology Georg Simon Ohm, graduating in 2024 with a Bachelor of Arts.',
      }

  return (
    <>
      <Awards />
      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-10">
          <div>
            <p className="text-primary text-[11px] font-semibold tracking-[0.18em] uppercase">
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight font-semibold text-balance md:text-[40px]">
              {copy.title}
            </h2>
          </div>
          <div className="border-border bg-background border p-7 md:p-9">
            <ShieldCheck className="text-primary size-6" aria-hidden="true" />
            <h3 className="mt-6 font-serif text-2xl font-semibold">{copy.name}</h3>
            <p className="text-muted-foreground mt-4 text-[15px] leading-[1.75]">{copy.detail}</p>
            <p className="text-muted-foreground mt-3 text-[15px] leading-[1.75]">{copy.text}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export async function VideoContent() {
  return <PremiumMarketing />
}

export async function SocialContent({ locale }: { locale: Locale }) {
  const isGerman = locale === 'de'
  const stats = isGerman
    ? [
        ['8.000+', 'Suchkunden im Netzwerk vorgemerkt und aktiv'],
        ['60+', 'Verkäufe pro Jahr, viele ohne öffentliches Inserat'],
        ['6–12', 'Wochen bis zum Käufer als typische Vermarktungsdauer'],
      ]
    : [
        ['8,000+', 'buyer profiles registered and active'],
        ['60+', 'sales per year, many without a public listing'],
        ['6–12', 'weeks to a buyer as a typical marketing period'],
      ]

  return (
    <>
      <SocialMedia />
      <PropertyTourSection locale={locale} />
      <SoldVideoReel
        items={listSoldVideos()}
        layout="grid"
        eyebrow={isGerman ? 'Verkauft & übergeben' : 'Sold & handed over'}
        title={isGerman ? 'Ergebnisse, nicht nur Reichweite' : 'Outcomes, not just reach'}
        text={
          isGerman
            ? 'Social Media ist ein Teil des Systems. Entscheidend ist, ob daraus passende Gespräche und sichere Abschlüsse entstehen.'
            : 'Social media is one part of the system. What matters is whether it creates relevant conversations and secure completions.'
        }
      />
      <section className="border-border bg-muted/45 border-y py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-[1240px] gap-px bg-neutral-900/10 px-6 sm:grid-cols-3 lg:px-10">
          {stats.map(([value, label]) => (
            <div key={label} className="bg-background p-7 md:p-9">
              <p className="font-serif text-4xl font-semibold tabular-nums md:text-5xl">{value}</p>
              <p className="text-muted-foreground mt-3 text-sm leading-[1.65]">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
