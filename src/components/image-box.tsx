import type { Media } from "@payload-types"
import Image from "next/image"
import React from "react"

interface ImageBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: boolean
  lazyload?: boolean
  objectFit?: any
  objectPosition?: any
  media?: Media | number | null
  quality?: number
  sizes?: string
  disableBlurhash?: boolean
  caption?: string
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  media,
  fill,
  sizes,
  objectFit = "cover",
  objectPosition,
  lazyload = true,
  quality = 85,
  disableBlurhash = false,
  caption,
  ...rest
}) => {
  if (!media || typeof media === "number") {
    return null
  }

  const { width: imageWidth, height: imageHeight } = media
  const width = imageWidth ?? undefined
  const height = imageHeight ?? undefined

  const setObjectPosition = objectPosition
    ? objectPosition
    : media.focalX != null && media.focalY != null
      ? `${media.focalX}% ${media.focalY}%`
      : ""

  return (
    <>
      <Image
        src={`${media.url!}?${media.updatedAt}`}
        alt={media.alt ?? ""}
        quality={quality}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        loading={lazyload ? "lazy" : "eager"}
        style={{
          objectFit,
          objectPosition: setObjectPosition,
        }}
        placeholder={!disableBlurhash && media.blurhash ? "blur" : "empty"}
        blurDataURL={(!disableBlurhash && media.blurhash) || undefined}
        className="pointer-events-none"
        {...rest}
      />
      {media.caption && (
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/50 text-white">
          {media.caption}
        </div>
      )}
    </>
  )
}
