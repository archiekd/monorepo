import { IsEmail } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { BaseModel } from "../app/core/BaseModel"
import { Move } from "./Move"
import { Session } from "./Session"

@Entity("user_account")
@ObjectType()
export class User extends BaseModel {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string

  @Field(() => String, { nullable: true })
  @Column("varchar", { nullable: true })
  passwordHash?: string | null

  @Field()
  @Column({ default: 0 })
  loginCount: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  googleRefreshToken: string

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  perishibleToken: string

  @Field()
  @Column({ default: false })
  superAdmin: boolean

  @TypeormLoader()
  @Field(() => Move)
  @ManyToOne(() => Move, (move) => move.users)
  favourtieMove: Promise<Move>

  @OneToMany(() => Session, (session) => session.user)
  sessions: Promise<Session[]>

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase(): void {
    if (this.email) this.email = this.email.toLowerCase().trim()
  }
}
