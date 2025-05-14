import { Field } from "payload"

const IconField: Field = {
  name: "icon",
  label: "Select an Icon",
  type: "text",
  required: true,
  admin: {
    components: {
      Field: "@/fields/icon/IconFieldSelect",
    },
  },
}

export default IconField
