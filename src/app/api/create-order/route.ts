import Razorpay from "razorpay";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  const body = await req.json();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
  const options = {
    amount: body.amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}