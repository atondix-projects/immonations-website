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
  /** Beschriftung der Transkript-Aufklappung. Fehlt sie, wird kein Transkript angeboten. */
  transcript?: string
}

/**
 * Eine Untertitelspur. `src` verweist auf eine WebVTT-Datei unterhalb von `public/`.
 *
 * Videos mit Ton brauchen Untertitel — ohne sie ist der gesprochene Inhalt für
 * gehörlose und schwerhörige Nutzerinnen und Nutzer nicht zugänglich (WCAG 1.2.2).
 * Die Spuren liegen bewusst als Daten neben dem Video im jeweiligen Registry-Eintrag,
 * damit eine nachgelieferte VTT-Datei ohne Codeänderung wirksam wird.
 */
export type VideoCaptionTrack = {
  /** Pfad zur `.vtt`-Datei, z. B. `/videos/testimonials/viktor-emter.de.vtt`. */
  src: string
  /** BCP-47-Sprachkennung der Spur, z. B. `de`. */
  srcLang: string
  /** Im Untertitelmenü sichtbarer Name der Spur. */
  label: string
  default?: boolean
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
  /**
   * Untertitelspuren des Videos. Stummer Bestand (etwa die Verkaufs-Kacheln)
   * bleibt leer; jedes Video mit Ton sollte mindestens eine Spur führen.
   */
  captions?: readonly VideoCaptionTrack[]
  /** Volltext des Gesprochenen, im Overlay aufklappbar unter dem Video. */
  transcript?: ReactNode
  /** Klassen der Auslöser-Kachel — hier setzt die aufrufende Sektion ihr Format. */
  className?: string
  posterSizes?: string
  posterPriority?: boolean
  /** Zusätzliche Klassen für Poster und Vorschau-Video, etwa `object-top`. */
  posterClassName?: string
  /**
   * `image` zeigt das Standbild, `loop` eine stumme Endlosschleife des Videos.
   * Die Schleife nutzt dieselbe Datei und denselben Ausschnitt — der Wechsel ins
   * Overlay bringt damit nur den Ton hinzu.
   */
  preview?: 'image' | 'loop'
  /** Zusätzliche Auszeichnung über der Vorschau, etwa ein Themen-Label. */
  overlay?: ReactNode
  /**
   * `brand` ist der Standard-Abspielmarken-Knopf. `reel` ist die helle
   * Kreisfläche der Social-Reels (weiß, Markendreieck), ohne die restliche
   * Seite umzubauen.
   */
  playAppearance?: 'brand' | 'reel'
}

export function VideoDialog({
  src,
  poster,
  width,
  height,
  title,
  fallback,
  labels,
  captions,
  transcript,
  className,
  posterSizes = '(min-width: 1024px) 50vw, 100vw',
  posterPriority = false,
  posterClassName,
  preview = 'image',
  overlay,
  playAppearance = 'brand',
}: VideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const previewMode = preview === 'loop' && shouldReduceMotion !== true ? 'loop' : 'image'

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
        data-video-dialog={isOpen ? 'open' : 'closed'}
        className={cn(
          'group focus-visible:ring-brand-400 relative block cursor-pointer overflow-hidden bg-black focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
          className,
        )}
      >
        {previewMode === 'loop' ? (
          <video
            className={cn('pointer-events-none size-full object-cover', posterClassName)}
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
            className={cn(
              'object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none',
              posterClassName,
            )}
          />
        )}

        {/* Der Verlauf hält den Abspiel-Button auch über hellen Motiven lesbar. */}
        <span
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15"
          aria-hidden="true"
        />
        <span className="absolute inset-0 z-20 flex items-center justify-center">
          {playAppearance === 'reel' ? (
            <span className="flex size-14 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none">
              <Play className="text-brand-600 ml-0.5 size-5 fill-current" aria-hidden="true" />
            </span>
          ) : (
            <span className="border-brand-500 bg-brand-500/25 group-hover:bg-brand-500 flex size-14 items-center justify-center border text-white backdrop-blur-[2px] transition-colors duration-200 group-hover:scale-105 motion-reduce:transition-none">
              <Play className="size-5 fill-current" aria-hidden="true" />
            </span>
          )}
        </span>
        {overlay ? <span className="contents">{overlay}</span> : null}
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
              className="relative flex max-h-full max-w-full flex-col items-center justify-center"
            >
              <video
                className="block h-auto max-h-[82dvh] w-auto max-w-full bg-black object-contain"
                controls
                autoPlay
                playsInline
                preload="none"
                poster={poster}
                width={width}
                height={height}
                aria-label={title}
              >
                <source src={src} type="video/mp4" />
                {captions?.map((track) => (
                  <track
                    key={`${track.srcLang}-${track.src}`}
                    kind="captions"
                    src={track.src}
                    srcLang={track.srcLang}
                    label={track.label}
                    default={track.default}
                  />
                ))}
                {fallback}
              </video>

              {transcript && labels.transcript ? (
                <details className="mt-3 max-h-[24dvh] w-full max-w-[68ch] overflow-y-auto bg-white/10 text-left text-sm leading-[1.7] text-white">
                  <summary className="focus-visible:ring-brand-400 cursor-pointer px-4 py-3 font-semibold focus-visible:ring-2 focus-visible:outline-none">
                    {labels.transcript}
                  </summary>
                  <div className="px-4 pb-4 text-white/85">{transcript}</div>
                </details>
              ) : null}

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
