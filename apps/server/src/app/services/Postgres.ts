import { Connection, getConnection, createConnection, ConnectionOptions } from "typeorm"
import { Move } from "../../models/Move"
import { Session } from "../../models/Session"
import { User } from "../../models/User"

const rootDir = process.env.NODE_ENV === "development" ? "src" : "dist/src"
// type EntitiesAndMigrationsOpts = Pick<ConnectionOptions, "entities" | "migrations">
// const importAllFunctions = (requireContext) =>
//   requireContext
//     .keys()
//     .sort()
//     .map((filename) => {
//       const required = requireContext(filename)
//       return Object.keys(required).reduce((result, exportedKey) => {
//         const exported = required[exportedKey]
//         if (typeof exported === "function") {
//           return result.concat(exported)
//         }
//         return result
//       }, [] as any)
//     })
//     .flat()
// const entitiesViaWebpack: NonNullable<EntitiesAndMigrationsOpts["entities"]> = importAllFunctions(require.context("./entity/", true, /\.ts$/))

export const connectPostgres = async (): Promise<Connection> => {
  let connection: Connection

  try {
    connection = getConnection()
  } catch (err) {
    connection = await createConnection({
      type: "postgres",
      host: process.env.TYPEORM_HOST || "localhost",
      username: process.env.TYPEORM_USERNAME || "archiekd",
      password: process.env.TYPEORM_PASSWORD || "",
      database: process.env.TYPEORM_DATABASE || "routine_lab_local",
      port: 5432,
      synchronize: process.env.NODE_ENV === "development" ? true : false,
      logging: process.env.NODE_ENV === "development" ? false : false,
      entities: [Move, Session, User],
      migrations: [rootDir + "/migrations/*.{js,ts}"],
      subscribers: [rootDir + "/subscribers/**/*.{js,ts}"]
    })
  }

  return connection
}
