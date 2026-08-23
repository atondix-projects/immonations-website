'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type ReviewScreenshot = {
  src: string
  alt: string
  width: number
  height: number
  rating: 5
  story: {
    name: string
    context: string
    quote?: string
    result?: string
    image: string
    imageAlt: string
  }
}

type ReviewRotatorProps = {
  screenshots: ReviewScreenshot[]
  labels: {
    carousel: string
    previous: string
    next: string
    slide: string
    expand: string
    close: string
  }
}

const ROTATION_INTERVAL = 5500

function ReviewImageDialog({
  screenshot,
  labels,
}: {
  screenshot: ReviewScreenshot
  labels: { expand: string; close: string }
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => setIsOpen(false)
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  return (
    <>
      <a
        href={screenshot.src}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          const dialog = dialogRef.current
          if (!dialog) return

          event.preventDefault()
          setIsOpen(true)
          if (!dialog.open) dialog.showModal()
        }}
        aria-haspopup="dialog"
        aria-label={labels.expand}
        className="group relative block size-full cursor-zoom-in bg-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-700 focus-visible:outline-none"
      >
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={screenshot.width}
          height={screenshot.height}
          loading="eager"
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="size-full object-contain object-top"
        />
        <span className="absolute right-3 bottom-3 bg-black/70 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-white uppercase opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {labels.expand}
        </span>
      </a>

      <dialog
        ref={dialogRef}
        aria-label={screenshot.alt}
        onCancel={(event) => {
          event.preventDefault()
          setIsOpen(false)
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false)
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-transparent p-4 backdrop:bg-black/85 open:flex sm:p-8"
      >
        {isOpen ? (
          <div className="relative flex max-h-full max-w-full items-center justify-center">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              sizes="100vw"
              className="block max-h-[88dvh] w-auto max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={labels.close}
              className="absolute -top-12 right-0 flex size-10 items-center justify-center bg-white/10 text-2xl leading-none text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              ×
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  )
}

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
      <div className="grid" aria-live="off">
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.src}
            role="group"
            aria-roledescription={labels.slide}
            aria-label={`${index + 1} / ${screenshots.length}`}
            aria-hidden={index !== activeIndex}
            inert={index !== activeIndex ? true : undefined}
            className={cn(
              'col-start-1 row-start-1 mx-auto w-full max-w-[1120px] p-4 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:p-6 lg:p-8',
              index === activeIndex
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-3 opacity-0',
            )}
          >
            <div className="grid h-full min-h-0 overflow-hidden border border-neutral-200 bg-background lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
              <figure className="grid min-h-[360px] grid-rows-[auto_1fr] overflow-hidden border-b border-neutral-200 p-4 sm:min-h-[440px] sm:p-6 lg:min-h-[620px] lg:border-r lg:border-b-0 lg:p-8">
                <figcaption className="text-muted-foreground flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[10px] font-semibold tracking-[0.16em] uppercase">
                  <span>{screenshot.alt}</span>
                  <span className="tracking-normal normal-case">Google · {screenshot.rating}/5</span>
                </figcaption>
                <div className="mt-3 h-[300px] overflow-hidden bg-white sm:h-[380px] lg:h-[520px]">
                  <ReviewImageDialog screenshot={screenshot} labels={labels} />
                </div>
              </figure>

              <div className="grid min-h-0 content-start gap-5 p-4 sm:p-6 lg:gap-6 lg:p-7">
                <div className="relative h-44 overflow-hidden bg-neutral-100 sm:h-52 lg:h-48">
                  <Image
                    src={screenshot.story.image}
                    alt={screenshot.story.imageAlt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-brand-700 text-[10px] font-semibold tracking-[0.18em] uppercase">
                        {screenshot.story.context}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl leading-tight font-semibold">
                        {screenshot.story.name}
                      </h3>
                      {screenshot.story.result ? (
                        <p className="text-muted-foreground mt-1 text-sm">{screenshot.story.result}</p>
                      ) : null}
                    </div>
                    <div className="text-brand-700 flex gap-0.5" aria-label={`${screenshot.rating}/5`}>
                      {Array.from({ length: screenshot.rating }, (_, star) => (
                        <span key={star} aria-hidden="true">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {screenshot.story.quote ? (
                    <blockquote className="mt-5 font-serif text-lg leading-[1.42] font-medium text-pretty">
                      “{screenshot.story.quote}”
                    </blockquote>
                  ) : null}
                </div>
              </div>
            </div>
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
