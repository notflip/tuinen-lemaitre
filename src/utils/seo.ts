import { Media, Page } from "@payload-types"

/**
 * getTitle
 * return the page seo title, or the page title, the website name will be appended in the layout.tsx
 */
export function getTitle(page: Page | null): string | undefined {
  return page?.seo?.title?.trim() ? page.seo.title : (page?.title ?? undefined)
}

/**
 * getDescription
 */
export function getDescription(page: Page | null): string | undefined {
  return page?.seo?.description?.trim() ? page.seo.description : undefined
}

/**
 * getOgImage
 */
export function getOgImage(
  image: number | Media | null | undefined,
): { url: string } | null {
  if (!image || typeof image !== "object" || !("url" in image)) {
    return null
  }

  const media = image as Media
  const ogImageUrl = media.sizes?.og?.url || media.url

  if (!ogImageUrl) {
    return null
  }

  return {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${ogImageUrl}`,
  }
}
