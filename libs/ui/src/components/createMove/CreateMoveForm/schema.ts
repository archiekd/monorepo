import { boolean, InferType, object, string } from "yup"

export const schema = object({
  name: string().defined("Name is required"),
  description: string().nullable(),
  value: string().oneOf(["a", "b", "c", "d", "e", "f"]),
  doubleRotation: boolean().required(),
  apparatus: string().oneOf(["floor", "pommel", "vault", "highBar", "parallelBars", "rings"])
}).defined()

export type FormValues = InferType<typeof schema>
