'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Maximize2, Minimize2 } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type MagazinePage = {
  number: number
  src: string
}

type FlipEvent = {
  data: number | string | boolean | object
}

type FlipMode = 'portrait' | 'landscape'

type PageFlipInstance = {
  destroy(): void
  update(): void
  loadFromHTML(items: HTMLElement[]): void
  flipNext(corner?: 'top' | 'bottom'): void
  flipPrev(corner?: 'top' | 'bottom'): void
  flip(page: number, corner?: 'top' | 'bottom'): void
  turnToPage(page: number): void
  getCurrentPageIndex(): number
  getOrientation(): FlipMode
  on(event: 'flip' | 'changeOrientation' | 'init', callback: (event: FlipEvent) => void): void
}

type PageFlipConstructor = new (
  element: HTMLElement,
  settings: {
    width: number
    height: number
    size: 'fixed' | 'stretch'
    minWidth: number
    maxWidth: number
    minHeight: number
    maxHeight: number
    drawShadow: boolean
    flippingTime: number
    usePortrait: boolean
    autoSize: boolean
    maxShadowOpacity: number
    showCover: boolean
    mobileScrollSupport: boolean
    showPageCorners: boolean
    disableFlipByClick: boolean
    clickEventForward: boolean
  },
) => PageFlipInstance

type PageFlipModule = {
  PageFlip: PageFlipConstructor
}

export type MagazineFlipbookLabels = {
  previous: string
  next: string
  expand: string
  collapse: string
  firstPage: string
  lastPage: string
  pageProgress: string
  spreadProgress: string
  pageAlt: string
  readerLabel: string
}

const BASE_PAGE_WIDTH = 420
const BASE_PAGE_HEIGHT = 589
const MIN_PAGE_WIDTH = 240
const MAX_PAGE_WIDTH = 680
const MIN_PAGE_HEIGHT = 337
const MAX_PAGE_HEIGHT = 960

function asPageIndex(value: FlipEvent['data'], fallback: number) {
  return typeof value === 'number' ? value : fallback
}

