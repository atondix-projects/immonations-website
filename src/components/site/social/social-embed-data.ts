import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import {
  formatSocialViews,
  getSocialChannel,
  type LocalizedSocialPost,
  type SocialEmbed,
  type SocialThumbnail,
} from '@/lib/content/social-channels'
import type { SocialEmbedLabels } from './social-embed-tile'

/**
 * Ein Beitrag in der Form, die eine Client-Komponente entgegennehmen kann:
 * alle Beschriftungen bereits übersetzt, keine Funktionen. Props über die
 * Server-/Client-Grenze müssen serialisierbar sein.
 */
export type SocialEmbedItem = {
  id: string
  platform: string
  platformName: string
  href: string
  embed: SocialEmbed | null
  thumbnail?: SocialThumbnail
  label: string
  views: string
  /** Sortierwert — die Rangfolge ist plattformübergreifend. */
  viewCount: number
  labels: SocialEmbedLabels
}

/**
 * Übersetzt die Beiträge einmal auf dem Server. Beiträge ohne auflösbaren Kanal
 * fallen heraus, statt mit dem rohen Plattformschlüssel beschriftet zu werden.
 */
export async function buildSocialEmbedItems(
  posts: readonly LocalizedSocialPost[],
  locale: Locale,
): Promise<SocialEmbedItem[]> {
  const t = await getTranslations('SocialEmbed')

  return posts.flatMap((post) => {
    const channel = getSocialChannel(post.platform, locale)
    if (!channel) return []

    const platform = channel.name
    const labels: SocialEmbedLabels = {
      views: t('views'),
      play: t('play'),
      playAria: t('playAria', { platform }),
      watchOn: t('watchOn', { platform }),
      thumbnailAlt: t('thumbnailAlt', { label: post.label, platform }),
      consentNote: t('consentNote', { platform }),
      lightbox: {
        close: t('lightbox.close'),
        loading: t('lightbox.loading'),
        failedTitle: t('lightbox.failedTitle'),
        failedLink: t('lightbox.failedLink', { platform }),
        openOriginal: t('lightbox.openOriginal', { platform }),
        views: t('views'),
        consentActive: t('lightbox.consentActive', { platform }),
      },
    }

    return [
      {
        id: post.id,
        platform: post.platform,
        platformName: platform,
        href: post.url,
        embed: post.embed,
        thumbnail: post.thumbnail,
        label: post.label,
        views: formatSocialViews(post.views, locale),
        viewCount: post.views,
        labels,
      },
    ]
  })
}
