'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import {
  BadgeCheck,
  Camera,
  ClipboardList,
  FileText,
  Megaphone,
  PanelsTopLeft,
  Route,
  ScanLine,
  SearchCheck,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type MarketingServiceId =
  | 'system'
  | 'valuation'
  | 'intake'
  | 'floorplans'
  | 'media'
  | 'tour'
  | 'visualisation'
  | 'listing'
  | 'visibility'
  | 'qualification'

export type MarketingService = {
  id: MarketingServiceId
  tab: string
  kicker: string
  title: string
  text: string
  highlight: string
  bullets: string[]
  result: string
  proof: Array<{ value: string; label: string }>
}

type MarketingSystemLabels = {
  tabList: string
  included: string
  result: string
  videoLabel: string
  videoFallback: string
}

const SERVICE_ICONS: Record<MarketingServiceId, LucideIcon> = {
  system: Route,
  valuation: SearchCheck,
  intake: ClipboardList,
  floorplans: PanelsTopLeft,
  media: Camera,
  tour: ScanLine,
  visualisation: WandSparkles,
  listing: FileText,
  visibility: Megaphone,
  qualification: BadgeCheck,
}

function ServiceBlueprint({
  service,
  index,
  labels,
}: {
  service: MarketingService
  index: number
  labels: MarketingSystemLabels
}) {
  const Icon = SERVICE_ICONS[service.id]
  const serviceNumber = String(index + 1).padStart(2, '0')

  return (
    <div className="bg-surface-dark relative flex min-h-[420px] flex-col overflow-hidden p-6 text-white sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:44px_44px] opacity-[0.16]"
        aria-hidden="true"
      />

      {service.id === 'tour' ? (
        <div className="relative z-10 overflow-hidden bg-black outline -outline-offset-1 outline-white/10">
          <video
            className="aspect-video w-full object-cover"
            controls
            playsInline
            preload="metadata"
            aria-label={labels.videoLabel}
          >
            <source src="/immonation-presentation-video.mp4" type="video/mp4" />
            {labels.videoFallback}
          </video>
        </div>
      ) : (
        <div className="relative z-10 flex items-start justify-between">
          <div className="bg-brand-500 flex size-16 items-center justify-center shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_32px_rgba(0,0,0,0.22)]">
            <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div className="text-right font-mono text-xs tracking-[0.16em] text-neutral-500 uppercase">
            <span className="block text-neutral-300">Immonation</span>
            <span className="mt-1 block tabular-nums">{serviceNumber} / 10</span>
          </div>
        </div>
      )}

      <div className="relative z-10 mt-auto">
        <p className="max-w-[22ch] font-serif text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl">
          {service.highlight}
        </p>
        <div className="mt-8 grid gap-px bg-white/15 sm:grid-cols-3">
          {service.proof.map((item) => (
            <div key={item.label} className="bg-surface-dark/95 min-h-28 p-4 backdrop-blur-sm">
              <span className="text-brand-300 font-serif text-2xl leading-none font-semibold">
                {item.value}
              </span>
              <span className="mt-3 block text-xs leading-snug text-pretty text-neutral-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PremiumMarketingSystem({
  services,
  labels,
}: {
  services: MarketingService[]
  labels: MarketingSystemLabels
}) {
  const [activeId, setActiveId] = useState<MarketingServiceId>(services[0]?.id ?? 'system')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeIndex = Math.max(
    0,
    services.findIndex((service) => service.id === activeId),
  )

  if (services.length === 0) return null

  function activateAndFocus(index: number) {
    const nextService = services[index]
    if (!nextService) return

    setActiveId(nextService.id)
    requestAnimationFrame(() => tabRefs.current[index]?.focus())
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % services.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + services.length) % services.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = services.length - 1
    }

    if (nextIndex === undefined) return
    event.preventDefault()
    activateAndFocus(nextIndex)
  }

  return (
    <div>
      <div
        role="tablist"
        aria-orientation="horizontal"
        aria-label={labels.tabList}
        className="grid grid-cols-2 gap-1 bg-neutral-100 p-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10"
      >
        {services.map((service, index) => {
          const Icon = SERVICE_ICONS[service.id]
          const isActive = service.id === activeId

          return (
            <button
              key={service.id}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              id={`marketing-tab-${service.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`marketing-panel-${service.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(service.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'group flex min-h-[84px] flex-col items-center justify-center gap-2 px-2 py-3 text-center text-xs font-medium text-pretty shadow-[0_0_0_1px_rgba(0,0,0,0.055)] transition-[background-color,color,scale,box-shadow] duration-150 ease-out outline-none active:scale-[0.96] motion-reduce:transition-none',
                'focus-visible:shadow-[0_0_0_2px_var(--color-brand-500)]',
                isActive
                  ? 'bg-surface-dark text-white shadow-[0_0_0_1px_rgba(0,0,0,0.24),0_5px_14px_rgba(0,0,0,0.13)]'
                  : 'bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950',
              )}
            >
              <Icon
                className={cn(
                  'size-5 transition-[color,scale] duration-150 ease-out group-hover:scale-105 motion-reduce:transition-none',
                  isActive ? 'text-brand-300' : 'text-neutral-500',
                )}
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <span>{service.tab}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04),0_16px_44px_rgba(0,0,0,0.05)]">
        {services.map((service, index) => {
          const isActive = index === activeIndex

          return (
            <div
              key={service.id}
              id={`marketing-panel-${service.id}`}
              role="tabpanel"
              aria-labelledby={`marketing-tab-${service.id}`}
              tabIndex={0}
              hidden={!isActive}
              className="focus-visible:ring-brand-500 bg-white outline-none focus-visible:ring-2 focus-visible:ring-inset lg:grid lg:grid-cols-[1.02fr_0.98fr]"
            >
              <div className="flex flex-col p-7 sm:p-9 lg:p-11">
                <span className="text-brand-600 text-xs font-semibold tracking-[0.15em] uppercase">
                  {service.kicker}
                </span>
                <h3 className="mt-4 max-w-[18ch] font-serif text-3xl leading-[1.1] font-semibold text-balance sm:text-[38px]">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.7] text-pretty text-neutral-600">
                  {service.text}
                </p>

                <div className="mt-8">
                  <span className="text-xs font-semibold tracking-[0.13em] uppercase">
                    {labels.included}
                  </span>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-relaxed text-pretty"
                      >
                        <span className="bg-brand-500 mt-2 size-1.5 shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-brand-500 mt-9 border-l-2 bg-neutral-50 px-5 py-4">
                  <span className="text-brand-600 text-[11px] font-semibold tracking-[0.13em] uppercase">
                    {labels.result}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-neutral-700">
                    {service.result}
                  </p>
                </div>
              </div>

              <ServiceBlueprint service={service} index={index} labels={labels} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
