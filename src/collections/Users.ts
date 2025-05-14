import type { CollectionConfig } from "payload"

import { isAuthenticated } from "@/access/isAuthenticated"
import { isAdmin } from "@/access/isAdmin"

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: isAuthenticated,
    create: isAdmin,
    delete: isAdmin,
    read: isAuthenticated,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ["avatar", "name", "email"],
    useAsTitle: "name",
    group: "Systeem",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      displayPreview: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      required: true,
      defaultValue: "user",
    },
  ],
  timestamps: true,
}
