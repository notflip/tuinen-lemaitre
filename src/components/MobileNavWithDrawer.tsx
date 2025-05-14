"use client"

import { useEffect, useState } from "react"
import { LuChevronDown, LuMenu, LuX } from "react-icons/lu"
import Link from "next/link"
import { useScrollLock } from "usehooks-ts"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { NavigationMain } from "@payload-types"

type NavLink = {
  href: string
  title: string
  description: string
  links?: NavLink[]
}

/**
 * This is a mobile nav with the shadcn drawer coming up from below
 * @param navLinks
 * @constructor
 */
export default function MobileNavWithDrawer({ items }: { items: NavigationMain["items"] }) {
  const [isOpen, setIsOpen] = useState(false)
  const { lock, unlock } = useScrollLock()

  useEffect(() => {
    return isOpen ? lock() : unlock()
  }, [isOpen])

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={toggleDrawer}>
        <DrawerTrigger asChild>
          <button className="lg:hidden z-[60] relative text-2xl">
            {isOpen ? <LuX className="text-white" /> : <LuMenu className="" />}
          </button>
        </DrawerTrigger>

        <DrawerContent className="border-none z-[998] fixed inset-0 bg-black overflow-y-auto  text-white p-6 pb-20">
          Content
        </DrawerContent>
      </Drawer>
    </>
  )
}
