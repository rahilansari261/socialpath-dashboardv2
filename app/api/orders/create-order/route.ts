// pages/api/create-order.js

import { db } from "@/db";

import { Order } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Extract order data from request body
    const { name, pricing_plan, userId }: Order = await req.json();

    if (!name || !pricing_plan || !userId) {
      throw new Error("Missing required parameters");
    }

    // Create the order in the database using Prisma Client
    const order: Order = await db.order.create({
      data: {
        name,
        pricing_plan,

        userId,
      },
    });

    // Return the created order as the API response
    return NextResponse.json({ success: true, order });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json({
      success: false,
      error: "Failed to create order",
    });
  }
}
