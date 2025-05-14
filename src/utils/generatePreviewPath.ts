import { CollectionSlug } from "payload"

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: "/blog",
  pages: "",
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  value: string
  where?: string
}

export const generatePreviewPath = ({ collection, value, where }: Props) => {
  const params = {
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
