import type { FieldHook } from "payload"

export const generateSlug = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase()

export const generateSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === "string") {
      return generateSlug(value)
    }

    // If the operation is create, use the fallback (title) field
    if (operation === "create" || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === "string") {
        return generateSlug(fallbackData)
      }
    }

    return value
  }
