import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import type { ReferenceRecord } from '@/lib/content/references'

export function ReferenceDetailGallery({
  reference,
  locale,
}: {
  reference: ReferenceRecord
  locale: Locale
}) {
  return (
    <section
      className="border-border border-b py-10 md:py-14"
      aria-label={locale === 'de' ? 'Bildergalerie' : 'Image gallery'}
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-3 px-4 sm:px-6 lg:grid-cols-[1.45fr_0.55fr] lg:px-10">
        <figure className="relative aspect-[16/10] overflow-hidden bg-neutral-900 lg:aspect-auto lg:min-h-[560px]">
          <Image
            src={reference.media[0].src}
            alt={reference.media[0].alt[locale]}
            fill
            priority
            sizes="(min-width: 1024px) 68vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-black/55 px-4 py-3 text-xs text-white/85">
            {reference.media[0].caption[locale]}
          </figcaption>
        </figure>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {reference.media.slice(1).map((asset) => (
            <figure
              key={asset.src}
              className="relative aspect-[4/3] overflow-hidden bg-neutral-900 lg:aspect-auto lg:min-h-0"
            >
              <Image
                src={asset.src}
                alt={asset.alt[locale]}
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2 text-[11px] text-white/85">
                {asset.caption[locale]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
