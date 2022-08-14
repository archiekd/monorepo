import fs from "fs"
import { GraphQLSchema, printSchema } from "graphql"
import { buildSchemaSync } from "type-graphql"
import Container from "typedi"
import { LoginResolver } from "./modules/auth/login.resolver"
import { MoveResolver } from "./modules/moves/move.resolver"
import { authChecker } from "./utils/auth"

export const schema = buildSchemaSync({
  resolvers: [MoveResolver, LoginResolver],
  authChecker,
  container: Container
})

export const generateSchema = (schema: GraphQLSchema): void => {
  fs.writeFile(process.cwd() + "/apps/server/src/generated/schema.graphql", printSchema(schema), (err: unknown) => {
    if (err) throw err
  })
}

export default printSchema(schema)