export function MagazineFlipbook({
  title,
  pages,
  pageWidth,
  pageHeight,
  labels,
}: {
  title: string
  pages: readonly MagazinePage[]
  pageWidth: number
  pageHeight: number
  labels: MagazineFlipbookLabels
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const bookMountRef = useRef<HTMLDivElement>(null)
  const bookRootRef = useRef<HTMLDivElement | null>(null)
  const pageFlipRef = useRef<PageFlipInstance | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [mode, setMode] = useState<FlipMode>('landscape')
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldInitialize, setShouldInitialize] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isWideLayout, setIsWideLayout] = useState(false)
  const reduceMotion = useReducedMotion()
  const lastPageIndex = pages.length - 1
  const pageAspectRatio = pageWidth / pageHeight

  const visibleRange = useMemo(() => {
    if (mode === 'portrait' || currentPage === 0 || currentPage === lastPageIndex) {
      return { first: currentPage + 1, last: currentPage + 1 }
    }

    const start = currentPage % 2 === 1 ? currentPage : Math.max(1, currentPage - 1)
    return { first: start + 1, last: Math.min(start + 2, pages.length) }
  }, [currentPage, lastPageIndex, mode, pages.length])

  const progressLabel = useMemo(() => {
    const template =
      visibleRange.first === visibleRange.last ? labels.pageProgress : labels.spreadProgress

    return template
      .replace('{page}', String(visibleRange.first))
      .replace('{from}', String(visibleRange.first))
      .replace('{to}', String(visibleRange.last))
      .replace('{total}', String(pages.length))
  }, [labels.pageProgress, labels.spreadProgress, pages.length, visibleRange])

  const updateBookShift = useCallback(() => {
    const root = bookRootRef.current
    if (!root) return

    const shouldShift = isWideLayout
    if (shouldShift && currentPage === 0) {
      root.style.transform = 'translateX(-25%)'
    } else if (shouldShift && currentPage === lastPageIndex) {
      root.style.transform = 'translateX(25%)'
    } else {
      root.style.transform = 'translateX(0)'
    }
  }, [currentPage, isWideLayout, lastPageIndex])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const update = () => setIsWideLayout(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldInitialize(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )

    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldInitialize || pageFlipRef.current || !bookMountRef.current) return

    let isActive = true
    const mount = bookMountRef.current

    async function initialize() {
      const { PageFlip } = (await import('page-flip')) as PageFlipModule
      if (!isActive || !mount) return

      const root = document.createElement('div')
      root.className = 'magazine-pageflip-root h-full w-full transition-transform duration-300'
      if (window.matchMedia('(min-width: 768px)').matches) {
        root.style.transform = 'translateX(-25%)'
      }
      mount.innerHTML = ''
      mount.appendChild(root)
      bookRootRef.current = root

      const pageElements = pages.map((page, index) => {
        const pageElement = document.createElement('div')
        pageElement.className = 'magazine-flip-page bg-white'
        pageElement.setAttribute('aria-label', labels.pageAlt.replace('{page}', String(page.number)))

        if (index === 0 || index === lastPageIndex) {
          pageElement.dataset.density = 'hard'
        }

        const image = document.createElement('img')
        image.src = page.src
        image.alt = labels.pageAlt.replace('{page}', String(page.number))
        image.decoding = 'async'
        image.draggable = false
        image.loading = index <= 2 ? 'eager' : 'lazy'
        pageElement.appendChild(image)

        return pageElement
      })

      const pageFlip = new PageFlip(root, {
        width: BASE_PAGE_WIDTH,
        height: BASE_PAGE_HEIGHT,
        size: 'stretch',
        minWidth: MIN_PAGE_WIDTH,
        maxWidth: MAX_PAGE_WIDTH,
        minHeight: MIN_PAGE_HEIGHT,
        maxHeight: MAX_PAGE_HEIGHT,
        drawShadow: true,
        flippingTime: reduceMotion ? 1 : 900,
        usePortrait: true,
        autoSize: false,
        maxShadowOpacity: 0.42,
        showCover: true,
        mobileScrollSupport: true,
        showPageCorners: !reduceMotion,
        disableFlipByClick: false,
        clickEventForward: true,
      })

      pageFlipRef.current = pageFlip
      pageFlip.loadFromHTML(pageElements)

      const wrapper = root.querySelector<HTMLElement>('.stf__wrapper')
      if (wrapper) {
        wrapper.style.width = '100%'
        wrapper.style.height = '100%'
      }

      pageFlip.on('init', (event) => {
        const data = event.data as { page?: number; mode?: FlipMode }
        setCurrentPage(typeof data.page === 'number' ? data.page : pageFlip.getCurrentPageIndex())
        setMode(data.mode ?? pageFlip.getOrientation())
        setIsReady(true)
      })

      pageFlip.on('flip', (event) => {
        setCurrentPage(asPageIndex(event.data, pageFlip.getCurrentPageIndex()))
      })

      pageFlip.on('changeOrientation', (event) => {
        setMode(event.data === 'portrait' ? 'portrait' : 'landscape')
      })

      requestAnimationFrame(() => {
        pageFlip.update()
        setMode(pageFlip.getOrientation())
        setCurrentPage(pageFlip.getCurrentPageIndex())
        setIsReady(true)
      })
    }

    initialize()

    return () => {
      isActive = false
      pageFlipRef.current?.destroy()
      pageFlipRef.current = null
      bookRootRef.current = null
      setIsReady(false)
    }
  }, [labels.pageAlt, lastPageIndex, pages, reduceMotion, shouldInitialize])

  useEffect(() => {
    updateBookShift()
  }, [isReady, updateBookShift])

  useEffect(() => {
    const stage = stageRef.current
    const pageFlip = pageFlipRef.current
    if (!stage || !pageFlip) return

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        pageFlip.update()
        setMode(pageFlip.getOrientation())
      })
    })

    observer.observe(stage)
    return () => observer.disconnect()
  }, [isReady])

  useEffect(() => {
    const pageFlip = pageFlipRef.current
    if (!pageFlip) return

    const timeout = window.setTimeout(() => {
      pageFlip.update()
      setMode(pageFlip.getOrientation())
    }, 320)

    return () => window.clearTimeout(timeout)
  }, [isExpanded])

  const goPrevious = useCallback(() => {
    pageFlipRef.current?.flipPrev('top')
  }, [])

  const goNext = useCallback(() => {
    pageFlipRef.current?.flipNext('top')
  }, [])

  const goToPage = useCallback((pageIndex: number) => {
    const pageFlip = pageFlipRef.current
    if (!pageFlip) return

    if (Math.abs(pageFlip.getCurrentPageIndex() - pageIndex) <= 2) {
      pageFlip.flip(pageIndex, 'top')
      return
    }

    pageFlip.turnToPage(pageIndex)
    setCurrentPage(pageIndex)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrevious()
      if (event.key === 'Home') goToPage(0)
      if (event.key === 'End') goToPage(lastPageIndex)
      if (event.key === 'Escape') setIsExpanded(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrevious, goToPage, lastPageIndex])

  const canGoPrevious = currentPage > 0
  const canGoNext = currentPage < lastPageIndex

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        isExpanded &&
          'bg-background fixed inset-0 z-50 overflow-y-auto px-4 py-5 md:px-8 md:py-8',
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold tracking-[0.14em] text-neutral-600 uppercase">
            {title}
          </span>
          <span className="text-muted-foreground text-sm">{progressLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goPrevious}
            disabled={!canGoPrevious || !isReady}
            aria-label={labels.previous}
            title={labels.previous}
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goNext}
            disabled={!canGoNext || !isReady}
            aria-label={labels.next}
            title={labels.next}
          >
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsExpanded((value) => !value)}
            aria-label={isExpanded ? labels.collapse : labels.expand}
            title={isExpanded ? labels.collapse : labels.expand}
          >
            {isExpanded ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={cn(
          'bg-surface-dark relative mx-auto flex h-[560px] w-full max-w-[1040px] items-center justify-center overflow-hidden border border-neutral-900 shadow-2xl shadow-neutral-950/25 outline-none md:h-[540px] lg:h-[560px]',
          isExpanded && 'h-[calc(100vh-172px)] max-w-[min(1500px,96vw)] md:h-[calc(100vh-186px)]',
        )}
        tabIndex={0}
        aria-label={labels.readerLabel}
      >
        {!isReady ? (
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            aria-hidden={shouldInitialize ? 'true' : undefined}
          >
            <div className="relative h-full max-h-[min(100%,760px)] w-auto overflow-hidden bg-white shadow-xl">
              <Image
                src={pages[0]?.src ?? ''}
                alt={labels.pageAlt.replace('{page}', '1')}
                width={pageWidth}
                height={pageHeight}
                sizes="(min-width: 1024px) 420px, 82vw"
                className="h-full w-auto object-contain"
                draggable={false}
              />
            </div>
          </div>
        ) : null}
        <div
          ref={bookMountRef}
          className={cn(
            'magazine-flip-stage relative h-full w-full',
            isReady ? 'opacity-100' : 'opacity-0',
          )}
          style={{ '--magazine-page-ratio': String(pageAspectRatio) } as CSSProperties}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {pages.map((page) => {
            const isActive = page.number >= visibleRange.first && page.number <= visibleRange.last

            return (
              <button
                key={page.number}
                type="button"
                onClick={() => goToPage(page.number - 1)}
                className={cn(
                  'size-2.5 rounded-full border border-neutral-300 transition-colors',
                  isActive ? 'bg-primary border-primary' : 'bg-white hover:border-neutral-500',
                )}
                aria-label={labels.pageProgress
                  .replace('{page}', String(page.number))
                  .replace('{total}', String(pages.length))}
              />
            )
          })}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={() => goToPage(0)}>
            {labels.firstPage}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => goToPage(lastPageIndex)}
          >
            {labels.lastPage}
          </Button>
        </div>
      </div>
    </div>
  )
}
