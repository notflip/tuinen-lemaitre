import type { Block } from "payload"
import { richTextField } from "@/fields/richtext/richtext"

export const ContentBlock: Block = {
  slug: "contentBlock",
  interfaceName: "ContentBlock",
  fields: [
    richTextField({
      name: "content",
      label: "Content",
    }),
  ],
}
export default ContentBlock
