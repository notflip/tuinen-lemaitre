import { InlineCards } from "@/blocks/InlineCards/InlineCards"
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  lexicalEditor,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical"
import { Field } from "payload"

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
        BlocksFeature({ blocks: [InlineCards] }),
        UnorderedListFeature(),
        // EXPERIMENTAL_TableFeature(),
      ]
    },
  }),
})
