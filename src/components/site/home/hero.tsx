'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { AudienceSwitch } from '@/components/site/audience-switch'
import { ValuationEntryCard } from '@/components/site/valuation/valuation-entry-card'

type Audience = 'seller' | 'buyer'

const HERO_CTAS = {
  seller: {
    primaryHref: '/property-valuation' as const,
    secondaryHref: '/sales-process' as const,
  },
  buyer: {
    primaryHref: { pathname: '/buy' as const, hash: '#angebote' },
    secondaryHref: '/contact' as const,
  },
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
function getRise(reduceMotion: boolean, delay: number) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.9, ease: EASE, delay: reduceMotion ? 0 : delay },
  }
}

function RevealTitle({ title, reduceMotion }: { title: string; reduceMotion: boolean }) {
  const words = title.split(' ')
  return (
    <h1 className="font-serif text-3xl leading-[1.12] font-semibold tracking-[-0.005em] text-balance text-white sm:text-4xl md:text-5xl lg:text-[58px]">
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
  const reduceMotion = useReducedMotion() ?? false
  const cta = HERO_CTAS[mode]

  return (
    <section className="bg-surface-dark relative -mt-[var(--header-height)] overflow-hidden">
      {/* Hero-Bildfläche: Firmenlogo, gedimmt hinter der Headline */}
      <div
        className="absolute top-8 -right-12 -bottom-8 -left-12 md:top-10 md:-right-16 md:-bottom-10 md:-left-16 lg:-right-20 lg:-left-20"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 size-full object-contain object-center opacity-55"
          src="/immonation-logo.png"
          alt=""
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
        <div className="grid min-h-[calc(100svh-5rem)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,410px)]">
          {/* key={mode}: Wechsel Verkäufer/Käufer spielt die Inszenierung erneut ab */}
          <div
            key={mode}
            className="relative flex max-w-[760px] min-w-0 flex-col gap-6 pt-24 pb-14 md:pb-[72px]"
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
                {...getRise(reduceMotion, STAGE_DELAYS.eyebrow)}
              >
                {t(`${mode}.eyebrow`)}
              </motion.span>
            </div>
            <RevealTitle title={t(`${mode}.title`)} reduceMotion={reduceMotion} />
            <motion.p
              className="max-w-[56ch] text-lg leading-[1.55] text-neutral-300 md:text-[19px]"
              {...getRise(reduceMotion, STAGE_DELAYS.subtitle)}
            >
              {t(`${mode}.subtitle`)}
            </motion.p>
            <div className="flex flex-col gap-3">
              <motion.div
                className="flex flex-wrap gap-4"
                {...getRise(reduceMotion, STAGE_DELAYS.ctas)}
              >
                {mode === 'buyer' ? (
                  <motion.span
                    className="inline-flex"
                    whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    <Link
                      href={cta.primaryHref}
                      className="bg-brand-600 hover:bg-brand-700 group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 text-base font-semibold text-white transition-colors"
                    >
                      {/* Licht-Sweep beim Hover — einziger dekorativer Effekt auf dem CTA */}
                      <span
                        className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/20 transition-[left] duration-500 ease-out group-hover:left-[150%] motion-reduce:hidden"
                        aria-hidden
                      />
                      <span className="relative">{t(`${mode}.ctaPrimary`)}</span>
                    </Link>
                  </motion.span>
                ) : null}
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
              </motion.div>
              {mode === 'seller' ? (
                <motion.div
                  className="mt-2 w-full max-w-[440px] lg:hidden"
                  {...getRise(reduceMotion, STAGE_DELAYS.ctas)}
                >
                  <ValuationEntryCard />
                </motion.div>
              ) : null}
              {/* Mobil: Switch + Rating unter den CTAs; Desktop: rechte Randspalte (siehe unten) */}
              <motion.div
                className="flex flex-col divide-y divide-white/15 self-start border border-white/15 bg-white/5 lg:hidden"
                {...getRise(reduceMotion, STAGE_DELAYS.switch)}
              >
                <AudienceSwitch mode={mode} />
                <GoogleRating />
              </motion.div>
            </div>
          </div>

          {/* Rechte Randspalte: Publikums-Switch + Bewertung, unten rechts verankert */}
          <motion.div
            key={`${mode}-rail`}
            className="hidden h-full flex-col items-stretch pt-32 pb-[72px] lg:flex"
            {...getRise(reduceMotion, STAGE_DELAYS.switch)}
          >
            {mode === 'seller' ? <ValuationEntryCard /> : null}
            <div className="mt-auto flex flex-col divide-y divide-white/15 self-end border border-white/15 bg-white/5 backdrop-blur-sm">
              <AudienceSwitch mode={mode} />
              <GoogleRating />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
