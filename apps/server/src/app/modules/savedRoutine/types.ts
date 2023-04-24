import { Field, InputType } from "type-graphql"

import { Move } from "../../models/Move"

@InputType()
export class NewRoutineInput {
  @Field({ nullable: true })
  name: string

  @Field(() => [Move])
  moves: Move[]

  @Field()
  formatted_moves: Array<string[]>
}
