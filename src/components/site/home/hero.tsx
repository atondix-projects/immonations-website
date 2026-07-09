'use client'

import { Fragment, useEffect, useRef } from 'react'
import { RotateCcw, Volume2 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { AudienceSwitch } from '@/components/site/audience-switch'

type Audience = 'seller' | 'buyer'

const HERO_CTAS = {
  // primaryHref is a same-page anchor; secondaryHref is a localized route.
  seller: { primaryHref: '#bewertung', secondaryHref: '/buy' as const },
  buyer: { primaryHref: '#angebote', secondaryHref: '/contact' as const },
}

// Premium ease (matches the rest of the site's spring-like feel); staggered in seconds.
const EASE = [0.22, 1, 0.36, 1] as const
const STAGE_DELAYS = {
  eyebrow: 0.1,
  wordBase: 0.2,
  wordStep: 0.055,
  subtitle: 0.62,
  ctas: 0.78,
  switch: 0.92,
} as const

/** Rise-in: opacity + translateY, disabled entirely under prefers-reduced-motion. */
function useRise(reduceMotion: boolean, delay: number) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.9, ease: EASE, delay: reduceMotion ? 0 : delay },
  }
}

function RevealTitle({ title, reduceMotion }: { title: string; reduceMotion: boolean }) {
  const words = title.split(' ')
  return (
    <h1 className="font-serif text-4xl leading-[1.12] font-semibold tracking-[-0.005em] text-balance text-white md:text-5xl lg:text-[58px]">
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="-mb-[0.08em] inline-flex overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={reduceMotion ? false : { y: '115%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: EASE,
                delay: reduceMotion ? 0 : STAGE_DELAYS.wordBase + index * STAGE_DELAYS.wordStep,
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  )
}

function GoogleRating() {
  const t = useTranslations('Home.hero')
  return (
    <div className="flex items-center gap-2 px-4 py-2.5">
      <span className="text-xs text-neutral-400">{t('ratingLabel')}</span>
      <span className="text-sm font-semibold text-white">{t('ratingValue')}</span>
    </div>
  )
}

export function Hero({ mode }: { mode: Audience }) {
  const t = useTranslations('Home.hero')
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const cta = HERO_CTAS[mode]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      if (reduce.matches) video.pause()
      else void video.play().catch(() => {})
    }
    apply()
    reduce.addEventListener('change', apply)
    return () => reduce.removeEventListener('change', apply)
  }, [])

  const restartWithAudio = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    video.muted = false
    video.volume = 1
    void video.play().catch(() => {
      video.muted = true
    })
  }

  return (
    <section className="bg-surface-dark relative -mt-[var(--header-height)] overflow-hidden">
      {/* Hero-Bildfläche: Vermarktungs-Video mit Ken-Burns-Zoom + scroll-gebundenem Parallax (motion/react), gedimmt hinter der Headline */}
      <div
        className="absolute top-8 -right-12 -bottom-8 -left-12 md:top-10 md:-right-16 md:-bottom-10 md:-left-16 lg:-right-20 lg:-left-20"
        aria-hidden
      >
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover object-[center_20%] opacity-55"
          src="/immonation-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={t('imageAlt')}
        />
        <div className="from-brand-800/40 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent opacity-55" />
        <div className="from-surface-dark/95 via-surface-dark/40 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>
      {/* Kopf-Scrim: unabhängig vom Parallax-Layer, sichert Kontrast für den transparenten Header */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-black/55 to-transparent md:h-48"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        {/* Etwas unter voller Hoehe, damit die naechste Sektion knapp ueber der Falz hervorlugt. */}
        <div className="flex min-h-[calc(100svh-5rem)] items-end justify-between gap-10">
          {/* key={mode}: Wechsel Verkäufer/Käufer spielt die Inszenierung erneut ab */}
          <div
            key={mode}
            className="relative flex max-w-[760px] flex-col gap-6 pt-24 pb-14 md:pb-[72px]"
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="bg-brand-500 h-0.5 w-6 origin-left"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
              />
              <motion.span
                className="text-brand-200 text-[13px] font-semibold tracking-[0.14em] uppercase"
                {...useRise(reduceMotion, STAGE_DELAYS.eyebrow)}
              >
                {t(`${mode}.eyebrow`)}
              </motion.span>
            </div>
            <RevealTitle title={t(`${mode}.title`)} reduceMotion={reduceMotion} />
            <motion.p
              className="max-w-[56ch] text-lg leading-[1.55] text-neutral-300 md:text-[19px]"
              {...useRise(reduceMotion, STAGE_DELAYS.subtitle)}
            >
              {t(`${mode}.subtitle`)}
            </motion.p>
            <div className="flex flex-col gap-3">
              <motion.div
                className="flex flex-wrap gap-4"
                {...useRise(reduceMotion, STAGE_DELAYS.ctas)}
              >
                <motion.a
                  href={cta.primaryHref}
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="bg-brand-500 hover:bg-brand-400 group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 text-base font-medium tracking-[0.04em] text-white transition-colors"
                >
                  {/* Licht-Sweep beim Hover — einziger dekorativer Effekt auf dem CTA */}
                  <span
                    className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/20 transition-[left] duration-500 ease-out group-hover:left-[150%] motion-reduce:hidden"
                    aria-hidden
                  />
                  <span className="relative">{t(`${mode}.ctaPrimary`)}</span>
                </motion.a>
                <motion.span
                  className="inline-flex"
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <Link
                    href={cta.secondaryHref}
                    className="inline-flex items-center justify-center border border-white/40 px-8 py-[15px] text-base font-medium tracking-[0.04em] text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    {t(`${mode}.ctaSecondary`)}
                  </Link>
                </motion.span>
                <motion.button
                  type="button"
                  onClick={restartWithAudio}
                  aria-label={t('playWithAudio')}
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="inline-flex items-center justify-center gap-2 border border-white/25 bg-black/25 px-5 py-[15px] text-sm font-medium tracking-[0.04em] text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  <Volume2 className="size-4" aria-hidden />
                  <span>{t('playWithAudio')}</span>
                </motion.button>
              </motion.div>
              {/* Mobil: Switch + Rating unter den CTAs; Desktop: rechte Randspalte (siehe unten) */}
              <motion.div
                className="flex flex-col divide-y divide-white/15 self-start border border-white/15 bg-white/5 lg:hidden"
                {...useRise(reduceMotion, STAGE_DELAYS.switch)}
              >
                <AudienceSwitch mode={mode} />
                <GoogleRating />
              </motion.div>
            </div>
          </div>

          {/* Rechte Randspalte: Publikums-Switch + Bewertung, unten rechts verankert */}
          <motion.div
            key={`${mode}-rail`}
            className="hidden flex-col items-end gap-3 pb-14 md:pb-[72px] lg:flex"
            {...useRise(reduceMotion, STAGE_DELAYS.switch)}
          >
            <div className="flex flex-col divide-y divide-white/15 border border-white/15 bg-white/5 backdrop-blur-sm">
              <AudienceSwitch mode={mode} />
              <GoogleRating />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
