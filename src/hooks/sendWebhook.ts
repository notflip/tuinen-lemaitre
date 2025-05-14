import type { Form, Submission } from "@payload-types"
import { CollectionAfterChangeHook } from "payload"
import { APIError } from "payload"

export const SendWebhook: CollectionAfterChangeHook<Submission> = async ({
  doc,
  operation,
  req: { payload },
}) => {
  if (operation === "create") {
    const { data, form } = doc

    const { webhook_url } = form as Form
    if (!webhook_url) {
      return doc
    }

    try {
      const res = await fetch(webhook_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new APIError(`Webhook responded ${res.status}: ${text || res.statusText}`)
      }
    } catch (err: any) {
      // if you want the submission to succeed even if the webhook fails,
      // comment out the throw and maybe just console.error it.
      console.error("Error calling submission webhook:", err)
      throw new APIError("Failed to notify webhook of new submission.")
    }

    // if (!website_emails?.length) {
    //   throw new APIError(
    //     "Not a single website email address is available to send form submission to.",
    //   )
    // }

    // await payload.sendEmail({
    //   to: website_emails.map((m) => m.email),
    //   from: process.env.MAIL_FROM,
    //   subject: "💌 Contactaanvraag via website",
    //   html: await RenderedEmail({ doc }),
    // })
  }

  return doc
}
