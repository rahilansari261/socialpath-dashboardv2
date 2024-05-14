import { PrismaClient, User, userRole } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
        const user: User | null = await prisma.user.findUnique({
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
    signIn: "/signin", // Consider specifying a dedicated sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as userRole;
      }

      // session.user.role = user.role as userRole;

      return session;
    },
  },
};
