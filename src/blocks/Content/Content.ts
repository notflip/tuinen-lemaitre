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
  ],
}
export default Content
