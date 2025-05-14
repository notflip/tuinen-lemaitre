"use client"
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import React from "react"
import { cn } from "@/lib/utils"

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
  category?: string
}> = (props) => {
  const { className, page, totalPages, category } = props

  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const basePaginationUrl = category
    ? `/blog/categorie/${category}/page`
    : "/blog/page"

  return (
    <div className={cn("my-12", className)}>
      <PaginationComponent>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn({
                "pointer-events-none opacity-50": !hasPrevPage,
              })}
              href={`${basePaginationUrl}/${page - 1}`}
            />
          </PaginationItem>

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink href={`${basePaginationUrl}/${page - 1}`}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive href={`${basePaginationUrl}/${page}`}>
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink href={`${basePaginationUrl}/${page + 1}`}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              className={cn({
                "pointer-events-none opacity-50": !hasNextPage,
              })}
              href={`${basePaginationUrl}/${page + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
