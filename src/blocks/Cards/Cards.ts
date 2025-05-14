import IconField from "@/fields/icon/IconField"
import { link2 } from "@/fields/link2/link2"
import type { Block } from "payload"

export const Cards: Block = {
  slug: "cards",
  interfaceName: "Cards",
  labels: {
    singular: "Cards",
    plural: "Cards",
  },
  fields: [
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        IconField,
        {
          name: "title",
          type: "text",
          required: true,
          maxLength: 70,
        },
        {
          name: "text",
          type: "textarea",
          required: true,
          maxLength: 200,
        },
        link2(),
      ],
    },
  ],
}
