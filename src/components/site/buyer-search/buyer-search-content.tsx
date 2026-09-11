import { ArrowUpRight, Check } from 'lucide-react'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import {
  listBuyerDistrictOptions,
  listBuyerProfileCities,
  listBuyerProfiles,
  listBuyerProfileTypes,
  listDistrictDemand,
} from '@/lib/content/buyer-profiles'
import { CONTAINER, EYEBROW, SECTION_TITLE, SectionHeader } from '../home/section-shell'
import { BuyerProfileBoard } from './buyer-profile-board'
import { BUYER_SEARCH_COPY } from './buyer-search-copy'
import { DistrictDemandSection } from './district-demand'

/**
 * Inhalt der Seite „Aktive Suchkunden“ zwischen Antwortabsatz und Abschnittskarten:
 * Suchprofile mit Filter, Nachfrage nach Stadtteil, Ablauf des Abgleichs und der Weg
 * für Kaufinteressenten.
 */
export function BuyerSearchContent({ locale }: { locale: Locale }) {
  const copy = BUYER_SEARCH_COPY[locale]

  return (
    <>
      <section id="suchprofile" className="scroll-mt-24 py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeader eyebrow={copy.profiles.eyebrow} title={copy.profiles.title} />
          <BuyerProfileBoard
            profiles={listBuyerProfiles(locale)}
            cities={listBuyerProfileCities(locale)}
            types={listBuyerProfileTypes(locale)}
            districtOptions={listBuyerDistrictOptions(locale)}
            labels={copy.board}
          />
        </div>
      </section>

      <DistrictDemandSection cities={listDistrictDemand(locale)} copy={copy.districts} />

      <section className="border-border bg-muted/45 border-b py-16 md:py-24">
        <div className={CONTAINER}>
          <SectionHeader eyebrow={copy.process.eyebrow} title={copy.process.title} />
          {/* Bewusst ein Stufenfluss statt Kartenraster: Die Abschnittskarten der Seitenhülle
              folgen direkt darunter und sollen nicht wie eine zweite Ausgabe davon wirken. */}
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {copy.process.steps.map((step, index) => (
              <li key={step.title} className="flex flex-col">
                <div className="flex items-center gap-4">
                  <span className="bg-brand-700 grid size-11 shrink-0 place-items-center rounded-full font-mono text-sm text-white tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {index < copy.process.steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="bg-brand-700/25 hidden h-px flex-1 md:block"
                    />
                  ) : null}
                </div>
                <h3 className="mt-6 font-serif text-2xl leading-tight font-semibold text-balance">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-[36ch] text-[15px] leading-[1.75]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center`}>
          <div className="flex flex-col gap-3.5">
            <span className="flex items-center gap-2.5">
              <ImmonationMark className="h-5 shrink-0" />
              <span className={EYEBROW}>{copy.buyers.eyebrow}</span>
            </span>
            <h2 className={`${SECTION_TITLE} max-w-[20ch] text-balance`}>{copy.buyers.title}</h2>
            <p className="text-muted-foreground mt-2 max-w-[56ch] text-[17px] leading-[1.7]">
              {copy.buyers.text}
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px"
              >
                {copy.buyers.primary}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/buy"
                className="border-brand-700 text-brand-800 hover:bg-brand-100 inline-flex min-h-12 items-center justify-center border px-7 py-3 text-sm font-semibold transition-colors active:translate-y-px"
              >
                {copy.buyers.secondary}
              </Link>
            </div>
          </div>
          <div className="border-border bg-muted/45 border p-7 md:p-9">
            <p className="text-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
              {copy.buyers.checklistTitle}
            </p>
            <ul className="mt-5 grid gap-3.5">
              {copy.buyers.checklist.map((item) => (
                <li
                  key={item}
                  className="border-border flex gap-3 border-b pb-3.5 text-[15px] leading-[1.55] last:border-0 last:pb-0"
                >
                  <Check className="text-brand-600 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
