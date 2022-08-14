import { AuthenticationError } from "apollo-server-express"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Move } from "../../models/Move"
import { MoveRepository } from "../../repositories/MoveRepository"
import { MyContext } from "../../types/MyContext"
import { NewMoveInput } from "./types"

@Service()
@Resolver()
export class MoveResolver {
  constructor(@InjectRepository() private moveRepo: MoveRepository) {}

  @Query(() => Move)
  async getMove(@Arg("id") id: string): Promise<Move> {
    const move = await this.moveRepo.findById(id)
    if (!move) throw new Error("Failed to find move")
    return move
  }

  @Authorized()
  @Mutation(() => Move)
  async createMove(@Ctx() ctx: MyContext, @Arg("newMoveInput", () => NewMoveInput) newMoveInput: NewMoveInput): Promise<Move> {
    const user = ctx.getUser()
    if (!user) throw new AuthenticationError("No user found")
    const move = await this.moveRepo.createMove(newMoveInput, user)
    if (!move) throw new Error("Failed to create move")

    return move
  }
}
