"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { HiArrowLeft, HiArrowRight } from "react-icons/hi2"

import { useRef } from "react"
import { NavigationOptions } from "swiper/types"
import { DynamicIcon } from "@/components/dynamic-icon"

type SliderProps = {
  cardClassname?: string
  slidesPerView?: number
  items: Array<{ text: string; author: string }>
}

export const Slider: React.FC<SliderProps> = (props) => {
  const { items, slidesPerView = 3.1, cardClassname = "bg-white" } = props

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (items.length === 0) {
    return null
  }

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        wrapperClass="items-stretch"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          1024: {
            slidesPerView: slidesPerView,
            spaceBetween: 32,
          },
        }}
        style={{
          overflow: "visible",
          cursor: "grab",
          userSelect: "none",
        }}
        onInit={(swiper) => {
          ;(swiper.params.navigation as NavigationOptions).prevEl = prevRef.current
          ;(swiper.params.navigation as NavigationOptions).nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
      >
        {items &&
          items.map((testimonial, index) => {
            return (
              <SwiperSlide className={`p-4 md:p-8 lg:p-16 rounded-lg ${cardClassname} text-foreground`} key={index}>
                <svg
                  width="28"
                  height="22"
                  viewBox="0 0 28 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="currentColor" d="M2.92133 3.3895C4.792 1.3615 7.62266 0.333496 11.3333 0.333496H12.6667V4.09216L11.5947 4.30683C9.768 4.67216 8.49733 5.39083 7.81733 6.4455C7.46252 7.01367 7.26129 7.66422 7.23333 8.3335H11.3333C11.687 8.3335 12.0261 8.47397 12.2761 8.72402C12.5262 8.97407 12.6667 9.31321 12.6667 9.66683V19.0002C12.6667 20.4708 11.4707 21.6668 10 21.6668H2C1.64637 21.6668 1.30724 21.5264 1.05719 21.2763C0.807139 21.0263 0.666663 20.6871 0.666663 20.3335V13.6668L0.670663 9.77483C0.658663 9.62683 0.40533 6.12016 2.92133 3.3895ZM24.6667 21.6668H16.6667C16.313 21.6668 15.9739 21.5264 15.7239 21.2763C15.4738 21.0263 15.3333 20.6871 15.3333 20.3335V13.6668L15.3373 9.77483C15.3253 9.62683 15.072 6.12016 17.588 3.3895C19.4587 1.3615 22.2893 0.333496 26 0.333496H27.3333V4.09216L26.2613 4.30683C24.4347 4.67216 23.164 5.39083 22.484 6.4455C22.1292 7.01367 21.928 7.66422 21.9 8.3335H26C26.3536 8.3335 26.6928 8.47397 26.9428 8.72402C27.1929 8.97407 27.3333 9.31321 27.3333 9.66683V19.0002C27.3333 20.4708 26.1373 21.6668 24.6667 21.6668Z" />
                </svg>
                <p className="h6 mt-12 text-foreground leading-relaxed">{testimonial.text}</p>
                <p className="h6 mt-24 text-foreground/60 leading-relaxed">{testimonial.author}</p>
              </SwiperSlide>
            )
          })}

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div
              className="swiper-pagination"
              style={{
                position: "relative",
                textAlign: "left",
                bottom: 0,
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous slide"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              ref={prevRef}
            >
              <HiArrowLeft />
            </button>
            <button
              aria-label="Next slide"
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              ref={nextRef}
            >
              <HiArrowRight />
            </button>
          </div>
        </div>
      </Swiper>
    </div>
  )
}
