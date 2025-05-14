import { Hero } from "@payload-types"
import { cn } from "@/lib/utils"
import { HiOutlineChat } from "react-icons/hi"
import Breadcrumbs from "@/components/breadcrumbs"
import { BlockContainer } from "@/blocks/BlockContainer"
import { SharedBlockProps } from "@/blocks/types"
import { Type4 } from "@/components/interface/Type4"

export const HeroComponent: React.FC<Hero & SharedBlockProps> = (props) => {
  const { title, content, links, textAlign, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="flex items-center">
        <div
          className={cn("max-w-4xl", {
            "mx-auto text-center": textAlign === "center",
          })}
        >
          <div
            className={cn(
              "mb-8",
              bgColor && bgColor === "black" ? `text-white` : "text-foreground",
            )}
          >
            <Breadcrumbs textAlign={textAlign} />
          </div>
          <h1
            className={cn(
              "mb-12",
              bgColor && bgColor === "black" ? `text-white` : "text-foreground",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "max-w-prose text-base",
              { "mx-auto": textAlign === "center" },
              bgColor && bgColor === "black" ? `text-white` : "text-muted-foreground",
            )}
          >
            {content}
          </p>
          {links?.length ? (
            <div className="mt-8 lg:inline-flex lg:flex-wrap lg:gap-2 space-y-2 lg:space-y-0">
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
          ) : null}
        </div>
      </div>
    </BlockContainer>
  )
}
