import { link2 } from "@/fields/link2/link2"
import { Block } from "payload"

export const InlineButton: Block = {
  slug: "inlineButton",
  interfaceName: "InlineButton",
  fields: [link2()],
}
