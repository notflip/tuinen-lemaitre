import { link } from "@/fields/link/link"
import { validateLandscapeImage } from "@/validation/validateLandscapeImage"
import { Image as ImageType } from "@payload-types"
import type { Block } from "payload"

export const Image: Block = {
  slug: "image",
  interfaceName: "Image",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Dit veld is een landschap afbeelding, de afbeelding die je hier upload moet in een landschap formaat zijn",
      },
      required: true,
      validate: validateLandscapeImage({ isRequired: true }),
    },
    {
      name: "callout",
      type: "group",
      fields: [
        {
          name: "content",
          type: "text",
        },
        {
            name: "link",
            label: "Case",
            type: "relationship",
            relationTo: "cases"
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
}
