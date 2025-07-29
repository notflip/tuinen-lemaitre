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
  
  async redirects() {
    return [
      {
        source: "/:path*/page",
        destination: "/:path*/page/1",
        permanent: true,
      },
    ]
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

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
