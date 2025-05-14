import type { Block } from "payload"
import { link } from "@/fields/link/link"

export const FeatureList: Block = {
  slug: "featureList",
  interfaceName: "FeatureList",
  labels: {
    singular: "FeatureList",
    plural: "FeatureList",
  },
  fields: [
    {
      name: "badge",
      type: "text",
      maxLength: 30,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    link({}),
    {
      name: "items",
      type: "array",
      fields: [
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
        link({}),
      ],
    },
  ],
}
export default FeatureList
