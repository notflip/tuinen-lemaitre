import { draftMode } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  const draft = await draftMode()
  draft.disable()
  return new Response("Draft mode is disabled")
}
