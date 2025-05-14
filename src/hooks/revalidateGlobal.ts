import { GlobalAfterChangeHook } from "payload"
import { revalidateTag } from "next/cache"

export const revalidateGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag(`global_${doc.globalType}`)
    console.log(`Revalidating global ${doc.globalType}`)
  }

  return doc
}
