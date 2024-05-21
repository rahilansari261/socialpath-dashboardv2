// pages/api/pricing-plan.ts
import { db } from "@/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET(req: NextRequest, res: NextResponse) {
  const allPlans: any = await db.plan.findMany();
  return NextResponse.json(allPlans);
}

async function createPlanOnRazorpay(
  planName: string,
  amount: number,
  currency: string,
  description: string
) {
  try {
    const key_id: string = process.env.RAZORPAY_KEY_ID || "";
    const key_secret: string = process.env.RAZORPAY_KEY_SECRET || "";

    const razorpay = new Razorpay({
      key_id: key_id,
      key_secret,
    });

    const response = await razorpay.plans.create({
      period: "monthly",
      interval: 1,
      item: {
        name: planName,
        amount: amount * 100,
        currency: currency,
        description: description,
      },
      notes: {
        // notes_key_1: "Tea, Earl Grey, Hot",
      },
    });
    return response;
  } catch (error) {
    throw new Error("Failed to create plan on Razorpay");
  }
}

export async function POST(req: NextRequest) {
  try {
    const plan = await req.json();

    // Create plan on Razorpay
    const razorpayPlan = await createPlanOnRazorpay(
      plan.planName,
      plan.last_price,
      "INR",
      plan.description
    );

    if (!razorpayPlan) {
      return NextResponse.json({
        message: "Something went wrong while creating the plan",
      });
    }

    const newPlan = await db.plan.create({
      data: {
        ...plan,
        planId: razorpayPlan.id,
        features: plan.features as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ newPlan });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || "Internal server error",
    });
  }
}
