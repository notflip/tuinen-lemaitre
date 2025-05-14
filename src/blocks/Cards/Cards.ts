import IconField from "@/fields/icon/IconField"
import { link } from "@/fields/link/link"
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
        {
          name: "reference",
          type: "relationship",
          label: "Document to link to",
          relationTo: ["pages"],
        },
      ],
    },
    {
      name: "bgColor",
      type: "select",
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: "Beige",
          value: "beige",
        },
      ],
    },
  ],
}
