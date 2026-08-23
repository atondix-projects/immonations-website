'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type MagazinePage = {
  number: number
  src: string
}

type Spread = readonly [number | null, number | null]

type Turn = {
  direction: -1 | 1
  from: Spread
  to: Spread
}

export type MagazineFlipbookLabels = {
  previous: string
  next: string
  firstPage: string
  pageProgress: string
  spreadProgress: string
  pageAlt: string
  readerLabel: string
}

function createSpreads(pageCount: number): Spread[] {
  const spreads: Spread[] = [[null, 0]]

  for (let index = 1; index < pageCount; index += 2) {
    spreads.push([index, index + 1 < pageCount ? index + 1 : null])
  }

  return spreads
}

function PageImage({
  pageIndex,
  pages,
  labels,
}: {
  pageIndex: number | null
  pages: readonly MagazinePage[]
  labels: MagazineFlipbookLabels
}) {
  const page = pageIndex === null ? undefined : pages[pageIndex]

  if (!page) return null

  return (
    <Image
      src={page.src}
      alt={labels.pageAlt.replace('{page}', String(page.number))}
      fill
      priority={page.number <= 3}
      sizes="(min-width: 1024px) 460px, 42vw"
      className="pointer-events-none object-cover select-none"
      draggable={false}
    />
  )
}

