import { AbstractRepository, EntityRepository } from "typeorm"

import { Apparatus } from "../models/Apparatus"

@EntityRepository(Apparatus)
export class ApparatusRepository extends AbstractRepository<Apparatus> {
  async findByName(name: string): Promise<Apparatus | undefined> {
    const apparatus = this.repository.findOne({ where: { name } })
    return apparatus
  }
}
