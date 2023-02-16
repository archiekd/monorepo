import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { BaseModel } from "../core/BaseModel"
import { Apparatus } from "./Apparatus"
import { Move } from "./Move"

@Entity()
@ObjectType()
export class CodeOfPointsGroup extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  group: number

  @Field()
  @Column()
  description: string

  @Field(() => Apparatus)
  @ManyToOne(() => Apparatus, (apparatus) => apparatus.codeOfPointsGroups)
  apparatus: Promise<Apparatus>

  @TypeormLoader()
  @Field(() => [Move])
  @OneToMany(() => Move, (move) => move.copGroup)
  move: Promise<Move[]>
}
