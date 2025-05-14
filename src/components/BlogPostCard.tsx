import { ImageBox } from "@/components/ImageBox"
import { Media, Post, User } from "@payload-types"
import { format } from "date-fns"
import Link from "next/link"

export default function BlogPostCard({ post }: { post: Post }) {
  return (
    <div className="bg-slate-50 rounded-[16px] overflow-hidden flex flex-col items-stretch">
      <Link href={`/blog/${post.slug}`} className="w-full max-w-full">
        <div className="w-full overflow-hidden">
          {post.heroImage && (
            <ImageBox
              className="aspect-[3/2] size-full"
              media={post.heroImage}
              sizes="600px"
            />
          )}
        </div>
      </Link>
      <div className="p-6 md:p-8 flex flex-col justify-between h-full">
        <div>
          <Link href={`/blog/${post.slug}`} className="block mb-4">
            <h5 className="max-w-[90%]">{post.title}</h5>
          </Link>
          <p className="text-caption">{post.description}</p>
        </div>
        {post.author && (
          <div className="mt-6 flex items-center">
            {(post.author as User).avatar ? (
              <div className="mr-4 shrink-0">
                <ImageBox
                  className="w-10 h-10 rounded-full"
                  media={(post.author as User).avatar}
                  sizes="96px"
                />
              </div>
            ) : (
              <div className="mr-4 shrink-0">
                <div className="w-10 h-10 bg-tertiary rounded-full border" />
              </div>
            )}
            <div>
              <p className="text-badge">{(post.author as User).name}</p>
              <div className="flex items-center">
                <p className="leading-none text-badge">
                  {format(new Date(post.publishedAt!), "dd/MM/yyyy")}
                </p>
                {post.readingTime !== 0 && (
                  <>
                    <p className="leading-none text-badge mx-1">&mdash;</p>
                    <p className="leading-none text-badge">
                      {post.readingTime} minuten leestijd
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
