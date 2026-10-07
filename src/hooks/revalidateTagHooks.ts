import type { CollectionAfterDeleteHook } from "payload"
import { revalidateTag } from "next/cache"

/**
 * Returns the afterChange and afterDelete hooks that clear the cache tags. The public pages read
 * from caches without a time limit, so a save must clear the tags.
 */
export const revalidateTagHooks = (...tags: string[]) => {
  const hook = ({
    doc,
    req: { payload, context },
  }: Pick<Parameters<CollectionAfterDeleteHook>[0], "doc" | "req">) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating tags ${tags.join(", ")}`)
      tags.forEach((tag) => revalidateTag(tag))
    }

    return doc
  }

  return { afterChange: [hook], afterDelete: [hook] }
}
