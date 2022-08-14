import { EntityRepository, AbstractRepository } from "typeorm"
import { Move } from "../models/Move"
import { User } from "../models/User"
import { NewMoveInput } from "../modules/moves/types"

@EntityRepository(Move)
export class MoveRepository extends AbstractRepository<Move> {
  async findById(id: string): Promise<Move | undefined> {
    return this.repository.findOne({ id })
  }

  async createMove(newMoveInput: NewMoveInput, createdBy: User): Promise<Move> {
    const { apparatus, ...moveInput } = newMoveInput
    const move = this.repository.create(moveInput)
    move.createdBy = Promise.resolve(createdBy)
    return this.repository.save(move)
  }
}
