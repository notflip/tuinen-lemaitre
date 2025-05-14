import { SharedBlock1 } from "@payload-types"
import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"
import { CommonBlockProps, BlockTypeToPayloadType } from "@/blocks/types"
import React from "react"

const sharedBlockComponents = {
  ctaBlock: CtaBlockComponent,
} as const

type SharedBlockComponentProps = BlockTypeToPayloadType['shared'] & CommonBlockProps

export const SharedBlockComponent: React.FC<SharedBlockComponentProps> = (props) => {
  const { block, prevBlock, nextBlock } = props

  if (!block) {
    return null
  }

  const { blocks } = block as SharedBlock1

  if (!blocks || blocks.length === 0) {
    return null
  }

  const { blockType, ...rest } = blocks[0]

  if (blockType && blockType in sharedBlockComponents) {
    const Block = sharedBlockComponents[blockType as keyof typeof sharedBlockComponents]

    if (Block) {
      return (
        <div>
          <Block 
            {...rest} 
            blockType={blockType}
            prevBlock={prevBlock} 
            nextBlock={nextBlock} 
          />
        </div>
      )
    }
  }
  
  return null
}
