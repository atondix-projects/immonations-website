'use client'

import { useId, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { ValuationEntryBar } from '@/components/site/valuation/valuation-entry-bar'
import { HeroHouse } from './hero-house'
import { HeroIntroVideo } from './hero-intro-video'
import { EASE, RevealTitle, STAGE_DELAYS, getRise } from './hero-motion'

type HeroPhase = 'logo' | 'fold' | 'house'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const PROGRESS_SPRING = { stiffness: 140, damping: 30, mass: 0.5, restDelta: 0.0005 } as const
/** Unpinned, the story completes once the stage centre reaches the viewport centre. */
const MIN_FLOW_TRAVEL = 0.45

function getHeroPhase(progress: number): HeroPhase {
  if (progress < 0.03) return 'logo'
  if (progress < 0.62) return 'fold'
  return 'house'
}

const clampProgress = (value: number) => Math.min(Math.max(value, 0), 1)

/**
 * The `hero-pin` variant in globals.css decides whether the story pins (wide and tall
 * enough, motion welcome). Reading the resulting `position: sticky` keeps that CSS the
 * single source of truth: pinned, progress runs over the section's extra scroll height;
 * unpinned, the house builds as the stage scrolls towards the middle of the viewport.
 */
function readProgress(
  scrollPosition: number,
  section: HTMLElement | null,
  pin: HTMLElement | null,
  stage: HTMLElement | null,
): number {
  if (!section || !pin || !stage) return 0
  const viewport = window.innerHeight

  if (getComputedStyle(pin).position === 'sticky') {
    const sectionTop = section.getBoundingClientRect().top + scrollPosition
    const travel = Math.max(section.offsetHeight - viewport, 1)
    return clampProgress((scrollPosition - sectionTop) / travel)
  }

  const stageBox = stage.getBoundingClientRect()
  const stageMiddle = stageBox.top + scrollPosition + stageBox.height / 2
  const travel = Math.max(stageMiddle - viewport / 2, viewport * MIN_FLOW_TRAVEL)
  return clampProgress(scrollPosition / travel)
}

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

function getReducedMotionPreference() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/**
 * Homepage hero: headline, valuation entry and intro video are there from the
 * first frame; only the house on the right is told through the scroll.
 */
export function HomeHeroStory() {
  const t = useTranslations('Home.hero')
  const titleId = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    () => false,
  )
  const [phase, setPhase] = useState<HeroPhase>('logo')

  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, (position) =>
    readProgress(position, sectionRef.current, pinRef.current, stageRef.current),
  )
  const smoothProgress = useSpring(scrollProgress, PROGRESS_SPRING)
  const builtHouse = useMotionValue(1)
  const progress = reduceMotion ? builtHouse : smoothProgress
  const hintOpacity = useTransform(scrollProgress, [0, 0.08], [1, 0])

  useMotionValueEvent(scrollProgress, 'change', (value) => {
    const nextPhase = getHeroPhase(value)
    setPhase((currentPhase) => (currentPhase === nextPhase ? currentPhase : nextPhase))
  })

  return (
    <section
      ref={sectionRef}
      aria-labelledby={titleId}
      className="bg-surface-dark hero-pin:h-[165svh] relative -mt-[var(--header-height)]"
      data-home-hero-story
      data-hero-phase={reduceMotion ? 'house' : phase}
    >
      <div
        ref={pinRef}
        className="hero-pin:sticky hero-pin:top-0 hero-pin:h-svh relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="from-brand-800/40 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent opacity-70" />
          {/* Kopf-Scrim: sichert Kontrast für den transparenten Header. */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/50 to-transparent" />
        </div>

        {/* Beide Spalten gleich hoch: oben Headline und Haus, unten schliessen Formular
            und Video auf einer Linie ab. */}
        <div className="relative mx-auto grid h-full w-full max-w-[1320px] content-center gap-x-12 gap-y-14 px-6 pt-[calc(var(--header-height)+2.75rem)] pb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:px-10 lg:pb-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-8 lg:justify-between">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                {/* Gleiches CI-Element wie vor den Sektions-Eyebrows — ein Marker sitewide. */}
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
                >
                  <ImmonationMark className="h-6" />
                </motion.span>
                <motion.span
                  className="text-brand-200 text-[13px] font-semibold tracking-[0.14em] uppercase"
                  {...getRise(reduceMotion, STAGE_DELAYS.eyebrow)}
                >
                  {t('seller.eyebrow')}
                </motion.span>
              </div>
              <RevealTitle
                id={titleId}
                title={t('seller.title')}
                reduceMotion={reduceMotion}
                className="text-[length:clamp(2.1rem,min(3.8vw,6.2svh),3.75rem)] leading-[1.08]"
              />
              <motion.p
                className="max-w-[54ch] text-[17px] leading-[1.55] text-neutral-300 xl:text-lg"
                {...getRise(reduceMotion, STAGE_DELAYS.subtitle)}
              >
                {t('seller.subtitle')}
              </motion.p>
              <motion.div className="self-start" {...getRise(reduceMotion, STAGE_DELAYS.subtitle)}>
                <Link
                  href="/sell"
                  className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.02em] text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {t('seller.ctaSecondary')}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            </div>
            <motion.div {...getRise(reduceMotion, STAGE_DELAYS.ctas)}>
              <ValuationEntryBar />
            </motion.div>
          </div>

          <motion.div
            ref={stageRef}
            className="flex min-w-0 flex-col gap-6 lg:justify-between"
            {...getRise(reduceMotion, STAGE_DELAYS.eyebrow)}
          >
            <HeroHouse
              progress={progress}
              idPrefix="home-hero"
              // Capped by the height left over for the house once header, caption row and
              // video are placed, so short screens keep air under the header.
              className="mx-auto w-full max-w-[min(68svh,calc((100svh-21rem)*1.09))]"
            />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="font-serif text-xl leading-snug text-balance text-white xl:text-2xl">
                  {t('storyTitle')}
                </p>
                <div className="mt-3 flex items-center gap-3" aria-hidden="true">
                  <div className="h-px w-full max-w-48 bg-white/15">
                    <motion.div
                      className="bg-brand-400 h-full origin-left"
                      style={{ scaleX: progress }}
                    />
                  </div>
                  <motion.span
                    className="text-[10px] font-semibold tracking-[0.2em] whitespace-nowrap text-neutral-400 uppercase motion-reduce:hidden"
                    style={{ opacity: hintOpacity }}
                  >
                    {t('scrollHint')}
                  </motion.span>
                </div>
              </div>
              <HeroIntroVideo className="w-full max-w-[440px] shrink-0 sm:w-56 xl:w-64" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
