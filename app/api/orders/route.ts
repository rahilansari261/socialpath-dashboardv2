// pages/api/pricing-plan.ts
import { PrismaClient, order_status } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const statusString = req.nextUrl.searchParams.get("status") as order_status

    // Validate statusString to ensure it matches the 'order_status' type
    if (!statusString || !isValidStatus(statusString)) {
      throw new Error("Invalid or missing status parameter");
    }

    const orders: any = await prisma.order.findMany({
      where: {
        status: statusString,
      },
    });

    return NextResponse.json({ orders: orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

function isValidStatus(status: string): boolean {
  return ["pending", "accepted", "rejected"].includes(status);
}
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

// export async function PUT(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Check if id exists in req.query
//     const orderId = req.query.id;

//     // Ensure that `id` is a single string or undefined
//     const id = Array.isArray(orderId) ? orderId[0] : orderId;

//     if (typeof id !== "string") {
//       res.status(400).json({ error: "ID must be a single string" });
//       return;
//     }

//     const { new_status }: { new_status: boolean } = req.body;
//     const updatedPlan = await prisma.order.update({
//       where: { id: id },
//       data: {
//         status: new_status,
//       },
//     });
//     res.status(200).json({ updatedPlan });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// }
