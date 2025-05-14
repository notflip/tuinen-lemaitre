import { CollectionConfig } from "payload"
import { isAuthenticated } from "@/access/isAuthenticated"
import { slugField } from "@/fields/slug"
import { isAnyone } from "@/access/isAnyone"

export const PostCategories: CollectionConfig = {
  slug: "postCategories",
  labels: {
    singular: "Blog Category",
    plural: "Blog Categories",
  },
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: isAnyone,
    update: isAuthenticated,
  },
  admin: {
    group: "Blog",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  fields: [
    ...slugField("title"),
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
}
