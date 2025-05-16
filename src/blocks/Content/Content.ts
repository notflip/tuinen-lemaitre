import type { Block } from "payload"
import { richTextField } from "@/fields/richtext/richtext"

export const Content: Block = {
  slug: "content",
  interfaceName: "Content",
  fields: [
    richTextField({
      name: "content",
      label: "Content",
    }),
    {
      name: "bgColor",
      type: "select",
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: "Gray",
          value: "bg-muted",
        },
                {
          label: "Beige",
          value: "bg-highlight",
        },
      ],
    },
  ],
}
export default Content
