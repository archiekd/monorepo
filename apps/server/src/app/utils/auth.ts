import { AuthChecker } from "type-graphql"
import { AuthenticationError, ForbiddenError } from "apollo-server-express"
import express from "express"
import { MyContext } from "../types/MyContext"
import { URL } from "url"

export type AuthorizedTypes = "SUPER_ADMIN"

export const authChecker: AuthChecker<MyContext> = async ({ context }, roles): Promise<boolean> => {
  const user = context.getUser()
  console.log(`user`, user)
  if (!user) throw new AuthenticationError("Not authenticated")

  if (roles.length === 0) return true
  if (roles.includes("SUPER_ADMIN")) {
    if (user.superAdmin) {
      return true
    } else {
      throw new ForbiddenError("Permission denied")
    }
  }

  throw new ForbiddenError("Permission denied")
}

export const setTokenCookie = (res: express.Response, token: string): void => {
  res.clearCookie("token")

  const url = new URL(process.env.API_URL || "")

  res.cookie("token", token, {
    sameSite: process.env.NODE_ENV === "test" ? "none" : undefined,
    secure: process.env.NODE_ENV === "test" ? true : undefined,
    domain: process.env.NODE_ENV === "production" ? ".searchland.co.uk" : process.env.NODE_ENV === "test" ? url.hostname : undefined
  })
}
