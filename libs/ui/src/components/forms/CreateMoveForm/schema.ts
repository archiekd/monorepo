import { boolean, InferType, mixed, object, string } from "yup"

import { ApparatusName, CopGroup, MoveValue } from "@routine-lab/apollo-api"

const oneOfEnum = <T>(enumObject: { [s: string]: T } | ArrayLike<T>) => {
  return mixed<T>().oneOf(Object.values(enumObject))
}

export const schema = object({
  name: string().defined("Name is required"),
  description: string().nullable(),
  value: oneOfEnum(MoveValue),
  doubleRotation: boolean().required(),
  apparatus: oneOfEnum(ApparatusName),
  group: oneOfEnum(CopGroup)
}).defined()

export type FormValues = InferType<typeof schema>
