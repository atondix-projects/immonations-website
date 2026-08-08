'use client'

import Image from 'next/image'
import { MousePointer2 } from 'lucide-react'
import ImageTrail, { ImageTrailItem } from '@/components/fancy/image/image-trail'
import { AnimatedNumber } from '@/components/site/animated-number'
import { cn } from '@/lib/utils'

export type TrustProofExample = {
  id: string
  title: string
  type: string
  location: string
  image: string
  badge: string
}

export type TrustProofItem = {
  value: string
  label: string
  examples: TrustProofExample[]
}

const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'] as const

export function TrustProofGrid({
  items,
  trailHint,
  exampleLabel,
}: {
  items: TrustProofItem[]
  trailHint: string
  exampleLabel: string
}) {
  return (
    <dl className="border-border mt-14 grid grid-cols-2 border-y md:mt-20 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            'group relative min-h-52 overflow-visible p-5 lg:min-h-56 lg:p-7',
            index < 2 && 'border-border border-b',
            index % 2 === 0 && 'border-border border-r',
            'lg:border-r lg:border-b-0',
            index === items.length - 1 && 'lg:border-r-0',
          )}
        >
          <ImageTrail
            aria-hidden="true"
            threshold={48}
            intensity={0.45}
            repeatChildren={2}
            baseZIndex={20}
            keyframes={{
              opacity: [0, 1, 1, 0],
              scale: [0.88, 1, 1, 0.96],
              filter: ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(2px)'],
            }}
            keyframesOptions={{
              duration: 3.6,
              opacity: { times: [0, 0.08, 0.88, 1] },
              scale: { times: [0, 0.08, 0.88, 1] },
              filter: { times: [0, 0.08, 0.88, 1] },
            }}
            className="absolute inset-0 z-20 hidden overflow-visible motion-reduce:hidden [@media(hover:hover)]:block"
          >
            {item.examples.map((example, exampleIndex) => (
              <ImageTrailItem
                key={example.id}
                className={cn(
                  'pointer-events-none w-44 rounded-xl bg-white p-1.5 text-neutral-950 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.08)]',
                  rotations[exampleIndex % rotations.length],
                )}
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-md bg-neutral-200 outline -outline-offset-1 outline-black/10">
                  <Image src={example.image} alt="" fill sizes="176px" className="object-cover" />
                </div>
                <div className="px-2 pt-2 pb-1.5">
                  <span className="text-brand-700 block truncate font-mono text-[9px] font-semibold tracking-[0.12em] uppercase">
                    {example.badge}
                  </span>
                  <p className="mt-1 truncate font-serif text-[15px] leading-tight font-semibold">
                    {example.title}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-neutral-500">
                    {example.type} · {example.location}
                  </p>
                </div>
              </ImageTrailItem>
            ))}
          </ImageTrail>

          {item.examples[0] ? (
            <div
              aria-hidden="true"
              className="absolute top-4 right-4 size-16 overflow-hidden rounded-lg shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.08)] [@media(hover:hover)]:hidden"
            >
              <Image
                src={item.examples[0].image}
                alt=""
                fill
                sizes="64px"
                className="object-cover outline -outline-offset-1 outline-black/10"
              />
            </div>
          ) : null}

          <div className="pointer-events-none relative z-10 flex h-full min-h-42 flex-col justify-between">
            <span className="text-muted-foreground group-hover:text-brand-700 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 motion-reduce:transition-none">
              <MousePointer2 aria-hidden="true" className="size-3" strokeWidth={1.8} />
              {trailHint}
            </span>
            <div>
              <dd>
                <AnimatedNumber
                  value={item.value}
                  delay={index * 0.08}
                  className="font-serif text-3xl font-medium tracking-[-0.02em] md:text-[2.8rem]"
                />
              </dd>
              <dt className="text-muted-foreground mt-2 max-w-[20ch] text-xs leading-snug md:text-sm">
                {item.label}
              </dt>
              <span className="sr-only">
                {exampleLabel}: {item.examples.map((example) => example.title).join(', ')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </dl>
  )
}
