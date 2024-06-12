import { db } from "@/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const orders: any = await db.order.findMany();

    const orders = await db.order.findMany({
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });

    const transformedOrders = orders.map((order) => ({
      ...order,
      username: order.User ? order.User.username : null,
      User: undefined, // Remove the nested User object
    }));

    return NextResponse.json({ orders: transformedOrders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
