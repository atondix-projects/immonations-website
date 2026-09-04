'use client'

import { useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { SoldVideo } from '@/lib/content/sold-videos'
import { SoldVideoTile } from './sold-video-tile'

export type SoldVideoCarouselEntry = {
  item: SoldVideo
  href: Parameters<typeof Link>[0]['href']
  linkLabel: string
  typeLabel: string
  alt: string
}

/**
 * Eine Kachel nach der anderen statt einer Leiste — Weiter/Zurück statt
 * manuellem Scrollen. Nur die aktive Kachel wird gemountet, sonst würden bei
 * 18 Clips wieder alle gleichzeitig laden (siehe `SoldVideoTile`). Der
 * `key`-Wechsel pro Kachel setzt deren internen Abspiel-Status sauber zurück.
 *
 * Der Aufbau ist zweispaltig: `intro` (Überschrift und Text, auf dem Server
 * gerendert und hereingereicht) steht mit der Steuerung links, der Clip groß
 * rechts. Die Steuerung gehört zum Text, weil die schmale Textspalte sonst
 * neben einem über 700 px hohen Hochformat leer wirkt.
 */
export function SoldVideoCarousel({
  entries,
  intro,
  soldLabel,
  sizes,
  labels,
}: {
  entries: SoldVideoCarouselEntry[]
  intro: ReactNode
  soldLabel: string
  sizes: string
  labels: {
    carousel: string
    previous: string
    next: string
    slide: string
  }
}) {
  const [active, setActive] = useState(0)

  if (entries.length === 0) return null

  const go = (delta: number) =>
    setActive((current) => (current + delta + entries.length) % entries.length)

  const current = entries[active]!

  return (
    <div
      role="region"
      aria-roledescription={labels.carousel}
      className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-20"
    >
      <div className="flex flex-col items-start gap-9">
        {intro}

        {entries.length > 1 ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={labels.previous}
              onClick={() => go(-1)}
              className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 flex size-12 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => go(1)}
              className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 flex size-12 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <p className="text-muted-foreground ml-2 text-sm tabular-nums" aria-live="polite">
              {active + 1} / {entries.length}
            </p>
          </div>
        ) : null}
      </div>

      <div
        role="group"
        aria-roledescription={labels.slide}
        aria-label={`${active + 1} / ${entries.length}`}
        className="mx-auto w-full max-w-[380px] lg:mx-0 lg:w-[380px] lg:max-w-none xl:w-[420px]"
      >
        <Link
          key={current.item.id}
          href={current.href}
          aria-label={current.linkLabel}
          className="group focus-visible:ring-primary block rounded-sm transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <SoldVideoTile
            item={current.item}
            index={active}
            soldLabel={soldLabel}
            typeLabel={current.typeLabel}
            alt={current.alt}
            sizes={sizes}
            className="pointer-events-none w-full"
          />
        </Link>
      </div>
    </div>
  )
}
