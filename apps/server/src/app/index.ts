import "reflect-metadata"

import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import { buildContext } from "graphql-passport"
import http from "http"
import passport from "passport"
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader"
import { getConnection, useContainer } from "typeorm"
import { Container } from "typeorm-typedi-extensions"

import { User } from "./models/User"
import { authRouter } from "./routes/authRouter"
import { generateSchema, schema } from "./schema"
import { connectPostgres } from "./services/Postgres"

useContainer(Container)

export async function startApolloServer() {
  if (process.env.NODE_ENV === "development") generateSchema(schema)

  await connectPostgres()

  const app = express()
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "development"
          ? ["http://localhost:3000", "http://localhost:4200", "http://localhost:4000", "http://localhost:5000", "http://localhost:8000"]
          : ["https://app.routine-lab.co.uk", "https://routine-lab.co.uk"],
      credentials: true
    })
  )

  app.use(cookieParser())
  const passportMiddleware = passport.initialize()
  app.use(passportMiddleware)

  app.use(express.json())

  app.use("/auth", authRouter)

  app.use("/graphql", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (user) {
        req.user = user
      }

      next()
    })(req, res, next)
  })

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection // for use with TypeORM
      })
    ],
    context: ({ req, res }) => {
      return buildContext({
        req,
        res,
        User
      })
    }
  })
  await server.start()
  server.applyMiddleware({ app, cors: false })
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}
