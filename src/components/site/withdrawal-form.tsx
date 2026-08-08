import { Download } from 'lucide-react'

type WithdrawalFormCopy = {
  title: string
  instruction: string
  recipient: string
  declaration: string
  orderedReceived: string
  consumerName: string
  consumerAddress: string
  signature: string
  date: string
  footnote: string
  downloadLabel: string
  downloadHint: string
}

function FillLine({ className = 'w-full' }: { className?: string }) {
  return <span aria-hidden className={`mt-2 block border-b border-foreground/70 ${className}`} />
}

/**
 * Printable model withdrawal form (Muster-Widerrufsformular).
 * Presentational on-page; consumers can also download a fillable PDF.
 */
export function WithdrawalForm({
  copy,
  pdfHref,
}: {
  copy: WithdrawalFormCopy
  pdfHref: string
}) {
  return (
    <div className="rounded-sm border border-border/70 bg-background px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-brand-600 text-xl font-semibold tracking-tight sm:text-2xl">
            {copy.title}
          </h2>
          <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed">
            {copy.instruction}
          </p>
        </div>
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-600 hover:bg-brand-700 inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-sm px-4 py-2.5 text-sm font-medium text-white transition-colors"
        >
          <Download className="size-4" aria-hidden />
          {copy.downloadLabel}
        </a>
      </div>

      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{copy.downloadHint}</p>

      <p className="mt-8 text-[16px] leading-relaxed">{copy.recipient}</p>

      <p className="mt-8 text-[16px] leading-relaxed">{copy.declaration}</p>
      <FillLine className="mt-6 w-full max-w-[36rem]" />

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <p className="text-[16px] leading-relaxed">{copy.orderedReceived}</p>
          <FillLine className="mt-3 max-w-[22rem]" />
        </div>
        <div>
          <p className="text-[16px] leading-relaxed">{copy.consumerName}</p>
          <FillLine className="mt-3 max-w-[28rem]" />
        </div>
        <div>
          <p className="text-[16px] leading-relaxed">{copy.consumerAddress}</p>
          <FillLine className="mt-3 w-full max-w-[36rem]" />
          <FillLine className="mt-5 w-full max-w-[36rem]" />
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-8">
        <p className="text-[16px] leading-relaxed">{copy.signature}</p>
        <div>
          <p className="text-[16px] leading-relaxed">{copy.date}</p>
          <FillLine className="mt-3 max-w-[14rem]" />
        </div>
      </div>

      <p className="text-muted-foreground mt-10 text-sm leading-relaxed">{copy.footnote}</p>
    </div>
  )
}
