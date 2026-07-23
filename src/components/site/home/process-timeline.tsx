'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type ComponentProps, type KeyboardEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Camera,
  ClipboardCheck,
  Eye,
  HandCoins,
  KeyRound,
  Landmark,
  Megaphone,
  MessageSquareText,
  Route,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { CONTAINER } from './section-shell'

type LinkHref = ComponentProps<typeof Link>['href']

export type SalesProcessStep = {
  id: string
  num: string
  phase: string
  title: string
  summary: string
  detail: string
  activities: string[]
  outcome: string
}

const STEP_IMAGES = [
  '/images/process/step-01.webp',
  '/images/process/step-02.webp',
  '/images/process/step-03.webp',
  '/images/process/step-04.webp',
  '/images/process/step-05.webp',
  '/images/process/step-06.webp',
  '/images/process/step-07.webp',
  '/images/process/step-08.webp',
  '/images/process/step-09.webp',
  '/images/process/step-10.webp',
] as const

const STEP_ICONS = [
  ClipboardCheck,
  BarChart3,
  Route,
  Camera,
  Megaphone,
  MessageSquareText,
  Eye,
  HandCoins,
  Landmark,
  KeyRound,
] as const

const AUTO_ADVANCE_DELAY = 4_500

const imageVariants = {
  enter: (movementDirection: 1 | -1) => ({
    opacity: 0,
    x: movementDirection * 90,
    scale: 1.025,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (movementDirection: 1 | -1) => ({
    opacity: 0,
    x: movementDirection * -90,
    scale: 1.015,
  }),
}

const contentVariants = {
  enter: (movementDirection: 1 | -1) => ({
    opacity: 0,
    x: movementDirection * 38,
  }),
  center: { opacity: 1, x: 0 },
  exit: (movementDirection: 1 | -1) => ({
    opacity: 0,
    x: movementDirection * -28,
  }),
}

export function ProcessTimeline({
  steps,
  eyebrow,
  title,
  lede,
  link,
  labels,
}: {
  steps: SalesProcessStep[]
  eyebrow: string
  title: string
  lede: string
  link: { label: string; href: LinkHref }
  labels: {
    previous: string
    next: string
    tabList: string
    selectedStep: string
    activities: string
    outcome: string
  }
}) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? '')
  const [isHovered, setIsHovered] = useState(false)
  const [timerReset, setTimerReset] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const prefersReducedMotion = useReducedMotion()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === activeId),
  )

  useEffect(() => {
    if (!isHovered || steps.length < 2 || prefersReducedMotion) return

    const timer = window.setTimeout(() => {
      const nextStep = steps[(activeIndex + 1) % steps.length]
      if (nextStep) {
        setDirection(1)
        setActiveId(nextStep.id)
      }
    }, AUTO_ADVANCE_DELAY)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isHovered, prefersReducedMotion, steps, timerReset])

  if (steps.length === 0) return null

  function selectStep(index: number, resetTimer = true, directionOverride?: 1 | -1) {
    const nextStep = steps[index]
    if (!nextStep) return

    setDirection(directionOverride ?? (index >= activeIndex ? 1 : -1))
    setActiveId(nextStep.id)
    if (resetTimer) setTimerReset((value) => value + 1)
  }

  function activateAndFocus(index: number, movementDirection?: 1 | -1) {
    selectStep(index, true, movementDirection)
    requestAnimationFrame(() => tabRefs.current[index]?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % steps.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + steps.length) % steps.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = steps.length - 1
    }

    if (nextIndex === undefined) return
    event.preventDefault()
    activateAndFocus(nextIndex, event.key === 'ArrowRight' || event.key === 'End' ? 1 : -1)
  }

  const ActiveIcon = STEP_ICONS[activeIndex] ?? ClipboardCheck
  const activeImage = STEP_IMAGES[activeIndex] ?? STEP_IMAGES[0]
  const activeStep = steps[activeIndex] ?? steps[0]

  if (!activeStep) return null

  return (
    <section
      id="verkaufen"
      className="border-border bg-muted/55 scroll-mt-24 overflow-hidden border-y py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.78fr)_minmax(360px,1.22fr)] lg:items-end lg:gap-14">
          <div>
            <p className="text-primary text-[13px] font-semibold tracking-[0.16em] uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-[17ch] font-serif text-4xl leading-[1.08] font-semibold text-balance md:text-[48px]">
              {title}
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="text-muted-foreground max-w-[66ch] text-[17px] leading-[1.7] text-pretty">
              {lede}
            </p>
            <Link
              href={link.href}
              className="text-primary mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-[gap] duration-150 hover:gap-3 motion-reduce:transition-none"
            >
              {link.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div
          data-testid="sales-process-carousel"
          className="bg-surface-dark relative mt-10 min-h-[720px] overflow-hidden text-white shadow-[0_20px_55px_rgba(0,0,0,0.14)] sm:min-h-[660px] md:mt-12 lg:min-h-[600px]"
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeImage}
              custom={direction}
              variants={imageVariants}
              initial={prefersReducedMotion ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt=""
                fill
                priority={activeIndex === 0}
                quality={75}
                sizes="(min-width: 1280px) 1160px, 100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,15,17,0.96)_0%,rgba(12,15,17,0.83)_42%,rgba(12,15,17,0.48)_72%,rgba(12,15,17,0.58)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,15,17,0.9)_0%,transparent_62%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex min-h-[720px] flex-col p-7 pb-28 sm:min-h-[660px] sm:p-9 sm:pb-32 lg:min-h-[600px] lg:p-12 lg:pb-32 xl:p-14 xl:pb-32">
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  selectStep((activeIndex - 1 + steps.length) % steps.length, true, -1)
                }
                className="focus-visible:outline-brand-300 flex size-11 items-center justify-center border border-white/30 bg-black/15 text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-black/30 focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={labels.previous}
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => selectStep((activeIndex + 1) % steps.length, true, 1)}
                className="focus-visible:outline-brand-300 flex size-11 items-center justify-center border border-white/30 bg-black/15 text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-black/30 focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={labels.next}
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-auto">
              <p className="sr-only">{labels.selectedStep}</p>
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  key={activeStep.id}
                  id="sales-process-active-panel"
                  role="tabpanel"
                  aria-labelledby={`process-tab-${activeStep.id}`}
                  tabIndex={0}
                  custom={direction}
                  variants={contentVariants}
                  initial={prefersReducedMotion ? false : 'enter'}
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.38,
                    delay: prefersReducedMotion ? 0 : 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="focus-visible:ring-brand-300 grid gap-7 outline-none focus-visible:ring-2 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-12"
                >
                  <div className="max-w-[650px]">
                    <span className="flex size-11 items-center justify-center border border-white/25 bg-white/10 backdrop-blur-md">
                      <ActiveIcon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 max-w-[17ch] font-serif text-4xl leading-[1.04] font-semibold text-balance sm:text-5xl md:text-[54px]">
                      {activeStep.title}
                    </h3>
                    <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.65] text-pretty text-neutral-200 sm:text-[17px]">
                      {activeStep.summary}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <article className="border border-white/20 bg-black/30 p-4 backdrop-blur-md">
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-300 uppercase">
                        {labels.activities}
                      </p>
                      <ul className="mt-3 grid gap-2 text-sm leading-[1.45] text-white">
                        {activeStep.activities.slice(0, 2).map((activity) => (
                          <li key={activity} className="flex gap-2.5">
                            <span
                              className="mt-[7px] size-1 shrink-0 bg-white"
                              aria-hidden="true"
                            />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                    <article className="border border-white/20 bg-white/90 p-4 text-neutral-950 backdrop-blur-md">
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-600 uppercase">
                        {labels.outcome}
                      </p>
                      <p className="mt-2 text-sm leading-[1.5] font-medium">{activeStep.outcome}</p>
                    </article>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-black/35 px-3 py-3.5 backdrop-blur-md sm:px-6">
            <div
              role="tablist"
              aria-label={labels.tabList}
              aria-orientation="horizontal"
              className="relative mx-auto flex max-w-[940px] [scrollbar-width:none] items-center gap-5 overflow-x-auto [mask-image:linear-gradient(90deg,transparent_0%,black_7%,black_93%,transparent_100%)] px-12 py-1.5 sm:gap-7 sm:px-16 [&::-webkit-scrollbar]:hidden"
            >
              <span
                className="absolute top-1/2 right-12 left-12 h-px -translate-y-1/2 bg-white/25 sm:right-16 sm:left-16"
                aria-hidden="true"
              />
              {steps.map((step, index) => {
                const isActive = step.id === activeId
                return (
                  <button
                    key={step.id}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    id={`process-tab-${step.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="sales-process-active-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectStep(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={cn(
                      'relative z-10 flex h-11 shrink-0 items-center overflow-hidden border font-mono text-[11px] whitespace-nowrap transition-[width,background-color,color,border-color,transform] duration-300 outline-none active:scale-95 motion-reduce:transition-none',
                      'focus-visible:ring-2 focus-visible:ring-brand-300',
                      isActive
                        ? 'w-[154px] justify-start border-white bg-white px-3.5 text-neutral-950'
                        : 'w-11 justify-center border-white/35 bg-neutral-950/80 text-neutral-300 hover:border-white/70 hover:text-white',
                    )}
                    aria-label={`${step.num}: ${step.title}`}
                  >
                    <span className="shrink-0">{step.num}</span>
                    {isActive ? (
                      <span className="ml-2.5 truncate font-sans text-[11px] font-semibold tracking-normal">
                        {step.title}
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
