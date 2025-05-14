import * as HiIcons from "react-icons/hi2"
import type { IconType } from "react-icons"

type DynamicIconProps = {
  iconName: string
  size?: number | string
  className?: string
  [key: string]: any
}

export function DynamicIcon({ iconName, ...props }: DynamicIconProps) {
  const Icon = HiIcons[iconName as keyof typeof HiIcons] as IconType

  if (!Icon) return null

  return <Icon {...props} />
}
