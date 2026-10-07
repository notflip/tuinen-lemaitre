import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload"

import { revalidateTag } from "next/cache"

export const revalidateRedirects: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating redirects`)
    revalidateTag("global_redirects")
  }

  return doc
}

export const revalidateRedirectsDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating redirects`)
    revalidateTag("global_redirects")
  }

  return doc
}
