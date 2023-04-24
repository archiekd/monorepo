import { Field, Float, ObjectType, registerEnumType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { BaseModel } from "../core/BaseModel"
import { Apparatus } from "./Apparatus"
import { CodeOfPointsGroup } from "./CodeOfPointsGroup"
import { SavedRoutine } from "./SavedRoutine"
import { User } from "./User"

export enum MoveValue {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G"
}

registerEnumType(MoveValue, {
  name: "MoveValue", // this one is mandatory
  description: "The letter value of a move" // this one is optional
})

export const moveValuePoint = {
  [MoveValue.A]: 0.1,
  [MoveValue.B]: 0.2,
  [MoveValue.C]: 0.3,
  [MoveValue.D]: 0.4,
  [MoveValue.E]: 0.5,
  [MoveValue.F]: 0.6,
  [MoveValue.G]: 0.7
}

export enum CopGroup {
  I = 1,
  II = 2,
  III = 3,
  IV = 4,
  V = 5
}

registerEnumType(CopGroup, {
  name: "CopGroup", // this one is mandatory
  description: "The COP group that the move is part of" // this one is optional
})

@Entity()
@ObjectType()
export class Move extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  description: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  namedAfter?: string

  @Field(() => [String])
  @Column("varchar", { array: true, default: [] })
  otherNames: string[]

  @TypeormLoader()
  @Field(() => CodeOfPointsGroup)
  @ManyToOne(() => CodeOfPointsGroup, (copGroup) => copGroup.move)
  copGroup: Promise<CodeOfPointsGroup>

  @Field()
  @Column()
  letterValue: MoveValue

  @Field(() => Float)
  pointValue(): number {
    return moveValuePoint[this.letterValue]
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  copIndex?: string

  @Field()
  @Column()
  isDoubleRotation: boolean

  @TypeormLoader()
  @Field(() => Apparatus)
  @ManyToOne(() => Apparatus, (apparatus) => apparatus.moves)
  apparatus: Promise<Apparatus>

  @Field(() => [SavedRoutine])
  @OneToMany(() => SavedRoutine, (savedRoutine) => savedRoutine.moves)
  routineMoves: Promise<SavedRoutine[]>

  @TypeormLoader()
  @Field(() => [User])
  @OneToMany(() => User, (user) => user.favouriteMove)
  users: Promise<User[]>

  @TypeormLoader()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.movesCreated)
  createdBy: Promise<User>

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
