import { uniq } from "lodash"
import { AbstractRepository, EntityRepository, getCustomRepository } from "typeorm"

import { Move } from "../models/Move"
import { SavedRoutine } from "../models/SavedRoutine"
import { NewRoutineInput, UpdateRoutineInput } from "../modules/savedRoutine/types"
import { MoveRepository } from "./MoveRepository"

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

  async updateRoutine(routine: SavedRoutine, updatedRoutine: UpdateRoutineInput) {
    if (updatedRoutine.name) routine.name = updatedRoutine.name

    if (updatedRoutine.formatted_moves) {
      const extractedMoves = updatedRoutine.formatted_moves.reduce((acc, curr) => {
        acc.push(curr.moves)
        return acc
      }, [])

      const newMoves = uniq(extractedMoves.flat())

      const moveRepo = getCustomRepository(MoveRepository)
      const moves = moveRepo.findManyByIds(newMoves)

      routine.moves = moves
      routine.formatted_moves = updatedRoutine.formatted_moves
    }

    return this.repository.save(routine)
  }
}
