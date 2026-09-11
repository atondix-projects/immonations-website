'use client'

import Image from 'next/image'

export function OnOfficeImage({
  src,
  alt,
  priority = false,
  sizes,
}: {
  src: string
  alt: string
  priority?: boolean
  sizes: string
}) {
  return (
    <Image
      loader={({ src: source }) => source}
      unoptimized
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
    />
  )
}
