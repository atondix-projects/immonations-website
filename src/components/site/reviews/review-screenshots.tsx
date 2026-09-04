import Image from 'next/image'
import type { OriginalReviewScreenshot } from '@/lib/content/review-screenshots'

export function ReviewScreenshotGallery({
  screenshots,
  title,
  note,
}: {
  screenshots: OriginalReviewScreenshot[]
  title: string
  note: string
}) {
  if (screenshots.length === 0) return null

  return (
    <section className="border-border bg-muted/45 border-y py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
        <h2 className="hyphens-headline max-w-[18ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words md:text-[3.2rem]">
          {title}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {screenshots.map((item) => (
            <figure key={item.id} className="border-border bg-background border p-4">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 640px) 45vw, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="text-muted-foreground mt-3 text-xs">
                {item.reviewer}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="text-muted-foreground mt-6 max-w-[72ch] text-xs leading-relaxed text-pretty">
          {note}
        </p>
      </div>
    </section>
  )
}
