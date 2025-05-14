import { CollectionConfig } from "payload"
import CtaBlock from "@/blocks/CtaBlock/CtaBlock"

export const SharedBlocks: CollectionConfig = {
  slug: "sharedBlocks",
  labels: {
    singular: "Globale Blokken",
    plural: "Globale Blokken",
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      label: "Block Name",
      type: "text",
      name: "title",
    },
    {
      type: "blocks",
      name: "blocks",
      label: "Content",
      blocks: [CtaBlock],
      minRows: 1,
      maxRows: 1,
      required: true,
    },
  ],
}
