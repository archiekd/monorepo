import { EntityRepository, AbstractRepository, getCustomRepository, DeleteResult } from "typeorm"
import { Session } from "../models/Session"
import { User } from "../models/User"
import jwt from "jsonwebtoken"
import { UserRepository } from "./UserRepository"

@EntityRepository(Session)
export class SessionRepository extends AbstractRepository<Session> {
  findById(id: string): Promise<Session | undefined> {
    return this.repository.findOne({ id: id })
  }

  async removeAllSessionsForUser(user: User): Promise<DeleteResult> {
    return this.repository.createQueryBuilder().delete().where({ user: user }).execute()
  }

  async removeSession(session: Session): Promise<Session> {
    return this.repository.remove(session)
  }

  async createNewSession(user: User, device?: string): Promise<{ session: Session; token: string }> {
    const sessions = await this.repository.createQueryBuilder().where({ user: user }).orderBy('"createdAt"', "DESC").offset(1).getMany()

    for (const session of sessions) {
      await this.repository.remove(session)
    }

    const newSession = new Session()
    newSession.user = Promise.resolve(user)
    newSession.device = device
    await this.repository.save(newSession)

    await getCustomRepository(UserRepository).increaseLoginCount(user)

    return {
      session: newSession,
      token: this.generateToken(newSession)
    }
  }

  generateToken(session: Session): string {
    return jwt.sign(
      {
        id: session.id
      },
      process.env.SECRET || ""
    )
  }
}
