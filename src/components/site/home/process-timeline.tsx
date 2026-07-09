'use client'

import { type ComponentProps, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import {
  Camera,
  Handshake,
  Image as ImageIcon,
  LineChart,
  MapPin,
  Megaphone,
  Phone,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'
import { CONTAINER, SectionHeader } from './section-shell'

type LinkHref = ComponentProps<typeof Link>['href']
type ProcessStep = { num: string; title: string; text: string }

// One icon per step, indexed 1:1 with the translated `process.steps` array.
const STEP_ICONS: readonly LucideIcon[] = [
  Phone,
  MapPin,
  LineChart,
  Camera,
  Megaphone,
  UserCheck,
  Handshake,
]

// Matches the site-wide premium ease used in the hero.
const EASE = [0.22, 1, 0.36, 1] as const

export function ProcessTimeline({
  steps,
  eyebrow,
  title,
  link,
}: {
  steps: ProcessStep[]
  eyebrow: string
  title: string
  link: { label: string; href: LinkHref }
}) {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 85%', 'end 60%'],
  })
  const spineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="verkaufen" className="bg-muted border-border scroll-mt-24 border-y py-16 md:py-24">
      <div className={CONTAINER}>
        <SectionHeader eyebrow={eyebrow} title={title} link={link} />

        <div ref={trackRef} className="relative">
          {/* Static spine track */}
          <span
            aria-hidden
            className="bg-border absolute inset-y-2 left-[23px] w-0.5 lg:left-1/2 lg:-translate-x-1/2"
          />
          {/* Animated spine that draws in on scroll */}
          <motion.span
            aria-hidden
            style={reduceMotion ? undefined : { scaleY: spineScale }}
            className={cn(
              'bg-accent absolute inset-y-2 left-[23px] w-0.5 origin-top lg:left-1/2 lg:-translate-x-1/2',
              reduceMotion && 'origin-top',
            )}
          />

          <ol className="flex flex-col gap-10 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? Phone
              const isLeft = index % 2 === 0
              return (
                <li
                  key={step.num}
                  className="relative grid grid-cols-[48px_1fr] gap-x-5 lg:grid-cols-2 lg:gap-x-0"
                >
                  {/* Node marker: in-flow on mobile, centered on the spine on lg */}
                  <div className="z-10 flex justify-center lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2">
                    <span className="border-accent text-accent flex size-12 items-center justify-center rounded-full border-2 bg-white shadow-sm">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>

                  {/* Step card */}
                  <motion.div
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, x: isLeft ? -28 : 28, filter: 'blur(6px)' }
                    }
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
                    className={cn(
                      'border-border border-t-accent relative flex flex-col gap-3 border border-t-2 bg-white p-7',
                      isLeft ? 'lg:col-start-1 lg:mr-10 lg:text-left' : 'lg:col-start-2 lg:ml-10',
                    )}
                  >
                    {/* Connector line from the card to the spine */}
                    <motion.span
                      aria-hidden
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
                      className={cn(
                        'bg-accent absolute top-6 hidden h-0.5 lg:block',
                        isLeft ? 'left-full w-10 origin-right' : 'right-full w-10 origin-left',
                      )}
                    />
                    {/* Connector line for the mobile single-column layout */}
                    <motion.span
                      aria-hidden
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.18 }}
                      className="bg-accent absolute top-6 right-full h-0.5 w-5 origin-left lg:hidden"
                    />

                    {/* Image placeholder: real step photo follows */}
                    <div className="bg-brand-100/60 relative -mx-7 -mt-7 mb-1 flex aspect-[16/9] items-center justify-center overflow-hidden">
                      <ImageIcon
                        className="text-brand-300/70 size-8"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>

                    <span className="text-accent font-serif text-[15px] font-semibold tracking-[0.08em]">
                      {step.num}
                    </span>
                    <h3 className="text-[21px] leading-tight font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-[15px] leading-[1.55]">{step.text}</p>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
