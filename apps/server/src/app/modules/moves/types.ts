import { Field, InputType } from "type-graphql"
import { ApparatusName } from "../../models/Apparatus"
import { CopGroup, MoveValue } from "../../models/Move"

@InputType()
export class NewMoveInput {
  @Field()
  description: string

  @Field(() => ApparatusName)
  apparatus: ApparatusName

  @Field(() => MoveValue)
  letterValue: MoveValue

  @Field(() => CopGroup)
  copGroup: CopGroup

  @Field()
  isDoubleRotation: boolean
}
