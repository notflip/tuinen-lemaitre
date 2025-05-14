import { CmsLink } from "@/components/CmsLink"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { InlineButton } from "@payload-types"
import React from "react"

export const InlineButtonComponent: React.FC<InlineButton> = ({ link }) => {
  if (!link) {
    return null
  }

  return (
    <AnimatedButton asChild variant="foreground">
      <CmsLink {...link} className="no-underline">
        {link.label}
      </CmsLink>
    </AnimatedButton>
  )
}
