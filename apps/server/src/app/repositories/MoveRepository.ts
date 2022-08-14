import { EntityRepository, AbstractRepository } from "typeorm"
import { Move } from "../../models/Move"
import { NewMoveInput } from "../modules/moves/types"

@EntityRepository(Move)
export class MoveRepository extends AbstractRepository<Move> {
  async findById(id: string): Promise<Move | undefined> {
    return this.repository.findOne({ id })
  }

  async createMove(newMoveInput: NewMoveInput): Promise<Move> {
    const move = this.repository.create(newMoveInput)
    return this.repository.save(move)
  }
}
