import type { Block } from "payload"

export const HeroForm: Block = {
  slug: "heroForm",
  interfaceName: "HeroForm",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
    },
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Deze afbeelding wordt rechts van het embedded formulier getoond, indien gekozen",
      },
    },
  ],
}
