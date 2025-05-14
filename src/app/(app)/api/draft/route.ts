import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { type CollectionSlug, getPayload } from "payload"
import config from "@payload-config"

// Apply collection prefix mapping before redirecting
const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: "/blog",
  pages: "",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const collection = searchParams.get("collection") as CollectionSlug
  const fieldValue = searchParams.get("value")

  if (!fieldValue) {
    return new Response("Missing value for live preview", { status: 400 })
  }

  const whereField =
    searchParams.get("where") || (collection === "pages" ? "path" : "slug")

  const payload = await getPayload({ config })

  // Check the secret and next parameters
  // This secret should only be known to this Route Handler and the CMS
  // if (secret !== process.env.PAYLOAD_SECRET || !slug) {
  //   return new Response("Invalid token", { status: 401 });
  // }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  // const post = await getPostBySlug(slug);

  // If the slug doesn't exist prevent draft mode from being enabled
  // if (!post) {
  // return new Response("Invalid slug", { status: 401 });
  // }

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
