import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { type CollectionSlug, getPayload } from "payload"
import config from "@payload-config"

// Apply collection prefix mapping before redirecting
const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: "",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const secret = searchParams.get("secret")

  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  const collection = searchParams.get("collection") as CollectionSlug
  const fieldValue = searchParams.get("value")

  if (!fieldValue) {
    return new Response("Missing value for live preview", { status: 400 })
  }

  const whereField =
    searchParams.get("where") || (collection === "pages" ? "path" : "slug")

  const payload = await getPayload({ config })

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
    payload.logger.error("Error verifying token for live preview:", error)
    return new Response("Internal Server Error", { status: 500 })
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode()
  draft.enable()

  const prefix = collectionPrefixMap[collection] || ""
  const redirectUrl = `${prefix}${fieldValue.startsWith("/") ? "" : "/"}${fieldValue}`
  redirect(redirectUrl)
}
