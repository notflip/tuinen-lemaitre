import { Feature, Media } from "@payload-types"
import { ImageBox } from "@/components/ImageBox"
import { cn } from "@/lib/utils"
import RichText from "@/components/RichText"
import Badge from "@/components/badge"
import { BlockContainer } from "@/blocks/BlockContainer"
import { SharedBlockProps } from "@/blocks/types"
import VideoPlayer from "@/components/video-player"

export const FeatureComponent: React.FC<Feature & SharedBlockProps> = (props) => {
  const { subtitle, title, content, mediaType, video, image, imageNoFill, variant, blockIndex } =
    props

  return (
    <BlockContainer>
      <div
        className={cn("flex flex-col lg:flex-row items-stretch justify-between gap-8", {
          "lg:flex-row-reverse": variant === "imageLeft",
        })}
      >
        <div className="relative order-2 lg:w-1/2 lg:order-1 ">
          {mediaType === "image" && image && (
            <div className="h-[400px] lg:h-auto lg:min-h-[300px] lg:max-h-[600px] w-full lg:max-w-[42rem]">
              <ImageBox
                fill
                media={image}
                sizes="(max-width: 1024px) 100vw, 40vw"
                objectFit="contain"
                className="rounded-[16px]"
              />
            </div>
          )}
          {mediaType === "video" && video && typeof video !== "number" && (
            <VideoPlayer video={video} />
          )}
        </div>
        <div className="w-full lg:w-1/2 lg:max-w-xl">
          {subtitle && (
            <div className="mb-8">
              <Badge text={subtitle} />
            </div>
          )}
          {blockIndex === 0 ? <h1 className="mb-8">{title}</h1> : <h2 className="mb-8">{title}</h2>}
          {content && <RichText data={content} />}
        </div>
      </div>
    </BlockContainer>
  )
}
