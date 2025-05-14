import Link from "next/link"
import { FaLinkedin, FaFacebook } from "react-icons/fa6"

export async function BlogShareButtons({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1">
      <Link
        className="bg-slate-50 rounded-full p-3 flex items-center"
        href={`http://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
      >
        <FaFacebook size={20} />
      </Link>
      <Link
        className="bg-slate-50 rounded-full p-3 flex items-center"
        href={`https://www.linkedin.com/shareArticle?url=${url}`}
        target="_blank"
      >
        <FaLinkedin size={20} />
      </Link>
    </div>
  )
}
