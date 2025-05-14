import { GlobalConfig } from "payload"
import { revalidateGlobal } from "@/hooks/revalidateGlobal"
import { link2 } from "@/fields/link2/link2"

// TODO use the new link2 here (only for new project)

export const NavigationMain: GlobalConfig = {
  slug: "navigation_main",
  label: "Navigatie",
  hooks: {
    afterChange: [revalidateGlobal],
  },
  admin: {
    group: "Globals",
  },
  fields: [
    {
      name: "items",
      type: "array",
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/globals/ArrayRowLabel#ArrayRowLabel",
        },
      },
      fields: [
        {
          name: "type",
          type: "select",
          options: [
            {
              label: "Single",
              value: "single",
            },
            {
              label: "List",
              value: "list",
            },
            {
              label: "Megamenu",
              value: "megamenu",
            },
          ],
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
          maxLength: 30,
        },
        // Single Type
        {
          name: "reference",
          type: "relationship",
          relationTo: ["pages"],
          required: true,
          admin: {
            condition: (_, { type }) => type === "single",
            allowCreate: false,
          },
        },
        // Megamenu Type
        {
          name: "columns",
          type: "array",
          minRows: 1,
          maxRows: 3,
          admin: {
            initCollapsed: true,
            condition: (_, { type }) => type === "megamenu",
            components: {
              RowLabel: "@/globals/ArrayRowLabel#ArrayRowLabel",
            },
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              maxLength: 30,
            },
            {
              name: "description",
              type: "text",
            },
            {
              name: "links",
              type: "array",
              required: true,
              minRows: 1,
              maxRows: 1,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: "@/globals/ArrayRowLabel#ArrayRowLabel",
                },
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                  maxLength: 30,
                },
                {
                  name: "reference",
                  type: "relationship",
                  relationTo: ["pages"],
                  required: true,
                  admin: {
                    allowCreate: false,
                  },
                },
              ],
            },
          ],
        },
        // List Type
        {
          name: "links",
          type: "array",
          required: true,
          minRows: 1,
          admin: {
            initCollapsed: true,
            condition: (_, { type }) => type === "list",
            components: {
              RowLabel: "@/globals/ArrayRowLabel#ArrayRowLabel",
            },
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              maxLength: 30,
            },
            {
              name: "reference",
              type: "relationship",
              relationTo: ["pages"],
              required: true,
              admin: {
                allowCreate: false,
              },
            },
          ],
        },
      ],
    },
    link2(),
  ],
}
