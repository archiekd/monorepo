import { Field, ObjectType, registerEnumType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseModel } from "../core/BaseModel"
import { ApparatusDeduction } from "./ApparatusDeduction"
import { CodeOfPoints } from "./CodeOfPoints"
import { Move } from "./Move"
import { User } from "./User"

export enum ApparatusName {
  FLOOR = "floor",
  POMMEL = "pommel",
  RINGS = "rings",
  VAULT = "vault",
  PARALLEL_BARS = "parallel_bars",
  HIGH_BAR = "high_bar"
}

registerEnumType(ApparatusName, {
  name: "ApparatusName", // this one is mandatory
  description: "These are all the apparatus in mens gymnastics" // this one is optional
})

@Entity()
@ObjectType()
@Index("apparatus_cop_unique", ["name", "codeOfPoints"])
export class Apparatus extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => ApparatusName)
  @Column("varchar")
  name: ApparatusName

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  presentationInformation: string

  @Field()
  @Column()
  dScoreInformation: string

  @TypeormLoader()
  @Field(() => [Move])
  @OneToMany(() => Move, (move) => move.apparatus)
  moves: Promise<Move[]>

  @TypeormLoader()
  @Field(() => ApparatusDeduction)
  @OneToOne(() => ApparatusDeduction, (apparatusDeductions) => apparatusDeductions.apparatus)
  deduction: Promise<ApparatusDeduction>

  @TypeormLoader()
  @Field(() => CodeOfPoints)
  @ManyToOne(() => CodeOfPoints, (codeOfPoints) => codeOfPoints.apparatus)
  codeOfPoints: Promise<CodeOfPoints>

  @TypeormLoader()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.apparatusCreated)
  createdBy: Promise<User>

  @TypeormLoader()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.apparatusUpdated)
  updateBy: Promise<User>
}
