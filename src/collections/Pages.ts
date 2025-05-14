import { CollectionConfig } from "payload"
import { generatePreviewPath } from "@/utils/generatePreviewPath"
import { MetaDescriptionField, MetaImageField, MetaTitleField } from "@payloadcms/plugin-seo/fields"
import { isAuthenticated } from "@/access/isAuthenticated"
import { slugField } from "@/fields/slug"
import { isAuthenticatedOrPublished } from "@/access/isAuthenticatedOrPublished"
import { canDeletePage } from "@/access/canDeletePage"
import CtaBlock from "@/blocks/CtaBlock/CtaBlock"
import pathField from "@/fields/path/path"
import { SharedBlock } from "@/blocks/SharedBlock/SharedBlock"
import beforeDuplicate from "@/hooks/beforeDuplicateSlugged"
import { revalidateDelete, revalidatePage } from "@/hooks/revalidatePage"

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: isAuthenticated,
    read: isAuthenticatedOrPublished,
    update: isAuthenticated,
    delete: canDeletePage,
  },
  versions: {
    maxPerDoc: 30,
    drafts: {
      autosave: {
        interval: 500,
      },
      // validate: true,
    },
  },
  defaultPopulate: {
    slug: true,
    path: true,
    title: true,
  },
  admin: {
    defaultColumns: ["title", "path"],
    useAsTitle: "title",
    livePreview: {
      url: ({ data }) => {
        return generatePreviewPath({
          collection: "pages",
          value: data.path,
        })
      },
    },
    preview: (data) =>
      generatePreviewPath({
        collection: "pages",
        value: data.value as string,
      }),
  },
  hooks: {
    beforeValidate: [beforeDuplicate],
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  fields: [
    ...slugField("title"),
    ...pathField(["pages"], "slug"),
    {
      name: "uiMessage",
      type: "ui",
      admin: {
        components: {
          Field: "@/fields/message/MessageComponent#MessageComponent",
        },
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "Dit is de titel van de pagina",
        components: {
          Cell: "@/fields/title/Cell#Cell",
        },
      },
    },
    // Tabs
    {
      type: "tabs",
      tabs: [
        // General Tab
        {
          label: "Algemeen",
          fields: [
            {
              name: "blocks",
              type: "blocks",
              blocks: [CtaBlock, SharedBlock],
            },
          ],
        },
        // SEO Tab
        {
          label: "SEO",
          fields: [
            {
              type: "group",
              name: "seo",
              label: "",
              fields: [
                MetaTitleField({
                  hasGenerateFn: true,
                  overrides: {
                    // required: true,
                  },
                }),
                MetaDescriptionField({
                  hasGenerateFn: false,
                }),
                MetaImageField({
                  relationTo: "media",
                  hasGenerateFn: false,
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
