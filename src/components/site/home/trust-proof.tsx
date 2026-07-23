import { getTranslations } from 'next-intl/server'
import { CONTAINER } from './section-shell'

type ProofItem = { value: string; label: string }

export async function TrustProof() {
  const t = await getTranslations('Home')
  const proof = t.raw('proof.items') as ProofItem[]

  return (
    <section className="border-border bg-background border-b py-16 md:py-22">
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="text-brand-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
              {t('proof.eyebrow')}
            </p>
            <h2 className="mt-5 max-w-[17ch] font-serif text-[2rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[2.35rem] md:text-[3.35rem]">
              {t('intro.title')}
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:pt-8">
            <p className="text-muted-foreground max-w-[62ch] text-[17px] leading-[1.75]">
              {t('intro.p1')}
            </p>
            <p className="text-muted-foreground max-w-[62ch] text-[17px] leading-[1.75]">
              {t('intro.p2')}
            </p>
          </div>
        </div>

        <dl className="border-border mt-14 grid grid-cols-2 border-y md:mt-20 lg:grid-cols-4">
          {proof.map((item, index) => (
            <div
              key={item.label}
              className="border-border flex min-h-36 flex-col justify-end border-b p-5 last:border-b-0 odd:border-r lg:min-h-44 lg:border-r lg:border-b-0 lg:p-7 lg:last:border-r-0"
            >
              <dd className="font-serif text-3xl font-medium tracking-[-0.02em] tabular-nums md:text-[2.8rem]">
                {item.value}
              </dd>
              <dt className="text-muted-foreground mt-2 max-w-[20ch] text-xs leading-snug md:text-sm">
                {item.label}
              </dt>
              <span className="sr-only">{index + 1}</span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
