import { NextResponse } from "next/server";
import { z } from "zod";
import { createRazorpayOrder } from "@/lib/payments/razorpay";

const schema = z.object({
  amount: z.number().int().positive(),
  receipt: z.string().min(3),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const order = await createRazorpayOrder(parsed.data);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Unable to create order" }, { status: 500 });
  }
}
