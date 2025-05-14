import type { Block } from "payload"

export const SharedBlock: Block = {
  slug: "shared",
  interfaceName: "SharedBlock",
  labels: {
    singular: "Shared Block",
    plural: "Shared Blocks",
  },
  fields: [
    {
      name: "block",
      type: "relationship",
      relationTo: "sharedBlocks",
      required: true,
    },
  ],
}
