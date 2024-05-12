import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// }

type Credentials = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials", // Added for clarity
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined, req) {
        if (!credentials) return null;
        const { email, password } = credentials;

        // Fetch the user by email
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        // If user is found and passwords match
        if (user && (await bcrypt.compare(password, user.password))) {
          // Return the user object excluding the password
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        // If user not found or passwords don't match

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Consider specifying a dedicated sign-in page
  },
};
