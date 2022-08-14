import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { BaseModel } from "../core/BaseModel"
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

  @TypeormLoader()
  @Field(() => [Move])
  @OneToMany(() => Move, (move) => move.copGroup)
  move: Promise<Move[]>
}
