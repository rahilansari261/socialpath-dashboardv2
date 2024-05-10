// pages/api/pricing-plan.ts

import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {

//     const orders: any = await prisma.order.findMany({
//       where: {
//         status: false,
//       },
//     });

//     return Response.json({ orders: orders });
//   } catch (error) {

//     return Response.json({ error });
//   }
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

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    // Check if id exists in req.query
    const orderId = req.nextUrl.pathname.split("/").pop();

    if (!orderId) {
      throw new Error("Invalid order id");
    }

    const { status } = await req.json();

    if (!status) {
      throw new Error("Invalid status");
    }
    const updatedPlan = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status,
      },
    });

    return NextResponse.json({ updatedPlan, status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
