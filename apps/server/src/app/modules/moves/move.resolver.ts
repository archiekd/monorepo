import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { Move } from "../../../models/Move"
import { MoveRepository } from "../../repositories/MoveRepository"
import { NewMoveInput } from "./types"

@Service()
@Resolver()
export class MoveResolver {
  constructor(@InjectRepository() private moveRepo: MoveRepository) {}

  @Query(() => Move)
  async getMove(@Arg("id") id: string): Promise<Move> {
    console.log("id", id)
    const move = await this.moveRepo.findById(id)
    if (!move) throw new Error("Failed to find move")
    return move
  }

  @Mutation(() => Move)
  async createMove(@Arg("newMoveInput", () => NewMoveInput) newMoveInput: NewMoveInput): Promise<Move> {
    const move = await this.moveRepo.createMove(newMoveInput)
    if (!move) throw new Error("Failed to create move")

    return move
  }
}
