import { BlockContainer } from "@/blocks/BlockContainer"
import Badge from "@/components/badge"
import { getTestimonials } from "@/lib/payload"
import { Slider as SliderElement } from "@/components/slider"
import { Testimonials } from "@payload-types"

export const TestimonialsComponent: React.FC<Testimonials> = async (props) => {
  const { title, subtitle } = props

  const testimonials = await getTestimonials()

  return (
    <BlockContainer {...props} bgColor="bg-muted" className="overflow-x-hidden">
      <div className="py-24 lg:py-32">
        {subtitle && (
          <div className="mb-8">
            <Badge showIcon={false} text={subtitle} />
          </div>
        )}
        <div className="mb-12 flex justify-between items-top">
          <h3>{title}</h3>
        </div>
        <div>
          <SliderElement items={testimonials} slidesPerView={1.8} />
        </div>
      </div>
    </BlockContainer>
  )
}
