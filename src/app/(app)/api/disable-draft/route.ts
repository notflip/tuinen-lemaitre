import { draftMode } from "next/headers"

// Anyone can turn off draft mode. It does not start Payload, and the admin bar calls it without
// a secret.
export async function GET() {
  const draft = await draftMode()
  draft.disable()
  return new Response("Draft mode is disabled")
}
