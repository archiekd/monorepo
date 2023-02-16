import { Connection, createConnection, getConnection } from "typeorm"

type CreateConnectionOpts = {
  loadEntitiesAndMigrations: boolean
}

let connection: Connection

export const createTypeormConnections = async (opts: CreateConnectionOpts): Promise<Connection> => {
  if (opts.loadEntitiesAndMigrations) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const entitiesAndMigrations = require("../../entities-and-migrations").entitiesAndMigrations
    console.log("entitiesAndMigrations.entities", entitiesAndMigrations.entities)
    return createConnection({
      name: "default",
      type: "postgres",
      host: process.env.TYPEORM_HOST || "localhost",
      username: process.env.TYPEORM_USERNAME || "hectorkennedy-dyson",
      password: process.env.TYPEORM_PASSWORD || "",
      database: process.env.TYPEORM_DATABASE || "routine_lab_local",
      port: 5432,
      synchronize: process.env.NODE_ENV === "development" ? true : false,
      logging: process.env.POSTGRES_LOGGING === "true" ? true : false,
      entities: entitiesAndMigrations.entities,
      migrations: entitiesAndMigrations.migrations,
      subscribers: entitiesAndMigrations.subscribers
    })
  }

  console.log("Using ORM Config for Postgres configuration")
  return createConnection()
}

export const connectPostgres = async (opts: CreateConnectionOpts = { loadEntitiesAndMigrations: true }) => {
  try {
    connection = getConnection()
  } catch (err) {
    connection = await createTypeormConnections(opts)
  }

  return connection
}

export const closePostgresConnection = async () => {
  if (!connection) return
  await connection.close()
}
