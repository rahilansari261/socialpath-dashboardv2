// pages/api/create-order.js
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json(); // Amount should be in smallest currency unit (e.g., paise)
    const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

    if (RAZORPAY_KEY_ID === undefined || RAZORPAY_KEY_SECRET === undefined) {
      throw new Error("Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET");
    }

    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: parseInt(amount) * 100, // converting rupees to paise
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!", status: 200 });
  }
}
