import { unstable_cache } from "next/cache"
import { getSiteSettings } from "@/lib/payload"

// TODO merge with getGlobals
// TODO merge CmsLink and MenuLink see VS code example

export const getCachedSiteSettings = unstable_cache(
  async () => {
    return await getSiteSettings()
  },
  ["site-settings"],
  { tags: ["site-settings"] },
)
