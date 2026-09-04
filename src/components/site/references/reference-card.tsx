import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { ReferenceItem } from '@/lib/content/references'

export function ReferenceCard({
  item,
  label,
  featured = false,
}: {
  item: ReferenceItem
  label: string
  featured?: boolean
}) {
  return (
    <Link
      id={item.id}
      href={{ pathname: '/references/[slug]', params: { slug: item.id } }}
      className={`group relative isolate block min-h-[320px] scroll-mt-28 overflow-hidden bg-neutral-900 md:min-h-[380px] ${featured ? 'md:col-span-2 lg:min-h-[440px]' : ''}`}
    >
      <Image
        src={item.image}
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
          {label}
        </span>
        <h3 className="max-w-[24ch] font-serif text-2xl leading-tight font-semibold text-balance text-white md:text-[28px]">
          {item.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/78">
          <span>{item.type}</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
            {item.location}
            {item.area !== item.location ? ` · ${item.area}` : ''}
          </span>
        </div>
        <span className="text-xs text-white/65">{item.feature}</span>
      </div>
    </Link>
  )
}
