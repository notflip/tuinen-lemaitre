import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, cloneElement, isValidElement, ReactNode } from "react"

type Props = {
  children: ReactNode
  variant?: "default" | "light" | "link" | "foreground"
  hasArrow?: boolean
  asChild?: boolean
  avatars?: ReactNode
  icon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const animatedButtonVariants = cva(
  "group relative flex lg:inline-flex items-center px-5 py-2.5 justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-white",
        foreground: "bg-foreground hover:bg-foreground/90 text-white",
        light: "bg-blue-50 hover:bg-primary/20 text-blue-950",
        link: "bg-transparent px-0 py-2 underline underline-offset-[6px] hover:underline-offset-[8px]",
      },
      hasAvatars: {
        true: "", // We will control it through compoundVariants
        false: "",
      },
    },
    compoundVariants: [
      {
        hasAvatars: true,
        variant: ["default", "foreground", "light"], // Only apply padding when NOT a link
        className: "px-8",
      },
    ],
    defaultVariants: {
      variant: "default",
      hasAvatars: false,
    },
  },
)

export default function AnimatedButton({
  children,
  avatars,
  variant = "default",
  hasArrow = true,
  asChild = false,
  icon,
  ...props
}: Props) {
  const className = cn(
    animatedButtonVariants({ variant, hasAvatars: Boolean(avatars) }),
    props.className,
  )

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      ...props,
      className: cn((children.props as any)?.className, className),
    })
  }

  return (
    <button {...props} className={className}>
      {avatars}
      {children}
      {icon && <div>{icon}</div>}
    </button>
  )
}
