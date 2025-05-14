import type { Block } from "payload"

export const FormBlock: Block = {
  slug: "formBlock",
  interfaceName: "FormBlock",
  fields: [
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
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
    },
  ],
}
