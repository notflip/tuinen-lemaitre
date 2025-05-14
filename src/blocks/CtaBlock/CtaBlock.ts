import type { Block } from "payload"
import { link } from "@/fields/link/link"

export const CtaBlock: Block = {
  slug: "ctaBlock",
  interfaceName: "CtaBlock",
  fields: [
    {
      name: "subtitle",
      type: "text",
      admin: {
        description:
          "Indien dit ingevuld is, komt deze kleine titel boven de hoofd titel in een kader staan",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "text",
      type: "textarea",
    },
    {
      name: "links",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: [link()],
      maxRows: 2,
    },
    {
      name: "bgColor",
      type: "select",
      defaultValue: "blue",
      admin: {
        readOnly: true,
      },
      options: [
        {
          label: "Blue",
          value: "blue",
        },
      ],
    },
  ],
}
export default CtaBlock
