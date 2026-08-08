'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

export type TourOverlayLabels = {
  title: string
  closeLabel: string
  loadingLabel: string
  failedTitle: string
  failedText: string
  failedLinkLabel: string
}

/**
 * Der `load`-Event des iframes bestätigt nur, dass der Anbieter geantwortet hat.
 * Bleibt er aus (Einbettung blockiert, Netzwerkfehler), gilt der Rundgang nach
 * dieser Frist als nicht darstellbar und der Direktlink wird angeboten.
 */
const LOAD_TIMEOUT_MS = 10_000

type LoadStatus = 'loading' | 'ready' | 'failed'

/**
 * Eigene Komponente, damit der Ladezustand bei jedem Öffnen frisch startet:
 * Sie wird nur montiert, solange das Overlay offen ist.
 */
function TourFrame({ url, labels }: { url: string; labels: TourOverlayLabels }) {
  const [status, setStatus] = useState<LoadStatus>('loading')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'failed' : current))
    }, LOAD_TIMEOUT_MS)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="relative size-full bg-black">
      {status === 'failed' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="max-w-[30ch] font-serif text-2xl font-semibold text-balance">
            {labels.failedTitle}
          </p>
          <p className="max-w-[52ch] text-sm leading-relaxed text-pretty text-neutral-400">
            {labels.failedText}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-700 hover:bg-brand-800 focus-visible:ring-brand-400 mt-2 inline-flex min-h-11 items-center gap-2 px-6 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            {labels.failedLinkLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      ) : (
        <>
          <iframe
            className="size-full border-0"
            src={url}
            title={labels.title}
            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
            allowFullScreen
            onLoad={() => setStatus('ready')}
            onError={() => setStatus('failed')}
          />
          {status === 'loading' ? (
            <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
              {labels.loadingLabel}
            </p>
          ) : null}
        </>
      )}
    </div>
  )
}

/**
 * Vollbild-Overlay für den 360°-Rundgang auf Basis des nativen `<dialog>`:
 * Fokusfalle, Escape und Inertisierung des Hintergrunds kommen vom Browser.
 * Der Viewer wird nur eingebunden, solange das Overlay offen ist.
 */
export function TourOverlay({
  url,
  labels,
  open,
  onClose,
}: {
  url: string
  labels: TourOverlayLabels
  open: boolean
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Das `close`-Event blubbert nicht, weshalb Reacts synthetisches `onClose` hier
  // nicht greift. Ohne nativen Listener bliebe der State nach Escape auf "offen".
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    dialog.addEventListener('close', onClose)
    return () => dialog.removeEventListener('close', onClose)
  }, [onClose])

  // Verhindert Scrollen der Seite hinter dem Overlay.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-label={labels.title}
      className="bg-surface-dark m-0 h-dvh max-h-none w-screen max-w-none p-0 text-white backdrop:bg-black/85"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="truncate font-serif text-base font-semibold sm:text-lg">{labels.title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.closeLabel}
            className="focus-visible:ring-brand-400 flex min-h-11 shrink-0 items-center gap-2 px-3 text-sm font-medium text-neutral-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="hidden sm:inline" aria-hidden="true">
              {labels.closeLabel}
            </span>
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1">{open ? <TourFrame url={url} labels={labels} /> : null}</div>
      </div>
    </dialog>
  )
}
