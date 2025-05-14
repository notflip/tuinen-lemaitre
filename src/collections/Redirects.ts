import { CollectionConfig } from "payload"
import { isAuthenticated } from "@/access/isAuthenticated"
import { isAuthenticatedOrPublished } from "@/access/isAuthenticatedOrPublished"
import { revalidateRedirects } from "@/hooks/revalidateRedirects"

export const Redirects: CollectionConfig = {
  slug: "redirects",
  admin: {
    defaultColumns: ["from", "to", "type"],
    group: "Systeem",
  },
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: isAuthenticatedOrPublished,
    update: isAuthenticated,
  },
  hooks: {
    afterChange: [revalidateRedirects],
  },
  fields: [
    {
      name: "from",
      type: "text",
      index: true,
      label: "From URL",
      required: true,
      admin: {
        description: "Redirect pad, startende met een slash",
      },
      validate: (value?: any) => {
        if (typeof value !== "string" || !value.startsWith("/")) {
          return "The value must start with a slash (/)"
        }
        return true
      },
    },
    {
      name: "to",
      type: "text",
      index: true,
      label: "To URL",
      required: true,
      validate: (value?: any) => {
        if (typeof value !== "string" || !value.startsWith("/")) {
          return "The value must start with a slash (/)"
        }
        return true
      },
    },
    {
      name: "type",
      type: "select",
      label: "Redirect Type",
      options: [
        {
          label: "301 - Permanent",
          value: "301",
        },
        {
          label: "302 - Temporary",
          value: "302",
        },
      ],
      required: true,
    },
  ],
}
