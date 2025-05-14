"use client"

import { useField } from "@payloadcms/ui"
import { SelectInput, FieldLabel } from "@payloadcms/ui"
import * as HiIcons from "react-icons/hi2" // Import Ant Design icons as an example
import { IconType } from "react-icons"
import { SelectFieldClientComponent, SelectFieldClientProps } from "payload"

// Combine all desired icon packs
const icons: { [key: string]: IconType } = { ...HiIcons }

// Generate options for the select input
const iconOptions = Object.keys(icons).map((key) => ({
  label: key,
  value: key,
}))

const ReactIconsSelect: React.FC<SelectFieldClientProps> = (props) => {
  const { field, path } = props
  const { label } = field

  const { value, setValue } = useField<string>({ path })

  const handleChange = (selectedOption: any) => {
    setValue(selectedOption.value)
  }

  const IconPreview = value ? icons[value] : null

  return (
    <div>
      {label && <FieldLabel htmlFor={`field-${path}`} label={label} />}
      <SelectInput
        path={path}
        name={path}
        value={value || undefined}
        options={iconOptions}
        onChange={handleChange}
        isClearable
      />
      {IconPreview && (
        <div style={{ marginTop: "10px" }}>
          <p>Icon Preview:</p>
          <IconPreview size={24} />
        </div>
      )}
    </div>
  )
}

export default ReactIconsSelect
