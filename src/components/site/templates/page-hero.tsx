/**
 * Light page hero for content/sub pages (no video, no dark surface).
 * Matches the About page's visual language: eyebrow, serif display title,
 * optional lede in an accent-bordered column.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede?: string
}) {
  return (
    <section className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-24">
      <div>
        <p className="text-primary text-sm font-semibold uppercase tracking-[0.16em]">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] text-balance md:text-6xl">
          {title}
        </h1>
      </div>
      {lede ? (
        <div className="border-accent flex flex-col gap-5 border-l-2 pl-6 md:pl-8">
          <p className="text-muted-foreground text-lg leading-8">{lede}</p>
        </div>
      ) : null}
    </section>
  )
}
