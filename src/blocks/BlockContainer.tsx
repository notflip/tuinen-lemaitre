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
  noPadding?: boolean
}

export const BlockContainer: React.FC<BlockContainerProps> = (props) => {
  const { blockType, children, bgColor, className, nextBlock, prevBlock, noPadding } = props

  return (
    <section className={cn("relative my-24 lg:my-32", bgColor || noPadding ? "my-0!" : "", className)}>
      <div
        className={`${!noPadding ? "px-4 md:px-12 2xl:px-16" : ""} ${bgColor} ${!bgColor  && !noPadding? "mx-auto max-w-screen-2xl" : ""}`}
      >
        {children}
      </div>
    </section>
  )
}
