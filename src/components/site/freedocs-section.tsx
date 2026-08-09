import { getTranslations } from 'next-intl/server'
import { FREE_DOCS, type FreeDocCategory, type FreeDocId } from '@/lib/content/freedocs'
import {
  FreedocsDownloadGate,
  type FreeDocGateCopy,
  type FreeDocGateItem,
} from './freedocs-download-gate'

export async function FreedocsSection() {
  const t = await getTranslations('DownloadsPage.freedocs')

  const categories = t.raw('categories') as Record<FreeDocCategory, string>
  const documents = t.raw('documents') as Record<
    FreeDocId,
    { title: string; description: string; downloadLabel: string }
  >

  const docs: FreeDocGateItem[] = FREE_DOCS.map((doc) => {
    const copy = documents[doc.id]
    return {
      id: doc.id,
      href: doc.href,
      category: doc.category,
      title: copy.title,
      description: copy.description,
      downloadLabel: copy.downloadLabel,
    }
  })

  const gateCopy: FreeDocGateCopy = {
    eyebrow: t('gate.eyebrow'),
    emailLabel: t('gate.email'),
    emailPlaceholder: t('gate.emailPlaceholder'),
    continueLabel: t('gate.continue'),
    invalid: t('gate.invalid'),
    helper: t('gate.helper'),
    unlockedHint: t('gate.unlockedHint'),
    lockedCta: t('gate.lockedCta'),
    fileType: t('fileType'),
    categories,
  }

  return (
    <section
      id="dokumente"
      className="border-border bg-muted/45 scroll-mt-24 border-t py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <div className="max-w-[62ch]">
          <p className="text-primary text-[11px] font-semibold tracking-[0.18em] uppercase">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight font-semibold md:text-[40px]">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mt-5 text-[17px] leading-relaxed">{t('lede')}</p>
        </div>

        <div className="mt-12">
          <FreedocsDownloadGate docs={docs} copy={gateCopy} />
        </div>

        <p className="text-muted-foreground mt-10 max-w-[70ch] text-sm leading-relaxed">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  )
}
