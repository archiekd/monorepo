import { Field, Float, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { BaseModel } from "../app/core/BaseModel"
import { User } from "./User"

@Entity()
@ObjectType()
export class Move extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  apparatus: string

  @Field(() => Float)
  @Column("float")
  pointValue: number

  @Field()
  @Column()
  letterValue: string

  @Field()
  @Column()
  copGroup: string

  @Field()
  @Column()
  isDoubleRotation: boolean

  @TypeormLoader()
  @Field(() => [User])
  @OneToMany(() => User, (user) => user.favourtieMove)
  users: Promise<User[]>

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
