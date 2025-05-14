import { ContentBlock } from "@payload-types"
import RichText from "@/components/RichText"

export const ContentBlockComponent: React.FC<ContentBlock> = (props) => {
  const { content } = props

  return (
    <section className="pt-[3rem] lg:pt-[6rem] pb-[6rem]">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 2xl:px-16">
        {content && <RichText data={content} />}
      </div>
    </section>
  )
}
