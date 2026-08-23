'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export type ReviewScreenshot = {
  src: string
  alt: string
  width: number
  height: number
}

type ReviewRotatorProps = {
  screenshots: ReviewScreenshot[]
  labels: {
    carousel: string
    previous: string
    next: string
    slide: string
  }
}

const ROTATION_INTERVAL = 5500

export function ReviewRotator({ screenshots, labels }: ReviewRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)

  useEffect(() => {
    if (screenshots.length < 2) return

    const frame = window.requestAnimationFrame(() => {
      setActiveIndex(Math.floor(Math.random() * screenshots.length))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [screenshots.length])

  useEffect(() => {
    if (screenshots.length < 2 || isPaused) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveIndex((current) => (current + 1) % screenshots.length)
      }
    }, ROTATION_INTERVAL)

    return () => window.clearInterval(interval)
  }, [interactionCount, isPaused, screenshots.length])

  if (screenshots.length === 0) return null

  const selectSlide = (index: number) => {
    setActiveIndex((index + screenshots.length) % screenshots.length)
    setInteractionCount((count) => count + 1)
  }

  return (
    <div
      role="region"
      aria-roledescription={labels.carousel}
      className="border-border bg-background relative overflow-hidden border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative h-[320px] sm:h-[370px] lg:h-[420px]" aria-live="off">
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.src}
            role="group"
            aria-roledescription={labels.slide}
            aria-label={`${index + 1} / ${screenshots.length}`}
            aria-hidden={index !== activeIndex}
            className={cn(
              'absolute inset-0 mx-auto w-full max-w-[620px] p-5 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:p-8',
              index === activeIndex
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-3 opacity-0',
            )}
          >
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              loading="eager"
              sizes="(min-width: 1024px) 620px, (min-width: 640px) calc(100vw - 10rem), calc(100vw - 4rem)"
              className="size-full object-contain"
            />
          </div>
        ))}
      </div>

      {screenshots.length > 1 ? (
        <div className="border-border flex items-center justify-center gap-5 border-t px-5 py-4">
          <button
            type="button"
            aria-label={labels.previous}
            onClick={() => selectSlide(activeIndex - 1)}
            className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <div className="flex items-center justify-center gap-2.5">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot.src}
                type="button"
                aria-label={`${labels.slide} ${index + 1} / ${screenshots.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => selectSlide(index)}
                className={cn(
                  'focus-visible:ring-brand-700 h-2 rounded-full transition-[width,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none motion-reduce:transition-none',
                  index === activeIndex ? 'bg-brand-700 w-7' : 'w-2 bg-neutral-300',
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label={labels.next}
            onClick={() => selectSlide(activeIndex + 1)}
            className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  )
}
