import "./globals.css"
import { GoogleTagManager } from "@next/third-parties/google"
import { AdminBar } from "@/components/admin-bar"
import { draftMode } from "next/headers"
import { Nav } from "@/components/nav"

import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { getCachedGlobal } from "@/utils/getGlobals"

import { Work_Sans, DM_Mono } from "next/font/google"
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-workSans" })
const dmMono = DM_Mono({ subsets: ["latin"], weight: "400", variable: "--font-dmMono" })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedGlobal("settings")()

  // OpenGraph tags are not defined here, we define these on each page.tsx
  // This is because Next.js doesn't merge the opengraph properties
  //
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    title: {
      template: `%s | ${siteSettings.website_title}`,
      default: siteSettings.website_title,
    },
    description: siteSettings.seo.description,
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isEnabled } = await draftMode()
  const websiteSettings = await getCachedGlobal("settings")()

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${workSans.variable} ${dmMono.variable} font-sans text-base text-foreground antialiased relative`}
      >
        <Nav settings={websiteSettings} />
        {children}
        <AdminBar draft={isEnabled} />
        <Footer />
      </body>
      {process.env.NODE_ENV === "production" && process.env.GTM_ID && (
        <GoogleTagManager gtmId={process.env.GTM_ID} />
      )}
    </html>
  )
}
