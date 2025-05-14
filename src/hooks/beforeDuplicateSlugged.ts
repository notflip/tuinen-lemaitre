import type { CollectionBeforeValidateHook } from "payload"

const uniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

const beforeDuplicate: CollectionBeforeValidateHook = ({
  data = {},
  operation,
  originalDoc,
}) => {
  if (operation === "create" && originalDoc?.slug) {
    data.title = `${data.title} (copy)`
    data.slug = `${data.slug}-copy-${uniqueId()}`
  }

  return data
}

export default beforeDuplicate
