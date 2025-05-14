import { BlockItem, BlockType } from "@/blocks/types"
import { cn } from "@/lib/utils"
import React from "react"

type BlockContainerProps = {
  blockType?: BlockType
  prevBlock?: BlockItem
  nextBlock?: BlockItem
  children: React.ReactNode
  bgColor?: string | null
  className?: string
  fullWidth?: boolean
}

export const BlockContainer: React.FC<BlockContainerProps> = (props) => {
  const { blockType, children, bgColor, className, nextBlock, prevBlock, fullWidth } = props

  return (
    <section className={cn("relative my-24 lg:my-32", className)}>
      <div
        className={`${!fullWidth ? "mx-auto max-w-(--breakpoint-2xl) px-4 md:px-12 2xl:px-16" : ""}`}
      >
        {children}
      </div>
    </section>
  )
}
