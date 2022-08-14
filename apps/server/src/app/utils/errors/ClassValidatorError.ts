import { ApolloError } from "apollo-server-express"
import { ValidationError } from "class-validator"

export class ClassValidatorError extends ApolloError {
  constructor(errors?: ValidationError[]) {
    super("Values didn't pass validation", "CLASS_VALIDATION_ERROR", { errors })
  }
}
