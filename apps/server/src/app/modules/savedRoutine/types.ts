import { Field, InputType } from "type-graphql"

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
