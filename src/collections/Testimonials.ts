import { isAuthenticated } from "@/access/isAuthenticated"
import { isAnyone } from "@/access/isAnyone"
import { CollectionConfig } from "payload"
import beforeDuplicate from "@/hooks/beforeDuplicateSlugged"
import { revalidateTagHooks } from "@/hooks/revalidateTagHooks"

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: isAnyone,
    update: isAuthenticated,
  },
  admin: {
    defaultColumns: ["text"],
  },
  hooks: {
    beforeValidate: [beforeDuplicate],
    ...revalidateTagHooks("testimonials"),
  },
  fields: [
    {
      type: "textarea",
      name: "text",
      required: true,
    },
    {
      type: "text",
      name: "author",
      required: true,
    },
  ],
}
