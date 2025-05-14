import IconField from "@/fields/icon/IconField"
import { link } from "@/fields/link/link"
import type { Block } from "payload"

export const Slider: Block = {
  slug: "slider",
  interfaceName: "Slider",
  fields: [
    {
      name: "subtitle",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "links",
      type: "array",
      fields: [link()],
      maxRows: 1,
    },
    {
      name: "items",
      type: "array",
      fields: [
        IconField,
        {
          type: "text",
          name: "title",
          required: true,
        },
        {
          type: "textarea",
          name: "content",
          required: true,
          maxLength: 250,
        },
      ],
      maxRows: 8,
    },
    {
      name: "bgColor",
      type: "select",
      defaultValue: "beige",
      admin: {
        readOnly: true,
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
export default Slider
