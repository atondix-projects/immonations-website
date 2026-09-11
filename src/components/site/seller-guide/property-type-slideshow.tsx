'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { SellerGuideShowcaseSlide } from '@/lib/content/seller-guide-showcases'
import { cn } from '@/lib/utils'

type SlideshowLabels = {
  eyebrow: string
  title: string
  text: string
  carousel: string
  slide: string
  previous: string
  next: string
}

export function PropertyTypeSlideshow({
  slides,
  labels,
}: {
  slides: SellerGuideShowcaseSlide[]
  labels: SlideshowLabels
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const pointerStart = useRef<number | null>(null)

  if (slides.length === 0) return null

  const selectSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') selectSlide(activeIndex - 1)
    else if (event.key === 'ArrowRight') selectSlide(activeIndex + 1)
    else if (event.key === 'Home') setActiveIndex(0)
    else if (event.key === 'End') setActiveIndex(slides.length - 1)
    else return
    event.preventDefault()
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    pointerStart.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(distance) < 48) return
    selectSlide(activeIndex + (distance < 0 ? 1 : -1))
  }

  const activeSlide = slides[activeIndex]!

  return (
    <section
      data-seller-guide-showcase
      className="border-border bg-muted/55 border-y py-14 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
            {labels.eyebrow}
          </p>
          <h2 className="mt-3 max-w-[18ch] font-serif text-3xl font-semibold text-balance md:text-[42px]">
            {labels.title}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-[54ch] leading-[1.7] text-pretty">
            {labels.text}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              aria-label={labels.previous}
              onClick={() => selectSlide(activeIndex - 1)}
              className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 flex size-12 items-center justify-center rounded-full border bg-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => selectSlide(activeIndex + 1)}
              className="border-border hover:border-brand-700 hover:text-brand-700 focus-visible:ring-brand-700 flex size-12 items-center justify-center rounded-full border bg-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <p className="text-muted-foreground ml-2 text-sm tabular-nums" aria-live="polite">
              {activeIndex + 1} / {slides.length}
            </p>
          </div>

          <div className="mt-6 flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`${labels.slide} ${index + 1} / ${slides.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => selectSlide(index)}
                className={cn(
                  'focus-visible:ring-brand-700 h-2 rounded-full transition-[width,background-color] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none motion-reduce:transition-none',
                  index === activeIndex ? 'bg-brand-500 w-8' : 'w-2 bg-neutral-300',
                )}
              />
            ))}
          </div>
        </div>

        <div
          role="region"
          aria-roledescription={labels.carousel}
          aria-label={labels.title}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="focus-visible:ring-brand-700 overflow-hidden bg-white focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <figure
            key={activeSlide.id}
            role="group"
            aria-roledescription={labels.slide}
            aria-label={`${activeIndex + 1} / ${slides.length}`}
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={activeSlide.image}
                alt={activeSlide.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-border border-t px-6 py-5 md:px-8 md:py-6">
              <h3 className="font-serif text-2xl font-semibold text-balance">
                {activeSlide.title}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-[68ch] text-sm leading-[1.65]">
                {activeSlide.text}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
