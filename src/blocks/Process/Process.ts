import type { Block } from "payload"

export const Process: Block = {
  slug: "process",
  interfaceName: "Process",
  fields: [
    {
      type: "text",
      name: "subtitle",
    },
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "textarea",
      name: "text",
      required: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          maxLength: 70,
        },
        {
          name: "text",
          type: "textarea",
          required: true,
          maxLength: 200,
        },
      ],
    },
  ],
}
