"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { NavigationMain, Setting } from "@payload-types"
import { LuChevronDown } from "react-icons/lu"
import { cn } from "@/lib/utils"
import SocialMediaIcon from "@/components/social-media-icon"
import { MenuLink } from "@/components/menu-link"

type DesktopNavProps = {
  items: NavigationMain["items"]
  settings: Setting
}

export default function DesktopNav({ items, settings }: DesktopNavProps) {
  const { social_links } = settings

  return (
    <ul className="ml-32 flex flex-wrap items-center gap-x-1 xl:gap-x-2">
      {(items ?? []).map((item, index) => {
        if (item.type === "single") {
          return (
            <li key={index}>
              <MenuLink
                link={{ type: "reference", reference: item.reference }}
                className="flex items-center gap-1 font-medium whitespace-nowrap"
              >
                <div className="hover:bg-accent/10 text-foreground py-1.5 px-3 rounded-lg">
                  {item.label}
                </div>
              </MenuLink>
            </li>
          )
        } else if (item.type === "list" && item.links) {
          return (
            <li key={item.id}>
              <ListDropdown label={item.label!}>
                {({ setOpen }) => (
                  <ul className="text-nowrap rounded-lg overflow-hidden">
                    {item.links &&
                      item.links.map((link, index) => (
                        <li key={index}>
                          <MenuLink
                            link={{ type: "reference", ...link }}
                            className="block text-foreground font-medium py-2 px-4 hover:bg-accent/10"
                            onClick={() => setOpen(false)} // Close dropdown on click
                          />
                        </li>
                      ))}
                  </ul>
                )}
              </ListDropdown>
            </li>
          )
        } else if (item.type === "megamenu" && item.columns) {
          return (
            <li key={item.id}>
              <MegaMenuDropdown label={item.label!}>
                {({ setOpen }) => (
                  <div className="grid grid-cols-3 gap-12 p-4">
                    {(item.columns || []).map((column, index) => (
                      <div key={index}>
                        <div className="mb-3 font-bold">{column.label}</div>
                        {column.description && <p className="max-w-sm">{column.description}</p>}
                        {column.links.map((link, index) => (
                          <div className="mt-3" key={index}>
                            <MenuLink
                              link={{ type: "reference", ...link }}
                              className="font-medium"
                              onClick={() => setOpen(false)}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </MegaMenuDropdown>
            </li>
          )
        } else if (item.type === "socialMediaIcons") {
          return (
            <li key="socialMediaIcons" className="ml-auto">
              <div className="flex space-x-2">
                {(social_links || []).map((link, index) => (
                  <div key={index}>
                    <SocialMediaIcon url={link.url} />
                  </div>
                ))}
              </div>
            </li>
          )
        }
      })}
    </ul>
  )
}

type FlyoutLinkProps = {
  label: string
  children:
    | ReactNode
    | ((props: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => ReactNode)
}

const ListDropdown = ({ children, label }: FlyoutLinkProps) => {
  const [open, setOpen] = useState(false)
  const showFlyout = open && children

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <Link
        href=""
        className="flex text-foreground items-center gap-1 py-1.5 px-3 font-medium rounded-lg hover:bg-accent/10"
      >
        {label}
        <LuChevronDown className={cn("transition", showFlyout ? "rotate-180" : "rotate-0")} />
      </Link>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ x: "-50%" }}
            className="absolute left-1/2 top-14 bg-white border border-accent/40 rounded-lg"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            {typeof children === "function" ? children({ setOpen }) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const MegaMenuDropdown = ({ children, label }: FlyoutLinkProps) => {
  const [open, setOpen] = useState(false)
  const showFlyout = open && children

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link href="" className="flex items-center gap-1 py-1.5 px-3 rounded-lg hover:bg-accent/10">
        {label}
        <LuChevronDown className={cn("transition", showFlyout ? "rotate-180" : "rotate-0")} />
      </Link>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute max-w-(--breakpoint-xl) mx-auto left-[5%] right-[5%] top-36 bg-white border border-secondary shadow-lg rounded"
          >
            <div className="absolute -top-6 left-0 right-0 h-6" />
            {typeof children === "function" ? children({ setOpen }) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
