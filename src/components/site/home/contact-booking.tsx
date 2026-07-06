import { getTranslations } from 'next-intl/server'
import { CalendarCheck, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { SITE } from '@/lib/seo/site'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'

export async function ContactBooking() {
  const t = await getTranslations('Home.contactBooking')
  const phoneHref = `tel:${SITE.contact.phone.replace(/\s/g, '')}`

  const contactRows = [
    { icon: Phone, label: t('phoneLabel'), value: t('phoneValue'), href: phoneHref },
    {
      icon: Mail,
      label: t('emailLabel'),
      value: SITE.contact.email,
      href: `mailto:${SITE.contact.email}`,
    },
    { icon: MapPin, label: t('addressLabel'), value: t('addressValue'), href: undefined },
  ]

  return (
    <section id="kontakt" className="bg-background scroll-mt-24 py-16 md:py-24">
      <div className={`${CONTAINER} grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3.5">
            <span className={EYEBROW}>{t('eyebrow')}</span>
            <h2 className={`${SECTION_TITLE} text-balance`}>{t('title')}</h2>
          </div>
          <p className="text-muted-foreground max-w-[60ch] text-[17px] leading-[1.6]">
            {t('text')}
          </p>
          <div className="flex flex-col gap-5">
            {contactRows.map((row) => (
              <div key={row.label} className="flex items-start gap-4">
                <row.icon
                  className="text-primary mt-1 size-5 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <div className="flex flex-col">
                  <span className="text-[13px] text-neutral-600">{row.label}</span>
                  {row.href ? (
                    <a
                      href={row.href}
                      className="hover:text-primary text-[17px] font-semibold transition-colors"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className="text-[17px] font-semibold">{row.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border border-t-accent flex flex-col gap-5 border border-t-2 bg-white p-8 md:p-9">
          <CalendarCheck className="text-primary size-7" strokeWidth={1.75} aria-hidden />
          <h3 className="font-serif text-2xl leading-tight font-semibold md:text-[26px]">
            {t('bookingTitle')}
          </h3>
          <p className="text-muted-foreground text-[15px] leading-[1.55]">{t('bookingText')}</p>
          <Link
            href="/contact"
            className="bg-primary hover:bg-brand-700 px-8 py-4 text-center text-base font-medium tracking-[0.04em] text-white transition-colors"
          >
            {t('bookingCta')}
          </Link>
          <span className="text-[13px] text-neutral-600">{t('bookingNote')}</span>
        </div>
      </div>
    </section>
  )
}
