module.exports = [
  {
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST || "",
    username: process.env.POSTGRES_USERNAME || "",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DATABASE || "",
    port: 5432,
    synchronize: process.env.NODE_ENV === "development" ? true : false,
    logging: process.env.POSTGRES_LOGGING === "true" ? true : false,
    entities: ["apps/server/src/models/**/*.{js,ts}"],
    migrations: ["apps/server/db/migrations/*.{js,ts}"],
    subscribers: ["apps/server/src/subscribers/**/*.{js,ts}"],
    seeds: ["apps/server/src/tests/seeds/**/*.{js,ts}"],
    factories: ["apps/server/src/tests/factories/**/*.{js,ts}"],
    cli: {
      migrationsDir: "apps/server/db/migrations"
    }
  }
]
