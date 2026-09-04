import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedNumber } from '@/components/site/animated-number'
import {
  MAKLER_SIEGEL_HOME,
  MAKLER_SIEGER_PROFILE,
  PROVENEXPERT_PROFILE,
} from '@/lib/content/review-portals'

type SealCopy = {
  title: string
  text: string
  alt: string
  open: string
}

export function ReviewSeals({
  title,
  intro,
  note,
  maklersieger,
  maklersiegel,
  provenexpert,
}: {
  title: string
  intro: string
  note: string
  maklersieger: SealCopy
  maklersiegel: SealCopy
  provenexpert: SealCopy & { rating: string; basis: string }
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
        <h2 className="hyphens-headline max-w-[16ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words md:text-[3.2rem]">
          {title}
        </h2>
        <p className="text-muted-foreground mt-5 max-w-[62ch] text-[17px] leading-[1.75] text-pretty">
          {intro}
        </p>

        <div className="border-border mt-12 grid gap-px overflow-hidden border bg-neutral-300 lg:grid-cols-[1.15fr_0.9fr_1fr]">
          <a
            href={MAKLER_SIEGER_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background group focus-visible:ring-brand-700 flex flex-col justify-between gap-8 p-6 focus-visible:ring-2 focus-visible:outline-none sm:p-8"
          >
            <Image
              src="/images/reviews/maklersieger-badge.svg"
              alt={maklersieger.alt}
              width={300}
              height={100}
              unoptimized
              className="h-[72px] w-auto transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
            <div>
              <p className="text-sm font-semibold">{maklersieger.title}</p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
                {maklersieger.text}
              </p>
              <span className="text-brand-700 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                {maklersieger.open}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </a>

          <a
            href={MAKLER_SIEGEL_HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background group focus-visible:ring-brand-700 flex flex-col justify-between gap-8 p-6 focus-visible:ring-2 focus-visible:outline-none sm:p-8"
          >
            <Image
              src="/images/reviews/seals/makler-siegel.png"
              alt={maklersiegel.alt}
              width={300}
              height={282}
              className="mx-auto h-[140px] w-auto object-contain transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
            <div>
              <p className="text-sm font-semibold">{maklersiegel.title}</p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
                {maklersiegel.text}
              </p>
              <span className="text-brand-700 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                {maklersiegel.open}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </a>

          <a
            href={PROVENEXPERT_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background group focus-visible:ring-brand-700 flex flex-col justify-between gap-8 p-6 focus-visible:ring-2 focus-visible:outline-none sm:p-8"
          >
            <div>
              <div className="flex h-7 items-center gap-2.5">
                <Image
                  src="/images/reviews/portals/provenexpert.svg"
                  alt=""
                  width={28}
                  height={28}
                  unoptimized
                  className="size-7 object-contain"
                />
                <span className="text-sm font-semibold">{provenexpert.title}</span>
              </div>
              <p className="mt-6 flex items-baseline gap-2">
                <AnimatedNumber
                  value={provenexpert.rating}
                  className="font-serif text-[3.25rem] leading-none font-medium tracking-[-0.04em]"
                />
                <span className="text-muted-foreground text-sm">/ 5</span>
              </p>
              <p className="text-muted-foreground mt-2 text-sm">{provenexpert.basis}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                {provenexpert.text}
              </p>
              <span className="text-brand-700 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                {provenexpert.open}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </div>
          </a>
        </div>

        <p className="text-muted-foreground mt-5 max-w-[72ch] text-xs leading-relaxed text-pretty">
          {note}
        </p>
      </div>
    </section>
  )
}
