import { AuthenticationError } from "apollo-server-express"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"

import { SavedRoutine } from "../../models/SavedRoutine"
import { MoveRepository } from "../../repositories/MoveRepository"
import { SavedRoutineRepository } from "../../repositories/SavedRoutineRepository"
import { MyContext } from "../../types/MyContext"

@Service()
@Resolver()
export class SavedRoutineResolver {
  constructor(@InjectRepository() private savedRoutineRepo: SavedRoutineRepository, @InjectRepository() private moveRepo: MoveRepository) {}

  @Authorized()
  @Mutation(() => SavedRoutine)
  async createRoutine(@Ctx() ctx: MyContext, @Arg("moveId") moveId: string, @Arg("routineName", { nullable: true }) routineName: string) {
    const user = ctx.getUser()
    if (!user) throw new AuthenticationError("No user found")

    const move = await this.moveRepo.findById(moveId)
    if (!move) throw new Error("Move not found")

    return this.savedRoutineRepo.createRoutine(move, { name: routineName || "Untitled Routine", formatted_moves: [[move.id]] })
  }

  @Authorized()
  @Query(() => SavedRoutine)
  async getRoutine(@Ctx() ctx: MyContext, @Arg("routineId") routineId: string) {
    const user = ctx.getUser()
    if (!user) throw new AuthenticationError("No user found")

    return this.savedRoutineRepo.findById(routineId)
  }
}
