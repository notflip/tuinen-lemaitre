import type { MetadataRoute } from "next"
import { unstable_cache } from "next/cache"
import { getSitemap } from "@/lib/payload"

// Built on every request from a cache that the page save hooks clear. Crawlers ask for this file
// all day long, and each query woke the Neon database.
export const dynamic = "force-dynamic"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { docs: pagesDocs = [] } = await unstable_cache(getSitemap, ["sitemap"], {
    tags: ["pages"],
    revalidate: false,
  })()

  return [
    ...pagesDocs.map(({ path, updatedAt }) => ({
      url: `${SITE_URL}${path === "/home" ? "" : path}`,
      lastModified: updatedAt ?? new Date().toISOString(),
    })),
  ]
}
