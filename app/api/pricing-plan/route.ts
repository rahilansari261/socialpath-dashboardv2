// pages/api/pricing-plan.ts
import { db } from "@/db";
import { Plan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const allPlans: any = await db.plan.findMany();
  return NextResponse.json(allPlans);
}

export async function POST(req: NextRequest) {
  try {
    const plan = await req.json();

    const newPlan: Plan | null = await db.plan.create({
      data: {
        ...plan,
      },
    });

    return NextResponse.json({ newPlan });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
