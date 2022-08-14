import { Field, ObjectType, registerEnumType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { BaseModel } from "../core/BaseModel"
import { Apparatus } from "./Apparatus"
import { User } from "./User"

export enum FIG {
  figMens = "fig_mens_artistic_gymnastics",
  figWomens = "fig_womens_artistic_gymnastics"
}

registerEnumType(FIG, {
  name: "FIG", // this one is mandatory
  description: "These are all the code of points versions" // this one is optional
})

@Entity()
@ObjectType()
export class CodeOfPoints extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => FIG)
  @Column("varchar")
  name: FIG

  @Field()
  @Column()
  generalInformation: string

  @TypeormLoader()
  @Field(() => [Apparatus])
  @OneToMany(() => Apparatus, (apparatus) => apparatus.codeOfPoints)
  apparatus: Promise<Apparatus[]>

  @TypeormLoader()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.codeOfPointsCreated)
  createdBy: Promise<User>

  @TypeormLoader()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.codeOfPointsUpdated)
  updateBy: Promise<User>
}
