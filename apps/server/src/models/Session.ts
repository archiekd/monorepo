import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Field, ObjectType } from "type-graphql"
import { BaseModel } from "../app/core/BaseModel"
import { User } from "./User"

@ObjectType()
@Entity()
export class Session extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field(() => String)
  @Column({ nullable: true })
  device?: string

  @Field()
  @Column({ default: false })
  admin: boolean

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  user: Promise<User>

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
