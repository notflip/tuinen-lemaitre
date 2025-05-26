import type { Submission } from "@payload-types"
import { CollectionAfterChangeHook } from "payload"
import  SubmissionEmail from "@/emails/submission-mail"
import { getCachedGlobal } from "@/utils/getGlobals"
import { render } from "@react-email/render"
import { APIError } from "payload"

export const SendSubmissionEmail: CollectionAfterChangeHook<Submission> = async ({
  doc,
  operation,
  req: { payload },
}) => {
  if (operation === "create") {
    const { website_emails } = await getCachedGlobal("settings")()

    if (!website_emails?.length) {
      throw new APIError(
        "Not a single website email address is available to send form submission to.",
      )
    }

    await payload.sendEmail({
      to: website_emails.map((m) => m.email),
      from: process.env.MAIL_FROM,
      subject: "Aanvraag voor afspraak",
      html: await render(<SubmissionEmail doc={doc} />),
    })
  }

  return doc
}
