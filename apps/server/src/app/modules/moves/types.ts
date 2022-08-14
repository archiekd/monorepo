import { Field, InputType } from "type-graphql"

@InputType()
export class NewMoveInput {
  @Field()
  name: string

  @Field()
  apparatus: string

  @Field()
  pointValue: number

  @Field()
  letterValue: string

  @Field()
  copGroup: string

  @Field()
  isDoubleRotation: boolean
}
