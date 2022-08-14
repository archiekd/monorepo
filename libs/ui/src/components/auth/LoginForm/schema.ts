import { InferType, object, string } from "yup"

export const schema = object({
  email: string().email("Must be a valid email").defined("Email is required"),
  password: string().defined("Password is required")
}).defined()

export type FormValues = InferType<typeof schema>
