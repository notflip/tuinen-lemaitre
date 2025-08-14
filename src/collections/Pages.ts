import { CollectionConfig } from "payload"
import { generatePreviewPath } from "@/utils/generatePreviewPath"
import { MetaDescriptionField, MetaImageField, MetaTitleField } from "@payloadcms/plugin-seo/fields"
import { isAuthenticated } from "@/access/isAuthenticated"
import { slugField } from "@/fields/slug"
import { isAuthenticatedOrPublished } from "@/access/isAuthenticatedOrPublished"
import { canDeletePage } from "@/access/canDeletePage"
import Cta from "@/blocks/Cta/Cta"
import pathField from "@/fields/path/path"
import { SharedBlock } from "@/blocks/SharedBlock/SharedBlock"
import beforeDuplicate from "@/hooks/beforeDuplicateSlugged"
import { revalidateDelete, revalidatePage } from "@/hooks/revalidatePage"
import { Hero } from "@/blocks/Hero/Hero"
import Feature from "@/blocks/Feature/Feature"
import { Cards } from "@/blocks/Cards/Cards"
import Projects from "@/blocks/Projects/Projects"
import { Process } from "@/blocks/Process/Process"
import Testimonials from "@/blocks/Testimonials/Testimonials"
import { HeroAlt } from "@/blocks/HeroAlt/HeroAlt"
import Content from "@/blocks/Content/Content"
import { Contact } from "@/blocks/Contact/Contact"

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
          value: data.path as string,
        })
      },
    },
    preview: (data) => {
      return generatePreviewPath({
        collection: "pages",
        value: data.path as string,
      })
    },
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
              blocks: [
                Hero,
                HeroAlt,
                Feature,
                Cards,
                Content,
                Contact,
                Projects,
                Process,
                Testimonials,
                Cta,
                SharedBlock,
              ],
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
