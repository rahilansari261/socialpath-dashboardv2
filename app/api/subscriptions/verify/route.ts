// pages/api/pricing-plan.ts

import { db } from "@/db";
import { User } from "@prisma/client";
import crypto from "crypto";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error(
        "RAZORPAY_KEY_SECRET must be set in environment variables"
      );
    }

    const userId: string | null = req.nextUrl.searchParams.get("userId");

    const user: User | null = await db.user.findFirst({
      where: {
        id: userId ? userId : undefined,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = await req.json();

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_payment_id + "|" + user.subscriptionId, "utf-8")
      .digest("hex");

    if (generated_signature == razorpay_signature) {
      await db.user.update({
        where: {
          id: userId ? userId : undefined,
        },
        data: {
          subs_status: "active",
        },
      });
      await db.payment.create({
        data: {
          razorpay_payment_id: razorpay_payment_id,
          razorpay_subscription_id: razorpay_subscription_id,
          razorpay_signature: razorpay_signature,
        },
      });
      return NextResponse.json({ success: true });
    } else {
      throw new Error("Invalid signature");
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
