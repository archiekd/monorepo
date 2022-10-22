import { Connection, createConnection, getConnection } from "typeorm"

type CreateConnectionOpts = {
  loadEntitiesAndMigrations: boolean
}

let connection: Connection

export const createTypeormConnections = async (opts: CreateConnectionOpts): Promise<Connection> => {
  if (opts.loadEntitiesAndMigrations) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const entitiesAndMigrations = require("../../entities-and-migrations").entitiesAndMigrations

    return createConnection({
      name: "default",
      type: "postgres",
      host: process.env.POSTGRES_HOST || "",
      username: process.env.POSTGRES_USERNAME || "",
      password: process.env.POSTGRES_PASSWORD || "",
      database: process.env.POSTGRES_DATABASE || "",
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
