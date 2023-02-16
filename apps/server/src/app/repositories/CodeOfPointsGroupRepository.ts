import { AbstractRepository, EntityRepository } from "typeorm"

import { Apparatus } from "../models/Apparatus"
import { CodeOfPointsGroup } from "../models/CodeOfPointsGroup"

@EntityRepository(CodeOfPointsGroup)
export class CodeOfPointsGroupRepository extends AbstractRepository<CodeOfPointsGroup> {
  async findByGroupAndApparatus(group: number, apparatus: Apparatus): Promise<CodeOfPointsGroup | undefined> {
    return this.repository.findOne({ where: { group, apparatus: apparatus.id } })
  }
}
