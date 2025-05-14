import { ImageBox } from "@/components/ImageBox"
import { Media } from "@payload-types"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { CmsLink, CmsLinkType } from "@/components/CmsLink"

type CardProps = {
  title: string
  text: string
  image: number | Media
  link?: React.ReactNode
  cmsLinks?: Array<CmsLinkType>
}

export const Card: React.FC<CardProps> = (props) => {
  const { title, image, text, cmsLinks, link } = props

  return (
    <div className="bg-secondary rounded-[20px] overflow-hidden">
      {image && (
        <div className="relative h-[24rem]">
          <ImageBox
            fill
            media={image}
            sizes="(max-width: 1024px) 100vw, 30vw"
          />
        </div>
      )}
      <div className="p-10">
        <div>
          <h3 className="h4 pb-4">{title}</h3>
          <p className="pb-6">{text}</p>
        </div>
        {link && <div>{link}</div>}
        {cmsLinks &&
          cmsLinks.map((cmsLink, i) => (
            <AnimatedButton asChild key={i}>
              <CmsLink key={i} {...cmsLink} />
            </AnimatedButton>
          ))}
      </div>
    </div>
  )
}
