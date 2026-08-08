import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export type FaqCategoryNavItem = {
  id: string
  label: string
}

/**
 * In-page jump links for the FAQ hub. Server-rendered anchors — no client JS.
 */
export function FaqCategoryNav({
  items,
  ariaLabel,
}: {
  items: FaqCategoryNavItem[]
  ariaLabel: string
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className="border-border bg-background/95 sticky top-0 z-20 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[1320px] gap-2 overflow-x-auto px-5 py-3 sm:px-7 lg:px-12">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'text-muted-foreground hover:text-foreground hover:border-border shrink-0 border border-transparent px-3 py-2 text-sm whitespace-nowrap transition-colors',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

/** Optional footer link from page-scoped FAQ blocks back to the hub. */
export function FaqHubLink({ label, className }: { label: string; className?: string }) {
  return (
    <p className={cn('mt-8 text-sm', className)}>
      <Link
        href="/faq"
        className="text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline"
      >
        {label}
      </Link>
    </p>
  )
}
