import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@radix-ui/*",
      "react-icons/*",
      "@react-email",
      "@react-email/tailwind",
    ],
  },

  images: {
    dangerouslyAllowSVG: true,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

export default withBundleAnalyzer(withPayload(nextConfig))
