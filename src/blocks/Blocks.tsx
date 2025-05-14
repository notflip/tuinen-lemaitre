import { blockComponents, BlocksProps, BlockType, BlockComponentType } from "@/blocks/types"
import React from "react"

const Blocks: React.FC<BlocksProps> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            // Use the generic parameter to ensure type safety
            const Block = blockComponents[blockType] as BlockComponentType<typeof blockType>

            if (Block) {
              return index === 0 ? (
                <div key={index} className="pt-16 lg:pt-24">
                  <Block
                    blockIndex={index}
                    {...block}
                    prevBlock={blocks[index - 1]}
                    nextBlock={blocks[index + 1]}
                  />
                </div>
              ) : (
                <Block
                  key={index}
                  blockIndex={index}
                  {...block}
                  prevBlock={blocks[index - 1]}
                  nextBlock={blocks[index + 1]}
                />
              )
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}

export default Blocks
