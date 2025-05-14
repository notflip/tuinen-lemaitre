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
import { Hero } from "@/blocks/HeroBlock/Hero"
import { Image } from "@/blocks/Image/Image"
import { Paragraph } from "@/blocks/Paragraph/Paragraph"
import { Cards } from "@/blocks/Cards/Cards"
import { Cases } from "@/blocks/Cases/Cases"
import { FeatureRows } from "@/blocks/FeatureRows/FeatureRows"
import FeatureList from "@/blocks/FeatureList/FeatureList"
import Testimonials from "@/blocks/Testimonials/Testimonials"
import { Team } from "@/blocks/Team/Team"
import { Feature } from "@/blocks/Feature/Feature"
import { Slider } from "@/blocks/Slider/Slider"
import { ProcessSlider } from "@/blocks/ProcessSlider/ProcessSlider"
import { Logos } from "@/blocks/Logos/Logos"
import { FeatureTestimonials } from "@/blocks/FeatureTestimonials/FeatureTestimonials"
import ContactForm from "@/blocks/ContactForm/ContactForm"
import TallyEmbed from "@/blocks/TallyEmbed/TallyEmbed"
import { FeatureGrid } from "@/blocks/FeatureGrid/FeatureGrid"
import { HeroForm } from "@/blocks/HeroFormComponent/HeroForm"
import ContentBlock from "@/blocks/ContentBlock/ContentBlock"
import { FormBlock } from "@/blocks/Form/FormBlock"
import { ImageGrid } from "@/blocks/ImageGrid/ImageGrid"
import Video from "@/blocks/Video/Video"

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
              blocks: [
                Cards,
                Cases,
                ContentBlock,
                ContactForm,
                CtaBlock,
                Feature,
                Image,
                ImageGrid,
                FeatureGrid,
                FeatureRows,
                FeatureList,
                FeatureTestimonials,
                FormBlock,
                Hero,
                HeroForm,
                Logos,
                Paragraph,
                ProcessSlider,
                Slider,
                SharedBlock,
                TallyEmbed,
                Team,
                Testimonials,
                Video,
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
