"use client"
import { useRowLabel } from "@payloadcms/ui"

export const ArrayRowLabel = () => {
  const { data } = useRowLabel<{ label?: string }>()
  return <div>{data.label ?? ""}</div>
}
