import { Page } from "@payload-types"
import NextLink from "next/link"
import { cn } from "@/lib/utils"

type MenuLinkType = {
  children: React.ReactNode
  className?: string
  label?: string | null
  reference?: {
    relationTo: "pages"
    value: Page | string | number
  } | null
  onClick?: () => void
}

export const MenuLink: React.FC<MenuLinkType> = (props) => {
  const { reference, className, children, onClick } = props

  const href =
    typeof reference?.value === "object" && reference.value.slug
      ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
          reference.value.slug === "home" ? "" : reference.value.slug
        }`
      : null

  // Return null if href is not defined
  if (!href) {
    return null
  }

  return (
    <NextLink href={href} onClick={onClick} className={cn(className)}>
      {children}
    </NextLink>
  )
}
