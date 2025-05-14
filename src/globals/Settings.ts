import { GlobalConfig } from "payload"
import {
  MetaDescriptionField,
  MetaImageField,
} from "@payloadcms/plugin-seo/fields"
import { isAuthenticated } from "@/access/isAuthenticated"
import { revalidateGlobal } from "@/hooks/revalidateGlobal"

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Configuratie",
  admin: {
    group: "Globals",
  },
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Algemeen",
          fields: [
            {
              type: "text",
              name: "website_title",
              label: "Website Titel",
              required: true,
              defaultValue: "Naam van de website",
            },
            {
              type: "array",
              name: "website_emails",
              label: "Website E-mails",
              required: true,
              labels: {
                singular: "E-mail",
                plural: "E-mails",
              },
              admin: {
                description:
                  "Naar deze e-mail adressen worden de contact- en afspraak aanvragen verzonden. Dit e-mail adres wordt ook getoond in de footer en doorheen de website. Het eerste e-mail adres is het primaire e-mail adres.",
              },
              minRows: 1,
              fields: [
                {
                  type: "text",
                  name: "email",
                  label: "E-mail adres",
                  required: true,
                },
              ],
            },
            {
              type: "text",
              name: "website_phone",
              label: "Telefoonnummer",
              required: true,
            },
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              type: "textarea",
              name: "company_info",
              label: "Bedrijfsgegevens",
              required: true,
            },
            {
              type: "array",
              name: "avatars",
              label: "Avatars",
              required: true,
              minRows: 2,
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                },
              ],
            },
          ],
        },
        {
          label: "Social Links",
          fields: [
            {
              name: "social_links",
              label: "Social Links",
              labels: {
                singular: "Social Link",
                plural: "Social Links",
              },
              admin: {
                description:
                  "Voeg hier de URL van je sociale media platformen toe. Bijvoorbeeld: https://www.instagram.com/naam-van-je-account",
              },
              type: "array",
              fields: [
                {
                  type: "text",
                  name: "url",
                  label: "URL",
                  required: true,
                },
              ],
              maxRows: 4,
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              type: "group",
              name: "seo",
              label: "Default SEO",
              fields: [
                MetaDescriptionField({
                  hasGenerateFn: false,
                  overrides: {
                    required: true,
                    defaultValue: "Website beschrijving",
                  },
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
  hooks: {
    afterChange: [revalidateGlobal],
  },
}
