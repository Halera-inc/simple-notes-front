import NextAuth from "next-auth"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import clientPromise from "../../../serverUtils/mongoDB";
import dbConnect from "../../../serverUtils/dbConnect"
import {compare} from "bcrypt";
import User from "../../../serverUtils/models/User";

export const authOptions = {
    providers: [
        // OAuth authentication providers
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // Email & Password
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                // console.log(credentials)
                await dbConnect();

                // Find user with the email
                const user = await User.findOne({
                    email: credentials?.email,
                });

                // Email Not found
                if (!user) {
                    throw new Error("Email is not registered");
                }

                // Check hashed password with DB hashed password
                const isPasswordCorrect = await compare(
                    credentials?.password,
                    user.password,
                );

                // Incorrect password
                if (!isPasswordCorrect) {
                    throw new Error("Password is incorrect");
                }

                return user;
            },
        }),
    ],
    database: process.env.MONGO_URL,
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        session: async ({session, token}) => {
            console.log('____session____')
            console.log(session)
            console.log('____/session/____')
            console.log('____token____')
            console.log(token)
            console.log('____/token/____')
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    pages: {
        signIn: '/login',
        error: '/404'
    },
    debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)


