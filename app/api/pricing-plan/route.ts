// pages/api/pricing-plan.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   // Get all pricing plans
//   const allPlans: PricingPlan[] = await prisma.plan.findMany();
//   res.json(allPlans);
// }

export async function POST(req: NextRequest) {
  try {
    const plan: any = await req.json();

    const newPlan = await prisma.plan.create({
      data: {
        ...plan,
      },
    });

    return NextResponse.json({ newPlan });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
