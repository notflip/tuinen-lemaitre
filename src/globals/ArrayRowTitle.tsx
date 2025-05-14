"use client"
import { useRowLabel } from "@payloadcms/ui"

export const ArrayRowTitle = () => {
  const { data } = useRowLabel<{ title?: string }>()
  return <div>{data.title ?? ""}</div>
}
