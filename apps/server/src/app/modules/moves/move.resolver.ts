import { AuthenticationError } from "apollo-server-express"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"

import { Move } from "../../models/Move"
import { ApparatusRepository } from "../../repositories/ApparatusRepository"
import { CodeOfPointsGroupRepository } from "../../repositories/CodeOfPointsGroupRepository"
import { MoveRepository } from "../../repositories/MoveRepository"
import { MyContext } from "../../types/MyContext"
import { NewMoveInput } from "./types"

@Service()
@Resolver()
export class MoveResolver {
  constructor(
    @InjectRepository() private moveRepo: MoveRepository,
    @InjectRepository() private apparatusRepo: ApparatusRepository,
    @InjectRepository() private codeOfPointsGroupRepo: CodeOfPointsGroupRepository
  ) {}

  @Query(() => Move)
  async getMove(@Arg("id") id: string): Promise<Move> {
    const move = await this.moveRepo.findById(id)
    if (!move) throw new Error("Failed to find move")
    return move
  }

  @Authorized()
  @Mutation(() => Move)
  async createMove(@Ctx() ctx: MyContext, @Arg("newMoveInput", () => NewMoveInput) newMoveInput: NewMoveInput): Promise<Move> {
    console.log("you are here")
    const user = ctx.getUser()
    if (!user) throw new AuthenticationError("No user found")

    console.log("user 2", user, newMoveInput.apparatus)

    const apparatus = await this.apparatusRepo.findByName(newMoveInput.apparatus)
    if (!apparatus) throw new Error("No apparatus found with that name")

    console.log("apparatus", apparatus)

    const codeOfPointsGroup = await this.codeOfPointsGroupRepo.findByGroupAndApparatus(newMoveInput.copGroup, apparatus)
    if (!codeOfPointsGroup) throw new Error("No code of points group found with that apparatus")

    const move = await this.moveRepo.createMove(newMoveInput, apparatus, codeOfPointsGroup, user)
    if (!move) throw new Error("Failed to create move")

    return move
  }
}
