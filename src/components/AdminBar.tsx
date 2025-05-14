import { headers as getHeaders } from "next/headers"
import { getPayload } from "payload"
import config from "@payload-config"
import React from "react"
import { AdminBarView } from "@/components/AdminBarView"

type AdminBarProps = {
  logo?: any
  draft?: boolean
}

export const AdminBar: React.FC<AdminBarProps> = async (props) => {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (!user) {
    return
  }

  return (
    <div>
      <AdminBarView {...props} />
    </div>
  )
}
