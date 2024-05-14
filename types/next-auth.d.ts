import { userRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      role: userRole;
      phone: string;
    } & DefaultSession["user"];
  }
  export interface User {
    id: string;
    name: string;
    email: string;
    role: userRole; // Add this line
  }
}
