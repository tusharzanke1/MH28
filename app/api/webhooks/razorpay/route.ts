import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const verifyWebhookSignature = (body: string, signature?: string | null) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return true;
  }
  if (!signature) {
    return false;
  }
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return expected === signature;
};

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(body) as {
    event: string;
    payload: { payment: { entity: { id: string; order_id: string; status: string } } };
  };

  const paymentEntity = payload.payload.payment.entity;
  const existing = await prisma.payment.findUnique({
    where: { razorpayPaymentId: paymentEntity.id },
  });

  if (!existing) {
    await prisma.payment.create({
      data: {
        razorpayOrderId: paymentEntity.order_id,
        razorpayPaymentId: paymentEntity.id,
        status: paymentEntity.status,
        amount: 0,
        provider: "RAZORPAY",
      },
    });
  }

  return NextResponse.json({ received: true });
}
