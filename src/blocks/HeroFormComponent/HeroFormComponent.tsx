import { BlockContainer } from "@/blocks/BlockContainer"
import { Form } from "@/components/form/form"
import { ImageBox } from "@/components/ImageBox"
import { HeroForm } from "@payload-types"

export const HeroFormComponent: React.FC<HeroForm> = (props) => {
  if (typeof props.form === "number") {
    throw new Error("Expected form to be of type Form, but got a number.")
  }

  const { form, title, content, image, ...rest } = props

  return (
    <BlockContainer {...rest}>
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-32">
        <div className="w-full lg:w-1/2">
          <h1 className="mb-8">{title}</h1>
          {content && <p className="mb-8 max-w-prose">{content}</p>}
          <Form form={form} />
        </div>
        {image && (
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative min-h-[400px] lg:max-w-[42rem]">
            {image && (
              <ImageBox
                fill
                media={image}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="rounded-[16px]"
              />
            )}
          </div>
        )}
      </div>
    </BlockContainer>
  )
}
