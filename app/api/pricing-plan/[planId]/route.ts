// pages/api/pricing-plan.ts
import { db } from "../../../../db";
import { Plan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json(
      { message: "Please provide an id." },
      { status: 400 }
    );
  }

  const plan: Plan | null = await db.plan.findFirst({
    where: {
      id: id,
    },
  });

  if (plan === null) {
    return NextResponse.json({
      message: "No plan found with the given id",
      plan: null,
      status: 200,
    });
  }
  return NextResponse.json({
    message: "Plan fectched successfully",
    plan,
    status: 200,
  });
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { message: "Please provide an id." },
        { status: 400 }
      );
    }

    await db.plan.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Plan deleted successfuly" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
