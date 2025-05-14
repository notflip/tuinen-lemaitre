import { BlockContainer } from "@/blocks/BlockContainer"
import { Form } from "@/components/form/form"
import { FormBlock } from "@payload-types"

export const FormBlockComponent: React.FC<FormBlock> = (props) => {
  if (typeof props.form === "number") {
    throw new Error("Expected form to be of type Form, but got a number.")
  }

  const { form, title, text, ...rest } = props

  return (
    <BlockContainer {...rest}>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8">{title}</h1>
        {text && <p className="mb-8 max-w-prose">{text}</p>}
        <Form form={form} />
      </div>
    </BlockContainer>
  )
}
