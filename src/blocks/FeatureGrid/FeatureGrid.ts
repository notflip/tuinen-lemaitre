import IconField from "@/fields/icon/IconField"
import type { Block } from "payload"

export const FeatureGrid: Block = {
  slug: "featureGrid",
  interfaceName: "FeatureGrid",
  labels: {
    singular: "FeatureGrid",
    plural: "FeatureGrid",
  },
  fields: [
    {
      name: "badge",
      type: "text",
      required: true,
      maxLength: 30,
    },
    {
      name: "title",
      type: "text",
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
        },
        {
          name: "text",
          type: "textarea",
          required: true,
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
        {
          label: "Gray",
          value: "gray",
        },
      ],
    },
  ],
}
