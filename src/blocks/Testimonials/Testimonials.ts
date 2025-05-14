import type { Block } from "payload"
import { link } from "@/fields/link/link"

export const Testimonials: Block = {
  slug: "testimonials",
  interfaceName: "Testimonials",
  labels: {
    singular: "Testimonials",
    plural: "Testimonials",
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
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "text",
          type: "textarea",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          displayPreview: true,
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
export default Testimonials
