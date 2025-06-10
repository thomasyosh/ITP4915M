import axios from "axios";
import NextAuth from 'next-auth';
import type { NextAuthOptions  } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID || '',
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        //     profile: (profile) => {
        //         return {
        //             id: profile.sub,
        //             name: profile.name || 'Anonymous',
        //             email: profile.email,
        //             image: profile.picture || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y', // Default image if not provided
        //         }
        //     }
        // }),
        CredentialsProvider({
            id: "signin",
            name: "email and password",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (credentials == null) return null;
                try {
                    const { user, jwt } =
                        (await axios
                            .post(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
                                {
                                    identifier: credentials.email,
                                    password: credentials.password,
                                }
                            )
                            .then((response) => {
                                return response.data;
                            })
                            .catch((error) => {
                                console.log("error message", error.response);
                                throw new Error(error.response.data.message);
                            })) || null;

                    return { jwt, ...user };
                } catch (error) {
                    console.warn(error);
                }
            },
        }),
        CredentialsProvider({
            id: "signup",
            name: "Register account",
            credentials: {
                username: { label: "Username", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                confirmPassword: { label: "Confirmed Password", type: "password" },
                
            },
            async authorize(credentials, req) {
                if (credentials?.password !=  credentials?.confirmPassword) {
                    return null;
                }
                
                try {
                    const { user, jwt } =
                        (await axios
                            .post(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
                                {
                                    username: credentials?.username,
                                    email: credentials?.email,
                                    password: credentials?.password
                                }
                            )
                            .then((response) => {
                                return response.data;
                            })
                            .catch((error) => {
                                console.log("error message", error.response);
                                throw new Error(error.response.data.message);
                            })) || null;

                    return { jwt, ...user };
                } catch (error) {
                    console.warn(error);
                }
            },
        }),


    ],
    pages :{
        newUser: '/auth/register',
    },
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user = token.user as any;
            console.log(session);
            return session
        },

        async jwt({ token, user }) {
            if (user) {
              token.user = user;
            }
            return token;
          },
        
        async redirect({ url, baseUrl }) {
            // Always redirect to the index page after sign-in, unless the recipe detail page is requested
            if (url.includes('RecipeDetail')) return url
            return baseUrl; // this is equivalent to '/'
        },
      },
    session: {
        maxAge: 60 * 60, // 20 in seconds
        updateAge: 24 * 60 * 60,
        strategy: "jwt",
       },
}
export default NextAuth(authOptions)
