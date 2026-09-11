'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { ScanLine } from 'lucide-react'
import { useExternalMediaConsent } from '@/components/site/consent/use-consent'
import { TourOverlay, type TourOverlayLabels } from '@/components/site/home/tour-overlay'
import { cn } from '@/lib/utils'

export type TourEmbedLabels = TourOverlayLabels & {
  openOverlayLabel: string
  consentNote: string
}

/**
 * Einstieg in den 360°-Rundgang: Die Kachel ist die einzige Aktion und öffnet das
 * Vollbild-Overlay. Drittanbieter-Inhalt wird erst dort geladen — ohne vorherige
 * Einwilligung ist der Klick die bewusste Freigabe, worauf der Hinweis vorbereitet.
 * Der Direktlink zum Anbieter erscheint nur, wenn die Einbettung scheitert.
 *
 * `posterSrc` legt ein lokales Objektfoto hinter die Kachel, damit der Einstieg das
 * Haus zeigt statt einer schwarzen Fläche. Das Bild ist dekorativ (`alt=""`): Der
 * zugängliche Name des Buttons bleibt der Titel.
 */
export function TourEmbed({
  url,
  labels,
  posterSrc,
  className,
}: {
  url: string
  labels: TourEmbedLabels
  posterSrc?: string
  /** Überschreibt z. B. das Seitenverhältnis der Kachel; Standard ist 16:9. */
  className?: string
}) {
  const hasExternalMediaConsent = useExternalMediaConsent()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const closeOverlay = useCallback(() => setIsOverlayOpen(false), [])

  return (
    <div className="relative z-10">
      <button
        type="button"
        onClick={() => setIsOverlayOpen(true)}
        className={cn(
          'group focus-visible:ring-brand-400 relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden bg-black px-6 text-center outline -outline-offset-1 outline-white/10 focus-visible:ring-2 focus-visible:ring-inset',
          className,
        )}
      >
        {posterSrc ? (
          <>
            <Image
              src={posterSrc}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <span className="absolute inset-0 bg-black/60" aria-hidden="true" />
          </>
        ) : null}
        <span
          className="from-brand-800/45 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent opacity-70"
          aria-hidden="true"
        />
        <span className="border-brand-500 bg-brand-500/15 group-hover:bg-brand-500 relative flex size-14 items-center justify-center border transition-colors">
          <ScanLine className="size-6" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span className="relative max-w-[26ch] font-serif text-xl leading-snug font-semibold text-balance">
          {labels.title}
        </span>
        <span className="text-brand-300 relative text-[13px] font-semibold">
          {labels.openOverlayLabel}
        </span>
        {hasExternalMediaConsent ? null : (
          <span
            className={cn(
              'relative max-w-[44ch] text-[12px] leading-snug text-pretty',
              posterSrc ? 'text-neutral-300' : 'text-neutral-400',
            )}
          >
            {labels.consentNote}
          </span>
        )}
      </button>

      <TourOverlay url={url} labels={labels} open={isOverlayOpen} onClose={closeOverlay} />
    </div>
  )
}
