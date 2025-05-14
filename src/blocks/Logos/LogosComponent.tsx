import { BlockContainer } from "@/blocks/BlockContainer"
import { ImageBox } from "@/components/ImageBox"
import { Logos, Media } from "@payload-types"

export const LogosComponent: React.FC<Logos> = (props) => {
  const { items, bgColor } = props

  if (!Array.isArray(items) || items.length === 0) {
    return null
  }

  return (
    <BlockContainer fullWidth className="py-xs lg:py-sm" bgColor={bgColor} {...props}>
      <div className="flex gap-(--marquee-gap) overflow-hidden">
        <div className="flex shrink-0 items-center justify-around gap-(--marquee-gap) min-w-full animate-scroll-x">
          {(items || []).map(({ image }, index) => (
            <div className="p-[calc(var(--marquee-size)/10)]" key={index}>
              <ImageBox
                className="w-(--marquee-size)"
                media={image}
                sizes="200px"
                disableBlurhash
              />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center justify-around gap-(--marquee-gap) min-w-full animate-scroll-x">
          {(items || []).map(({ image }, index) => (
            <div className="p-[calc(var(--marquee-size)/10)]" key={index}>
              <ImageBox
                className="w-(--marquee-size)"
                media={image}
                sizes="200px"
                disableBlurhash
              />
            </div>
          ))}
        </div>
      </div>
    </BlockContainer>
  )
}
