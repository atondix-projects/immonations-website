import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { SITE } from '@/lib/seo/site'

type OfficeHourRow = { days: string; time: string; closed?: boolean }

const DESTINATION = `${SITE.address.streetAddress}, ${SITE.address.postalCode} ${SITE.address.addressLocality}`
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(DESTINATION)}`

const EYEBROW = 'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'
const PANEL_LABEL = 'text-[11px] font-semibold tracking-[0.18em] text-neutral-600 uppercase'

/**
 * Address, opening hours, and the route hand-off. Rendered server-side on
 * purpose — hours are a primary AEO fact and must sit in the DOM as plain text.
 */
export async function OfficeVisit() {
  const t = await getTranslations('ContactPage.office')
  const rows = t.raw('hours') as OfficeHourRow[]
  const addressLines = t.raw('addressLines') as string[]

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
        <div>
          <p className={EYEBROW}>{t('eyebrow')}</p>
          <h2 className="mt-4 max-w-[16ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words hyphens-headline md:text-[3.2rem]">
            {t('title')}
          </h2>
        </div>
        <p className="text-muted-foreground max-w-[68ch] text-[16px] leading-[1.75] text-pretty">
          {t('intro')}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="border-border bg-neutral-0 flex flex-col border p-7 md:p-8">
          <MapPin className="text-brand-600 size-5" strokeWidth={1.75} aria-hidden="true" />
          <p className={`${PANEL_LABEL} mt-5`}>{t('addressLabel')}</p>
          <address className="mt-3 text-[17px] leading-[1.7] not-italic">
            {addressLines.map((line, index) => (
              <span key={line} className={index === 0 ? 'block font-semibold' : 'block'}>
                {line}
              </span>
            ))}
          </address>
          <a
            href={MAPS_DIRECTIONS}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border mt-8 inline-flex min-h-11 w-fit items-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-neutral-900 active:translate-y-px"
          >
            <Navigation className="size-4" strokeWidth={1.75} aria-hidden="true" />
            {t('routeCta')}
          </a>
        </div>

        <div className="border-border bg-neutral-0 border p-7 md:p-8">
          <Clock className="text-brand-600 size-5" strokeWidth={1.75} aria-hidden="true" />
          <p className={`${PANEL_LABEL} mt-5`}>{t('hoursLabel')}</p>
          <dl className="divide-border mt-3 divide-y">
            {rows.map((row) => (
              <div
                key={row.days}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5 first:pt-0 last:pb-0"
              >
                <dt
                  className={
                    row.closed ? 'text-muted-foreground text-[15px]' : 'text-[15px] font-semibold'
                  }
                >
                  {row.days}
                </dt>
                <dd
                  className={
                    row.closed
                      ? 'text-muted-foreground text-[15px] tabular-nums'
                      : 'text-[15px] tabular-nums'
                  }
                >
                  {row.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-border border-l-brand-600 bg-muted/45 mt-6 border border-l-2 p-6 md:p-7">
        <div className="grid gap-4 md:grid-cols-[1.35fr_auto] md:items-center md:gap-8">
          <div>
            <h3 className="text-[17px] font-semibold">{t('appointmentTitle')}</h3>
            <p className="text-muted-foreground mt-2 max-w-[70ch] text-[15px] leading-[1.7] text-pretty">
              {t('appointmentText')}
            </p>
          </div>
          <a
            href={`tel:${SITE.contact.phone.replaceAll(' ', '')}`}
            aria-label={`${t('appointmentCtaLabel')}: ${SITE.contact.phoneDisplay}`}
            className="bg-brand-600 hover:bg-brand-700 inline-flex min-h-12 w-fit items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors active:translate-y-px"
          >
            <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
            {SITE.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  )
}
