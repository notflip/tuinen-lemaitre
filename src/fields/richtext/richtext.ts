import { InlineButton } from "@/blocks/InlineButton/InlineButton"
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  lexicalEditor,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical"
// import { MediaBlock } from "@/blocks/MediaBlock/MediaBlock"
import { Field } from "payload"
// import { InlineListBlock } from "@/blocks/InlineListBlock"

type Props = {
  name: string
  label: string
  admin?: any
}

export const richTextField = ({ name, label, admin = {} }: Props): Field => ({
  type: "richText",
  name,
  label,
  admin,
  editor: lexicalEditor({
    features: () => {
      return [
        UploadFeature(),
        HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
        // BlocksFeature({ blocks: [MediaBlock, InlineListBlock] }),
        BlocksFeature({ blocks: [InlineButton] }),
        UnorderedListFeature(),
        EXPERIMENTAL_TableFeature(),
      ]
    },
  }),
})
