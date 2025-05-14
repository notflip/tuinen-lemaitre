import generateBreadcrumbsUrl from "@/utils/generateBreadcrumbsUrl"
import deepmerge from "deepmerge"
import type {
  BasePayload,
  CollectionSlug,
  Field,
  Payload,
  Where,
} from "payload"
import { APIError } from "payload"
import generateRandomString from "@/utils/generateRandomString"
import { getParents } from "@/utils/getParents"

export const PATH_UNIQUE_AGINST_COLLECTIONS = [
  "pages",
] as const satisfies CollectionSlug[]
export const FIELD_TO_USE_FOR_PATH = "slug" as const

type WillPathConflictParams = {
  payload: Payload
  path: string
  originalDoc?: { id?: string }
  collection: CollectionSlug
  uniquePathFieldCollections?: CollectionSlug[] | ReadonlyArray<CollectionSlug>
}

export const willPathConflict = async ({
  payload,
  path,
  originalDoc,
  collection,
  uniquePathFieldCollections = [],
}: WillPathConflictParams): Promise<boolean> => {
  if (!payload || !uniquePathFieldCollections.includes(collection)) return false

  const queries = uniquePathFieldCollections.map((targetCollection) => {
    const whereCondition: Where = {
      path: { equals: path },
    }
    if (originalDoc?.id && collection === targetCollection) {
      whereCondition.id = { not_equals: originalDoc.id }
    }

    return payload.find({
      collection: targetCollection,
      where: whereCondition,
      limit: 1,
      pagination: false,
    })
  })

  const results = await Promise.allSettled(queries)
  return results.some(
    (result) =>
      result.status === "fulfilled" &&
      (result as PromiseFulfilledResult<any>).value.docs.length > 0,
  )
}

type GenerateDocumentPathParams = {
  payload: BasePayload
  collection: CollectionSlug
  currentDoc: any
  operation?: string
  fieldToUse: string
}

export async function generateDocumentPath({
  payload,
  collection,
  currentDoc,
  operation,
  fieldToUse,
}: GenerateDocumentPathParams): Promise<string> {
  if (!currentDoc?.[fieldToUse] || !collection) {
    return `/${currentDoc?.id || generateRandomString(20)}`
  }

  const breadcrumbs = currentDoc?.breadcrumbs
  const newPath = breadcrumbs?.at(-1)?.url
  if (newPath) return newPath

  const docs = await getParents({
    payload,
    parentFieldSlug: "parent",
    collectionSlug: collection,
    doc: currentDoc,
    docs: [currentDoc],
  })

  return generateBreadcrumbsUrl(docs, currentDoc)
}

const pathField = (
  uniquePathFieldCollections: CollectionSlug[] | ReadonlyArray<CollectionSlug>,
  fieldToUse: string,
  overrides?: Partial<Field>,
): Field[] => {
  return [
    {
      name: "_collection",
      type: "text",
      admin: {
        hidden: true,
      },
      virtual: true,
      hooks: {
        beforeValidate: [({ collection }) => collection?.slug || null],
      },
    },
    deepmerge<Field>(
      {
        type: "text",
        name: "path",
        unique: true,
        index: true,
        hooks: {
          beforeDuplicate: [
            () => {
              return `/${generateRandomString(20)}`
            },
          ],
          beforeChange: [
            async ({
              collection,
              data,
              req,
              siblingData,
              originalDoc,
              operation,
            }) => {
              if (!collection) {
                throw new APIError(
                  "Collection is null.",
                  400,
                  [
                    {
                      field: fieldToUse,
                      message: "Collection is required.",
                    },
                  ],
                  false,
                )
              }

              const currentDoc = { ...originalDoc, ...siblingData }

              const newPath = await generateDocumentPath({
                payload: req.payload,
                collection: collection.slug as CollectionSlug,
                currentDoc,
                operation,
                fieldToUse,
              })

              const isNewPathConflicting = await willPathConflict({
                payload: req.payload,
                path: newPath,
                originalDoc,
                collection: collection.slug as CollectionSlug,
                uniquePathFieldCollections,
              })

              if (isNewPathConflicting) {
                throw new APIError(
                  `This ${fieldToUse} will create a conflict with an existing path.`,
                  400,
                  [
                    {
                      field: fieldToUse,
                      message: `This ${fieldToUse} will create a conflict with an existing path.`,
                    },
                  ],
                  false,
                )
              }
              if (data) data.path = newPath
              return newPath
            },
          ],
        },
        admin: {
          position: "sidebar",
          readOnly: true,
        },
      },
      overrides || {},
    ),
  ]
}

export default pathField
