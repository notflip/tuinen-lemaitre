"use client"

import { TextFieldClientProps } from "payload"
import {
  FieldLabel,
  TextInput,
  useDocumentInfo,
  useField,
  useFormFields,
} from "@payloadcms/ui"
import React, { useEffect } from "react"
import { generateSlug } from "./generateSlugHook"

type SlugComponentProps = {
  fieldToUse: string
} & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = (props) => {
  const { field, fieldToUse, path, readOnly } = props

  const { value, setValue } = useField<string>({ path })
  const { savedDocumentData, hasPublishedDoc } = useDocumentInfo()

  const { label, admin } = field

  // The value of the field we're listening to for the slug
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  useEffect(() => {
    // If the 'title' field has a value
    if (targetFieldValue) {
      const formattedSlug = generateSlug(targetFieldValue)

      // If there is no slug, or if the doc is not published and the slug has changed.
      if (
        !savedDocumentData?.slug ||
        (!hasPublishedDoc && value !== formattedSlug)
      ) {
        setValue(formattedSlug)
      }
    }
  }, [targetFieldValue, savedDocumentData])

  return (
    <div className="field-type">
      <FieldLabel htmlFor={`field-${path}`} label={label} />
      <TextInput
        value={value}
        onChange={setValue}
        path={path}
        readOnly={readOnly}
      />
      <div className="field-description field-description-title">
        {`${admin?.description}`}
      </div>
    </div>
  )
}
