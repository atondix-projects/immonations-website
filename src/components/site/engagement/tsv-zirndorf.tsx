import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { VideoDialog } from '@/components/site/video-dialog'
import {
  TSV_ARTICLE_SLUG,
  TSV_ATHLETES,
  TSV_PUBLISHABLE_IMAGES,
  TSV_QUOTES,
  TSV_SOURCE_URL,
  TSV_SPONSORING_VIDEO,
} from '@/lib/content/tsv-zirndorf'

/**
 * Sponsoring des TSV Zirndorf auf `/engagement`.
 *
 * Jede Sachaussage stammt weiterhin aus der verlinkten Bekanntgabe des Vereins
 * — die Tonlage führt jetzt allerdings mit dem, was da ist, statt mit dem, was
 * fehlt. Die Stillschweigeabrede über die Höhe der Unterstützung bleibt
 * genannt, aber als Fußnote unter dem Zitat und nicht mehr als eigene
 * Spaltenüberschrift.
 *
 * Zwei Zitate stehen im Register, und sie sind hier bewusst verteilt: Erman
 * Karabacak erklärt in dieser Sektion die Motivation, Marcus Grun spricht in
 * der eigenen Spotlight-Sektion (`tsv-feedback-spotlight.tsx`) neben seinem
 * Video. Beide doppelt zu zeigen, hätte die Seite nur verwässert.
 */

const COPY = {
  de: {
    eyebrow: 'Leichtathletik TSV Zirndorf',
    title: 'Wir stehen hinter dem TSV Zirndorf',
    lede: 'Seit Dezember 2025 gehört die Immonation GmbH zu den Partnern der Leichtathletikabteilung des TSV Zirndorf. Geschäftsführer Erman Karabacak ist persönlich Athletensponsor von Eni Kuske und Amelie Giese — und weil Spitzenleistung einen starken Unterbau braucht, fließt zusätzlich eine Zuwendung in die Nachwuchsarbeit. Bekannt gegeben hat die Partnerschaft der Verein selbst.',
    factsLabel: 'Die Partnerschaft auf einen Blick',
    facts: [
      { term: 'Seit', detail: 'Dezember 2025, bekannt gegeben vom Verein am 14. Dezember' },
      { term: 'Partner', detail: 'Leichtathletikabteilung des TSV Zirndorf' },
      // `detail` wird aus TSV_ATHLETES erzeugt — siehe `athleteDetail` unten.
      { term: 'Athletensponsoring', detail: '' },
      { term: 'Wofür', detail: 'Training, Wettkampfreisen, Equipment und die Nachwuchsarbeit' },
    ],
    quoteLabel: 'Warum wir das machen',
    quoteFootnote:
      'Zur Höhe der Unterstützung haben beide Seiten Stillschweigen vereinbart — deshalb steht hier keine Summe.',
    videoLabel: 'Der Sponsoringfilm',
    videoLede:
      'Eni Kuske, Amelie Giese und die Unterzeichnung der Vereinbarung mit dem TSV Zirndorf — 37 Sekunden, von Immonation produziert.',
    imagesLabel: 'Die Athletinnen und ihre Bilanz',
    imagesNote:
      'Die Autogrammkarten hat Immonation für den Verein produziert; sie tragen die Marke sichtbar. Die Erfolgskarten geben den Stand von Juli 2026 wieder. Für alle Aufnahmen liegen Veröffentlichungsfreigaben vor.',
    sourceLabel: 'Bekanntgabe des TSV Zirndorf im Original lesen',
    articleLabel: 'Ausführlicher Beitrag im Magazin',
  },
  en: {
    eyebrow: 'TSV Zirndorf athletics',
    title: 'We back TSV Zirndorf',
    lede: 'Since December 2025 Immonation GmbH has been one of the partners of the athletics division at TSV Zirndorf. Managing Director Erman Karabacak personally sponsors Eni Kuske and Amelie Giese — and because top performance needs a strong base beneath it, a further contribution goes to the youth programme. The partnership was announced by the club itself.',
    factsLabel: 'The partnership at a glance',
    facts: [
      { term: 'Since', detail: 'December 2025, announced by the club on 14 December' },
      { term: 'Partner', detail: 'Athletics division of TSV Zirndorf' },
      { term: 'Athlete sponsorship', detail: '' },
      {
        term: 'What it funds',
        detail: 'Training, travel to competitions, equipment, and the youth programme',
      },
    ],
    quoteLabel: 'Why we do it',
    quoteFootnote:
      'Both sides agreed to keep the size of the support confidential, so no figure appears here.',
    videoLabel: 'The sponsorship film',
    videoLede:
      'Eni Kuske, Amelie Giese, and the signing of the agreement with TSV Zirndorf — 37 seconds, produced by Immonation.',
    imagesLabel: 'The athletes and their record',
    imagesNote:
      'The autograph cards were produced by Immonation for the club and carry the brand visibly. The results cards show the standings as of July 2026. Publication releases are in place for all of this footage.',
    sourceLabel: 'Read the original announcement by TSV Zirndorf',
    articleLabel: 'Full account in the magazine',
  },
} as const

