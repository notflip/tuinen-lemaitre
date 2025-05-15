import { BlockContainer } from "@/blocks/BlockContainer"
import { Type4 } from "@/components/type4"
import { HiOutlineChat } from "react-icons/hi"
import { CommonBlockProps, BlockTypeToPayloadType } from "@/blocks/types"
import React from "react"
import Badge from "@/components/badge"

// Use the mapped type from BlockTypeToPayloadType
type CtaComponentProps = BlockTypeToPayloadType["cta"] & CommonBlockProps

export const CtaComponent: React.FC<CtaComponentProps> = (props) => {
  const { subtitle, title, text, links } = props

  return (
    <BlockContainer noPadding {...props}>
      <div className="bg-highlight bg-[url(/bg.svg)] bg-cover">
        <div className="py-24 lg:py-32 text-center">
          <div className="max-w-5xl mx-auto">
            {subtitle && <Badge text={subtitle} showIcon={false} />}
            <h1 className="my-6">{title}</h1>
            <p>{text}</p>
          </div> 
          <div className="mt-6 lg:inline-flex lg:flex-wrap lg:gap-4 space-y-2 lg:space-y-0">
            {(links || []).map(({ link }, i: number) => {
              if (i === 0) {
                return (
                  <Type4 key={i} link={link} variant="foreground">
                    {link?.label ?? ""}
                  </Type4>
                )
              } else {
                return (
                  <Type4 key={i} link={link} variant="light">
                    {link?.label ?? ""}
                  </Type4>
                )
              }
            })}
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
