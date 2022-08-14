import { BuildSchemaOptions } from "type-graphql"

export class Module {
  public resolvers: BuildSchemaOptions["resolvers"]

  constructor({ resolvers }: { resolvers: BuildSchemaOptions["resolvers"] }) {
    this.resolvers = resolvers
  }
}
