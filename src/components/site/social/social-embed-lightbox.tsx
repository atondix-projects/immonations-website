'use client'

import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { SocialEmbedShape } from '@/lib/content/social-channels'

/**
 * Der `load`-Event bestätigt nur, dass die Plattform geantwortet hat. Bleibt er aus
 * (Beitrag gelöscht, Einbettung regional gesperrt, Netzwerkfehler), gilt der Player
 * nach dieser Frist als nicht darstellbar und der Direktlink tritt an seine Stelle.
 */
const LOAD_TIMEOUT_MS = 10_000

export type SocialLightboxLabels = {
  close: string
  loading: string
  failedTitle: string
  failedLink: string
  openOriginal: string
  views: string
  consentActive: string
}

/**
 * Der Player selbst. Eigene Komponente, damit der Ladezustand bei jedem Öffnen
 * frisch startet — sie wird nur montiert, solange der Lichtkasten offen ist.
 */
function PlayerFrame({
  embedUrl,
  shape,
  href,
  title,
  labels,
}: {
  embedUrl: string
  shape: SocialEmbedShape
  href: string
  title: string
  labels: SocialLightboxLabels
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'failed' : current))
    }, LOAD_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [])

  if (status === 'failed') {
    return (
      <div className="flex size-full flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="max-w-[26ch] font-serif text-xl leading-snug font-semibold text-balance text-white">
          {labels.failedTitle}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-700 hover:bg-brand-800 focus-visible:ring-brand-400 inline-flex min-h-11 items-center gap-2 px-5 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          {labels.failedLink}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <>
      <iframe
        src={embedUrl}
        title={title}
        // `strict-origin-when-cross-origin`: die Plattform erfährt die Domain,
        // nicht den vollständigen Pfad der aufrufenden Seite.
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        // Instagram meldet seine Höhe selbst und wird höher als 9:16 — dort darf
        // der Rahmen scrollen, statt den Beitrag abzuschneiden.
        scrolling={shape === 'post' ? 'yes' : 'no'}
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('failed')}
        className="size-full border-0"
      />
      {status === 'loading' ? (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
          {labels.loading}
        </p>
      ) : null}
    </>
  )
}

/**
 * Der große Player als Lichtkasten über der Seite.
 *
 * Auf Basis des nativen `<dialog>`: Fokusfalle, Escape und die Inertisierung des
 * Hintergrunds kommen vom Browser, nicht aus eigenem Tastatur-Code. Gleiches
 * Muster wie `TourOverlay`.
 *
 * Datenschutz: Der Rahmen wird **nur montiert, solange der Lichtkasten offen ist**.
 * Vorher geht keine Anfrage an die Plattform, und beim Schließen endet die
 * Verbindung wieder, statt im Hintergrund weiterzulaufen.
 */
export function SocialEmbedLightbox({
  open,
  onClose,
  embedUrl,
  shape,
  href,
  platformName,
  label,
  views,
  labels,
  hasConsent,
}: {
  open: boolean
  onClose: () => void
  embedUrl: string
  shape: SocialEmbedShape
  href: string
  platformName: string
  label: string
  views: string
  labels: SocialLightboxLabels
  hasConsent: boolean
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  // Rückfallebene für Schließwege, die nicht über React laufen. Das `close`-Event
  // blubbert nicht, weshalb Reacts synthetisches `onClose` hier nicht greift.
  //
  // Der Escape-Weg hängt bewusst *nicht* daran, sondern an `onCancel` weiter unten:
  // `close` wird als Element-Task eingereiht, und ein Dokument, das der Browser
  // schlafen legt, arbeitet diese Task unter Umständen nicht ab. Wäre Escape der
  // einzige Weg über dieses Event, bliebe der State auf „offen" stehen, während
  // der Dialog zu ist — die Kachel ließe sich danach nicht mehr öffnen.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [onClose])

  // Verhindert Scrollen der Seite hinter dem Lichtkasten.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${platformName}: ${label}`}
      // Klick auf den Hintergrund schließt. Der Inhalt liegt in einem eigenen
      // Element, dessen Klicks nicht bis hierher durchschlagen.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      // Escape: den nativen Schließvorgang abfangen und stattdessen den State
      // umlegen. So bleibt React die einzige Quelle der Wahrheit, und der Dialog
      // wird ausschließlich über den Effekt oben geschlossen.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      className="m-auto max-h-[100dvh] w-screen max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {open ? (
        <div className="flex h-dvh w-screen flex-col items-center justify-center gap-3 p-4 sm:gap-4 sm:p-6">
          <div
            className={cn(
              'flex w-full shrink-0 items-start justify-between gap-4',
              shape === 'landscape' ? 'max-w-[64rem]' : 'max-w-[26rem]',
            )}
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-white/60 uppercase">
                {platformName}
              </p>
              <p className="mt-1 truncate text-[15px] font-semibold text-white">{label}</p>
              <p className="mt-0.5 text-[13px] text-white/60 tabular-nums">
                {views} {labels.views}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="focus-visible:ring-brand-400 -mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-neutral-900 focus-visible:ring-2 focus-visible:outline-none"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className={cn(
              'relative min-h-0 w-full overflow-hidden rounded-xl bg-black',
              shape === 'portrait' &&
                'aspect-[9/16] max-h-full max-w-[min(26rem,calc((100dvh-11rem)*0.5625))]',
              shape === 'landscape' && 'aspect-video max-h-full max-w-[min(64rem,100%)]',
              shape === 'post' && 'h-full max-h-[calc(100dvh-11rem)] max-w-[26rem]',
            )}
          >
            <PlayerFrame
              embedUrl={embedUrl}
              shape={shape}
              href={href}
              title={`${platformName}: ${label}`}
              labels={labels}
            />
          </div>

          <div
            className={cn(
              'flex w-full shrink-0 items-center justify-between gap-4',
              shape === 'landscape' ? 'max-w-[64rem]' : 'max-w-[26rem]',
            )}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-brand-400 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-white/85 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
            >
              {labels.openOriginal}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            {hasConsent ? null : (
              <p className="max-w-[18ch] text-right text-[11px] leading-snug text-white/45">
                {labels.consentActive}
              </p>
            )}
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
