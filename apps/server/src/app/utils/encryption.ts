import bcrypt from "bcrypt"
import { User } from "../models/User"

export const generatePasswordHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const validatePassword = async (user: User, password: string): Promise<boolean> => {
  if (!user.passwordHash) return false
  return await bcrypt.compare(password, user.passwordHash)
}
