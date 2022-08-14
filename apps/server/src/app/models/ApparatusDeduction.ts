import { Field, ObjectType, registerEnumType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseModel } from "../core/BaseModel"
import { Apparatus } from "./Apparatus"

export enum ErrorSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

registerEnumType(ErrorSize, {
  name: "ErrorSize", // this one is mandatory
  description: "These are all the sizes that an error can be" // this one is optional
})

export enum PointDeduction {
  ONE = 0.1,
  THREE = 0.3,
  FIVE = 0.5,
  FALL = 1
}

registerEnumType(PointDeduction, {
  name: "PointDeduction", // this one is mandatory
  description: "These are all the point deductions for different errors" // this one is optional
})

@Entity()
@ObjectType()
export class ApparatusDeduction extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  error: number

  @Field(() => ErrorSize)
  @Column("varchar")
  size: ErrorSize

  @Field(() => Apparatus)
  @OneToOne(() => Apparatus, (apparatus) => apparatus.deduction)
  @TypeormLoader()
  apparatus: Promise<Apparatus>

  @Field(() => PointDeduction)
  @Column("varchar")
  pointDeduction: PointDeduction
}
