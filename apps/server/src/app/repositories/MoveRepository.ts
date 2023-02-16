import { AbstractRepository, EntityRepository, getCustomRepository } from "typeorm"

import { Apparatus } from "../models/Apparatus"
import { CodeOfPointsGroup } from "../models/CodeOfPointsGroup"
import { Move } from "../models/Move"
import { User } from "../models/User"
import { NewMoveInput } from "../modules/moves/types"

@EntityRepository(Move)
export class MoveRepository extends AbstractRepository<Move> {
  async findById(id: string): Promise<Move | undefined> {
    return this.repository.findOne({ id })
  }

  async createMove(
    newMoveInput: Omit<NewMoveInput, "apparatus" | "copGroup">,
    apparatus: Apparatus,
    codeOfPointsGroup: CodeOfPointsGroup,
    createdBy: User
  ): Promise<Move> {
    const move = this.repository.create(newMoveInput)
    move.apparatus = Promise.resolve(apparatus)
    move.createdBy = Promise.resolve(createdBy)
    move.copGroup = Promise.resolve(codeOfPointsGroup)
    return this.repository.save(move)
  }

  async updateMoveName(name: string, move: Move) {
    const apparatus = await move.apparatus
    move.description = name
    return this.repository.save(move)
  }
}
