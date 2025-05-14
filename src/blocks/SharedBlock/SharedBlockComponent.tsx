import { SharedBlock1 } from "@payload-types"
import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"

const sharedBlockComponents = {
  ctaBlock: CtaBlockComponent,
}

export const SharedBlockComponent: React.FC<any> = (props) => {
  const { block, prevBlock, nextBlock } = props

  if (!block) {
    return null
  }

  const { blocks } = block as SharedBlock1

  if (!blocks || blocks.length === 0) {
    return null
  }

  const { blockType, ...rest } = blocks[0]

  if (blockType) {
    const Block = sharedBlockComponents[blockType]

    if (Block) {
      return (
        <div>
          {/*@ts-ignore*/}
          <Block {...rest} prevBlock={prevBlock} nextBlock={nextBlock} />
        </div>
      )
    }
  }
}
