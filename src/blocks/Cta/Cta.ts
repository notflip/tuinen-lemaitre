import type { Block } from "payload"
import { link } from "@/fields/link/link"

export const Cta: Block = {
  slug: "cta",
  interfaceName: "Cta",
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
  ],
}
export default Cta
