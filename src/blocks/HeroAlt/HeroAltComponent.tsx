import { BlockContainer } from "@/blocks/BlockContainer"
import { ImageBox } from "@/components/image-box"
import { Type4 } from "@/components/type4"
import { HeroAlt, Process } from "@payload-types"

export const HeroAltComponent: React.FC<HeroAlt> = (props) => {
  const { title, content, image, links } = props

  return (
    <BlockContainer {...props}>
      <div className="mb-16 lg:flex justify-between items-top">
        <h2 className="max-w-lg">{title}</h2>
        <div className="mt-8 lg:mt-0 lg:w-5/12 lg:ml-auto">
          <p>{content}</p>
          {links?.length ? (
            <div className="mt-8 md:inline-flex md:flex-wrap md:gap-2 space-y-2 md:space-y-0">
              {(links || []).map(({ link }, i) => {
                if (!link) return null
                return (
                  <Type4 key={i} link={link} variant={i !== 0 ? "link" : "default"}>
                    {link.label}
                  </Type4>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div>
        {image && (
          <div className="relative h-[400px] lg:h-[500px]">
            <ImageBox
              fill
              className="rounded-lg"
              media={image}
              sizes="(max-width: 639px) 375px, (max-width: 767px) 500px, (max-width: 1023px) 768px, 1920px"
            />
          </div>
        )}
      </div>
    </BlockContainer>
  )
}
