import { EntityRepository, AbstractRepository } from "typeorm"
import { User } from "../models/User"
import { generatePasswordHash, validatePassword } from "../utils/encryption"

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({ id })
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email: email.toLowerCase().trim() })
  }

  async validatePassword(user: User, currentPassword: string): Promise<boolean> {
    return validatePassword(user, currentPassword)
  }

  async findOrCreateUser(name: string, email: string): Promise<User> {
    const user = await this.findByEmail(email)
    if (user) return user

    return await this.createNewUser(name, email)
  }

  async createNewUser(email: string, password: string): Promise<User> {
    let passwordHash: string | null = null

    if (password) passwordHash = await generatePasswordHash(password)
    const user = this.repository.create({
      email: email.toLowerCase().trim(),
      passwordHash
    })
    return this.repository.save(user)
  }

  async setGoogleRefreshToken(user: User, token: string): Promise<User> {
    user.googleRefreshToken = token
    return await this.repository.save(user)
  }

  async increaseLoginCount(user: User): Promise<User> {
    user.loginCount++
    return await this.repository.save(user)
  }
}
