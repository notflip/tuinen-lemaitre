import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Pass current path to downstream server components
  const headers = new Headers(request.headers)
  headers.set("x-current-path", request.nextUrl.pathname)
  return NextResponse.next({ headers })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - admin (Admin routes)
     * - app/api
     */
    "/((?!api|admin|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
