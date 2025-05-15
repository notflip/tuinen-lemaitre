import { Content } from "@payload-types"
import RichText from "@/components/rich-text"
import { BlockContainer } from "@/blocks/BlockContainer"

export const ContentComponent: React.FC<Content> = (props) => {
  const { content } = props

  return <BlockContainer {...props}>{content && <RichText data={content} />}</BlockContainer>
}
