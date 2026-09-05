'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, Calculator } from 'lucide-react'
import { useExternalMediaConsent, useIsHydrated } from '@/components/site/consent/use-consent'
import { DRKLEIN_ORIGIN } from '@/lib/content/drklein-tools'
import { cn } from '@/lib/utils'

export type DrKleinEmbedLabels = {
  /** Name des Moduls, wird auch zum `title` des iframes. */
  name: string
  load: string
  loading: string
  consentNote: string
  failedTitle: string
  failedLink: string
}

/** Wie beim 360°-Rundgang: Bleibt `onLoad` aus, tritt der Direktlink an die Stelle. */
const LOAD_TIMEOUT_MS = 10_000

const RESIZE_TYPES = ['drk-rechner.iframe.resized', 'drk-banner.iframe.resized']

type ResizePayload = { id: string; height: number }

/**
 * Liest die Resize-Nachricht des Dr. Klein iframes.
 *
 * Der Schnipsel aus dem Partnerportal ist an zwei Stellen korrigiert:
 *
 * 1. Er prüft `typA || typB && id === '<id>'`. `&&` bindet stärker als `||`,
 *    die id-Prüfung schützt dort also nur den Banner-Zweig. Mit drei Rechnern
 *    auf einer Seite übernähme jedes iframe die Höhe des zuletzt sendenden.
 *    Hier ist die Typprüfung geklammert und die id verpflichtend.
 * 2. Er nimmt `message` von jeder Herkunft an. Hier zählt nur `DRKLEIN_ORIGIN`.
 */
function readResizePayload(event: MessageEvent, expectedId: string): number | null {
  if (event.origin !== DRKLEIN_ORIGIN) return null

  const message = event.data as { type?: unknown; data?: unknown } | null
  if (!message || typeof message.type !== 'string') return null
  if (!RESIZE_TYPES.includes(message.type)) return null

  const payload = message.data as Partial<ResizePayload> | undefined
  if (!payload || payload.id !== expectedId) return null
  if (typeof payload.height !== 'number' || !Number.isFinite(payload.height)) return null
  if (payload.height <= 0) return null

  return payload.height
}

/**
 * Bettet ein Dr. Klein Modul ein — erst nach bewusster Freigabe.
 *
 * Ohne Einwilligung steht nur eine Platzhalterkarte im DOM; zu Dr. Klein geht
 * dabei keine einzige Anfrage. Liegt die Einwilligung vor, lädt das Modul
 * sofort. Der Server rendert nie ein iframe: `getServerConsentSnapshot()` gibt
 * bewusst `null` zurück.
 */
export function DrKleinToolEmbed({
  url,
  toolId,
  frameHeight,
  labels,
  className,
}: {
  url: string
  toolId: string
  /**
   * Feste Höhe des iframes. Dr. Klein liefert keine Auto-Höhe aus (Begründung in
   * `src/lib/content/drklein-tools.ts`), deshalb ist das die tatsächliche Höhe
   * und nicht bloß eine Untergrenze. Meldet sich das Modul doch einmal, gewinnt
   * die gemeldete Höhe.
   */
  frameHeight: number
  labels: DrKleinEmbedLabels
  className?: string
}) {
  const hasExternalMediaConsent = useExternalMediaConsent()
  const isHydrated = useIsHydrated()
  const [wasReleased, setWasReleased] = useState(false)
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [height, setHeight] = useState<number | null>(null)

  // Abgeleitet statt per Effekt gespiegelt: Liegt die Einwilligung vor, wäre der
  // zusätzliche Klick nur eine Hürde — der Widerruf blendet das Modul wieder aus,
  // solange es niemand ausdrücklich freigegeben hat.
  const isLoaded = hasExternalMediaConsent || wasReleased

  const load = useCallback(() => setWasReleased(true), [])

  useEffect(() => {
    if (!isLoaded) return

    function onMessage(event: MessageEvent) {
      const next = readResizePayload(event, toolId)
      if (next === null) return
      setHeight(next)
      setStatus('ready')
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [isLoaded, toolId])

  useEffect(() => {
    if (!isLoaded) return
    const timer = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'failed' : current))
    }, LOAD_TIMEOUT_MS)

    return () => window.clearTimeout(timer)
  }, [isLoaded])

  if (!isHydrated || !isLoaded) {
    return (
      <div
        className={cn(
          'border-border bg-muted/45 flex flex-col items-start gap-5 border p-7 sm:p-10',
          className,
        )}
      >
        <span
          className="border-brand-600 text-brand-700 flex size-14 items-center justify-center border"
          aria-hidden="true"
        >
          <Calculator className="size-6" strokeWidth={1.6} />
        </span>
        <p className="text-muted-foreground max-w-[62ch] text-[15px] leading-[1.75] text-pretty">
          {labels.consentNote}
        </p>
        <button
          type="button"
          onClick={load}
          // `disabled` bis zur Hydration: Vor dem Hydrieren wüsste der Klick nicht,
          // ob bereits eine Einwilligung vorliegt.
          disabled={!isHydrated}
          className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px disabled:opacity-60"
        >
          {labels.load}
        </button>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div
        className={cn(
          'border-border bg-muted/45 flex flex-col items-start gap-4 border p-7 sm:p-10',
          className,
        )}
      >
        <p className="max-w-[40ch] font-serif text-2xl leading-snug font-medium text-balance">
          {labels.failedTitle}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px"
        >
          {labels.failedLink}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <div className={cn('border-border bg-background relative border', className)}>
      <iframe
        src={url}
        title={labels.name}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        // Kein `sandbox`: Die Rechner brauchen Skripte, Formulare und eigenen
        // Storage. `allow-scripts allow-same-origin` zusammen heben die Sandbox
        // ohnehin auf — wie bei den beiden anderen iframes im Projekt.
        className="w-full border-0"
        style={{ height: height ?? frameHeight }}
        onLoad={() => setStatus((current) => (current === 'loading' ? 'ready' : current))}
        onError={() => setStatus('failed')}
      />
      {status === 'loading' ? (
        <p className="text-muted-foreground pointer-events-none absolute inset-0 flex items-center justify-center text-sm">
          {labels.loading}
        </p>
      ) : null}
    </div>
  )
}
