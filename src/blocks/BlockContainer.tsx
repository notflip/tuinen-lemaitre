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

  // If shared block, fetch the bgColor
  if (prevBlock?.blockType === "shared") {
    prevBlock.bgColor = prevBlock.block.blocks[0].bgColor
  }
  if (nextBlock?.blockType === "shared") {
    nextBlock.bgColor = nextBlock.block.blocks[0].bgColor
  }

  return (
    <section
      className={cn(
        "relative py-sm lg:py-lg",
        // bgColor && blockType !== "hero" && prevBlock?.blockType !== "image" && !prevBlock?.bgColor
        //   ? "mt-sm lg:mt-lg py-lg lg:py-xl"
        //   : "",
        bgColor && nextBlock?.bgColor && nextBlock?.bgColor !== bgColor && blockType !== "hero"
          ? "pb-lg lg:pb-xl"
          : "",
        // bgColor && prevBlock?.bgColor !== bgColor ? "pt-lg lg:pt-xl" : "",
        bgColor ? bgColorMap[bgColor] : "",
        // Add top margin if bgColor and previous does not, or vice versa
        bgColor && prevBlock?.blockType !== "image" && !prevBlock?.bgColor ? "mt-sm lg:mt-lg" : "",
        !bgColor && blockType !== "image" && prevBlock?.bgColor ? "mt-sm lg:mt-lg" : "",
        // Skip top padding for some components following the hero
        (blockType === "image" || blockType === "cases" || blockType === "contactForm") &&
          prevBlock?.blockType === "hero"
          ? "pt-0 lg:pt-0"
          : "",
        // Skip top padding for paragraph and cards
        blockType === "cards" && prevBlock?.blockType === "paragraph" ? "pt-0 lg:pt-0" : "",
        // blockType === "image" ? "pb-0 lg:pb-0" : "",
        className,
      )}
    >
      {/* <div>
        <pre>block: {JSON.stringify(blockType)}</pre>
        <pre>currColor: {JSON.stringify(bgColor)}</pre>
        <pre>nextColor: {JSON.stringify(nextBlock?.bgColor)}</pre>
      </div> */}
      <div className={`${!fullWidth ? "mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16" : ""}`}>
        {children}
      </div>
    </section>
  )
}
