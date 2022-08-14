import express from "express"
import passport from "passport"
import { getCustomRepository } from "typeorm"
// import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { JwtFromRequestFunction, Strategy as JwtStrategy } from "passport-jwt"
import { GraphQLLocalStrategy } from "graphql-passport"
import { UserRepository } from "../repositories/UserRepository"
import { UserInputError, AuthenticationError } from "apollo-server-express"
import { User } from "../models/User"
import { SessionRepository } from "../repositories/SessionRepository"
import { setTokenCookie } from "../utils/auth"

passport.serializeUser<string>(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser<string>(async function (id, done) {
  const UserRepo = getCustomRepository(UserRepository)
  const user = await UserRepo.findById(id)
  done(null, user || undefined)
})

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const UserRepo = getCustomRepository(UserRepository)

    const user = await UserRepo.findByEmail(email as string)
    if (!user) return done(new UserInputError("Email or password does not match"), null)

    const isValid = await UserRepo.validatePassword(user, password as string)
    if (!isValid) return done(new UserInputError("Email or password does not match"), null)

    done(null, user)
  })
)

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_SECRET_ID || "",
//       callbackURL: process.env.API_URL + "/auth/google/callback",
//       passReqToCallback: true
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       const UserRepo = getCustomRepository(UserRepository)

//       try {
//         if (!profile.emails?.[0]) throw new Error("No email defined")

//         const email = profile.emails ? profile.emails[0].value : null
//         if (!email) throw new Error("No email defined")

//         const user = await UserRepo.findOrCreateUser(profile.displayName, email)

//         await UserRepo.setGoogleRefreshToken(user, refreshToken)

//         done(undefined, user)
//       } catch (err) {
//         done(err as Error, undefined)
//       }
//     }
//   )
// )

const cookieExtractor: JwtFromRequestFunction = function (req) {
  let token: string | null = null

  if (req && req.cookies) {
    token = req.cookies["token"]
  }
  return token
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRET
    },
    async function (jwt_payload, done) {
      const sessionRepo = getCustomRepository(SessionRepository)
      const session = await sessionRepo.findById(jwt_payload.id)
      if (!session) return done(new AuthenticationError("Token incorrect"), null)

      const user = await session.user

      return done(null, user)
    }
  )
)

const router = express.Router()

// router.get("/google", (req, res, next): void => {
//   const { invitationId } = req.query
//   const state = invitationId ? Buffer.from(JSON.stringify({ invitationId })).toString("base64") : undefined

//   const authenticator = passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "consent",
//     accessType: "offline",
//     state
//   })

//   authenticator(req, res, next)
// })

router.get("/google/callback", passport.authenticate("google"), async function (req, res): Promise<void> {
  // Successful authentication, redirect home.
  const user = req.user as User

  if (!user) return res.redirect(process.env.CLIENT_URL || "")

  const sessionsRepo = getCustomRepository(SessionRepository)

  const { token } = await sessionsRepo.createNewSession(user, req.headers["user-agent"])

  setTokenCookie(res, token)
  res.redirect(process.env.CLIENT_URL || "")
})

export const authRouter = router
