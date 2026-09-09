'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useTranslations } from 'next-intl'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { Hero } from './hero'

type HeroPhase = 'logo' | 'morph' | 'house' | 'transition' | 'hero'

const PANEL_POINTS = {
  front: {
    logo: '214 176 344 230 344 480 214 426',
    house: '225 302 500 302 500 570 225 570',
  },
  roof: {
    logo: '335 226 465 280 465 530 335 476',
    house: '225 302 500 302 650 220 375 206',
  },
  side: {
    logo: '456 276 586 330 586 580 456 526',
    house: '500 302 650 220 650 488 500 570',
  },
} as const

function getHeroPhase(progress: number): HeroPhase {
  if (progress < 0.12) return 'logo'
  if (progress < 0.48) return 'morph'
  if (progress < 0.68) return 'house'
  if (progress < 0.88) return 'transition'
  return 'hero'
}

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

function getReducedMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function HouseGraphic({ progress }: { progress: MotionValue<number> }) {
  const architectureOpacity = useTransform(progress, [0.1, 0.18, 0.68, 0.88], [0, 1, 1, 0])
  const detailsOpacity = useTransform(progress, [0.48, 0.62], [0, 1])
  const lightOpacity = useTransform(progress, [0.54, 0.68, 0.82], [0, 0.95, 0])
  const graphicScale = useTransform(progress, [0.68, 0.88], [1, 1.14])
  const graphicY = useTransform(progress, [0.68, 0.88], [0, -36])
  const frontPoints = useTransform(
    progress,
    [0.12, 0.48],
    [PANEL_POINTS.front.logo, PANEL_POINTS.front.house],
  )
  const roofPoints = useTransform(
    progress,
    [0.12, 0.48],
    [PANEL_POINTS.roof.logo, PANEL_POINTS.roof.house],
  )
  const sidePoints = useTransform(
    progress,
    [0.12, 0.48],
    [PANEL_POINTS.side.logo, PANEL_POINTS.side.house],
  )

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{ opacity: architectureOpacity, scale: graphicScale, y: graphicY }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 800 720" className="h-[58vh] w-[88vw] max-w-[760px] overflow-visible">
        <defs>
          <radialGradient id="house-ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffd08a" stopOpacity="0.34" />
            <stop offset="1" stopColor="#ffd08a" stopOpacity="0" />
          </radialGradient>
          <filter id="house-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <motion.ellipse
          cx="425"
          cy="590"
          rx="235"
          ry="42"
          fill="#000000"
          filter="url(#house-shadow)"
          opacity={detailsOpacity}
        />
        <motion.circle
          cx="390"
          cy="430"
          r="270"
          fill="url(#house-ambient)"
          opacity={lightOpacity}
        />
        <motion.polygon points={sidePoints} fill="#737372" />
        <motion.polygon points={roofPoints} fill="#A2D9F5" />
        <motion.polygon points={frontPoints} fill="#1D9CD7" />

        <motion.g opacity={detailsOpacity}>
          <rect x="268" y="352" width="70" height="70" fill="#152126" />
          <rect x="386" y="352" width="70" height="70" fill="#152126" />
          <rect x="268" y="458" width="70" height="66" fill="#152126" />
          <rect x="386" y="448" width="72" height="122" fill="#152126" />
          <path d="M532 344 616 299v69l-84 46z" fill="#152126" />
          <path d="M532 447 616 401v69l-84 46z" fill="#152126" />
          <motion.g opacity={lightOpacity} fill="#ffd08a">
            <rect x="274" y="358" width="58" height="58" />
            <rect x="392" y="358" width="58" height="58" />
            <rect x="274" y="464" width="58" height="54" />
            <path d="M538 348 610 309v55l-72 39z" />
          </motion.g>
          <g stroke="#0b171c" strokeWidth="5" opacity="0.75">
            <path d="M303 352v70M268 387h70M421 352v70M386 387h70" />
            <path d="M303 458v66M268 491h70" />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  )
}

export function HomeHeroStory() {
  const t = useTranslations('Home.hero')
  const storyRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    () => false,
  )
  const [phase, setPhase] = useState<HeroPhase>('logo')
  const [isHeroInteractive, setIsHeroInteractive] = useState(false)
  const { scrollY } = useScroll()
  const scrollYProgress = useTransform(scrollY, (scrollPosition) => {
    const story = storyRef.current
    if (!story) return 0

    const storyTop = story.getBoundingClientRect().top + scrollPosition
    const scrollDistance = Math.max(story.offsetHeight - window.innerHeight, 1)
    return Math.min(Math.max((scrollPosition - storyTop) / scrollDistance, 0), 1)
  })
  const introOpacity = useTransform(scrollYProgress, [0.06, 0.28], [1, 0])
  const markOpacity = useTransform(scrollYProgress, [0.08, 0.18], [1, 0])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0])
  const stageOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextPhase = getHeroPhase(progress)
    setPhase((currentPhase) => (currentPhase === nextPhase ? currentPhase : nextPhase))
    setIsHeroInteractive(progress >= 0.78)
  })

  const activePhase = shouldReduceMotion ? 'hero' : phase
  const canUseHero = shouldReduceMotion || isHeroInteractive

  return (
    <div
      className="bg-surface-dark relative -mt-[var(--header-height)]"
      data-home-hero-story
      data-hero-phase={activePhase}
    >
      <div
        ref={storyRef}
        className="pointer-events-none relative z-20 h-[180svh] motion-reduce:hidden"
        aria-hidden={canUseHero ? true : undefined}
      >
        <motion.div
          className="bg-surface-dark sticky top-0 h-svh overflow-hidden"
          style={{ opacity: stageOpacity }}
        >
          <div className="from-brand-800/35 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/20" />

          <motion.div
            className="absolute inset-x-6 top-[17%] z-10 text-center"
            style={{ opacity: introOpacity }}
          >
            <p className="text-brand-200 text-[11px] font-semibold tracking-[0.2em] uppercase sm:text-[13px]">
              {t('storyEyebrow')}
            </p>
            <p className="mx-auto mt-4 max-w-[18ch] font-serif text-3xl leading-[1.08] font-semibold text-balance text-white sm:text-4xl md:text-5xl">
              {t('storyTitle')}
            </p>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center pt-[8vh]"
            style={{ opacity: markOpacity }}
            aria-hidden="true"
          >
            <ImmonationMark className="h-[30vh] max-h-[320px] min-h-[190px]" />
          </motion.div>

          <HouseGraphic progress={scrollYProgress} />

          <motion.div
            className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-3 text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase sm:bottom-9"
            style={{ opacity: hintOpacity }}
          >
            <span>{t('scrollHint')}</span>
            <span className="border-brand-200 block size-3 rotate-45 border-r-2 border-b-2" />
          </motion.div>
        </motion.div>
      </div>

      <div
        className="relative z-10 -mt-[100svh] motion-reduce:mt-0"
        inert={canUseHero ? undefined : true}
        aria-hidden={canUseHero ? undefined : true}
      >
        <Hero mode="seller" showRating={false} showIntroVideo />
      </div>
    </div>
  )
}
