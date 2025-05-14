import IconField from "@/fields/icon/IconField"
import { Block } from "payload"

export const InlineCards: Block = {
  slug: "inlineCards",
  interfaceName: "InlineCards",
  labels: {
    singular: "Inline Cards",
    plural: "Inline Cards",
  },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        {
          type: "text",
          name: "title",
          required: true,
        },
        {
          type: "textarea",
          name: "text",
          required: true,
        },
        IconField,
      ],
    },
  ],
}
