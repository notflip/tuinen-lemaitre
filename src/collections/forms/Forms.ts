import { Block, CollectionConfig } from "payload"
import { fields } from "./fields"
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical"
import { InlineButton } from "@/blocks/InlineButton/InlineButton"

export const Forms: CollectionConfig = {
  slug: "forms",
  admin: {
    enableRichTextRelationship: false,
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "webhook_url",
      type: "text",
    },
    {
      name: "fields",
      type: "blocks",
      blocks: Object.entries(fields).map(([_, field]) => {
        return typeof field === "function" ? field() : (field as Block)
      }),
    },
    {
      name: "submitButtonLabel",
      type: "text",
      localized: true,
    },
    {
      name: "confirmationType",
      type: "radio",
      admin: {
        description:
          "Choose whether to display an on-page message or redirect to a different page after they submit the form.",
        layout: "horizontal",
      },
      defaultValue: "message",
      options: [
        {
          label: "Message",
          value: "message",
        },
        {
          label: "Redirect",
          value: "redirect",
        },
      ],
    },
    {
      name: "confirmationMessage",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: [InlineButton] }),
        ],
      }),
      admin: {
        condition: (_, siblingData) => siblingData?.confirmationType === "message",
      },
      required: true,
    },
    {
      name: "redirect",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData?.confirmationType === "redirect",
        hideGutter: true,
      },
      fields: [
        {
          name: "url",
          type: "text",
          label: "URL to redirect to",
          required: true,
        },
      ],
    },
  ],
}
