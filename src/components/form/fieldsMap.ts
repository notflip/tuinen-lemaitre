import { CheckboxField } from "@/components/form/CheckboxField"
import { TextField } from "@/components/form/TextField"
import { TextareaField } from "@/components/form/TextareaField"
import { EmailField } from "@/components/form/EmailField"

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
