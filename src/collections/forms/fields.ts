import type { Block, Field } from "payload"

const name: Field = {
  name: "name",
  type: "text",
  label: "Name (lowercase, no special characters)",
  required: true,
}

const label: Field = {
  name: "label",
  type: "text",
  label: "Label",
  localized: true,
}

const required: Field = {
  name: "required",
  type: "checkbox",
  label: "Required",
}

const placeholder: Field = {
  name: "placeholder",
  type: "text",
  label: "Placeholder",
}

const Radio: Block = {
  slug: "radio",
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "options",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              admin: {
                width: "50%",
              },
              label: "Label",
              localized: true,
              required: true,
            },
            {
              name: "value",
              type: "text",
              admin: {
                width: "50%",
              },
              label: "Value",
              required: true,
            },
          ],
        },
      ],
      label: "Radio Attribute Options",
      labels: {
        plural: "Options",
        singular: "Option",
      },
    },
    required,
  ],
  labels: {
    plural: "Radio Fields",
    singular: "Radio",
  },
}

const Select: Block = {
  slug: "select",
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...placeholder,
        },
      ],
    },
    {
      name: "options",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              admin: {
                width: "50%",
              },
              label: "Label",
              localized: true,
              required: true,
            },
            {
              name: "value",
              type: "text",
              admin: {
                width: "50%",
              },
              label: "Value",
              required: true,
            },
          ],
        },
      ],
      label: "Select Attribute Options",
      labels: {
        plural: "Options",
        singular: "Option",
      },
    },
    required,
  ],
  labels: {
    plural: "Select Fields",
    singular: "Select",
  },
}

const Text: Block = {
  slug: "text",
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    required,
  ],
  labels: {
    plural: "Text Fields",
    singular: "Text",
  },
}

const TextArea: Block = {
  slug: "textarea",
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    required,
  ],
  labels: {
    plural: "Text Area Fields",
    singular: "Text Area",
  },
}

const Number: Block = {
  slug: "number",
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    required,
  ],
  labels: {
    plural: "Number Fields",
    singular: "Number",
  },
}

const Email: Block = {
  slug: "email",
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    required,
  ],
  labels: {
    plural: "Email Fields",
    singular: "Email",
  },
}

const Checkbox: Block = {
  slug: "checkbox",
  fields: [
    {
      type: "row",
      fields: [
        {
          ...name,
          admin: {
            width: "50%",
          },
        },
        {
          ...label,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          ...required,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "defaultValue",
      type: "checkbox",
      label: "Default Value",
    },
  ],
  labels: {
    plural: "Checkbox Fields",
    singular: "Checkbox",
  },
}

const Message: Block = {
  slug: "message",
  fields: [
    {
      name: "message",
      type: "richText",
      localized: true,
    },
  ],
  labels: {
    plural: "Message Blocks",
    singular: "Message",
  },
}

export const fields = {
  checkbox: Checkbox,
  email: Email,
  message: Message,
  number: Number,
  radio: Radio,
  select: Select,
  text: Text,
  textarea: TextArea,
} as {
  [key: string]: ((fieldConfig?: boolean | Partial<Field>) => Block) | Block
}
