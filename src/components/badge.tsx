import { cn } from "@/lib/utils"

type BadgeProps = {
  text: string
  bgColor?: string | null
  showIcon?: boolean
}

export default function Badge({ text, bgColor, showIcon = true }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex gap-2 items-center px-3 rounded-full text-badge uppercase border",
        bgColor === "black" ? "border-white/20" : "border-foreground/20",
      )}
    >
      {showIcon && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7C5.17867 7 7 5.242 7 1C7 5.242 8.80867 7 13 7C8.80867 7 7 8.80867 7 13C7 8.80867 5.17867 7 1 7Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <div className="">{text}</div>
    </div>
  )
}
