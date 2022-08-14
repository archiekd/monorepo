import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseModel } from "../core/BaseModel"
import { Move } from "./Move"
import { SavedRoutine } from "./SavedRoutine"

@Entity("routine_move")
@ObjectType()
export class RoutineMove extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @TypeormLoader()
  @Field(() => Move)
  @ManyToOne(() => Move, (move) => move.routineMoves)
  @JoinColumn({ name: "move_id" })
  move: Promise<Move>

  @TypeormLoader()
  @Field(() => SavedRoutine)
  @ManyToOne(() => SavedRoutine, (savedRoutine) => savedRoutine.moves, { primary: true })
  @JoinColumn({ name: "saved_routine_id" })
  savedRoutine: Promise<SavedRoutine>

  @Field()
  @Column()
  orderNumber: number

  @Field()
  @Column()
  connection: boolean
}
