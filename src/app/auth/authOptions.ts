/* import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text", placeholder: "John Smith" },
            },
            async authorize(credentials: any) {
              
                // check to see if email and password is there
                if(!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }

                // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if no user was found 
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found')
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                return user;
            },
        }),  
  ],
  secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
};
function CredentialsProvider(arg0: {}): import("next-auth/providers").Provider {
    throw new Error("Function not implemented.");
}

 */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../prisma/client";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authOption = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "youremail@email.com",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Name",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // check to see if email and password is there
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user was found
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }

        // check to see if password matches
        const passwordMatch = credentials.password === user.hashedPassword;

        // if password does not match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthOptions;
