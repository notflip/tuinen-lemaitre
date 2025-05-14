import { getCachedGlobal } from "@/utils/getGlobals"
import type { Media } from "@payload-types"

async function defaultOpenGraph() {
  const settings = await getCachedGlobal("settings")()
  const ogImage = settings.seo.image as Media
  const ogImageUrl = ogImage?.sizes?.og?.url || ogImage?.url || ""

  return {
    type: "website",
    images: ogImageUrl ? [{ url: ogImageUrl }] : [],
  }
}

export const mergeOpenGraph = async (og: any) => {
  const defaultValues = await defaultOpenGraph()

  return {
    ...defaultValues,
    ...og,
    images: og?.images ? og.images : defaultValues.images,
  }
}
