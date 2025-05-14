import { BlockContainer } from "@/blocks/BlockContainer"
import type { TallyEmbed } from "@payload-types"
import EmbedTally from "@/components/embed-tally"

export const TallyEmbedComponent: React.FC<TallyEmbed> = (props) => {
  return (
    <BlockContainer {...props} bgColor="gray">
      <EmbedTally formId="3l42kW" />
    </BlockContainer>
  )
}
