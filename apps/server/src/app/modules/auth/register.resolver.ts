import { Arg, Ctx, Mutation, Resolver } from "type-graphql"
import { Service } from "typedi"
import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../../models/User"
import { SessionRepository } from "../../repositories/SessionRepository"
import { UserRepository } from "../../repositories/UserRepository"
import { MyContext } from "../../types/MyContext"
import { setTokenCookie } from "../../utils/auth"

@Service()
@Resolver()
export class RegisterResolver {
  constructor(@InjectRepository() private userRepo: UserRepository, @InjectRepository() private sessionRepo: SessionRepository) {}

  @Mutation(() => User, { nullable: true })
  async signup(@Ctx() context: MyContext, @Arg("email") email: string, @Arg("password") password: string): Promise<User | null> {
    const user = await this.userRepo.createNewUser(email, password)

    await context.login(user)

    const { token } = await this.sessionRepo.createNewSession(user)
    if (!token) return null

    setTokenCookie(context.res, token)

    return user
  }
}
