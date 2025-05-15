import { getPayload, PaginatedDocs } from "payload"
import type { Config } from "@payload-types"
import config from "@payload-config"
import { draftMode } from "next/headers"
import { cache } from "react"

// getTestimonials
export async function getTestimonials() {
  const payload = await getPayload({
    config,
  })

  const result = await payload.find({
    collection: "testimonials",
    pagination: false,
    sort: "-publishedAt",
  })

  return result.docs
}

// getPageByPath
export async function getPageByPath(path: string) {
  const payload = await getPayload({
    config,
  })
  const { docs } = await payload.find({
    collection: "pages",
    where: { path: { equals: path } },
    depth: 3,
  })

  return docs?.at(0) || null
}

// getCachedPageByPath
export const getCachedPageByPath = cache(getPageByPath)

// getPageBySlug
export async function getPageBySlug(slug: string) {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({
    config,
  })

  const result = await payload.find({
    collection: "pages",
    limit: 1,
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
    draft,
  })

  return result.docs?.[0] || null
}

// getSiteSettings
export async function getSiteSettings() {
  const payload = await getPayload({
    config,
  })

  return await payload.findGlobal({
    slug: "settings",
    draft: false,
  })
}

// getGlobals
// todo the image from the seo image field is not being loaded, returns as a number.
export async function getGlobal(slug: keyof Config["globals"], depth: number) {
  const payload = await getPayload({
    config,
  })

  return await payload.findGlobal({
    slug,
    depth,
  })
}

// getSitemap
export async function getSitemap(): Promise<PaginatedDocs> {
  const payload = await getPayload({
    config,
  })

  return await payload.find({
    collection: "pages",
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: "published",
      },
    },
    select: {
      path: true,
      updatedAt: true,
    },
  })
}
