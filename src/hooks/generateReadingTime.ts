import { CollectionBeforeValidateHook } from "payload"
import {
  consolidateHTMLConverters,
  convertLexicalToHTML,
  defaultEditorConfig,
  defaultEditorFeatures,
  HTMLConverterFeature,
  sanitizeServerEditorConfig,
} from "@payloadcms/richtext-lexical"
import { calculateReadingTime } from "@/lib/utils"

export const generateReadingTime: CollectionBeforeValidateHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation === "create" || operation === "update") {
    const editorConfig = defaultEditorConfig
    editorConfig.features = [...defaultEditorFeatures, HTMLConverterFeature({})]

    const sanitizedEditorConfig = await sanitizeServerEditorConfig(
      editorConfig,
      req.payload.config,
    )

    const html = await convertLexicalToHTML({
      converters: consolidateHTMLConverters({
        editorConfig: sanitizedEditorConfig,
      }),
      data: data!.content,
      req,
    })

    return {
      ...data,
      readingTime: calculateReadingTime(html),
    }
  }
}
