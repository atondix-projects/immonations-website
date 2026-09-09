import { ShieldCheck } from 'lucide-react'

export type TrademarkCertificateCopy = {
  eyebrow: string
  title: string
  text: string
  registrationLabel: string
  registration: string
}

export function TrademarkCertificate({ copy }: { copy: TrademarkCertificateCopy }) {
  return (
    <section
      id="markenschutz"
      className="border-border bg-muted/45 scroll-mt-24 border-y py-16 md:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)] lg:items-start lg:gap-16 lg:px-10">
        <div className="max-w-[64ch]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary size-5" aria-hidden="true" />
            <p className="text-primary text-[11px] font-semibold tracking-[0.18em] uppercase">
              {copy.eyebrow}
            </p>
          </div>
          <h2 className="mt-4 font-serif text-3xl leading-tight font-semibold text-balance md:text-[40px]">
            {copy.title}
          </h2>
          <p className="text-muted-foreground mt-5 text-[17px] leading-relaxed">{copy.text}</p>
        </div>

        <div className="border-border bg-background border p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-primary text-[11px] font-semibold tracking-[0.16em] uppercase">
              {copy.registrationLabel}
            </p>
            <p className="mt-3 text-lg leading-snug font-semibold">{copy.registration}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
