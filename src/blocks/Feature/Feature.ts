import { InlineCards } from "@/blocks/InlineCards/InlineCards"
import {
  BlocksFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical"
import type { Block } from "payload"

export const Feature: Block = {
  slug: "feature",
  interfaceName: "Feature",
  fields: [
    {
      name: "subtitle",
      type: "text",
      admin: {
        description:
          "Indien dit ingevuld is, komt deze kleine titel boven de hoofd titel in een kader staan",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "richText",
      name: "content",
      label: "Content",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({
            enabledHeadingSizes: ["h4", "h5"],
          }),
          BlocksFeature({ blocks: [InlineCards] }),
        ],
      }),
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "variant",
      type: "select",
      defaultValue: "imageLeft",
      options: [
        {
          label: "Image Left",
          value: "imageLeft",
        },
        {
          label: "Image Right",
          value: "imageRight",
        },
      ],
    },
  ],
}
export default Feature
