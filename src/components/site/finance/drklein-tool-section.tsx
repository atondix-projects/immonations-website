import { getLocale, getTranslations } from 'next-intl/server'
import { drKleinEmbedUrl, getDrKleinTool, type DrKleinToolId } from '@/lib/content/drklein-tools'
import { DrKleinToolEmbed } from '@/components/site/finance/drklein-tool-embed'
import { cn } from '@/lib/utils'

/**
 * Baut die Beschriftungen serverseitig und reicht sie als reine Strings weiter —
 * über die Server/Client-Grenze dürfen keine Funktionen wandern.
 *
 * Das Zitat steht bewusst *neben* der Einbettung im Server-HTML: Es ist damit
 * indexierbar und erfüllt die Zitatpflicht von Dr. Klein auch dann, wenn der
 * Besucher das Modul nie lädt.
 */
export async function DrKleinToolSection({
  toolId,
  heading,
  text,
  className,
}: {
  toolId: DrKleinToolId
  /** Eigene Überschrift — nicht der Dr. Klein Textbaustein. */
  heading: string
  /** Eigene Einordnung, zweisprachig. */
  text: string
  className?: string
}) {
  const locale = await getLocale()
  const t = await getTranslations('DrKleinEmbed')
  const tool = getDrKleinTool(toolId)

  return (
    <article className={cn('flex flex-col gap-6', className)}>
      <div>
        <h3 className="max-w-[26ch] font-serif text-2xl leading-snug font-medium text-balance md:text-[1.9rem]">
          {heading}
        </h3>
        <p className="text-muted-foreground mt-4 max-w-[68ch] text-[16px] leading-[1.75] text-pretty">
          {text}
        </p>
        {locale === 'de' ? null : (
          <p className="text-muted-foreground mt-3 max-w-[68ch] text-[13px] leading-[1.7] text-pretty">
            {t('germanOnlyNote')}
          </p>
        )}
      </div>

      <DrKleinToolEmbed
        url={drKleinEmbedUrl(tool)}
        toolId={tool.id}
        frameHeight={tool.frameHeight}
        labels={{
          name: tool.name,
          load: t('load', { name: tool.name }),
          loading: t('loading'),
          consentNote: t('consentNote', { name: tool.name }),
          failedTitle: t('failedTitle'),
          failedLink: t('failedLink', { name: tool.name }),
        }}
      />

      {tool.quoteTitle && tool.sourceUrl ? (
        <figure className="border-brand-600 bg-muted/45 border-l-2 p-6 sm:p-8">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase">{t('quoteLabel')}</p>
          {/* Wörtlicher Textbaustein von Dr. Klein — als Zitat freigegeben, nur so verwendbar. */}
          {/* `lang="de"`: Der Textbaustein bleibt auf der englischen Seite deutsch
              (Dr. Klein gibt ihn nur woertlich frei) — WCAG 3.1.2. */}
          <blockquote cite={tool.sourceUrl} lang="de" className="mt-4">
            <p className="max-w-[62ch] font-serif text-xl leading-[1.5] text-pretty md:text-[1.35rem]">
              {tool.quoteTitle}
            </p>
            {tool.quote.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-muted-foreground mt-4 max-w-[74ch] text-[15px] leading-[1.75] text-pretty"
              >
                {paragraph}
              </p>
            ))}
          </blockquote>
          <figcaption className="text-muted-foreground mt-5 text-[13px]">
            {t('sourceLabel')}{' '}
            <cite className="not-italic">
              <a
                href={tool.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline underline-offset-4"
              >
                {tool.sourceUrl.replace('https://www.', '')}
              </a>
            </cite>
          </figcaption>
        </figure>
      ) : null}
    </article>
  )
}
