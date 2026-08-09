'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { SoldVideo } from '@/lib/content/sold-videos'

/**
 * Fester Versatz zwischen zwei Kacheln in Sekunden. Kachel `index` startet bei
 * `index * STAGGER_SECONDS`, sodass die Einblend-Animation als Welle von links
 * nach rechts durch die Leiste läuft.
 */
const STAGGER_SECONDS = 0.25

/**
 * Spielt den tonlosen Clip erst, wenn die Kachel im Viewport steht — sonst
 * würden 18 gleichzeitige Decoder laufen und alle Dateien sofort geladen.
 * Ohne Sichtkontakt bleibt es beim Poster (`preload="none"`).
 */
export function SoldVideoTile({
  item,
  index,
  soldLabel,
  typeLabel,
  alt,
  sizes,
  className,
}: {
  item: SoldVideo
  index: number
  soldLabel: string
  typeLabel: string
  alt: string
  sizes: string
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Der Versatz wird genau einmal gesetzt. Beim Wiedereintritt in den Viewport
  // läuft der Clip weiter, statt die Welle neu auszurichten.
  const phaseAppliedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Wer Bewegung reduziert, bekommt ausschließlich das Standbild.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    // `preload="none"` heißt: die Dauer steht erst nach den Metadaten fest.
    // Erst dann lässt sich der Versatz auf die Clip-Länge beziehen.
    const applyPhase = () => {
      if (phaseAppliedRef.current || !Number.isFinite(video.duration)) return
      phaseAppliedRef.current = true
      video.currentTime = (index * STAGGER_SECONDS) % video.duration
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            applyPhase()
            // Autoplay kann trotz `muted` blockiert sein (z. B. iOS-Stromsparmodus)
            // — dann bleibt das Poster stehen, statt eine Exception zu werfen.
            void video.play().catch(() => setIsPlaying(false))
          } else {
            video.pause()
          }
        }
      },
      // Etwas Vorlauf links/rechts, damit in der laufenden Marquee-Leiste
      // bereits Bild steht, wenn eine Kachel den Rand erreicht.
      { threshold: 0.25, rootMargin: '0px 240px' },
    )

    video.addEventListener('loadedmetadata', applyPhase)
    observer.observe(video)
    return () => {
      video.removeEventListener('loadedmetadata', applyPhase)
      observer.disconnect()
    }
  }, [index])

  return (
    <figure className={cn('group flex flex-col gap-3', className)}>
      {/* Zwei getrennte Ursachen für flackernde Kanten:
          1. Die äußersten ~2 px der Clips sind instabil (gemessen: Streuung
             15,9 gegen 0,4 ab Pixel 4) — `scale-[1.06]` schneidet sie weg.
          2. Die Marquee verschiebt die Kachel um Subpixel, wodurch die
             Clip-Kante mitschimmert. `will-change-transform` und
             `backface-hidden` legen sie auf eine eigene Compositor-Ebene,
             sodass die Kante stabil gerastert wird. */}
      <div className="bg-surface-dark relative aspect-[9/16] overflow-hidden inset-ring-1 inset-ring-black/10 will-change-transform backface-hidden">
        <Image
          src={item.poster}
          alt={alt}
          fill
          sizes={sizes}
          loading="lazy"
          className="scale-[1.06] object-cover backface-hidden"
        />
        <video
          ref={videoRef}
          src={item.video}
          width={item.width}
          height={item.height}
          muted
          loop
          playsInline
          // Kein `autoPlay`-Attribut: es überstimmt `preload="none"` und lädt
          // alle Clips sofort. Der Start läuft ausschließlich über den Observer.
          preload="none"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className={cn(
            'absolute inset-0 size-full scale-[1.06] object-cover transition-opacity duration-500 backface-hidden motion-reduce:transition-none',
            isPlaying ? 'opacity-100' : 'opacity-0',
          )}
        />
        <span className="bg-brand-500 absolute top-0 left-0 px-3 py-[6px] font-mono text-[10px] font-semibold tracking-[0.16em] text-white uppercase">
          {soldLabel}
        </span>
      </div>
      <figcaption className="flex flex-col gap-0.5 border-t border-neutral-200 pt-3">
        <span className="font-serif text-lg leading-tight font-semibold">{item.town}</span>
        <span className="text-muted-foreground text-sm leading-snug">{typeLabel}</span>
      </figcaption>
    </figure>
  )
}
