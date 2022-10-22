import { BuildSchemaOptions, NonEmptyArray } from "type-graphql"
import { ConnectionOptions } from "typeorm"

export type EntitiesAndMigrationsOpts = Pick<ConnectionOptions, "entities" | "migrations" | "subscribers">

const importAllFunctions = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext
    .keys()
    .sort()
    .map((filename) => {
      const required = requireContext(filename)
      return (Object.keys(required) as string[]).reduce((result, exportedKey) => {
        const exported = required[exportedKey]
        if (typeof exported === "function") {
          return result.concat(exported)
        }
        return result
      }, [] as any)
    })
    .flat()

const entitiesViaWebpack: NonNullable<EntitiesAndMigrationsOpts["entities"]> = importAllFunctions(require.context("./app/models/", true, /\.ts$/))

// const migrationsViaWebpack: NonNullable<EntitiesAndMigrationsOpts["migrations"]> = importAllFunctions(
//   require.context("../app/db/migrations/", true, /\.ts$/)
// )
// const subscribersWebpack: NonNullable<EntitiesAndMigrationsOpts["subscribers"]> = importAllFunctions(require.context("./subscribers/", true, /\.ts$/))

export const entitiesAndMigrations = {
  entities: entitiesViaWebpack,
  // datasetEntities: datasetEntitiesViaWebpack,
  migrations: [], //migrationsViaWebpack,
  subscribers: [] //subscribersWebpack
}

// eslint-disable-next-line @typescript-eslint/ban-types
const resolvers = importAllFunctions(require.context("./app/modules", true, /\.resolver\.ts$/))

export const resolversViaWebpack = { resolvers }
