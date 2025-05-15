import { link2 } from "@/fields/link2/link2"
import type { Block } from "payload"

export const HeroAlt: Block = {
  slug: "heroAlt",
  interfaceName: "HeroAlt",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "links",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: [link2({ disableNone: true })],
      maxRows: 2,
    },
  ],
}
