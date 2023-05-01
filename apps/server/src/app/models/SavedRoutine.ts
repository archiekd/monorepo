import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { BaseModel } from "../core/BaseModel"
import { Move } from "./Move"
import { User } from "./User"

@Entity()
@ObjectType()
export class SavedRoutine extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => String)
  @Column("varchar")
  name: string

  @TypeormLoader()
  @Field(() => [Move])
  @ManyToMany(() => Move, (move) => move.routineMoves)
  @JoinTable({
    name: "routine_move",
    joinColumn: {
      name: "routine_move_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "move_id",
      referencedColumnName: "id"
    }
  })
  moves: Promise<Move[]>

  @Field(() => [[String]])
  @Column("jsonb")
  formatted_moves: Array<string[]>

  @TypeormLoader()
  @Field(() => User)
  @OneToMany(() => User, (user) => user.savedRoutines)
  user: Promise<User>
}
