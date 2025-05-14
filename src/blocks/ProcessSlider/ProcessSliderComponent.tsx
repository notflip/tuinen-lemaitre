import { ProcessSlider } from "@payload-types"
import { Slider as SliderEl } from "@/components/slider"
import Badge from "@/components/badge"
import { BlockContainer } from "@/blocks/BlockContainer"

export const ProcessSliderComponent: React.FC<ProcessSlider> = (props) => {
  const { title, subtitle, items } = props

  return (
    <BlockContainer className="overflow-x-hidden" {...props}>
      <div className="xl:flex xl:justify-between xl:items-top">
        {subtitle && (
          <div className="mb-8">
            <Badge text={subtitle} />
          </div>
        )}
        <div className="max-w-4xl">
          <h2 className="mb-6">{title}</h2>
        </div>
      </div>
      <div className="mt-[5rem]">
        <SliderEl cardClassname="bg-beige-50" slidesPerView={2.1} items={items ?? []} />
      </div>
    </BlockContainer>
  )
}
