import { CollectionConfig } from "payload"
import Cta from "@/blocks/Cta/Cta"
import { revalidateTagHooks } from "@/hooks/revalidateTagHooks"

export const SharedBlocks: CollectionConfig = {
  slug: "sharedBlocks",
  labels: {
    singular: "Globale Blokken",
    plural: "Globale Blokken",
  },
  access: {
    read: () => true,
  },
  hooks: {
    // The pages embed the shared blocks.
    ...revalidateTagHooks("pages"),
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
      blocks: [Cta],
      minRows: 1,
      maxRows: 1,
      required: true,
    },
  ],
}
