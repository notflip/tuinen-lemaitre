import { ImageBox } from "@/components/image-box"
import { BlockContainer } from "@/blocks/BlockContainer"
import { BlockTypeToPayloadType, CommonBlockProps } from "@/blocks/types"
import { Type4 } from "@/components/type4"
import { HiChevronRight } from "react-icons/hi2"

type HeroComponentProps = BlockTypeToPayloadType["hero"] & CommonBlockProps

export const HeroComponent: React.FC<HeroComponentProps> = (props) => {
  const { title, content, image, links } = props

  return (
    <BlockContainer>
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-8">
        <div className="relative w-full md:w-1/2 md:max-w-xl order-2 md:order-1">
          {image && (
            <div className="w-full">
              <ImageBox
                disableBlurhash
                lazyload={false}
                media={image}
                sizes="(max-width: 1024px) 100vw, 40vw"
                objectFit="contain"
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-7xl font-bold tracking-tight mb-10">{title}</h1>
          <p className="max-w-lg mb-10">{content}</p>
          {links?.length ? (
            <div className="md:inline-flex md:flex-wrap md:gap-2 space-y-2 md:space-y-0">
              {(links || []).map(({ link }, i) => {
                if (!link) return null
                return (
                  <Type4 key={i} link={link} variant={i !== 0 ? "link" : "default"}>
                    {link.label}
                    {i !== 0 && <HiChevronRight />}
                  </Type4>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </BlockContainer>
  )
}
