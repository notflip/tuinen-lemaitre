import { CollectionConfig } from "payload"
import { isAuthenticated } from "@/access/isAuthenticated"
import { isAuthenticatedOrPublished } from "@/access/isAuthenticatedOrPublished"
import { generatePreviewPath } from "@/utils/generatePreviewPath"
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  lexicalEditor,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical"
import { generateReadingTime } from "@/hooks/generateReadingTime"
import { slugField } from "@/fields/slug"
import { revalidateDelete, revalidatePost } from "@/hooks/revalidatePost"

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: isAuthenticatedOrPublished,
    update: isAuthenticated,
  },
  labels: {
    singular: "Blog Post",
    plural: "Blog Posts",
  },
  versions: {
    maxPerDoc: 20,
    drafts: {
      autosave: {
        interval: 500,
      },
    },
  },
  defaultPopulate: {
    slug: true,
    title: true,
    categories: true,
  },
  admin: {
    group: "Blog",
    useAsTitle: "title",
    defaultColumns: ["title", "heroImage", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        return generatePreviewPath({
          collection: "posts",
          value: data.slug,
        })
      },
    },
    preview: (data) =>
      generatePreviewPath({
        collection: "posts",
        value: data.slug as string,
      }),
  },
  hooks: {
    beforeValidate: [generateReadingTime],
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
  },
  fields: [
    ...slugField("title"),
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      validate: (value) => {
        if (value && value.length > 180) {
          return "Description cannot exceed 180 characters."
        }
        return true
      },
    },
    {
      name: "category",
      label: "Blog Category",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      relationTo: "postCategories",
      required: true,
    },
    {
      name: "author",
      label: "Auteur",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      relationTo: "users",
      required: true,
      //   defaultValue: ({ user }) =>
      // user?.role !== "admin" ? user?.id : undefined,
      //   filterOptions: () => {
      // return {
      //   role: { not_equals: "admin" },
      // }
      //   },
    },
    {
      name: "publishedAt",
      label: "Gepubliceerd op",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      type: "tabs",
      tabs: [
        // Content Tab
        {
          label: "Content",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              displayPreview: true,
              required: true,
            },
            {
              type: "richText",
              name: "content",
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  EXPERIMENTAL_TableFeature(),
                ],
              }),
              //     {
              //     features: () => {
              //       return [
              //         HeadingFeature({
              //           enabledHeadingSizes: ["h2", "h3", "h4"],
              //         }),
              //         BlocksFeature({ blocks: [] }),
              //         UnorderedListFeature(),
              //         UploadFeature(),
              //       ]
              //     },
              //   }
            },
          ],
        },
      ],
    },
    {
      name: "readingTime",
      type: "number",
      admin: {
        hidden: true,
      },
    },
  ],
}
