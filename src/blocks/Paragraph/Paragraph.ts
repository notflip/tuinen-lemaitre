import { link } from "@/fields/link/link"
import type { Block } from "payload"

export const Paragraph: Block = {
  slug: "paragraph",
  interfaceName: "Paragraph",
  fields: [
    {
      name: "badge",
      type: "text",
      required: true,
      maxLength: 30,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
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
