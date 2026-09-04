import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { SITE } from '@/lib/seo/site'

export const alt = 'Immonation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The CI element, inlined as a data URI. Satori does not render inline <svg>
 * children reliably, so the mark has to arrive through an <img>. Read once at
 * module scope — this file only runs at build time.
 */
const MARK = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), 'public', 'brand', 'immonation-mark.svg'),
).toString('base64')}`
/** Mark aspect ratio, from the vector master's ink bounds (2440.71 × 2746.8). */
const MARK_HEIGHT = 52
const MARK_WIDTH = Math.round(MARK_HEIGHT * (2440.71 / 2746.8))

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const safeLocale = hasLocale(routing.locales, locale) ? locale : SITE.defaultLocale
  const t = await getTranslations({ locale: safeLocale, namespace: 'Site' })

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 96,
        background: 'radial-gradient(ellipse at top left, #f5f5f5 0%, #ffffff 45%, #e7e5e4 100%)',
        fontFamily: 'sans-serif',
        color: '#0a0a0a',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MARK} width={MARK_WIDTH} height={MARK_HEIGHT} alt="" />
        {t('name')}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.05,
            fontWeight: 700,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {t('tagline')}
        </div>
        <div style={{ fontSize: 28, color: '#525252' }}>{SITE.url.replace(/^https?:\/\//, '')}</div>
      </div>
    </div>,
    { ...size },
  )
}
