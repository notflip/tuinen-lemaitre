import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"
import { SharedBlockComponent } from "@/blocks/SharedBlock/SharedBlockComponent"

export const blockComponents = {
  ctaBlock: CtaBlockComponent,
  shared: SharedBlockComponent,
} as const

export type BlockType = keyof typeof blockComponents

export interface SharedBlockProps {
  blockIndex?: number
  prevBlock?: any
  nextBlock?: any
}

export type BlockComponentType = React.ComponentType<SharedBlockProps & { [key: string]: any }>

export interface BlockItem {
  blockType: BlockType
  [key: string]: any
}

export interface BlocksProps {
  blocks?: BlockItem[] | null
}
