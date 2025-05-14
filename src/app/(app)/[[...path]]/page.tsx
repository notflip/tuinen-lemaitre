import { LivePreviewListener } from "@/components/LivePreviewListener"
import { draftMode } from "next/headers"
import Blocks from "@/blocks/Blocks"
import { getCachedDocumentByPath } from "@/utils/getDocumentPath"

import { getPayload } from "payload"
import config from "@payload-config"
import { getCachedGlobal } from "@/utils/getGlobals"
import { getDescription, getOgImage, getTitle } from "@/utils/seo"
import { mergeOpenGraph } from "@/utils/mergeOpenGraph"
import { PayloadRedirects } from "@/components/payload-redirects"
import { notFound } from "next/navigation"

interface DocPageProps {
  params: Promise<{
    path: string
  }>
}

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return []
  }
  const payload = await getPayload({
    config,
  })
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      path: true,
    },
  })

  return pages.docs.map(({ path }) => ({
    path: path?.split("/").filter(Boolean) ?? [],
  }))
}

export async function generateMetadata({ params }: DocPageProps) {
  const path = (await params).path || "home"
  const page = await getCachedDocumentByPath(path, "pages")

  const pageDescription = getDescription(page)

  return {
    title: getTitle(page),
    ...(pageDescription ? { description: pageDescription } : {}),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.path === "/home" ? "/" : page?.path}`,
    },
    openGraph: await mergeOpenGraph({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.path === "/home" ? "/" : page?.path}`,
      images: getOgImage(page?.seo?.image),
    }),
  }
}

// Component
export default async function Page({ params }: { params: any }) {
  const settings = await getCachedGlobal("settings")()
  const { isEnabled: draft } = await draftMode()

  const path = (await params).path || "home"
  const page = await getCachedDocumentByPath(path, "pages")

  if (!page) {
    return <PayloadRedirects path={`/${path.join('/')}`} />
  }

  // JSONLD
  // Generate it here: https://technicalseo.com/tools/schema-markup-generator/
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.website_title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.path === "/home" ? "/" : page.path}`,
    email: settings.website_emails?.length ? settings.website_emails[0].email : "",
    telephone: settings.website_phone ?? "",
  }

  return (
    <div>
      {draft && <LivePreviewListener />}

      <div>
        {/*@ts-ignore*/}
        <Blocks blocks={page.blocks} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
