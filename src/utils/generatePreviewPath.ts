import { CollectionSlug } from "payload"
import { createHmac } from "node:crypto"

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: "",
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  value: string
  where?: string
}

// The preview URL carries this token, not the Payload secret. The draft route checks it before it
// starts Payload, so a bot that requests a preview URL does not open a database connection.
export function previewToken(collection: string, value: string) {
  return createHmac("sha256", process.env.PAYLOAD_SECRET || "")
    .update(`${collection}/${value}`)
    .digest("hex")
}

export const generatePreviewPath = ({ collection, value, where }: Props) => {
  const params = {
    token: previewToken(collection, value),
    collection,
    value,
    where: where || (collection === "pages" ? "path" : "slug"),
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  return `${process.env.NEXT_PUBLIC_SITE_URL}/api/draft?${encodedParams.toString()}`
}
