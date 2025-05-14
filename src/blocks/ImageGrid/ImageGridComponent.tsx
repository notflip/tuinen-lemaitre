import { BlockContainer } from "@/blocks/BlockContainer"
import { ImageBox } from "@/components/ImageBox"
import { ImageGrid } from "@payload-types"

export const ImageGridComponent: React.FC<ImageGrid> = (props) => {
  const { items, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(items || []).map((item, index) => (
          <div className="relative h-[500px] rounded-[20px] overflow-hidden" key={index}>
            <ImageBox fill media={item.image} sizes="(max-width: 767px) 100vw, 30vw" />
          </div>
        ))}
      </div>
    </BlockContainer>
  )
}
