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

export const bgColorMap: Record<string, string> = {
  beige: "bg-beige-50",
  gray: "bg-slate-50",
  blue: "bg-blue-600",
  black: "bg-blue-950",
}

export const BlockContainer: React.FC<BlockContainerProps> = (props) => {
  const { blockType, children, bgColor, className, nextBlock, prevBlock, fullWidth } = props

  // If prev or next is a shared block, fetch the bgColor
  //   if (prevBlock?.blockType === "shared") {
  //     prevBlock.bgColor = prevBlock.block.blocks[0].bgColor
  //   }
  //   if (nextBlock?.blockType === "shared") {
  //     nextBlock.bgColor = nextBlock.block.blocks[0].bgColor
  //   }

  return (
    <section className={cn("relative py-sm lg:py-lg", className)}>
      {/* <div>
        <pre>block: {JSON.stringify(blockType)}</pre>
        <pre>currColor: {JSON.stringify(bgColor)}</pre>
        <pre>nextColor: {JSON.stringify(nextBlock?.bgColor)}</pre>
      </div> */}
      <div
        className={`${!fullWidth ? "mx-auto max-w-(--breakpoint-2xl) px-4 md:px-12 2xl:px-16" : ""}`}
      >
        {children}
      </div>
    </section>
  )
}
