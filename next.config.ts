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

export default withPayload(nextConfig)
