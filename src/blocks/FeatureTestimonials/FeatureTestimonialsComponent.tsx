import { BlockContainer } from "@/blocks/BlockContainer"
import Badge from "@/components/badge"
import { ImageBox } from "@/components/ImageBox"
import { Case, FeatureTestimonials, Media } from "@payload-types"
import Link from "next/link"
import { HiOutlineArrowUpRight } from "react-icons/hi2"

export const FeatureTestimonialsComponent: React.FC<FeatureTestimonials> = (props) => {
  const { badge, title, items, bgColor } = props

  return (
    <BlockContainer bgColor={bgColor} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className={`md:col-span-5 md:sticky top-8 self-start ${bgColor === "black" ? "text-white" : ""}`}>
          <Badge text={badge} bgColor={bgColor} />
          <h3 className={`mt-8 `}>{title}</h3>
        </div>
        <div className="md:col-start-7 md:col-span-full">
          <div className="flex flex-col gap-8">
            {(items || []).map((item, index) => (
              <div key={index} className="bg-slate-950 text-white p-4 lg:p-8 rounded-[16px]">
                <p className="h5 text-white">{item.text}</p>
                <div className="flex justify-between items-end mt-24 ">
                  <div className="flex gap-4">
                    <div className="relative overflow-hidden rounded-full w-12 h-12">
                      <ImageBox fill disableBlurhash sizes="100px" media={item.author_avatar} />
                    </div>
                    <div>
                      <div>{item.author_name}</div>
                      <div>{item.author_company}</div>
                    </div>
                  </div>
                  <div>
                    {item?.link && (
                      <Link
                        href={`/projecten/${(item?.link as Case).slug}`}
                        className="block px-4 py-1.5 rounded-full bg-white hover:bg-white/90 text-foreground"
                      >
                        <HiOutlineArrowUpRight size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
