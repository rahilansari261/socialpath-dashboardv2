import { PrismaClient, User, userRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const allUsers: User[] = await prisma.user.findMany({
    where: {
      role: "user",
    },
  });
  if (!allUsers) {
    return NextResponse.json({ message: "No users found." }, { status: 404 });
  }
  return NextResponse.json({ message: "users fetched successfully. ", users: allUsers });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone } = await req.json();
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: "Email is already registered." },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { message: "Phone number is already registered." },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole.user,
        phone,
      },
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
