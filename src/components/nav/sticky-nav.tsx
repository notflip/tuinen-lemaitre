"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Media, NavigationMain } from "@payload-types"
import DesktopNav from "@/components/DesktopNav"
import { ImageBox } from "@/components/ImageBox"
import AnimatedButton from "@/components/interface/AnimatedButton"
import { HiOutlineChat } from "react-icons/hi"
import MobileNavWithClipPath from "@/components/MobileNavWithClipPath"
import { CmsLink } from "@/components/CmsLink"
import { Type4 } from "@/components/interface/Type4"

type StickyNavbarProps = {
  items: NavigationMain["items"]
  link: NavigationMain["link"]
  settings: any
}

export default function StickyNavbar(props: StickyNavbarProps) {
  const [scrolledFromTop, setScrolledFromTop] = useState(false)
  const { items, settings, link } = props

  useEffect(() => {
    const handleScroll = () => {
      setScrolledFromTop(window.pageYOffset >= 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`${
        scrolledFromTop ? "h-16 lg:h-20 backdrop-filter border-b border-slate-100" : "h-24"
      } transition-all fixed top-0 left-0 w-full z-[999] bg-white`}
    >
      <div className="h-full mx-auto max-w-screen-2xl px-4 md:px-12 2xl:px-16">
        <div className="h-full flex items-center justify-between gap-4 xl:gap-8 2xl:gap-16">
          <Link href="/" className="flex-none">
            <ImageBox
              disableBlurhash
              media={settings.logo}
              className="w-[100px] lg:w-[120px]"
              sizes="120px"
            />
          </Link>
          {/*Desktop View*/}
          <div className="hidden lg:block">
            <DesktopNav items={items} />
          </div>
          {/*Button*/}
          <div className="hidden lg:block">
            {link && (
              <Type4 link={link}>
                {link.label}
                <HiOutlineChat />
              </Type4>
            )}
          </div>
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileNavWithClipPath items={items} />
          </div>
        </div>
      </div>
    </header>
  )
}
