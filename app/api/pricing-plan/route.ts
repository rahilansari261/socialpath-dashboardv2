// pages/api/pricing-plan.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface PricingPlan {
  planName: string;
  price: number;
  description: string;
  features: Feature[];
}

interface Feature {
  feature: string;
}

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   // Get all pricing plans
//   const allPlans: PricingPlan[] = await prisma.plan.findMany();
//   res.json(allPlans);
// }

export async function POST(req: Request) {
  try {
    const plan: any = await req.json();

    const newPlan = await prisma.plan.create({
      data: {
        ...plan,
      },
    });

    return Response.json({ newPlan });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  // Update a pricing plan and its features
  const updatedPlan = await prisma.plan.update({
    where: { id: req.body.id },
    data: {
      ...req.body,
      features: {
        // Assuming complete replacement of features or similar logic
        deleteMany: {}, // Empty condition deletes all
        create: req.body.features,
      },
    },
  });
  res.json(updatedPlan);
}

export async function DEL(req: NextApiRequest, res: NextApiResponse) {
  // Delete a pricing plan
  const deletedPlan = await prisma.plan.delete({
    where: { id: req.body.id },
  });
  res.json(deletedPlan);
}
