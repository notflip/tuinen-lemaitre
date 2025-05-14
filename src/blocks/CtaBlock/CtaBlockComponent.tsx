import { BlockContainer } from "@/blocks/BlockContainer"
import Avatars from "@/components/avatars"
import { CmsLink } from "@/components/CmsLink"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { Type4 } from "@/components/interface/Type4"
import { CtaBlock } from "@payload-types"
import { HiOutlineChat } from "react-icons/hi"

export const CtaBlockComponent: React.FC<CtaBlock> = (props) => {
  const { subtitle, title, text, bgColor, links } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          {subtitle && <p className="mb-4 text-white/40">{subtitle}</p>}
          <h2 className="text-white mb-6">{title}</h2>
          <p className="text-white md:text-md">{text}</p>
        </div>
        <div className="mt-6 lg:inline-flex lg:flex-wrap lg:gap-4 space-y-2 lg:space-y-0">
          {(links || []).map(({ link }, i) => {
            if (i === 0) {
              return (
                <Type4 key={i} link={link}>
                  {link.label}
                  <HiOutlineChat />
                </Type4>
              )
            } else {
              return (
                <Type4 key={i} link={link} variant="light" avatars>
                  {link.label}
                </Type4>
              )
            }
          })}
        </div>
      </div>
    </BlockContainer>
  )
}
