import { InlineButton } from "@/blocks/InlineButton/InlineButton"
import { link } from "@/fields/link/link"
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
          BlocksFeature({ blocks: [InlineButton] }),
        ],
      }),
    },
    {
      name: "mediaType",
      type: "radio",
      options: [
        {
          label: "Image",
          value: "image",
        },
        {
          label: "Video",
          value: "video",
        },
      ],
      defaultValue: "image",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === "image",
      },
    },
    {
      name: "video",
      label: "Video",
      type: "relationship",
      relationTo: "mux-video",
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === "video",
      },
    },
    {
      name: "imageNoFill",
      type: "checkbox",
      admin: {
        description:
          "Vink dit aan indien de afbeelding niet de grootte van de container mag opnemen, bijvoorbeeld voor screenshots",
        condition: (_, siblingData) => siblingData?.mediaType === "image",
      },
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
