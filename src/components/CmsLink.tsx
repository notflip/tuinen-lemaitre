import { Divide } from "lucide-react"
import NextLink from "next/link"

export type CmsLinkType = {
  className?: string
  label?: string | null
  newTab?: boolean | null
  url?: string | null
  type?: string | null
  reference?: {
    relationTo: string
    value: any
  } | null
  onClick?: () => void
}

export const CmsLink: React.FC<React.PropsWithChildren<CmsLinkType>> = (props) => {
  const { type, reference, url, newTab, label, className, onClick } = props

  // Return null if it's a reference and the reference is a draft
  // (bug) this also hides the button when adding a link to the current page in the admin dashboard
  // if (type === "reference" && typeof reference?.value === "object" && reference.value._status === "draft") {
  //   return null;
  // }

  // Determine href based on reference or fallback to url
  const href =
    type === "reference" && typeof reference?.value === "object" && reference.value.path
      ? reference.value.path
      : url || null

  if (!href) {
    return <div className={className}>{props.children}</div>
  }

  const newTabProps = newTab ? { rel: "noopener noreferrer", target: "_blank" } : {}

  return (
    <NextLink onClick={onClick} href={href} {...newTabProps} className={className}>
      {props.children ||
        label ||
        (reference?.value && typeof reference.value === "object" && reference.value.title) ||
        "Verzenden"}
    </NextLink>
  )
}
