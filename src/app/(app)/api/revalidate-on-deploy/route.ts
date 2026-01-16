import { revalidatePath } from "next/cache"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.PAYLOAD_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidatePath("/", "layout")

  return Response.json({ revalidated: true, now: Date.now() })
}
