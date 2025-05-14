import BlogPostCard from "@/components/BlogPostCard"
import { Pagination } from "@/components/Pagination"
import { Suspense } from "react"
import { PaginatedDocs } from "payload"
import Breadcrumbs from "@/components/breadcrumbs"

type BlogPageProps = {
  title: string
  description?: string
  posts: PaginatedDocs
  category?: string
}

export async function BlogPage(props: BlogPageProps) {
  const { posts, category } = props

  return (
    <>
      <section className="relative py-sm lg:py-lg">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <div className="flex items-center pt-16 lg:pt-24">
            <div className="max-w-4xl">
              <div className="mb-8">
                <Breadcrumbs />
              </div>
              <h1 className="text-foreground">Blog</h1>
              {/* <BlogCategories /> */}
            </div>
          </div>
        </div>
      </section>
      <section className="relative">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
          <Suspense fallback={null}>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
                {posts?.docs.map((post, index) => (
                  <BlogPostCard key={index} post={post} />
                ))}
              </div>

              <div>
                {posts.totalPages > 1 && posts.page && (
                  <Pagination
                    page={posts.page}
                    totalPages={posts.totalPages}
                    category={category}
                  />
                )}
              </div>
            </div>
          </Suspense>
        </div>
      </section>
    </>
  )
}
