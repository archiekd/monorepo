/* eslint-disable @typescript-eslint/no-namespace */
import express from "express"
import { PassportContext } from "graphql-passport"
import { Session } from "../models/Session"
import { User } from "../models/User"

export interface MyContext extends PassportContext<User, any, { session: Session }, express.Request> {
  res: express.Response
}

declare global {
  namespace Express {
    interface User {
      id: string
    }
  }
}
