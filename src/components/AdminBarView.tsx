"use client"
import React from "react"
import { useRouter } from "next/navigation"

type AdminBarViewProps = {
  logo?: any
  draft?: boolean
}

export const AdminBarView: React.FC<AdminBarViewProps> = (props) => {
  const { draft } = props
  const router = useRouter()

  const onPreviewExit = async () => {
    await fetch("/api/disable-draft")
    router.push("/")
    router.refresh()
  }

  return (
    <div>
      <div
        className={
          "fixed bottom-0 left-0 w-full flex items-center p-2 bg-slate-800 text-white text-sm z-50"
        }
      >
        <a
          href={`/admin`}
          className={`mr-2 flex-shrink-0 flex items-center h-5 no-underline text-white`}
        >
          Dashboard
        </a>
        {draft && (
          <button
            onClick={onPreviewExit}
            className={`ml-2 bg-none border-none p-0 cursor-pointer text-white`}
          >
            Exit preview mode
          </button>
        )}
      </div>
    </div>
  )
}
