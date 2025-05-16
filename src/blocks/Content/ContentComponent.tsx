import { Content } from "@payload-types"
import RichText from "@/components/rich-text"
import { BlockContainer } from "@/blocks/BlockContainer"

export const ContentComponent: React.FC<Content> = (props) => {
  const { content, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className={`${bgColor ? "py-24 lg:py-32" : ""}`}>{content && <RichText data={content} />}</div>
    </BlockContainer>
  )
}