export function MagazineFlipbook({
  pages,
  labels,
}: {
  pages: readonly MagazinePage[]
  labels: MagazineFlipbookLabels
}) {
  const spreads = useMemo(() => createSpreads(pages.length), [pages.length])
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [turn, setTurn] = useState<Turn | null>(null)
  const [turnStarted, setTurnStarted] = useState(false)
  const reduceMotion = useReducedMotion()
  const animationFrameRef = useRef<number | null>(null)
  const secondAnimationFrameRef = useRef<number | null>(null)
  const finishTimerRef = useRef<number | null>(null)
  const isTurningRef = useRef(false)

  const currentSpread = useMemo<Spread>(
    () => spreads[spreadIndex] ?? [null, null],
    [spreadIndex, spreads],
  )
  const canGoPrevious = spreadIndex > 0
  const canGoNext = spreadIndex < spreads.length - 1

  const clearTurnTimers = useCallback(() => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
    if (secondAnimationFrameRef.current !== null) {
      cancelAnimationFrame(secondAnimationFrameRef.current)
    }
    if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current)
  }, [])

  useEffect(() => clearTurnTimers, [clearTurnTimers])

  const go = useCallback(
    (direction: -1 | 1) => {
      if (isTurningRef.current) return

      const targetIndex = spreadIndex + direction
      const from = spreads[spreadIndex]
      const to = spreads[targetIndex]
      if (!from || !to) return

      if (reduceMotion) {
        setSpreadIndex(targetIndex)
        return
      }

      isTurningRef.current = true
      clearTurnTimers()
      setTurn({ direction, from, to })
      setTurnStarted(false)

      animationFrameRef.current = requestAnimationFrame(() => {
        secondAnimationFrameRef.current = requestAnimationFrame(() => setTurnStarted(true))
      })

      finishTimerRef.current = window.setTimeout(() => {
        setSpreadIndex(targetIndex)
        setTurn(null)
        setTurnStarted(false)
        isTurningRef.current = false
      }, 720)
    },
    [clearTurnTimers, reduceMotion, spreadIndex, spreads],
  )

  const jumpToSpread = useCallback(
    (targetIndex: number) => {
      if (isTurningRef.current || !spreads[targetIndex]) return
      setSpreadIndex(targetIndex)
    },
    [spreads],
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [go])

  const displayedLeft = turn?.direction === -1 ? turn.to[0] : currentSpread[0]
  const displayedRight = turn?.direction === 1 ? turn.to[1] : currentSpread[1]
  const leafFront = turn ? (turn.direction === 1 ? turn.from[1] : turn.from[0]) : null
  const leafBack = turn ? (turn.direction === 1 ? turn.to[0] : turn.to[1]) : null

  const progressLabel = useMemo(() => {
    if (spreadIndex === 0) return `${labels.firstPage} · 1 / ${pages.length}`

    const [left, right] = currentSpread
    if (left === null && right === null) return ''
    if (right === null) {
      return labels.pageProgress
        .replace('{page}', String((left ?? 0) + 1))
        .replace('{total}', String(pages.length))
    }

    return labels.spreadProgress
      .replace('{from}', String((left ?? 0) + 1))
      .replace('{to}', String(right + 1))
      .replace('{total}', String(pages.length))
  }, [
    currentSpread,
    labels.firstPage,
    labels.pageProgress,
    labels.spreadProgress,
    pages.length,
    spreadIndex,
  ])

  return (
    <div className="mt-[26px]">
      <div className="flex items-center justify-center gap-1.5 sm:gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={!canGoPrevious || turn !== null}
          aria-label={labels.previous}
          className="border-border bg-background text-foreground focus-visible:ring-brand-400 flex size-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full border text-[1.6rem] leading-none shadow-[0_4px_14px_rgba(20,23,29,0.1)] transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default disabled:opacity-35 sm:size-12"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          role="group"
          tabIndex={0}
          aria-label={labels.readerLabel}
          onClick={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            go(event.clientX - bounds.left < bounds.width / 2 ? -1 : 1)
          }}
          className="focus-visible:ring-brand-400 relative aspect-[2/1.402] w-full max-w-[920px] cursor-pointer overflow-hidden rounded-[6px] bg-[#e9e4d8] shadow-[0_30px_70px_rgba(20,23,29,0.28),0_4px_14px_rgba(20,23,29,0.2)] [perspective:2400px] focus-visible:ring-2 focus-visible:outline-none"
        >
          <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden rounded-l-[6px] bg-[#f4f1ea] shadow-[inset_-18px_0_30px_-18px_rgba(0,0,0,0.35)] [backface-visibility:hidden]">
            <PageImage pageIndex={displayedLeft} pages={pages} labels={labels} />
          </div>
          <div className="absolute top-0 left-1/2 h-full w-1/2 overflow-hidden rounded-r-[6px] bg-[#f4f1ea] shadow-[inset_18px_0_30px_-18px_rgba(0,0,0,0.35)] [backface-visibility:hidden]">
            <PageImage pageIndex={displayedRight} pages={pages} labels={labels} />
          </div>

          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 z-6 h-full w-0.5 -translate-x-px bg-[linear-gradient(90deg,rgba(0,0,0,0.22),rgba(0,0,0,0.05),rgba(0,0,0,0.22))]"
          />

          {turn ? (
            <div
              aria-hidden="true"
              className={cn(
                'absolute top-0 z-7 h-full w-1/2 [will-change:transform] [transform-style:preserve-3d]',
                turn.direction === 1 ? 'left-1/2 origin-left' : 'left-0 origin-right',
                turnStarted &&
                  '[transition-property:transform] duration-700 ease-[cubic-bezier(.3,.1,.2,1)]',
                turnStarted && turn.direction === 1 && '[transform:rotateY(-179deg)]',
                turnStarted && turn.direction === -1 && '[transform:rotateY(179deg)]',
              )}
            >
              <div className="absolute inset-0 overflow-hidden bg-[#f4f1ea] shadow-[0_0_24px_rgba(0,0,0,0.18)] [backface-visibility:hidden]">
                <PageImage pageIndex={leafFront} pages={pages} labels={labels} />
              </div>
              <div className="absolute inset-0 [transform:rotateY(180deg)] overflow-hidden bg-[#f4f1ea] shadow-[0_0_24px_rgba(0,0,0,0.18)] [backface-visibility:hidden]">
                <PageImage pageIndex={leafBack} pages={pages} labels={labels} />
              </div>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={!canGoNext || turn !== null}
          aria-label={labels.next}
          className="border-border bg-background text-foreground focus-visible:ring-brand-400 flex size-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full border text-[1.6rem] leading-none shadow-[0_4px_14px_rgba(20,23,29,0.1)] transition-colors hover:bg-neutral-100 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default disabled:opacity-35 sm:size-12"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <span className="text-muted-foreground text-sm tabular-nums">{progressLabel}</span>
        <div className="flex flex-wrap justify-center gap-[7px]">
          {spreads.map((spread, index) => (
            <button
              key={`${spread[0] ?? 'cover'}-${spread[1] ?? 'back'}-${index}`}
              type="button"
              onClick={() => jumpToSpread(index)}
              aria-label={labels.spreadProgress
                .replace('{from}', String((spread[0] ?? spread[1] ?? 0) + 1))
                .replace('{to}', String((spread[1] ?? spread[0] ?? 0) + 1))
                .replace('{total}', String(pages.length))}
              className={cn(
                'bg-brand-600 focus-visible:ring-brand-400 size-[9px] cursor-pointer rounded-full border-0 p-0 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                index === spreadIndex ? 'opacity-100' : 'opacity-30 hover:opacity-60',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
