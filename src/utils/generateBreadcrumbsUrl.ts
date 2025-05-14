const collectionPrefixMap: Record<string, string> = {
  posts: "/blog",
}

export default function generateBreadcrumbsUrl(docs: any, lastDoc: any) {
  const prefix = collectionPrefixMap[lastDoc._collection] ?? ""
  const result = docs.reduce(
    (url: any, doc: any) => `${url}/${doc.slug ?? ""}`,
    prefix,
  )

  if (result === "/home") {
    return "/"
  }

  return result
}
