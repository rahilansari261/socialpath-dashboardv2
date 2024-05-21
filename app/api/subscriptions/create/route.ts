// pages/api/pricing-plan.ts
import { db } from "@/db";
import { getUnixTimestampAfterDays } from "@/lib/utils";
import { Plan } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error(
    "Razorpay key_id and key_secret must be set in environment variables"
  );
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: NextRequest) {
  const { planId, userId } = await req.json();


  if (!userId) {
    return NextResponse.json(
      { message: "Please provide a user id." },
      { status: 400 }
    );
  }

  if (!planId) {
    return NextResponse.json(
      { message: "Please provide a plan id." },
      { status: 400 }
    );
  }

  const plan: Plan | null = await db.plan.findFirst({
    where: {
      planId: planId,
    },
  });
  if (!plan) {
    return NextResponse.json({ message: "Plan not found." }, { status: 404 });
  }

  try {
    const customerNotify = 1;
    const quantity = 1;
    const totalCount = 12;

    const addons = [
      {
        item: {
          name: plan.planName,
          amount: plan.last_price * 100,
          currency: "INR",
        },
      },
    ];

    const response = await razorpay.subscriptions.create({
      plan_id: plan.planId,
      customer_notify: customerNotify,
      quantity: quantity,
      total_count: totalCount,
      addons: addons,
      start_at: getUnixTimestampAfterDays(7),
    });

    // update user collection in db
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        subscriptionId: response.id,
        subs_status: response.status,
      },
    });

    return NextResponse.json({ response });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || "Internal server error",
    });
  }
}
