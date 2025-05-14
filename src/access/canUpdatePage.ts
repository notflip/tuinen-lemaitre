import type { Access } from "payload"
import { nonEditablePages } from "@/config"

export const canUpdatePage: Access = ({ req }) => {
  const { user, data } = req

  if (user?.role === "admin") {
    return true
  }

  if (user) {
    // If the page is new (no slug yet), allow updates
    if (!data?.slug) {
      return true
    }

    return {
      slug: {
        not_in: nonEditablePages,
      },
    }
  }

  return false
}
