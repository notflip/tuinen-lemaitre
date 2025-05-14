import type { Block } from "payload"

export const ImageGrid: Block = {
  slug: "imageGrid",
  interfaceName: "ImageGrid",
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "bgColor",
      type: "select",
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: "Beige",
          value: "beige",
        },
      ],
    },
  ],
}
