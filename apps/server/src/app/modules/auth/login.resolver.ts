import { UserInputError } from "apollo-server-core"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../../models/User"
import { SessionRepository } from "../../repositories/SessionRepository"
import { MyContext } from "../../types/MyContext"
import { setTokenCookie } from "../../utils/auth"
import jwt from "jsonwebtoken"

@Service()
@Resolver()
export class LoginResolver {
  constructor(@InjectRepository() private sessionRepo: SessionRepository) {}

  @Authorized()
  @Query(() => User, { nullable: true })
  async getCurrentUser(@Ctx() context: MyContext): Promise<User | undefined> {
    console.log(`getCurrentUser`)
    return context.getUser()
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() context: MyContext): Promise<boolean> {
    const decode = jwt.verify(context.req.cookies["token"], process.env.SECRET || "")
    const session = await this.sessionRepo.findById((decode as { id: string }).id)
    if (!session) throw new UserInputError("Not currently logged in")

    await this.sessionRepo.removeSession(session)
    return true
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("email") email: string, @Arg("password") password: string, @Ctx() context: MyContext): Promise<User | null> {
    const { user } = await context.authenticate("graphql-local", { email, password })
    if (!user) throw new Error("No user")

    const { token } = await this.sessionRepo.createNewSession(user)
    if (!token) throw new UserInputError("Unable to login")

    await context.login(user)

    setTokenCookie(context.res, token)
    return user
  }
}
