'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  VideoDialog,
  type VideoCaptionTrack,
  type VideoDialogLabels,
} from '@/components/site/video-dialog'
import { cn } from '@/lib/utils'

export type TestimonialVideoSlide = {
  video: {
    src: string
    width: number
    height: number
    captions?: readonly VideoCaptionTrack[]
  }
  poster: string
  posterClassName: string
  story: {
    name: string
    context: string
    quote?: string
    result?: string
  }
}

type ReviewRotatorProps = {
  slides: TestimonialVideoSlide[]
  labels: VideoDialogLabels & {
    carousel: string
    previous: string
    next: string
    slide: string
    video: string
  }
  fallback: string
}

const ROTATION_INTERVAL = 5500

export function ReviewRotator({ slides, labels, fallback }: ReviewRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [interactionCount, setInteractionCount] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return

    const frame = window.requestAnimationFrame(() => {
      setActiveIndex(Math.floor(Math.random() * slides.length))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [slides.length])

  useEffect(() => {
    if (slides.length < 2 || isPaused) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveIndex((current) => (current + 1) % slides.length)
      }
    }, ROTATION_INTERVAL)

    return () => window.clearInterval(interval)
  }, [interactionCount, isPaused, slides.length])

  if (slides.length === 0) return null

  const selectSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length)
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
      <div className="grid" aria-live="off">
        {slides.map((slide, index) => (
          <div
            key={slide.video.src}
            role="group"
            aria-roledescription={labels.slide}
            aria-label={`${index + 1} / ${slides.length}`}
            aria-hidden={index !== activeIndex}
            inert={index !== activeIndex ? true : undefined}
            className={cn(
              'col-start-1 row-start-1 mx-auto w-full max-w-[1120px] p-4 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:p-6 lg:p-8',
              index === activeIndex
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-3 opacity-0',
            )}
          >
            <div className="bg-background grid h-full min-h-0 overflow-hidden border border-neutral-200 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
              <figure className="grid min-h-[360px] grid-rows-[auto_1fr] overflow-hidden border-b border-neutral-200 p-4 sm:min-h-[440px] sm:p-6 lg:min-h-[620px] lg:border-r lg:border-b-0 lg:p-8">
                <figcaption className="text-muted-foreground flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[10px] font-semibold tracking-[0.16em] uppercase">
                  <span>{slide.story.name}</span>
                  <span className="tracking-normal normal-case">{labels.video}</span>
                </figcaption>
                <div className="mt-3 h-[300px] overflow-hidden bg-neutral-950 sm:h-[380px] lg:h-[520px]">
                  <VideoDialog
                    src={slide.video.src}
                    poster={slide.poster}
                    width={slide.video.width}
                    height={slide.video.height}
                    title={`${slide.story.name}: ${slide.story.context}`}
                    fallback={fallback}
                    labels={labels}
                    captions={slide.video.captions}
                    className="size-full"
                    posterClassName={slide.posterClassName}
                    posterSizes="(min-width: 1024px) 58vw, 100vw"
                  />
                </div>
              </figure>

              <div className="flex min-h-0 items-center p-6 sm:p-9 lg:p-10">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-brand-700 text-[10px] font-semibold tracking-[0.18em] uppercase">
                        {slide.story.context}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl leading-tight font-semibold">
                        {slide.story.name}
                      </h3>
                      {slide.story.result ? (
                        <p className="text-muted-foreground mt-1 text-sm">{slide.story.result}</p>
                      ) : null}
                    </div>
                  </div>
                  {slide.story.quote ? (
                    <blockquote className="mt-5 font-serif text-lg leading-[1.42] font-medium text-pretty">
                      “{slide.story.quote}”
                    </blockquote>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 ? (
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
            {slides.map((slide, index) => (
              <button
                key={slide.video.src}
                type="button"
                aria-label={`${labels.slide} ${index + 1} / ${slides.length}`}
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
