import type { Block } from "payload"

export const Contact: Block = {
  slug: "contact",
  interfaceName: "Contact",
  labels: {
    singular: "Contact",
    plural: "Contact",
  },
  fields: [
    {
      type: "text",
      name: "title",
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
