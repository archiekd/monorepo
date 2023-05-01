import { AbstractRepository, EntityRepository } from "typeorm"

import { Move } from "../models/Move"
import { SavedRoutine } from "../models/SavedRoutine"
import { NewRoutineInput, UpdateRoutineInput } from "../modules/savedRoutine/types"

@EntityRepository(SavedRoutine)
export class SavedRoutineRepository extends AbstractRepository<SavedRoutine> {
  async findById(id: string): Promise<SavedRoutine | undefined> {
    return this.repository.findOne({ id })
  }

  async createRoutine(move: Move, newRoutine: Omit<NewRoutineInput, "moves">) {
    const routine = this.repository.create(newRoutine)
    routine.moves = Promise.resolve([move])
    return this.repository.save(routine)
  }

  async updateRoutine(routine: SavedRoutine, updatedRoutine: Omit<UpdateRoutineInput, "move">, move: Move) {
    if (updatedRoutine.name) routine.name = updatedRoutine.name

    if (move) {
      ;(await routine.moves).push(move)
      routine.formatted_moves.push([move.id])
    }

    if (updatedRoutine.formatted_moves) routine.formatted_moves = updatedRoutine.formatted_moves

    return this.repository.save(routine)
  }
}
