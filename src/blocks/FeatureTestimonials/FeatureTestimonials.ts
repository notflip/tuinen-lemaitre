import type { Block } from "payload"

export const FeatureTestimonials: Block = {
  slug: "featureTestimonials",
  interfaceName: "FeatureTestimonials",
  fields: [
    {
      name: "badge",
      type: "text",
      required: true,
      maxLength: 30,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "text",
          type: "textarea",
          required: true,
          maxLength: 150,
        },
        {
          name: "author_name",
          type: "text",
          required: true,
        },
        {
          name: "author_company",
          type: "text",
          required: true,
        },
        {
          name: "author_avatar",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "link",
          label: "Case",
          type: "relationship",
          relationTo: "cases",
        },
      ],
    },
    {
      name: "bgColor",
      type: "select",
      defaultValue: "black",
      admin: {
        readOnly: true,
      },
      options: [
        {
          label: "Black",
          value: "black",
        },
      ],
    },
  ],
}
