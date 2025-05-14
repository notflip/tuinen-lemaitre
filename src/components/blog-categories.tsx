import { getPostCategories } from "@/lib/payload"
import Link from "next/link"
import { headers } from "next/headers"
import { cn } from "@/lib/utils"

export async function BlogCategories() {
  const categories = await getPostCategories()
  const headersList = await headers()
  const currentPath = headersList.get("x-current-path")

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2 bg-white rounded-[20px]">
        <Link
          href={`/blog`}
          className={cn(
            "px-6 py-2 rounded-[20px]",
            currentPath === "/blog" ? "bg-primary" : "",
          )}
        >
          Alle
        </Link>
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/blog/categorie/${category.slug}`}
            className={cn(
              "px-4 py-2 rounded-[20px]",
              currentPath === `/blog/categorie/${category.slug}`
                ? "bg-primary"
                : "",
            )}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
