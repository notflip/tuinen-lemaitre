import { link2 } from "@/fields/link2/link2"
import type { Block } from "payload"

export const ContactForm: Block = {
  slug: "contactForm",
  interfaceName: "ContactForm",
  fields: [link2()],
}
export default ContactForm
