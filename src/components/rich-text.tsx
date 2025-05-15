import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextReact,
} from "@payloadcms/richtext-lexical/react"
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical"
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { cn } from "@/lib/utils"

import { JsonObject } from "payload"
import { InlineCardsComponent } from "@/blocks/InlineCards/InlineCardsComponent"
import { InlineCards } from "@payload-types"

type NodeTypes = DefaultNodeTypes | SerializedEditorState<SerializedBlockNode>

type BlockNodeProps<TBlock extends JsonObject> = {
  node: SerializedBlockNode<TBlock>
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object")
  }
  const slug = value.slug

  switch (relationTo) {
    case "pages":
      return `/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    inlineCards: ({ node }: BlockNodeProps<InlineCards>) => (
      <InlineCardsComponent {...node.fields} />
    ),
  },
})

type RichTextProps = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: RichTextProps) {
  const { data, ...rest } = props

  return (
    <RichTextReact
      converters={jsxConverters}
      className={cn("prose xl:prose-xl")}
      data={data}
      {...rest}
    />
  )
}
