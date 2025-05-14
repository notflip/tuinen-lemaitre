import type React from "react"
import { getCachedRedirects } from "@/utils/getRedirects"
import { notFound, permanentRedirect, redirect } from "next/navigation"

interface Props {
  disableNotFound?: boolean
  path: string
}

/**
 * PayloadRedirects
 * Right now this is the only way to use revalidateTag with redirects (next.config and middleware don't allow this.
 */
export const PayloadRedirects: React.FC<Props> = async ({ path }) => {
  const redirects = await getCachedRedirects()()

  if (!redirects || redirects.length === 0) {
    notFound()
  }

  const redirectItem = redirects.find((redirect) => redirect.from === path)
  if (redirectItem) {
    if (redirectItem.type === "301") {
      permanentRedirect(redirectItem.to)
    } else {
      redirect(redirectItem.to)
    }
  }
  notFound()
}
