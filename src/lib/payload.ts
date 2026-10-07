import { getPayload, PaginatedDocs } from "payload"
import type { Config } from "@payload-types"
import config from "@payload-config"
import { unstable_cache } from "next/cache"

// getTestimonials
// The testimonials save hooks clear the tag.
export const getTestimonials = unstable_cache(
  async () => {
    const payload = await getPayload({
      config,
    })

    const result = await payload.find({
      collection: "testimonials",
      pagination: false,
      sort: "-publishedAt",
    })

    return result.docs
  },
  ["testimonials"],
  { tags: ["testimonials"], revalidate: false },
)

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
