'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Screenshot = {
  src: string
  alt: string
}

type ReviewRotatorProps = {
  screenshots: Screenshot[]
}

const ROTATION_INTERVAL = 5500

function getDifferentIndex(length: number, current: number) {
  if (length < 2) return 0

  const candidate = Math.floor(Math.random() * (length - 1))
  return candidate >= current ? candidate + 1 : candidate
}

export function ReviewRotator({ screenshots }: ReviewRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
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
        setActiveIndex((current) => getDifferentIndex(screenshots.length, current))
      }
    }, ROTATION_INTERVAL)

    return () => window.clearInterval(interval)
  }, [isPaused, screenshots.length])

  if (screenshots.length === 0) return null

  return (
    <div
      className="bg-background relative overflow-hidden border border-neutral-200 p-4 shadow-[0_24px_60px_-38px_rgba(33,39,43,0.45)] sm:p-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative h-[300px] sm:h-[340px] lg:h-[360px]">
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.src}
            className={cn(
              'absolute inset-0 mx-auto w-full max-w-[560px] transition-opacity duration-700 ease-out motion-reduce:transition-none',
              index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              fill
              sizes="(min-width: 640px) 560px, calc(100vw - 6rem)"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {screenshots.length > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.src}
              type="button"
              aria-label={screenshot.alt}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'focus-visible:outline-brand-700 h-1.5 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4',
                index === activeIndex ? 'bg-brand-700 w-8' : 'w-1.5 bg-neutral-300',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
