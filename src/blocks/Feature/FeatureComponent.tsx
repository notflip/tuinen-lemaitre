import { ImageBox } from "@/components/image-box"
import { cn } from "@/lib/utils"
import RichText from "@/components/rich-text"
import Badge from "@/components/badge"
import { BlockContainer } from "@/blocks/BlockContainer"
import { BlockTypeToPayloadType, CommonBlockProps } from "@/blocks/types"

type HeroComponentProps = BlockTypeToPayloadType["feature"] & CommonBlockProps

export const FeatureComponent: React.FC<HeroComponentProps> = (props) => {
  const { subtitle, title, content, image, variant, blockIndex } = props

  return (
    <BlockContainer>
      <div
        className={cn("flex flex-col lg:flex-row items-stretch justify-between gap-8", {
          "lg:flex-row-reverse": variant === "imageLeft",
        })}
      >
        <div className="relative order-2 lg:w-1/2 lg:order-1">
          {image && (
            <div className="h-[400px] lg:h-auto lg:min-h-[500px] lg:max-h-[700px] w-full">
              <ImageBox
                fill
                media={image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                objectFit="cover"
                className="rounded-[16px]"
              />
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2 lg:max-w-xl">
          {subtitle && (
            <div className="mb-8">
              <Badge showIcon={false} text={subtitle} />
            </div>
          )}
          {blockIndex === 0 ? (
            <h1 className="text-6xl font-bold mb-8 tracking-tight">{title}</h1>
          ) : (
            <h2 className="text-6xl font-bold mb-8 tracking-tight ">{title}</h2>
          )}
          {content && <RichText data={content} />}
        </div>
      </div>
    </BlockContainer>
  )
}
