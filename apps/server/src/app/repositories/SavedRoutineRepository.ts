import { AbstractRepository, EntityRepository } from "typeorm"

import { Move } from "../models/Move"
import { SavedRoutine } from "../models/SavedRoutine"
import { NewRoutineInput } from "../modules/savedRoutine/types"

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
}
