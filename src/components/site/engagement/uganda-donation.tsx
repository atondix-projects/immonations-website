import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  UGANDA_PUBLISHABLE_IMAGES,
  UGANDA_SOURCE_URL,
  type UgandaImage,
} from '@/lib/content/uganda-donation'

/**
 * Bildungsspende Uganda auf `/engagement`.
 *
 * Jede Sachaussage stammt aus dem verlinkten Beitrag der Empfängerorganisation.
 * Was die Quelle nicht nennt (Summe, Schülerzahl, Schulname), wird weiterhin
 * offengelegt — aber als Fußnote unter dem Fließtext statt als eigene
 * Spaltenüberschrift „Was nicht veröffentlicht ist“. Die Aussage ist dieselbe,
 * sie führt die Sektion nur nicht mehr an.
 */

const COPY = {
  de: {
    eyebrow: 'Bildungsspende Uganda',
    title: 'Wir zahlen mit ans Schulgeld',
    lede: 'Im April 2026 hat die Immonation GmbH die Bildungsarbeit der Organisation Pateka in Uganda unterstützt. Der Beitrag fließt in Schulgebühren für Schülerinnen und Schüler. Öffentlich gemacht hat die Spende Pateka selbst — und Immonation dabei namentlich genannt.',
    factsLabel: 'Die Spende auf einen Blick',
    facts: [
      { term: 'Wann', detail: 'April 2026, veröffentlicht am 28. April 2026' },
      { term: 'Empfänger', detail: 'Pateka — Bildungsprojekte in Uganda' },
      { term: 'Wofür', detail: 'Beitrag zu Schulgebühren für Schülerinnen und Schüler' },
      { term: 'Namentlich genannt', detail: 'Immonation GmbH und Erman Karabacak' },
    ],
    whyLabel: 'Warum genau dieser Posten',
    why: 'Unser Beitrag geht nicht in einen allgemeinen Topf, sondern an eine konkrete Stelle: die Schulgebühren. Pateka setzt ihn vor Ort ein und dokumentiert die Arbeit öffentlich — nachlesbar im verlinkten Beitrag.',
    whyFootnote:
      'Spendenhöhe, Schülerzahl, Schulname und Zeitraum nennt die Quelle nicht. Wir ergänzen sie nicht.',
    imagesLabel: 'Aus der Projektarbeit vor Ort',
    imagesNote:
      'Die Aufnahmen stammen aus der laufenden Projektarbeit von Pateka: Schülerinnen und Schüler auf dem Schulgelände, Schulmaterial, Hygieneartikel und die Ausgabe vor Ort — nicht der Gegenwert der Spende, die Schulgebühren betrifft. Die Personenaufnahmen sind mit Freigabe veröffentlicht.',
    sourceLabel: 'Beitrag von Pateka im Original lesen',
    articleLabel: 'Ausführlicher Beitrag im Magazin',
  },
  en: {
    eyebrow: 'Uganda education donation',
    title: 'We help pay the school fees',
    lede: 'In April 2026 Immonation GmbH supported the education work of the organisation Pateka in Uganda. The contribution goes towards school fees for students. Pateka made the donation public themselves — and named Immonation in doing so.',
    factsLabel: 'The donation at a glance',
    facts: [
      { term: 'When', detail: 'April 2026, published on 28 April 2026' },
      { term: 'Recipient', detail: 'Pateka — education projects in Uganda' },
      { term: 'What it funds', detail: 'Contribution towards school fees for students' },
      { term: 'Named', detail: 'Immonation GmbH and Erman Karabacak' },
    ],
    whyLabel: 'Why this particular line item',
    why: 'Our contribution does not go into a general pot but to one concrete line: school fees. Pateka puts it to work on site and documents that work publicly — readable in the linked post.',
    whyFootnote:
      'The donation amount, number of students, school name, and duration do not appear in the source. We do not fill them in.',
    imagesLabel: 'From the project work on site',
    imagesNote:
      'The photographs come from Pateka’s ongoing project work: students on the school grounds, school supplies, hygiene articles, and the handout on site — not the equivalent value of the donation, which concerns school fees. Images showing people are published with permission.',
    sourceLabel: 'Read the original post by Pateka',
    articleLabel: 'Full account in the magazine',
  },
} as const

const ARTICLE_SLUG = {
  de: 'bildungsspende-uganda',
  en: 'uganda-education-donation',
} as const

/**
 * Sortiert die Galerie nach Seitenverhältnis, flachste Motive zuletzt.
 *
 * Im Raster richtet sich jede Zeile nach ihrem höchsten Bild; steht ein
 * Hochformat 901×1600 neben einem 1200×1600, bleibt unter dem flacheren ein
 * leerer Block. Nach dieser Sortierung landen die drei 901×1600 und die drei
 * 1200×1600 jeweils in einer eigenen Dreierzeile, und die Zeilen stehen ohne
 * Zuschnitt bündig. Ein erzwungenes Seitenverhältnis wäre die Alternative,
 * würde aber bei den Gruppenaufnahmen Köpfe abschneiden.
 */
function byAspectRatio(images: readonly UgandaImage[]): readonly UgandaImage[] {
  return [...images].sort((a, b) => a.width / a.height - b.width / b.height)
}

export function UgandaDonation({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const gallery = byAspectRatio(UGANDA_PUBLISHABLE_IMAGES)

  return (
    <section
      id="uganda"
      aria-labelledby="uganda-heading"
      className="border-border bg-muted/45 scroll-mt-24 border-y py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <p className="text-brand-700 font-mono text-[11px] tracking-[0.2em] uppercase">
          {copy.eyebrow}
        </p>
        <h2
          id="uganda-heading"
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
              {copy.facts.map((fact) => (
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
              {copy.whyLabel}
            </h3>
            <p className="mt-6 text-[15px] leading-[1.75]">{copy.why}</p>
            <p className="text-muted-foreground mt-5 text-[13px] leading-[1.7]">
              {copy.whyFootnote}
            </p>
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <a
                href={UGANDA_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 inline-flex items-center gap-2 text-sm font-semibold"
              >
                {copy.sourceLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
              <Link
                href={{ pathname: '/blog/[slug]', params: { slug: ARTICLE_SLUG[locale] } }}
                className="text-brand-700 inline-flex items-center gap-2 text-sm font-semibold"
              >
                {copy.articleLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <h3 className="text-muted-foreground mt-14 font-mono text-[11px] tracking-[0.18em] uppercase">
          {copy.imagesLabel}
        </h3>
        {/* Dreispaltig ab `sm`, nicht zweispaltig: Sieben Motive gehen in
            Dreierzeilen glatt auf (3 + 3 + 1), in Zweierzeilen dagegen nicht —
            dort fiele je eine Zeile auf ein Hochformat und ein flacheres Motiv,
            und die Sortierung nach Seitenverhältnis liefe ins Leere. */}
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {gallery.map((image) => (
            <li key={image.src}>
              <figure>
                {/* Plain <img>: static project photography, no LCP role, and the
                    record already carries intrinsic dimensions for the CLS reserve. */}
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

        <p className="text-muted-foreground mt-4 max-w-[74ch] text-[13px] leading-[1.7]">
          {copy.imagesNote}
        </p>
      </div>
    </section>
  )
}
