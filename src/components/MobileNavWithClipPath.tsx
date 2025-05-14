"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useScrollLock } from "usehooks-ts"
import { NavigationMain } from "@payload-types"
import { MenuLink } from "@/components/MenuLink"
import { HiBars3, HiChevronDown, HiXMark } from "react-icons/hi2"
import { cn } from "@/lib/utils"
import Link from "next/link"

/**
 * Renders a collapsible list of links or columns.
 * @param {Object} props
 * @param {Array} props.items - Array of links or columns to render.
 * @param {boolean} isOpen - Whether the list should be expanded.
 * @param {Function} toggle - Function to toggle the open state.
 */
function CollapsibleList({ items, isOpen, toggle }: any) {
  return (
    <motion.ul
      className="ml-4"
      initial="exit"
      animate={isOpen ? "enter" : "exit"}
      variants={{
        enter: {
          height: "auto",
          overflow: "hidden",
        },
        exit: {
          height: 0,
          overflow: "hidden",
        },
      }}
    >
      {items &&
        items.map((item: any) => (
          <li key={item.id}>
            <MenuLink
              onClick={toggle}
              reference={item.reference}
              className="p-2 flex items-center hover:bg-white/10 rounded-md cursor-pointer"
            >
              {item.label}
            </MenuLink>
          </li>
        ))}
    </motion.ul>
  )
}

/**
 * This mobile nav uses framer-motion and clip-path to show/hide the menu
 * @param items
 * @constructor
 */
export default function MobileNavWithClipPath({ items }: { items: NavigationMain["items"] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [clicked, setClicked] = useState<number | null>(null)
  const [innerClicked, setInnerClicked] = useState<number | null>(null)

  const { lock, unlock } = useScrollLock()

  useEffect(() => {
    if (isOpen) {
      lock()
    } else {
      unlock()
    }
    return () => unlock() // Ensure scroll unlocks on unmount
  }, [isOpen])

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
    setClicked(null)
    setInnerClicked(null)
  }

  return (
    <>
      <button
        className={cn("z-[999] relative", isOpen ? "text-white" : "text-black")}
        onClick={toggleDrawer}
      >
        {isOpen ? <HiXMark size={28} /> : <HiBars3 size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="z-[998] fixed inset-0 bg-blue-950 text-white overflow-y-auto h-full py-4 px-6 will-change-transform"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="p-3 mb-8">Navigatie</div>
            <ul className="text-xl">
              <li>
                <Link
                  onClick={toggleDrawer}
                  className="flex items-center justify-between p-2 hover:bg-white/10 rounded-md cursor-pointer"
                  href="/"
                >
                  Home
                </Link>
              </li>
              {items &&
                items.map((item, itemIndex) => {
                  const isClicked = clicked === itemIndex
                  const hasLinksOrColumns =
                    (item.links ?? []).length > 0 || (item.columns || []).length > 0

                  return (
                    <li key={item.id}>
                      {/* Normal Type */}
                      {item.type === "single" && (
                        <MenuLink
                          reference={item.reference}
                          className="flex items-center justify-between p-2 hover:bg-white/10 rounded-md cursor-pointer"
                          onClick={toggleDrawer}
                        >
                          {item.label}
                        </MenuLink>
                      )}

                      {/*List Type*/}
                      {item.type === "list" && (item.links || []).length > 0 && (
                        <>
                          <span
                            className="flex items-center justify-between p-2 hover:bg-white/10 rounded-md cursor-pointer"
                            onClick={() => setClicked(clicked === itemIndex ? null : itemIndex)}
                          >
                            {item.label}
                            {hasLinksOrColumns && <HiChevronDown size={28} />}
                          </span>
                          <CollapsibleList
                            items={item.links || []}
                            isOpen={isClicked}
                            toggle={() => setIsOpen(false)}
                          />
                        </>
                      )}

                      {/*Megamenu Type*/}
                      {item.type === "megamenu" && (item.columns || []).length > 0 && (
                        <motion.ul
                          className="ml-4"
                          initial="exit"
                          animate={isClicked ? "enter" : "exit"}
                          variants={{
                            enter: {
                              height: "auto",
                              overflow: "hidden",
                            },
                            exit: {
                              height: 0,
                              overflow: "hidden",
                            },
                          }}
                        >
                          {item.columns!.map((column, columnIndex) => (
                            <li key={column.id}>
                              <span
                                className="flex items-center justify-between p-2 hover:bg-white/10 rounded-md cursor-pointer"
                                onClick={() =>
                                  setInnerClicked(innerClicked === columnIndex ? null : columnIndex)
                                }
                              >
                                {column.label}
                                <HiChevronDown size={28} />
                              </span>
                              <CollapsibleList
                                items={column.links || []}
                                isOpen={innerClicked === columnIndex}
                                toggle={() => setIsOpen(false)}
                              />
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </li>
                  )
                })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
