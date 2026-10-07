import type { CollectionAfterDeleteHook } from "payload"
import { revalidateTag } from "next/cache"

/**
 * Returns the afterChange and afterDelete hooks that clear a cache tag. The public pages read
 * from caches without a time limit, so a save must clear the tag.
 */
export const revalidateTagHooks = (tag: string) => {
  const hook = ({
    doc,
    req: { payload, context },
  }: Pick<Parameters<CollectionAfterDeleteHook>[0], "doc" | "req">) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating tag ${tag}`)
      revalidateTag(tag)
    }

    return doc
  }

  return { afterChange: [hook], afterDelete: [hook] }
}
