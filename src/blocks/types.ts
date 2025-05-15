import { CardsComponent } from "@/blocks/Cards/CardsComponent"
import { CtaBlockComponent } from "@/blocks/CtaBlock/CtaBlockComponent"
import { FeatureComponent } from "@/blocks/Feature/FeatureComponent"
import { HeroComponent } from "@/blocks/Hero/HeroComponent"
import { ProjectsComponent } from "@/blocks/Projects/ProjectsComponent"
import { SharedBlockComponent } from "@/blocks/SharedBlock/SharedBlockComponent"
import { Cards, CtaBlock, Feature, Hero, Projects, SharedBlock } from "@payload-types"

export const blockComponents = {
  hero: HeroComponent,
  feature: FeatureComponent,
  cards: CardsComponent,
  projects: ProjectsComponent,
  ctaBlock: CtaBlockComponent,
  shared: SharedBlockComponent,
} as const

export type BlockType = keyof typeof blockComponents

export interface CommonBlockProps {
  blockIndex?: number
  prevBlock?: BlockItem | undefined
  nextBlock?: BlockItem | undefined
}

// Map block types to their respective payload types
export type BlockTypeToPayloadType = {
  hero: Hero
  feature: Feature
  cards: Cards
  projects: Projects
  ctaBlock: CtaBlock
  shared: SharedBlock
}

// A more specific BlockItem type that knows about the structure of each block type
export type BlockItem = {
  [K in BlockType]: {
    blockType: K
  } & BlockTypeToPayloadType[K]
}[BlockType]

// Type for the component that renders a specific block type
export type BlockComponentType<T extends BlockType = BlockType> = React.ComponentType<
  CommonBlockProps & BlockTypeToPayloadType[T]
>

export interface BlocksProps {
  blocks?: BlockItem[] | null
}