export async function TsvZirndorf({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const tVideo = await getTranslations('VideoDialog')
  const t = await getTranslations('BlogPost')

  // Namen, Jahrgänge und Disziplinen kommen aus dem Register, damit Sektion und
  // Bildunterschriften nicht auseinanderlaufen. „Bundeskaderathletinnen" ist die
  // Einordnung der Quelle und steht deshalb fest im Text.
  const athleteDetail =
    TSV_ATHLETES.map((athlete) => `${athlete.name} (${athlete.discipline[locale]})`).join(
      locale === 'de' ? ' und ' : ' and ',
    ) + (locale === 'de' ? ', beide Bundeskaderathletinnen' : ', both national squad athletes')

  const facts = copy.facts.map((fact) => (fact.detail ? fact : { ...fact, detail: athleteDetail }))

  return (
    <section
      id="tsv-zirndorf"
      aria-labelledby="tsv-zirndorf-heading"
      className="border-border scroll-mt-24 border-t py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <p className="text-brand-700 font-mono text-[11px] tracking-[0.2em] uppercase">
          {copy.eyebrow}
        </p>
        <h2
          id="tsv-zirndorf-heading"
          className="mt-5 max-w-[24ch] font-serif text-[2rem] leading-[1.1] font-medium tracking-[-0.02em] text-balance md:text-[2.6rem]"
        >
          {copy.title}
        </h2>
        <p className="mt-6 max-w-[74ch] text-[17px] leading-[1.75] text-pretty">{copy.lede}</p>

        <div className="border-border mt-12 grid gap-px border bg-neutral-900/10 md:grid-cols-2">
          <div className="bg-background p-7 md:p-9">
            <h3 className="text-muted-foreground font-mono text-[11px] tracking-[0.18em] uppercase">
              {copy.factsLabel}
            </h3>
            <dl className="mt-6 space-y-4">
              {facts.map((fact) => (
                <div key={fact.term} className="border-border border-b pb-4 last:border-0">
                  <dt className="text-foreground text-sm font-semibold">{fact.term}</dt>
                  <dd className="text-muted-foreground mt-1 text-[15px] leading-[1.7]">
                    {fact.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-background flex flex-col p-7 md:p-9">
            <h3 className="text-muted-foreground font-mono text-[11px] tracking-[0.18em] uppercase">
              {copy.quoteLabel}
            </h3>
            <figure className="border-brand-600 mt-6 border-l-2 pl-5">
              <blockquote className="text-foreground/90 font-serif text-[1.15rem] leading-[1.55] text-pretty">
                “{TSV_QUOTES.karabacak[locale]}”
              </blockquote>
              <figcaption className="text-muted-foreground mt-4 text-[13px]">
                <span className="text-foreground font-semibold">
                  {TSV_QUOTES.karabacak.speaker}
                </span>{' '}
                — {TSV_QUOTES.karabacak.role[locale]}
              </figcaption>
            </figure>
            <p className="text-muted-foreground mt-6 text-[13px] leading-[1.7]">
              {copy.quoteFootnote}
            </p>

            <div className="mt-auto flex flex-col gap-4 pt-8">
              <a
                href={TSV_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 inline-flex items-center gap-2 text-sm font-semibold"
              >
                {copy.sourceLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <Link
                href={{ pathname: '/blog/[slug]', params: { slug: TSV_ARTICLE_SLUG[locale] } }}
                className="text-brand-700 inline-flex items-center gap-2 text-sm font-semibold"
              >
                {copy.articleLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Der Sponsoringfilm läuft neben seinem Text statt in einem Zweierraster:
            Seit das Feedback von Marcus Grun eine eigene Sektion hat, stünde ein
            9:16-Hochformat sonst allein in einer halbleeren Rasterzeile. */}
        <div className="mt-14 grid items-center gap-8 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-10">
          <VideoDialog
            src={TSV_SPONSORING_VIDEO.src}
            poster={TSV_SPONSORING_VIDEO.poster}
            width={TSV_SPONSORING_VIDEO.width}
            height={TSV_SPONSORING_VIDEO.height}
            title={TSV_SPONSORING_VIDEO.title[locale]}
            fallback={t('videoFallback')}
            labels={{
              play: tVideo('play'),
              close: tVideo('close'),
              transcript: tVideo('transcript'),
            }}
            captions={TSV_SPONSORING_VIDEO.captions}
            className="border-border aspect-[9/16] w-full max-w-[15rem] border"
            posterSizes="(min-width: 640px) 15rem, 60vw"
          />
          <div className="min-w-0">
            <h3 className="text-muted-foreground font-mono text-[11px] tracking-[0.18em] uppercase">
              {copy.videoLabel}
            </h3>
            <p className="mt-4 max-w-[52ch] font-serif text-[1.35rem] leading-[1.4] text-balance">
              {TSV_SPONSORING_VIDEO.title[locale]}
            </p>
            <p className="text-muted-foreground mt-4 max-w-[62ch] text-[15px] leading-[1.7]">
              {copy.videoLede}
            </p>
          </div>
        </div>

        <h3 className="text-muted-foreground mt-16 font-mono text-[11px] tracking-[0.18em] uppercase">
          {copy.imagesLabel}
        </h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TSV_PUBLISHABLE_IMAGES.map((image) => (
            <li key={image.src}>
              <figure>
                {/* Plain <img>: statisches Kartenmaterial ohne LCP-Rolle, und der
                    Datensatz trägt die echten Maße für die CLS-Reserve. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt[locale]}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="border-border bg-muted h-auto w-full border"
                />
                <figcaption className="text-muted-foreground mt-3 text-[13px] leading-[1.6]">
                  {image.caption[locale]}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground mt-8 max-w-[74ch] text-[13px] leading-[1.7]">
          {copy.imagesNote}
        </p>
      </div>
    </section>
  )
}
