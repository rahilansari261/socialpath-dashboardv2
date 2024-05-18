// pages/api/pricing-plan.ts
import { db } from "@/db";
import { getUnixTimestampAfterDays } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET(req: NextRequest, res: NextResponse) {
  const allPlans: any = await db.plan.findMany();
  return NextResponse.json(allPlans);
}

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error(
    "Razorpay key_id and key_secret must be set in environment variables"
  );
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createPlanOnRazorpay(
  planName: string,
  amount: number,
  currency: string,
  description: string
) {
  try {
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

async function createSubscriptionOnRazorpay(
  planId: string,
  customerNotify: any,
  quantity: number,
  totalCount: number,
  // startAt: number,
  addons: any[]
  // notes: any
) {
  try {
    const response = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: customerNotify,
      quantity: quantity,
      total_count: totalCount,
      addons: addons,
      start_at: getUnixTimestampAfterDays(7),
    });
    return response;
  } catch (error) {
    throw new Error("Failed to create subscription on Razorpay");
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

    // Create subscription on Razorpay
    const subscription = await createSubscriptionOnRazorpay(
      razorpayPlan.id,
      1,
      1,
      12,

      [
        {
          item: {
            name: plan.planName,
            amount: plan.last_price * 100,
            currency: "INR",
          },
        },
      ]
      // {
      //   key1: "value3",
      //   key2: "value2",
      // }
    );

    // Save plan and subscription to database
    const newSubscriptionData = {
      subscriptionId: subscription.id,
      planId: subscription.plan_id,
      customerNotify: subscription.customer_notify ? 1 : 0,
      quantity: subscription.quantity || 1, // Ensure quantity has a default value
      totalCount: subscription.total_count,
      startAt: new Date(subscription.start_at * 1000), // Convert Unix timestamp to Date
      status: subscription.status,
      addons: JSON.stringify(subscription.addons || []), // Convert addons to JSON string
      notes: JSON.stringify(subscription.notes || {}), // Convert notes to JSON string
      createdAt: new Date(subscription.created_at * 1000), // Convert Unix timestamp to Date
      updatedAt: new Date(), // Set updatedAt to the current date
    };

    // Save the subscription to the database
    const newSubscription = await db.subscription.create({
      data: { ...newSubscriptionData },
    });

    const newPlan = await db.plan.create({
      data: {
        ...plan,
        planId: razorpayPlan.id,
        subscriptionId: subscription.id,
        features: plan.features as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ newPlan, newSubscription });
  } catch (error: any) {

    return NextResponse.json({
      error: error.message || "Internal server error",
    });
  }
}
