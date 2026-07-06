import { getTranslations } from 'next-intl/server'
import { BadgeCheck } from 'lucide-react'
import { CONTAINER, EYEBROW, SECTION_TITLE } from './section-shell'
import { VideoEmbed } from './video-embed'

// Imagefilm von der Live-Website; weitere Kundenfeedback-Videos hier ergänzen,
// sobald die YouTube-IDs vorliegen.
const FEATURED_VIDEO_ID = '6YEjaovRBFk'

export async function FeedbackVideos() {
  const t = await getTranslations('Home.feedback')
  const badges = t.raw('badges') as string[]

  return (
    <section id="kundenstimmen" className="bg-background scroll-mt-24 py-16 md:py-24">
      <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16`}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3.5">
            <span className={EYEBROW}>{t('eyebrow')}</span>
            <h2 className={`${SECTION_TITLE} text-balance`}>{t('title')}</h2>
          </div>
          <p className="text-muted-foreground max-w-[60ch] text-[17px] leading-[1.6]">
            {t('text')}
          </p>
          <ul className="flex flex-col gap-3">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-3">
                <BadgeCheck
                  className="text-primary size-5 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="text-[15px] font-medium">{badge}</span>
              </li>
            ))}
          </ul>
        </div>
        <VideoEmbed
          videoId={FEATURED_VIDEO_ID}
          title={t('videoTitle')}
          playLabel={t('playLabel')}
          consentNote={t('consentNote')}
        />
      </div>
    </section>
  )
}
