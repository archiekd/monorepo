import { Field, InputType } from "type-graphql"

import { Move } from "../../models/Move"

@InputType()
export class NewRoutineInput {
  @Field({ nullable: true })
  name: string

  @Field(() => [Move])
  moves: Move[]

  @Field(() => [[String]])
  formatted_moves: Array<string[]>
}

@InputType()
export class UpdateRoutineInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  move?: string

  @Field(() => [[String]], { nullable: true })
  formatted_moves?: Array<string[]>
}
