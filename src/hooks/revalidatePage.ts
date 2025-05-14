import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload"

import type { Page } from "@payload-types"
import { revalidatePath } from "next/cache"

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // If we're publishing now
    if (doc._status === "published") {
      const path = doc.path === "/home" ? "/" : `${doc.path}`
      payload.logger.info(`Revalidating page at path: ${path}`)
      revalidatePath(path)
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === "published" && doc._status !== "published") {
      const oldPath = previousDoc.path === "/home" ? "/" : `${previousDoc.path}`
      payload.logger.info(`Revalidating old page at path: ${oldPath}`)
      revalidatePath(oldPath)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = doc?.path === "/home" ? "/" : `${doc?.path}`
    revalidatePath(path)
  }

  return doc
}
