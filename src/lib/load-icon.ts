// lib/loadIcon.ts
export async function loadIcon(iconName: string) {
  const prefix = iconName.slice(0, 2) // e.g., 'Hi', 'Fa', 'Md'
  const iconPackMap: Record<string, () => Promise<any>> = {
    Hi: () => import("react-icons/hi2"),
  }

  const loader = iconPackMap[prefix]
  if (!loader) {
    console.warn(`Unsupported icon prefix: ${prefix}`)
    return null
  }

  const icons = await loader()
  return icons[iconName] || null
}
