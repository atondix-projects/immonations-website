import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'
import { TextPage, type TextSection } from './text-page'

type LegalNamespace = 'LegalImprint' | 'LegalPrivacy' | 'LegalTerms'

/**
 * Shared body for the text-only legal routes (Impressum, Datenschutz, AGB).
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
      />
    </>
  )
}
