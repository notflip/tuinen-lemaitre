import type { MetadataRoute } from "next"
import { getPostsSitemap, getSitemap } from "@/lib/payload"

export const dynamic = "force-dynamic"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { docs: pagesDocs = [] } = await getSitemap()
  const { docs: postsDocs = [] } = await getPostsSitemap()

  return [
    ...pagesDocs.map(({ path, updatedAt }) => ({
      url: `${SITE_URL}${path === "/home" ? "" : path}`,
      lastModified: updatedAt ?? new Date().toISOString(),
    })),
    ...postsDocs.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified:
        post.updatedAt ?? post.publishedAt ?? new Date().toISOString(),
    })),
  ]
}
