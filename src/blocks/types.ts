import { CardsComponent } from "@/blocks/Cards/CardsComponent"
import { ContactComponent } from "@/blocks/Contact/ContactComponent"
import { ContentComponent } from "@/blocks/Content/ContentComponent"
import { CtaComponent } from "@/blocks/Cta/CtaComponent"
import { FeatureComponent } from "@/blocks/Feature/FeatureComponent"
import { HeroComponent } from "@/blocks/Hero/HeroComponent"
import { HeroAltComponent } from "@/blocks/HeroAlt/HeroAltComponent"
import { ProcessComponent } from "@/blocks/Process/ProcessComponent"
import { ProjectsComponent } from "@/blocks/Projects/ProjectsComponent"
import { SharedBlockComponent } from "@/blocks/SharedBlock/SharedBlockComponent"
import { TestimonialsComponent } from "@/blocks/Testimonials/TestimonialsComponent"
import {
  Cards,
  Cta,
  Content,
  Feature,
  Hero,
  HeroAlt,
  Process,
  Projects,
  SharedBlock,
  Testimonials,
  Contact,
} from "@payload-types"

export const blockComponents = {
  hero: HeroComponent,
  heroAlt: HeroAltComponent,
  feature: FeatureComponent,
  cards: CardsComponent,
  content: ContentComponent,
  contact: ContactComponent,
  projects: ProjectsComponent,
  process: ProcessComponent,
  testimonials: TestimonialsComponent,
  cta: CtaComponent,
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
  heroAlt: HeroAlt
  feature: Feature
  cards: Cards
  content: Content
  contact: Contact,
  projects: Projects
  process: Process
  testimonials: Testimonials
  cta: Cta
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
