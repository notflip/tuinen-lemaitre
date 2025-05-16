import type { MetadataRoute } from "next"
import { getSitemap } from "@/lib/payload"

export const dynamic = "force-dynamic"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { docs: pagesDocs = [] } = await getSitemap()

  return [
    ...pagesDocs.map(({ path, updatedAt }) => ({
      url: `${SITE_URL}${path === "/home" ? "" : path}`,
      lastModified: updatedAt ?? new Date().toISOString(),
    })),
  ]
}
