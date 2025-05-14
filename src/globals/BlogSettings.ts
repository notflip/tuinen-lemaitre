import { GlobalConfig } from "payload"
import { isAuthenticated } from "@/access/isAuthenticated"
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
} from "@payloadcms/plugin-seo/fields"
import { revalidateTag } from "next/cache"

export const BlogSettings: GlobalConfig = {
  slug: "blogSettings",
  label: "Blog Instellingen",
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  admin: {
    group: "Blog",
  },
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        // req.payload.logger.info(`Revalidating blog settings`)
        revalidateTag("global_blogSettings")
        return doc
      },
    ],
  },
  fields: [
    {
      type: "text",
      name: "title",
      label: "Blog Titel",
      required: true,
      defaultValue: "Describe what your blog is about",
    },
    {
      type: "text",
      name: "description",
      label: "Blog Beschrijving",
      required: true,
      defaultValue: "Give your blog a short description",
    },
  ],
}
