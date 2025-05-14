import normalizePath from "@/utils/normalizePath"
import { Config } from "@payload-types"
import config from "@payload-config"
import { draftMode } from "next/headers"
import { getPayload, type CollectionSlug } from "payload"
import { cache } from "react"
import { PATH_UNIQUE_AGINST_COLLECTIONS } from "@/fields/path/path"

type PathUniqueCollection = (typeof PATH_UNIQUE_AGINST_COLLECTIONS)[number]
type CollectionDocument<K extends keyof Config["collections"]> = Config["collections"][K] & {
  _collection: K
}
type CollectionDocuments = {
  [K in keyof Config["collections"]]: CollectionDocument<K>
}[keyof Config["collections"]]

type PathUniqueCollectionDocuments = {
  [K in PathUniqueCollection]: CollectionDocument<K>
}[PathUniqueCollection]

export async function getDocumentByPath<S extends keyof Config["collections"]>(
  path: string | string[],
  collection: S,
): Promise<CollectionDocument<S> | null>
export async function getDocumentByPath(
  path: string | string[],
): Promise<PathUniqueCollectionDocuments | null>

export async function getDocumentByPath(
  path: string | string[],
  collection?: CollectionSlug,
): Promise<CollectionDocuments | null> {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({
    config,
  })
  const normalizedPath = normalizePath(path, false)

  const collectionsToSearch = collection ? [collection] : PATH_UNIQUE_AGINST_COLLECTIONS

  const queries = collectionsToSearch.map((collectionSlug) =>
    payload
      .find({
        collection: collectionSlug,
        draft,
        limit: 1,
        overrideAccess: draft,
        where: { path: { equals: normalizedPath } },
      })
      .then((result: any) => {
        const doc = result.docs.at(0)
        if (!doc) return null
        return {
          ...doc,
          _collection: collectionSlug,
        } as CollectionDocuments
      })
      .catch(() => null),
  )

  const results = (await Promise.allSettled(queries)).filter(
    (v): v is PromiseFulfilledResult<CollectionDocuments | null> => v.status === "fulfilled",
  )

  return results.find((result) => result.value !== null)?.value ?? null
}

export const getCachedDocumentByPath = cache(getDocumentByPath)
