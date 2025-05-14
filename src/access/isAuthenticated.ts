import { type PayloadRequest } from "payload"

export const isAuthenticated = ({ req }: { req: PayloadRequest }): boolean => {
  return Boolean(req.user)
}
