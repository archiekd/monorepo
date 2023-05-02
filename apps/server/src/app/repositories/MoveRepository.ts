import { AbstractRepository, EntityRepository, In } from "typeorm"

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

  async findManyByIds(ids: string[]): Promise<Move[] | undefined> {
    return this.repository.find({ where: { id: In(ids) } })
  }

  async findApparatusMoves(apparatus: Apparatus, searchInput?: string | null): Promise<Move[]> {
    const query = this.repository
      .createQueryBuilder("move")
      .leftJoin("move.apparatus", "apparatus") // LEFT JOIN apparatus ON apparatus.id = move.apparatusId
      .where("apparatus.id = :id", { id: apparatus.id })

    console.log("searchInput", searchInput)
    if (searchInput) {
      query.andWhere(`move.description ILIKE :searchInput OR move."namedAfter" ILIKE :searchInput`, {
        searchInput: `%${searchInput.trim()}%`
      })
    }

    return query.getMany()
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
