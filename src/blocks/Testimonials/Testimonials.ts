import type { Block } from "payload"

export const Testimonials: Block = {
  slug: "testimonials",
  interfaceName: "Testimonials",
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
  ],
}

export default Testimonials
