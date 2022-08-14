import { BeforeInsert, BeforeUpdate } from "typeorm"
import { validate } from "class-validator"
import { ClassValidatorError } from "../utils/errors/ClassValidatorError"

export abstract class BaseModel {
  // HOOKS
  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    const errors = await validate(this)

    if (errors.length > 0) {
      throw new ClassValidatorError(errors)
    }
  }
}
