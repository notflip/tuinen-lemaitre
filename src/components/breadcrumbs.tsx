"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

import { HiArrowLeft } from "react-icons/hi"

interface BreadcrumbsProps {
  textAlign?: "left" | "center" | null
}

export default function Breadcrumbs({ textAlign }: BreadcrumbsProps) {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  if (!pathNames.length) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className={textAlign === "center" ? "justify-center" : ""}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="flex gap-2 items-center">
            <Link href="/">
              <HiArrowLeft />
              <span>Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.length > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {index === pathNames.length - 1 ? (
                  <div className="capitalize">{link}</div>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {link}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== pathNames.length - 1 ? (
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              ) : (
                ""
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
