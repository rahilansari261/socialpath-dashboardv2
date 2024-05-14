// pages/api/create-order.js

import { Order, PrismaClient, order_status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    // Extract order data from request body
    const {
      name,
      pricing_plan,
      userId,
      razorpay_payment_id,
      razorpay_order_id,
    }: Order = await req.json();

    if (!name || !pricing_plan || !userId) {
      throw new Error("Missing required parameters");
    }

    // Create the order in the database using Prisma Client
    const order: Order = await prisma.order.create({
      data: {
        name,
        pricing_plan,
        status: order_status.pending,
        userId,
        razorpay_payment_id,
        razorpay_order_id,
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
