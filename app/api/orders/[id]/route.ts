// pages/api/pricing-plan.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if id exists in req.query
    const orderId = req.query.id;

    // Ensure that `id` is a single string or undefined
    const id = Array.isArray(orderId) ? orderId[0] : orderId;

    if (typeof id !== "string") {
      res.status(400).json({ error: "ID must be a single string" });
      return;
    }

    const { new_status }: { new_status: boolean } = req.body;
    const updatedPlan = await prisma.order.update({
      where: { id: id },
      data: {
        status: new_status,
      },
    });
    res.status(200).json({ updatedPlan });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function DEL(req: NextApiRequest, res: NextApiResponse) {
  // Delete a pricing plan
  const deletedPlan = await prisma.plan.delete({
    where: { id: req.body.id },
  });
  res.json(deletedPlan);
}
