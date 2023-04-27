module.exports = {
  client: {
    includes: ["./apps/web/**/*.tsx"],
    service: {
      name: "routine-lab",
      localSchemaFile: "./apps/server/src/generated/schema.graphql"
    }
  }
}
