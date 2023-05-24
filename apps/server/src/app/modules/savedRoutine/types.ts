import { Field, InputType, Int, ObjectType } from "type-graphql"

import { Move } from "../../models/Move"

@InputType()
export class FormattedMovesInput {
  @Field(() => String, { nullable: false })
  id: string

  @Field(() => [String], { nullable: false })
  moves: string[]
}

@InputType()
export class NewRoutineInput {
  @Field({ nullable: true })
  name: string

  @Field(() => [Move])
  moves: Move[]

  @Field(() => [FormattedMovesInput])
  formatted_moves: FormattedMovesInput[]
}

@InputType()
export class UpdateRoutineInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => [FormattedMovesInput], { nullable: true })
  formatted_moves?: FormattedMovesInput[]
}

@ObjectType()
export class StartValueResponse {
  @Field(() => Int)
  eScore: number

  @Field(() => Int)
  moveTotal: number

  @Field(() => Int)
  requirements: number

  @Field(() => Int)
  connections: number

  @Field(() => Int)
  total: number
}
