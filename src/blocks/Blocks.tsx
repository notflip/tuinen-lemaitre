import { blockComponents, BlocksProps, BlockType } from "@/blocks/types"
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
            const Block = blockComponents[blockType as BlockType]

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
}

export default Blocks
