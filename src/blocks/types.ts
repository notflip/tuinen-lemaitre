import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"
import { SharedBlockComponent } from "@/blocks/SharedBlock/SharedBlockComponent"

export const blockComponents = {
  ctaBlock: CtaBlockComponent,
  shared: SharedBlockComponent,
} as const

export type BlockType = keyof typeof blockComponents

export interface CommonBlockProps {
  blockIndex?: number
  prevBlock?: BlockItem | undefined
  nextBlock?: BlockItem | undefined
}

export type BlockComponentType = React.ComponentType<CommonBlockProps & { [key: string]: any }>

export interface BlockItem {
  blockType: BlockType
  [key: string]: any
}

export interface BlocksProps {
  blocks?: BlockItem[] | null
}
