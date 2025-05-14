import Link from "next/link"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Avatars from "@/components/avatars"

export type Type4Interface = {
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
  variant?: "default" | "light" | "link" | "foreground" | "ghost"
  avatars?: boolean
  className?: string
  icon?: React.ReactNode
  onClick?: () => void
}

const animatedButtonVariants = cva(
  "group relative flex lg:inline-flex items-center px-5 py-2.5 justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-white",
        foreground: "bg-foreground hover:bg-foreground/90 text-white",
        light: "bg-blue-50 hover:bg-blue-100 text-blue-950",
        link: "bg-transparent px-0 py-2 underline underline-offset-[6px] hover:underline-offset-[8px]",
        ghost: "px-0",
      },
      hasAvatars: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        hasAvatars: true,
        variant: "default",
        className: "px-8",
      },
      {
        hasAvatars: true,
        variant: "foreground",
        className: "px-8",
      },
      {
        hasAvatars: true,
        variant: "light",
        className: "px-8",
      },
    ],
    defaultVariants: {
      variant: "default",
      hasAvatars: false,
    },
  },
)

export const Type4: React.FC<React.PropsWithChildren<Type4Interface>> = (props) => {
  const { link, onClick, variant, avatars, className } = props

  const { type, reference, url, newTab, label } = link

  const href =
    type === "reference" && typeof reference?.value === "object" && reference.value.path
      ? reference.value.path
      : url || null

  if (!href) {
    return null
  }

  const newTabProps = newTab ? { rel: "noopener noreferrer", target: "_blank" } : {}

  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn(animatedButtonVariants({ variant, hasAvatars: Boolean(avatars) }), className)}
      {...newTabProps}
    >
      {avatars && <Avatars />}
      {props.children ||
        label ||
        (reference?.value && typeof reference.value === "object" && reference.value.title) ||
        "Verzenden"}
    </Link>
  )
}
