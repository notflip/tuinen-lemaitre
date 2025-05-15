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
      name: "columns",
      type: "select",
      options: [
        {
          label: "2 Columns",
          value: "2",
        },
        {
          label: "3 Columns",
          value: "3",
        },
        {
          label: "4 Columns",
          value: "4",
        },
      ],
      defaultValue: "2",
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
