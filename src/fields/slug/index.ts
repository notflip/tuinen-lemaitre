import type { TextField } from "payload"

import { generateSlugHook } from "@/fields/slug/generateSlugHook"

type Overrides = {
  slugOverrides?: Partial<TextField>
}

type Slug = (fieldToUse?: string) => [TextField]

export const slugField: Slug = (
  fieldToUse = "title",
  overrides: Overrides = {},
) => {
  const slugField: TextField = {
    name: "slug",
    type: "text",
    index: true,
    label: "Slug",
    // ...(slugOverrides || {}),
    hooks: {
      beforeValidate: [generateSlugHook(fieldToUse)],
    },
    admin: {
      position: "sidebar",
      // ...(slugOverrides?.admin || {}),
      description:
        "✋ Het wijzigen van de slug na publicatie kan bestaande links breken en zorgt ervoor dat bezoekers of zoekmachines de pagina niet meer kunnen vinden.",
      components: {
        Field: {
          path: "@/fields/slug/SlugComponent#SlugComponent",
          clientProps: {
            fieldToUse,
          },
        },
      },
    },
  }

  return [slugField]
}
