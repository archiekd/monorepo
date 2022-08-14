import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { BaseModel } from "../core/BaseModel"
import { Move } from "./Move"
import { User } from "./User"

@Entity()
@ObjectType()
export class SavedRoutine extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @TypeormLoader()
  @Field(() => [Move])
  @ManyToMany(() => Move, (move) => move.routineMoves)
  moves: Promise<Move[]>

  @TypeormLoader()
  @Field(() => User)
  @OneToMany(() => User, (user) => user.savedRoutines)
  user: Promise<User>
}
