import NextLink from "next/link"
import { cn } from "@/lib/utils"

type MenuLinkType = {
  link: {
    type?: ("none" | "reference" | "custom") | null
    newTab?: boolean | null
    reference?: {
      relationTo: "pages"
      value: any
    } | null
    url?: string | null
    label?: string | null
  }
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export const MenuLink: React.FC<MenuLinkType> = (props) => {
  const { link, children, className, onClick } = props

  const { type, reference, url, newTab, label } = link

  const href =
    type === "reference" && typeof reference?.value === "object" && reference.value.path
      ? reference.value.path === "/home"
        ? "/"
        : reference.value.path
      : url || null

  if (!href) {
    return null
  }

  return (
    <NextLink href={href} onClick={onClick} className={cn(className)}>
      {children || label || "Untitled"}
    </NextLink>
  )
}
