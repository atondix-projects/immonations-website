'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { referenceImage, type ReferenceItem } from '@/lib/content/references'

export function ReferenceGallery({
  items,
  compact = false,
  referenceLabel,
  allLabel,
  filterLabel,
}: {
  items: ReferenceItem[]
  compact?: boolean
  referenceLabel: string
  allLabel?: string
  filterLabel?: string
}) {
  const [activeType, setActiveType] = useState<string | null>(null)
  const types = [...new Set(items.map((item) => item.type))]
  const visibleItems =
    compact || !activeType ? items : items.filter((item) => item.type === activeType)

  return (
    <div>
      {!compact ? (
        <div
          className="border-border mb-8 flex flex-wrap gap-2 border-y py-4"
          aria-label={filterLabel}
        >
          <button
            type="button"
            aria-pressed={activeType === null}
            onClick={() => setActiveType(null)}
            className={cn(
              'min-h-10 border px-4 text-xs font-semibold transition-colors',
              activeType === null
                ? 'border-brand-700 bg-brand-700 text-white'
                : 'border-neutral-300 hover:border-neutral-600',
            )}
          >
            {allLabel}
          </button>
          {types.map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={activeType === type}
              onClick={() => setActiveType(type)}
              className={cn(
                'min-h-10 border px-4 text-xs font-semibold transition-colors',
                activeType === type
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-neutral-300 hover:border-neutral-600',
              )}
            >
              {type}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid auto-rows-auto gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {visibleItems.map((item, index) => {
          const featured = !compact && (index === 0 || index === 8 || index === 14)

          return (
            <Link
              key={item.id}
              id={item.id}
              href={{ pathname: '/references/[slug]', params: { slug: item.id } }}
              className={cn(
                'group relative isolate block min-h-[320px] scroll-mt-28 overflow-hidden bg-neutral-900 md:min-h-[380px]',
                featured && 'md:col-span-2 lg:min-h-[440px]',
              )}
            >
              <Image
                src={referenceImage(item.id)}
                alt={item.alt}
                fill
                sizes={
                  featured
                    ? '(min-width: 1024px) 66vw, (min-width: 768px) 100vw, 100vw'
                    : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/16 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-7">
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase">
                  {referenceLabel}
                </span>
                <h3 className="max-w-[24ch] font-serif text-2xl leading-tight font-semibold text-balance text-white md:text-[28px]">
                  {item.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/78">
                  <span>{item.type}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                    {item.location}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
