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
                console.log('____DbUser____')
                console.log(user)
                console.log('____/DbUser/____')
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
        async jwt({ token, user, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            console.log('_____JWTToken_start______')
            console.log(token)
            console.log('_____/JWTToken_start/______')
            if (user){
                console.log('____JWTUser____')
                console.log(user)
                console.log('____/JWTUser/____')
            }

            if (account) {
                console.log('____JWTaccount____')
                console.log(account)
                console.log('____/JWTaccount/____')
                token.accessToken = account.access_token
                // if (user){
                //     token.country = user.country
                //     token.image = user.image
                // }

                if (profile){
                    console.log('____JWTprofile____')
                    console.log(profile)
                    console.log('____/JWTprofile/____')
                    token.id = profile.id
                }
            }
            console.log('____JWTtoken____')
            console.log(token)
            console.log('____/JWTtoken/____')
            return token
        },
        session: async ({session, token, user}) => {
            if (token){
                console.log('____SessionToken____')
                console.log(token)
                console.log('____/SessionToken/____')
            }
            if (session?.user) {
                console.log('____SessionUser____')
                console.log(session.user)
                console.log('____/SessionUser/____')
                session.user.id = token.sub;
                // session.user.country = token.country
                // session.user.image = token.image
                session.user.image = token.picture
                session.user.accessToken = !!token.accessToken;
                console.log('____session____')
                console.log(session)
                console.log('____/session/____')
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


