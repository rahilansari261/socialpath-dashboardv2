import { User, userRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const allUsers: User[] = await db.user.findMany({
    where: {
      role: "user",
    },
  });
  if (!allUsers) {
    return NextResponse.json({ message: "No users found." }, { status: 404 });
  }
  return NextResponse.json({
    message: "users fetched successfully. ",
    users: allUsers,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, username, email, password, phone, subscriptionId } =
      await req.json();
    const existingUser = await db.user.findFirst({
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
    await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role: userRole.user,
        phone,
        subscriptionId,
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
