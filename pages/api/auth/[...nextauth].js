import NextAuth from "next-auth"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import dbConnect from "../../../serverUtils/connectDB";


export const authOptions = {
    secret: process.env.SECRET,
    database: process.env.MONGO_URI,
    providers: [
        // OAuth authentication providers
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
        // Sign in with passwordless email link
        EmailProvider({
            server: process.env.MAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(dbConnect),
}

export default (req, res) => NextAuth(req, res, authOptions)

