import { getPayload, PaginatedDocs } from "payload"
import type { Case, Config, Post } from "@payload-types"
import config from "@payload-config"
import { draftMode } from "next/headers"
import { cache } from "react"
import { postsPerPage } from "@/config"

// getCase
export async function getCase(slug: string): Promise<Case> {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({
    config,
  })

  const result = await payload.find({
    collection: "cases",
    draft,
    overrideAccess: draft,
    limit: 1,
    pagination: false,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
}

// getLatestCases
export async function getLatestCases() {
  const payload = await getPayload({
    config,
  })

  const result = await payload.find({
    collection: "cases",
    limit: 4,
    pagination: false,
    sort: "-publishedAt",
  })

  return result.docs
}

// getPostCategories
export async function getPostCategories() {
  const payload = await getPayload({
    config,
  })
  const result = await payload.find({
    collection: "postCategories",
  })
  return result.docs
}

// getLatestPosts
export async function getLatestPosts(currentPostSlug?: string) {
  const payload = await getPayload({
    config,
  })

  const result = await payload.find({
    collection: "posts",
    limit: 3,
    pagination: false,
    sort: "-publishedAt",
    where: {
      ...(currentPostSlug ? { slug: { not_equals: currentPostSlug } } : {}),
      publishedAt: { less_than: new Date().toISOString() },
    },
  })

  return result.docs
}

// getPosts
export async function getPaginatedPosts({
  pagenumber,
  category,
}: {
  pagenumber?: number
  category?: string
}): Promise<PaginatedDocs> {
  const payload = await getPayload({
    config,
  })

  return await payload.find({
    collection: "posts",
    limit: postsPerPage,
    page: pagenumber,
    where: {
      ...(category ? { "category.slug": { equals: category } } : {}),
      publishedAt: { less_than: new Date().toISOString() },
    },
  })
}

// getPostBySlug
// todo cache?
export async function getPostBySlug(slug: string): Promise<Post> {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({
    config,
  })

  const result = await payload.find({
    collection: "posts",
    draft,
    overrideAccess: true,
    limit: 1,
    pagination: false,
    where: {
      slug: { equals: slug },
      publishedAt: { less_than: new Date().toISOString() },
    },
  })

  return result.docs?.[0] || null
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

export async function getPostsSitemap(): Promise<PaginatedDocs> {
  const payload = await getPayload({
    config,
  })

  return await payload.find({
    collection: "posts",
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
      slug: true,
      publishedAt: true,
      updatedAt: true,
    },
  })
}
