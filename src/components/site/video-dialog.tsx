'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { Play, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Projekteigene Fassung des Magic-UI-Bausteins „Hero Video Dialog"
 * (`@/components/ui/hero-video-dialog`). Die Registry-Variante spielt
 * ausschließlich über ein `<iframe>` ab und taugt damit nicht für die lokalen
 * MP4s dieses Projekts — der Browser-eigene Datei-Viewer im iframe lässt sich
 * weder gestalten noch mit einem Poster versehen. Bewegungsmuster, Aufbau und
 * Bedienlogik bleiben identisch, die Wiedergabe läuft über ein echtes `<video>`.
 *
 * Zwei Zusagen prägen die Umsetzung:
 *
 * 1. **Kein Sprung im Layout.** Die Kachel auf der Seite ist reine Vorschau und
 *    verändert sich beim Abspielen nie. Das Video öffnet im Overlay und läuft
 *    dort über `width`/`height` in seinem echten Seitenverhältnis — ohne
 *    Beschnitt und ohne schwarze Balken.
 * 2. **Kein Sprung in der Farbe.** Vorschaubild und `poster` des Videos sind
 *    dieselbe Datei, sodass beim Öffnen kein schwarzes Bild aufblitzt.
 */

export type VideoDialogLabels = {
  play: string
  close: string
}

type VideoDialogProps = {
  /** Pfad zur MP4-Datei. */
  src: string
  /** Vorschaubild — zugleich `poster` des Videos, damit die Farbe nicht springt. */
  poster: string
  /** Echte Pixelmaße des Videos. Ohne sie kennt der Browser das Seitenverhältnis
   *  erst nach dem Laden der Metadaten und das Overlay würde nachträglich umbrechen. */
  width: number
  height: number
  /** Beschriftung des Overlays und des Videos für Screenreader. */
  title: string
  /** Text für Browser, die das Format nicht abspielen können. */
  fallback: string
  labels: VideoDialogLabels
  /** Klassen der Auslöser-Kachel — hier setzt die aufrufende Sektion ihr Format. */
  className?: string
  posterSizes?: string
  posterPriority?: boolean
  /**
   * `image` zeigt das Standbild, `loop` eine stumme Endlosschleife des Videos.
   * Die Schleife nutzt dieselbe Datei und denselben Ausschnitt — der Wechsel ins
   * Overlay bringt damit nur den Ton hinzu.
   */
  preview?: 'image' | 'loop'
  /** Zusätzliche Auszeichnung über der Vorschau, etwa ein Themen-Label. */
  overlay?: ReactNode
}

export function VideoDialog({
  src,
  poster,
  width,
  height,
  title,
  fallback,
  labels,
  className,
  posterSizes = '(min-width: 1024px) 50vw, 100vw',
  posterPriority = false,
  preview = 'image',
  overlay,
}: VideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !isOpen || dialog.open) return

    dialog.showModal()
  }, [isOpen])

  // Das `close`-Event blubbert nicht, weshalb Reacts synthetisches `onClose` hier
  // nicht greift. Ohne nativen Listener bliebe der State nach einem vom Browser
  // ausgelösten Schließen auf „offen“ stehen.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    dialog.addEventListener('close', close)
    return () => dialog.removeEventListener('close', close)
  }, [close])

  // Liegt der Fokus in den nativen Videosteuerelementen, verschluckt Chrome die
  // Escape-Taste, bevor der Dialog sein `cancel`-Event bekommt. Der Griff in die
  // Capture-Phase stellt sicher, dass Escape das Overlay zuverlässig schließt —
  // außer im Vollbild, wo die Taste zuerst dieses beenden muss.
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || document.fullscreenElement) return

      event.preventDefault()
      close()
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [isOpen, close])

  // Verhindert Scrollen der Seite hinter dem Overlay. Die Breite der wegfallenden
  // Scrollleiste wird als Innenabstand ersetzt — sonst würde die Seite hinter dem
  // Overlay um genau diesen Betrag breiter springen.
  useEffect(() => {
    if (!isOpen) return

    const { body, documentElement } = document
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [isOpen])

  const enterAnimation = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { scale: 0.94, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.94, opacity: 0 },
      }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`${labels.play}: ${title}`}
        className={cn(
          'group focus-visible:ring-brand-400 relative block cursor-pointer overflow-hidden bg-black focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
          className,
        )}
      >
        {preview === 'loop' ? (
          <video
            className="pointer-events-none size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={poster}
            // Dekorativ: Der Button darüber trägt bereits den beschreibenden Namen.
            alt=""
            fill
            priority={posterPriority}
            sizes={posterSizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
          />
        )}

        {/* Der Verlauf hält den Abspiel-Button auch über hellen Motiven lesbar. */}
        <span
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15"
          aria-hidden="true"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="border-brand-500 bg-brand-500/25 group-hover:bg-brand-500 flex size-14 items-center justify-center border text-white backdrop-blur-[2px] transition-colors duration-200 group-hover:scale-105 motion-reduce:transition-none">
            <Play className="size-5 fill-current" aria-hidden="true" />
          </span>
        </span>
        {overlay}
      </button>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onCancel={(event) => {
          // Escape würde das Overlay sofort ausblenden und die Abblende
          // überspringen; der State übernimmt das Schließen.
          event.preventDefault()
          close()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-transparent p-4 text-white backdrop:bg-black/85 open:flex sm:p-8"
      >
        <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
          {isOpen ? (
            <motion.div
              {...enterAnimation}
              transition={
                shouldReduceMotion
                  ? { duration: 0.12 }
                  : { type: 'spring', damping: 30, stiffness: 300 }
              }
              className="relative flex max-h-full max-w-full items-center justify-center"
            >
              <video
                className="block h-auto max-h-[82dvh] w-auto max-w-full bg-black object-contain"
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={poster}
                width={width}
                height={height}
                aria-label={title}
              >
                <source src={src} type="video/mp4" />
                {fallback}
              </video>

              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="focus-visible:ring-brand-400 absolute -top-13 right-0 flex size-11 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none sm:-top-14"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </dialog>
    </>
  )
}
