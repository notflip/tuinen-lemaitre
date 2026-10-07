import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { type CollectionSlug, getPayload } from "payload"
import config from "@payload-config"
import { previewToken } from "@/utils/generatePreviewPath"

// Apply collection prefix mapping before redirecting
const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: "",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const collection = searchParams.get("collection") as CollectionSlug
  const fieldValue = searchParams.get("value")

  if (!fieldValue) {
    return new Response("Missing value for live preview", { status: 400 })
  }

  // Check the token before Payload starts. A request without a valid token does not open a
  // database connection.
  if (searchParams.get("token") !== previewToken(collection, fieldValue)) {
    return new Response("Invalid token", { status: 401 })
  }

  const payload = await getPayload({ config })

  // Only a signed-in editor can turn on draft mode.
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const whereField =
    searchParams.get("where") || (collection === "pages" ? "path" : "slug")

  // Verify the given slug exists
  try {
    const docs = await payload.find({
      collection: collection,
      draft: true,
      where: {
        [whereField]: {
          equals: fieldValue,
        },
      },
    })

    if (!docs.docs.length) {
      return new Response("Document not found", { status: 404 })
    }
  } catch (error) {
    payload.logger.error({ err: error }, "Error verifying token for live preview:")
    return new Response("Internal Server Error", { status: 500 })
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode()
  draft.enable()

  const prefix = collectionPrefixMap[collection] || ""
  const redirectUrl = `${prefix}${fieldValue.startsWith("/") ? "" : "/"}${fieldValue}`
  redirect(redirectUrl)
}
