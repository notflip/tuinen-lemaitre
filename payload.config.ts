import sharp from "sharp"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { buildConfig } from "payload"
import { Pages } from "@/collections/Pages"
import { Settings } from "@/globals/Settings"
import { NavigationMain } from "@/globals/NavigationMain/NavigationMain"
import { nodemailerAdapter } from "@payloadcms/email-nodemailer"
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs"
import { muxVideoPlugin } from "@oversightstudio/mux-video"

import { seoPlugin } from "@payloadcms/plugin-seo"
import Media from "@/collections/Media"
import { Redirects } from "@/collections/Redirects"
import { Users } from "@/collections/Users"
import { Posts } from "@/collections/Posts"
import { PostCategories } from "@/collections/PostCategories"
import { BlogSettings } from "@/globals/BlogSettings"
import { Footer } from "@/globals/Footer"
import { SharedBlocks } from "@/collections/SharedBlocks"
import { Submissions } from "@/collections/Submissions"
import { Cases } from "@/collections/Cases"
import { Forms } from "@/collections/forms/Forms"

export default buildConfig({
  editor: lexicalEditor(),

  admin: {
    user: Users.slug,
    components: {
      beforeDashboard: ["@/components/BeforeDashboard"],
    },

    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },

  email: nodemailerAdapter({
    defaultFromAddress: process.env.MAIL_FROM || `noreply@cms.studiomonty.be`,
    defaultFromName: process.env.MAIL_FROM_NAME || "Studiomonty CMS",
    transportOptions: {
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      auth: {
        user: process.env.MAIL_SMTP_USER,
        pass: process.env.MAIL_SMTP_PASSWORD,
      },
    },
  }),

  // Define and configure your collections in this array
  collections: [
    Pages,
    Cases,
    Redirects,
    Users,
    Posts,
    PostCategories,
    Media,
    SharedBlocks,
    Forms,
    Submissions,
  ],

  globals: [Settings, BlogSettings, NavigationMain, Footer],

  plugins: [
    nestedDocsPlugin({
      collections: ["pages"],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),

    muxVideoPlugin({
      enabled: true,
      access: () => true,
      initSettings: {
        tokenId: process.env.MUX_TOKEN_ID || "",
        tokenSecret: process.env.MUX_TOKEN_SECRET || "",
        webhookSecret: process.env.MUX_WEBHOOK_SIGNING_SECRET || "",
      },
      uploadSettings: {
        cors_origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      },
    }),

    // formBuilderPlugin({
    //   fields: {
    //     text: true,
    //     textarea: true,
    //     select: true,
    //     email: true,
    //     checkbox: true,
    //     message: true,
    //   },
    // }),

    // bunnyStorage({
    //   collections: {
    //     media: true,
    //   },
    //   options: {
    //     adminThumbnail: {
    //       appendTimestamp: true,
    //       queryParams: {
    //         width: '300',
    //         height: '300',
    //       },
    //     },
    //     storage: {
    //       apiKey: process.env.BUNNY_STORAGE_API_KEY!,
    //       hostname: process.env.BUNNY_STORAGE_HOST!,
    //       zoneName: process.env.BUNNY_STORAGE_ZONE!,
    //     },
    //   },
    // }),

    // s3Storage({
    //   bucket: process.env.R2_BUCKET!,
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    //       secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    //     },
    //     endpoint: process.env.R2_ENDPOINT,
    //     region: "auto",
    //     forcePathStyle: true,
    //   },
    //   collections: {
    //     media: true,
    //   },
    // }),

    seoPlugin({
      uploadsCollection: "media",
      generateTitle: async ({ doc }) => {
        return doc.title
      },
      generateDescription: async ({ doc }) => {
        return doc.description
      },
    }),
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})
