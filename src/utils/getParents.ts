import type { BasePayload, CollectionSlug } from "payload"

type GetParentsParams<S extends CollectionSlug> = {
  payload: BasePayload
  parentFieldSlug?: string
  collectionSlug: S
  doc: Record<string, any>
  docs?: Array<Record<string, any>>
}

export const getParents = async <S extends CollectionSlug>({
  payload,
  parentFieldSlug = "parent",
  collectionSlug,
  doc,
  docs = [],
}: GetParentsParams<S>): Promise<Array<Record<string, any>>> => {
  const parent = doc[parentFieldSlug]

  if (!parent) {
    return docs
  }

  let retrievedParent

  if (typeof parent === "string" || typeof parent === "number") {
    retrievedParent = await payload.findByID({
      id: parent,
      collection: collectionSlug,
      depth: 0,
      disableErrors: true,
    })
  } else if (typeof parent === "object") {
    retrievedParent = parent
  } else {
    return docs
  }

  if (!retrievedParent) {
    return docs
  }

  if (retrievedParent[parentFieldSlug]) {
    return getParents({
      payload,
      parentFieldSlug,
      collectionSlug,
      doc: retrievedParent,
      docs: [retrievedParent, ...docs],
    })
  }

  return [retrievedParent, ...docs]
}
