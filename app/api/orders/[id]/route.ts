// pages/api/pricing-plan.ts

import { db } from "@/db";
import { Order } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { message: "Please provide an id." },
        { status: 400 }
      );
    }

    const order: Order[] | null = await db.order.findMany({
      where: {
        userId: id,
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return Response.json({ error });
  }
}

export async function POST(req: Request) {
  try {
    const plan: any = await req.json();

    const newPlan = await db.plan.create({
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
    const updatedPlan = await db.order.update({
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
