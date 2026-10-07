import config from "@payload-config"
import { getPayload } from "payload"
import { unstable_cache } from "next/cache"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import normalizePath from "@/utils/normalizePath"

/**
 * Returns every valid public path: the path of each published page and the `from` of each
 * redirect. The page and redirect save hooks clear the tags. Bots request many URLs that do not
 * exist, and each new URL missed the page cache and woke the database.
 */
const getCachedRoutes = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const [pages, redirects] = await Promise.all([
      payload.find({
        collection: "pages",
        draft: false,
        depth: 0,
        limit: 0,
        pagination: false,
        where: { _status: { equals: "published" } },
        select: { path: true },
      }),
      payload.find({
        collection: "redirects",
        depth: 0,
        limit: 0,
        pagination: false,
        select: { from: true },
      }),
    ])

    return [
      ...pages.docs.flatMap(({ path }) => (path ? [path] : [])),
      ...redirects.docs.map(({ from }) => from),
    ]
  },
  ["routes"],
  { tags: ["pages", "global_redirects"], revalidate: false },
)

/**
 * Calls notFound() when no published page or redirect has the path. Draft mode skips the check,
 * so editors can preview a page that is not published.
 */
export async function notFoundIfUnknownPath(path: string | string[]) {
  if ((await draftMode()).isEnabled) return

  if (!(await getCachedRoutes()).includes(normalizePath(path))) notFound()
}
