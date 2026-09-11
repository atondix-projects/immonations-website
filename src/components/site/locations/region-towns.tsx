import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { ReferenceItem } from '@/lib/content/references'

/** Verkaufsreferenzen außerhalb der fünf Regionsseiten, je mit Link zur Fallstudie. */
export function RegionTowns({ references }: { references: ReferenceItem[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {references.map((item) => (
        <li key={item.id}>
          <Link
            href={{ pathname: '/references/[slug]', params: { slug: item.id } }}
            className="group border-border hover:border-brand-700/40 hover:bg-muted/55 flex h-full items-center gap-4 border p-3 pr-5 transition-colors"
          >
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden bg-neutral-200">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="80px"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>
            <div className="min-w-0">
              <p className="text-brand-700 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">
                {item.city}
              </p>
              <p className="mt-1 line-clamp-2 font-serif text-lg leading-snug font-semibold text-balance">
                {item.title}
              </p>
              <p className="text-muted-foreground mt-1 text-[13px]">{item.type}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
