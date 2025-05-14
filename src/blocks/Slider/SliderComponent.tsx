import { Slider } from "@payload-types"
import { Slider as SliderEl } from "@/components/slider"
import Badge from "@/components/badge"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { CmsLink } from "@/components/CmsLink"
import { BlockContainer } from "@/blocks/BlockContainer"

export const SliderComponent: React.FC<Slider> = (props) => {
  const { title, subtitle, items, links, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} className="overflow-x-hidden" {...props}>
      <div className="lg:flex lg:justify-between lg:items-center">
        <div className="max-w-4xl">
          {subtitle && (
            <div className="mb-8">
              <Badge text={subtitle} />
            </div>
          )}
          <h2 className="mb-6">{title}</h2>
        </div>
        <div>
          {links?.length ? (
            <div className="mt-8 inline-flex flex-wrap gap-2">
              {(links || []).map(({ link }, i) => (
                <AnimatedButton variant="light" key={i} asChild>
                  <CmsLink {...link} />
                </AnimatedButton>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-[5rem]">
        <SliderEl items={items ?? []} />
      </div>
    </BlockContainer>
  )
}
