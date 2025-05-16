import { Content } from "@payload-types"
import RichText from "@/components/rich-text"
import { BlockContainer } from "@/blocks/BlockContainer"

export const ContentComponent: React.FC<Content> = (props) => {
  const { content } = props

  return (
    <BlockContainer {...props}>
      <div className="py-24 lg:py-32">{content && <RichText data={content} />}</div>
    </BlockContainer>
  )
}
