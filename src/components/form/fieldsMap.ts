import { CheckboxField } from "@/components/form/checkbox-field"
import { TextField } from "@/components/form/text-field"
import { TextareaField } from "@/components/form/textarea-field"
import { EmailField } from "@/components/form/email-field"

export const fieldsMap = {
  text: TextField,
  checkbox: CheckboxField,
  email: EmailField,
  textarea: TextareaField,
  // message: TextField,
  // number: TextField,
  // select: TextField,
  state: () => null,
  payment: () => null,
}
