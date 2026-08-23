import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { WithdrawalForm } from '@/components/site/withdrawal-form'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'
import { TextPage, type TextSection } from './text-page'

type LegalNamespace = 'LegalImprint' | 'LegalPrivacy' | 'LegalTerms' | 'LegalWithdrawal'

type RelatedLink = {
  href: '/terms'
  label: string
}

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

/**
 * Shared body for the text-only legal routes (Impressum, Datenschutz, AGB, Widerruf).
 * Each route file owns its own generateMetadata; this handles content + breadcrumb.
 */
export async function LegalPage({
  locale,
  namespace,
  internalPath,
}: {
  locale: 'de' | 'en'
  namespace: LegalNamespace
  internalPath: '/imprint' | '/privacy' | '/terms'
}) {
  const t = await getTranslations(namespace)
  const nav = await getTranslations('Nav')
  const sections = t.raw('sections') as TextSection[]
  const publicPath = localizePath(internalPath, locale)
  const relatedLink = namespace === 'LegalWithdrawal' ? (t.raw('relatedLink') as RelatedLink) : null
  const form = namespace === 'LegalWithdrawal' ? (t.raw('form') as WithdrawalFormCopy) : null
  const pdfHref =
    namespace === 'LegalWithdrawal'
      ? locale === 'de'
        ? '/legal/muster-widerrufsformular.pdf'
        : '/legal/model-withdrawal-form.pdf'
      : null

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: nav('home'), url: `${SITE.url}/${locale}` },
          { name: t('title'), url: `${SITE.url}/${locale}${publicPath}` },
        ])}
      />
      <TextPage
        eyebrow={t('eyebrow')}
        title={t('title')}
        lede={t('lede')}
        sections={sections}
        note={t('note')}
        afterSections={
          <>
            {form && pdfHref ? (
              <div className="pt-2">
                <WithdrawalForm copy={form} pdfHref={pdfHref} />
              </div>
            ) : null}
            {relatedLink ? (
              <p>
                <Link
                  href={relatedLink.href}
                  className="text-brand-600 text-[16px] font-medium underline-offset-4 hover:underline"
                >
                  {relatedLink.label}
                </Link>
              </p>
            ) : null}
          </>
        }
      />
    </>
  )
}
