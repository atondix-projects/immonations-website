'use client'

import type { ReactNode } from 'react'
import { Video } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ImmonationMark } from '@/components/site/brand/immonation-mark'
import { VideoDialog, type VideoCaptionTrack } from '@/components/site/video-dialog'
import { cn } from '@/lib/utils'

export type HeroIntroVideoMedia = {
  src: string
  poster: string
  width: number
  height: number
  captions?: readonly VideoCaptionTrack[]
  transcript?: ReactNode
}

export function HeroIntroVideo({
  media,
  className,
}: {
  media?: HeroIntroVideoMedia
  className?: string
}) {
  const t = useTranslations('Home.hero')
  const tDialog = useTranslations('VideoDialog')

  if (!media) {
    return (
      <div
        className={cn(
          'relative aspect-video overflow-hidden border border-white/15 bg-white/[0.055] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_60px_-36px_rgba(0,0,0,0.9)] backdrop-blur-xl',
          className,
        )}
        aria-label={`${t('videoLabel')}: ${t('videoPending')}`}
        data-hero-video="placeholder"
      >
        <ImmonationMark className="absolute -right-[4%] -bottom-[42%] h-[135%] max-w-none opacity-[0.12]" />
        <div className="from-brand-800/45 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent" />
        <div className="relative flex size-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <p className="text-brand-200 text-[10px] font-semibold tracking-[0.18em] uppercase">
              {t('videoLabel')}
            </p>
            <span className="flex size-9 shrink-0 items-center justify-center border border-white/15 bg-black/15 text-white/75">
              <Video className="size-4" aria-hidden="true" />
            </span>
          </div>
          <p className="max-w-[18ch] font-serif text-lg leading-tight font-medium text-balance sm:text-xl">
            {t('videoPending')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <VideoDialog
      src={media.src}
      poster={media.poster}
      width={media.width}
      height={media.height}
      title={t('videoTitle')}
      fallback={t('videoFallback')}
      labels={{
        play: tDialog('play'),
        close: tDialog('close'),
        transcript: tDialog('transcript'),
      }}
      captions={media.captions}
      transcript={media.transcript}
      preview="loop"
      className={cn('aspect-video w-full', className)}
      posterSizes="(min-width: 1280px) 280px, (min-width: 1024px) 410px, 100vw"
      overlay={
        <span className="absolute inset-x-0 bottom-0 z-10 p-4 text-left sm:p-5">
          <span className="text-brand-200 block text-[10px] font-semibold tracking-[0.18em] uppercase">
            {t('videoLabel')}
          </span>
        </span>
      }
    />
  )
}
