import { NextResponse } from "next/server"

export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/redirects?[from]=true&to[reference]=true&depth=1`,
    {
      next: {
        revalidate: 86400,
        tags: ["global_redirects"],
      },
    },
  )

  const data = await response.json()
  return NextResponse.json(data, { status: 200 })
}
