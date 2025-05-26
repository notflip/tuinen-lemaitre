import { CollectionConfig } from "payload"
import { generateBlurHash } from "@/hooks/generateBlurhash"
import { isAuthenticated } from "@/access/isAuthenticated"
import { isAnyone } from "@/access/isAnyone"

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: isAnyone,
    update: isAuthenticated,
  },
  admin: {
    folders: true,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    focalPoint: true,
    crop: true,
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 200,
        height: 200,
        crop: "center",
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        crop: "center",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Text",
    },
    {
      name: "blurhash",
      type: "text",
      admin: {
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
  ],
  hooks: {
    beforeValidate: [generateBlurHash],
  },
}

export default Media
