import { IsEmail } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { TypeormLoader } from "type-graphql-dataloader"
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { BaseModel } from "../core/BaseModel"
import { CodeOfPoints } from "./CodeOfPoints"
import { Move } from "./Move"
import { SavedRoutine } from "./SavedRoutine"
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
  favouriteMove: Promise<Move>

  @TypeormLoader()
  @Field(() => [Move])
  @OneToMany(() => Move, (move) => move.createdBy)
  movesCreated: Promise<Move[]>

  @TypeormLoader()
  @Field(() => [CodeOfPoints])
  @OneToMany(() => CodeOfPoints, (cop) => cop.createdBy)
  codeOfPointsCreated: Promise<CodeOfPoints[]>

  @TypeormLoader()
  @Field(() => [CodeOfPoints])
  @OneToMany(() => CodeOfPoints, (cop) => cop.updateBy)
  codeOfPointsUpdated: Promise<CodeOfPoints[]>

  @TypeormLoader()
  @Field(() => [CodeOfPoints])
  @OneToMany(() => CodeOfPoints, (cop) => cop.createdBy)
  apparatusCreated: Promise<CodeOfPoints[]>

  @TypeormLoader()
  @Field(() => [CodeOfPoints])
  @OneToMany(() => CodeOfPoints, (cop) => cop.updateBy)
  apparatusUpdated: Promise<CodeOfPoints[]>

  @TypeormLoader()
  @Field(() => [SavedRoutine])
  @OneToMany(() => SavedRoutine, (routine) => routine.user)
  savedRoutines: Promise<SavedRoutine[]>

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
