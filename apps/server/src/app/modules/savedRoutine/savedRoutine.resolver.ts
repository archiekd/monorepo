import { AuthenticationError } from "apollo-server-express"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { v4 as uuid4 } from "uuid"

import { SavedRoutine } from "../../models/SavedRoutine"
import { MoveRepository } from "../../repositories/MoveRepository"
import { SavedRoutineRepository } from "../../repositories/SavedRoutineRepository"
import { MyContext } from "../../types/MyContext"
import { UpdateRoutineInput } from "./types"

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

    return this.savedRoutineRepo.createRoutine(move, {
      name: routineName || "Untitled Routine",
      formatted_moves: [{ id: uuid4(), moves: [move.id] }]
    })
  }

  @Authorized()
  @Query(() => SavedRoutine)
  async getRoutine(@Ctx() ctx: MyContext, @Arg("routineId") routineId: string) {
    const user = ctx.getUser()
    if (!user) throw new AuthenticationError("No user found")

    return this.savedRoutineRepo.findById(routineId)
  }

  @Authorized()
  @Mutation(() => SavedRoutine)
  async updateRoutine(@Ctx() ctx: MyContext, @Arg("routineId") routineId: string, @Arg("updatedRoutine") updatedRoutine: UpdateRoutineInput) {
    const user = ctx.getUser()
    if (!user) throw new AuthenticationError("No user found")

    const routine = await this.savedRoutineRepo.findById(routineId)
    if (!routine) throw new AuthenticationError("Could not find routine to update")

    return this.savedRoutineRepo.updateRoutine(routine, { formatted_moves: updatedRoutine.formatted_moves, name: updatedRoutine.name })
  }
}
