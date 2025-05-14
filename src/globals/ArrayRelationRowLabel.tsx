"use client"
import { useRowLabel } from "@payloadcms/ui"
import { useEffect, useState } from "react"

export const ArrayRelationRowLabel = () => {
  const { data } = useRowLabel<any>()
  const referenceTo = data.link?.reference?.relationTo
  const value = data.link?.reference?.value

  const [label, setLabel] = useState("")

  useEffect(() => {
    if (!referenceTo || !value) {
      setLabel("")
      return
    }

    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/${referenceTo}/${value}`,
      )
      const body = await res.json()
      setLabel(body.title)
    }

    if (referenceTo && value) {
      fetchData()
    }
  }, [referenceTo, value])

  return <div>{label}</div>
}
