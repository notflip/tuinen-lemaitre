import type { Block } from "payload"
import { link2 } from "@/fields/link2/link2"

export const Cases: Block = {
  slug: "cases",
  interfaceName: "Cases",
  labels: {
    singular: "Cases",
    plural: "Cases",
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
    },
    link2(),
  ],
}
export default Cases
