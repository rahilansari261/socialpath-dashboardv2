// pages/api/pricing-plan.ts

import { db } from "@/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const orders: any = await db.order.findMany();

    return NextResponse.json({ orders: orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
