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

// import type { InlineListBlock, MediaBlock } from "@payload-types"
// import { MediaBlockComponent } from "@/blocks/MediaBlock/MediaBlockComponent"
// import { InlineListBlockComponent } from "@/blocks/InlineListBlockComponent"
import { JsonObject } from "payload"

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
    case "cases":
      return `/projecten/${slug}`
    case "pages":
      return `/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {},
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
