import React from "react"
import { Banner } from "@payloadcms/ui/elements/Banner"
import { nonDeletablePages, nonEditablePages } from "@/config"

const slugToMessage: Record<string, string> = {}

nonDeletablePages.forEach((slug) => {
  if (!slugToMessage[slug]) {
    slugToMessage[slug] =
      "👨‍💻 Dit is een systeem pagina, deze kan niet verwijderd worden."
  }
})
nonEditablePages.forEach((slug) => {
  slugToMessage[slug] =
    "👨‍💻 Dit is een systeem pagina, deze kan niet aangepast worden."
})

interface MessageComponentProps {
  data: {
    slug: string
  }
}

export const MessageComponent: React.FC<MessageComponentProps> = ({
  data: { slug },
}) =>
  slugToMessage[slug] && (
    <div>
      <Banner type="success">
        <p>{slugToMessage[slug]}</p>
      </Banner>
    </div>
  )
