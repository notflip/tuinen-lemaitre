import { CollectionConfig } from "payload"
import { isAdmin } from "@/access/isAdmin"
import { SendWebhook } from "@/hooks/sendWebhook"
import { SendSubmissionEmail } from "@/hooks/sendSubmissionEmail"

export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: {
    singular: "Inzending",
    plural: "Inzendingen",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => false,
    delete: isAdmin,
  },
  admin: {
    group: "Forms",
    defaultColumns: ["form", "createdAt"],
  },
  hooks: {
    afterChange: [SendSubmissionEmail, SendWebhook],
  },
  fields: [
    {
      name: "form",
      type: "relationship",
      relationTo: "forms",
      label: "Formulier",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "data",
      type: "json",
      required: true,
    },
  ],
}
