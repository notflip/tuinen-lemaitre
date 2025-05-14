import { isAuthenticated } from "@/access/isAuthenticated"
import { link } from "@/fields/link/link"
import { GlobalConfig } from "payload"
import { revalidateGlobal } from "@/hooks/revalidateGlobal"

const AMOUNT_OF_COLUMNS = 1
const AMOUNT_OF_LINKS = 8

export const Footer: GlobalConfig = {
  slug: "footer",
  admin: {
    group: "Globals",
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Policies",
          fields: [
            {
              name: "privacyPolicyLink",
              type: "relationship",
              relationTo: ["pages"],
            },
            {
              name: "cookiePolicyLink",
              type: "relationship",
              relationTo: ["pages"],
            },
            {
              name: "termsAndConditionsLink",
              type: "relationship",
              relationTo: ["pages"],
            },
          ],
        },
        {
          label: "Columns",
          fields: [
            {
              name: "columns",
              type: "array",
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: "@/globals/ArrayRowTitle#ArrayRowTitle",
                },
              },
              maxRows: AMOUNT_OF_COLUMNS,
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "links",
                  type: "array",
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel:
                        "@/globals/ArrayRelationRowLabel#ArrayRelationRowLabel",
                    },
                  },
                  maxRows: AMOUNT_OF_LINKS,
                  fields: [link()],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
