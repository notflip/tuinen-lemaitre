"use client"

import React from "react"
import Link from "next/link"
import { DefaultCellComponentProps } from "payload"

export const Cell: React.FC<DefaultCellComponentProps> = ({
  rowData,
  cellData,
  collectionSlug,
  link,
}) => {
  const url = `/admin/collections/${collectionSlug}/${rowData.id}`

  const parentTitle = (rowData.parent && rowData.breadcrumbs[0].label) ?? null
  const content = (
    <span>
      {cellData ?? "(Naamloos)"}{" "}
      {parentTitle && <span style={{ opacity: 0.5 }}>({parentTitle})</span>}
    </span>
  )

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {rowData.parent && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="#888"
            d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20zm0-2h16V8h-8.825l-2-2H4zm0 0V6z"
          />
        </svg>
      )}
      {link ? <Link href={url}>{content}</Link> : <div>{content}</div>}
    </div>
  )
}
