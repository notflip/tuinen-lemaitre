import * as TbIcons from "react-icons/tb"
import type { IconType } from "react-icons"

type DynamicIconProps = {
  iconName: string
  size?: number | string
  className?: string
  [key: string]: any
}

export function DynamicIcon({ iconName, ...props }: DynamicIconProps) {
  const Icon = TbIcons[iconName as keyof typeof TbIcons] as IconType

  if (!Icon) return null

  return <Icon {...props} />
}
