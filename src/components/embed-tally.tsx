"use client"

import { useEffect, useState } from "react"

export default function EmbedTally(props: { formId: string }) {
  const { formId } = props

  useEffect(() => {
    const scriptTag = document.createElement("script")
    scriptTag.src = "https://tally.so/widgets/embed.js"
    document.body.appendChild(scriptTag)
  }, [])

  return (
    <>
      <iframe
        data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=0&transparentBackground=1&dynamicHeight=1`}
        width="100%"
        height="284"
        title="Contact form"
      ></iframe>
    </>
  )
}
