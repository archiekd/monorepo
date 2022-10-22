import fs from "fs"
import { GraphQLSchema, printSchema } from "graphql"
import { BuildSchemaOptions, buildSchemaSync } from "type-graphql"
import Container from "typedi"

// import { LoginResolver } from "./modules/auth/login.resolver"
// import { MoveResolver } from "./modules/moves/move.resolver"
import { authChecker } from "./utils/auth"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const resolversViaWebpack = require("../entities-and-migrations").resolversViaWebpack
export const schema = buildSchemaSync({
  // TODO: Figure out how to get this to work with types properly
  resolvers: [...(resolversViaWebpack.resolvers as BuildSchemaOptions["resolvers"])],
  authChecker,
  container: Container
})

export const generateSchema = (schema: GraphQLSchema): void => {
  fs.writeFile(process.cwd() + "/apps/server/src/generated/schema.graphql", printSchema(schema), (err: unknown) => {
    if (err) throw err
  })
}

export default printSchema(schema)
