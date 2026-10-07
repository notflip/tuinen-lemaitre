import normalizePath from "@/utils/normalizePath"
import { Config } from "@payload-types"
import config from "@payload-config"
import { draftMode } from "next/headers"
import { getPayload, type CollectionSlug } from "payload"
import { cache } from "react"
import { unstable_cache } from "next/cache"
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
  const normalizedPath = normalizePath(path, false)

  const collectionsToSearch = collection ? [collection] : PATH_UNIQUE_AGINST_COLLECTIONS

  // Draft mode is for editors only. It reads the database directly.
  if (draft) return findDocumentByPath(normalizedPath, collectionsToSearch, true)

  // Public requests read from the cache. The save hooks clear the collection tags.
  return unstable_cache(
    () => findDocumentByPath(normalizedPath, collectionsToSearch, false),
    ["document_by_path", normalizedPath, ...collectionsToSearch],
    { tags: [...collectionsToSearch], revalidate: false },
  )()
}

async function findDocumentByPath(
  normalizedPath: string,
  collectionsToSearch: readonly CollectionSlug[],
  draft: boolean,
): Promise<CollectionDocuments | null> {
  const payload = await getPayload({
    config,
  })

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
      }),
  )

  // Let a failed query throw. The cache must not keep a missing page after a database error.
  return (await Promise.all(queries)).find((doc) => doc !== null) ?? null
}

export const getCachedDocumentByPath = cache(getDocumentByPath)
