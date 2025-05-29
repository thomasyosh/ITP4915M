import axios from "axios";
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { clientPromise } from '../../../lib/mongodb';
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
            name: "Sign in with Email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // return (
                if (credentials == null) return null;
 
                try {
                    /* I tried `...rest` but no luck. also console log doesn't work here and I can't see the actual response from the API call */
                    const { user, jwt } =
                        (await axios
                            .post(
                                `${process.env.STRAPI_URL}/api/auth/local`,
                                {
                                    identifier: credentials.email,
                                    password: credentials.password,
                                }
                            )
                            .then((response) => {
                                return response.data;
                            })
                            .catch((error) => {
                                console.log(error.response);
                                throw new Error(error.response.data.message);
                            })) || null;

                    return { jwt, ...user };
                } catch (error) {
                    console.warn(error);
                    // Sign In Fail
                    // return null;
                }
                // );
            },
        }),
    ],
    // adapter: MongoDBAdapter(clientPromise),
    // pages: {
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/verify-request', // (used for check email message)
    //     newUser: undefined // If set, new users will be directed here on first sign in
    // },
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.id = user.id;
            return session
        },
        
        async redirect({ url, baseUrl }) {
            // Always redirect to the index page after sign-in, unless the recipe detail page is requested
            if (url.includes('RecipeDetail')) return url
            return baseUrl; // this is equivalent to '/'
        }
    },

}

export default NextAuth(authOptions)