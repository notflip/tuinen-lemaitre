import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  PayloadRequest,
} from "payload"

import type { Page } from "@payload-types"
import { revalidatePath, revalidateTag } from "next/cache"

// The navigation and the footer link to pages by reference, so they show the page path and title.
const revalidatePageTags = (path: string | null | undefined) => {
  revalidatePath(path === "/home" ? "/" : `${path}`)
  revalidateTag("pages")
  revalidateTag("global_navigation_main")
  revalidateTag("global_footer")
}

/**
 * Whether the main row of the page is published. A draft save writes only a version, so the main
 * row is what the site shows.
 */
async function isLive(req: PayloadRequest, id: number | string) {
  const row = await req.payload.db.findOne<{ id: number | string; _status?: string }>({
    collection: "pages",
    where: { id: { equals: id } },
    select: { _status: true },
    req,
  })

  return row?._status === "published"
}

/**
 * Keeps whether the page was live before the save. `previousDoc` cannot tell this: it is the
 * latest version, and that is a draft when the editor saved a draft first.
 */
export const recordPageLive: CollectionBeforeChangeHook<Page> = async ({ originalDoc, req }) => {
  if (!originalDoc || req.context.disableRevalidate) return

  req.context[`live:pages:${originalDoc.id}`] =
    originalDoc._status === "published" || (await isLive(req, originalDoc.id))
}

/**
 * Clears the caches when the page was live before the save or is live after it. A draft save
 * changes nothing that a visitor sees, so it keeps the caches.
 */
export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  req,
}) => {
  if (req.context.disableRevalidate) return doc

  // A draft that was not live, or a draft save on top of a live page: the main row still holds
  // what the site shows.
  if (
    doc._status !== "published" &&
    (!req.context[`live:pages:${doc.id}`] || (await isLive(req, doc.id)))
  ) {
    return doc
  }

  req.payload.logger.info(`Revalidating page at path: ${doc.path}`)
  revalidatePageTags(doc.path)

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) revalidatePageTags(doc?.path)

  return doc
}
