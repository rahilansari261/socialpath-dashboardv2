// pages/api/pricing-plan.ts

import { db } from "@/db";
import { order_status } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const statusString = req.nextUrl.searchParams.get("status");

    // Validate statusString to ensure it matches the 'order_status' type
    if (!statusString || !isValidStatus(statusString)) {
      throw new Error("Invalid or missing status parameter");
    }

    const orders: any = await db.order.findMany({
      where: {
        status: statusString as order_status,
      },
    });

    return NextResponse.json({ orders: orders });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

function isValidStatus(status: string): boolean {
  const validStatuses = ["pending", "accepted", "rejected"];
  return validStatuses.includes(status);
}
