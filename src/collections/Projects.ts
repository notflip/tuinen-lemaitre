import { isAuthenticated } from "@/access/isAuthenticated"
import { isAnyone } from "@/access/isAnyone"
import { CollectionConfig } from "payload"
import { slugField } from "@/fields/slug"
import beforeDuplicate from "@/hooks/beforeDuplicateSlugged"
import { revalidateTagHooks } from "@/hooks/revalidateTagHooks"

export const Projects: CollectionConfig = {
  slug: "projects",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: isAnyone,
    update: isAuthenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  hooks: {
    beforeValidate: [beforeDuplicate],
    // The pages embed the projects.
    ...revalidateTagHooks("pages"),
  },
  fields: [
    ...slugField("title"),
    {
      type: "text",
      name: "title",
      required: true,
    },
    {
      type: "textarea",
      name: "description",
      required: true,
      maxLength: 350,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      displayPreview: true,
      required: true,
    },
  ],
}
