import crypto from "crypto";

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
};

const isRazorpayConfigured = () =>
  Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

export const createRazorpayOrder = async (payload: {
  amount: number;
  receipt: string;
  currency?: string;
}): Promise<RazorpayOrder> => {
  if (!isRazorpayConfigured()) {
    return {
      id: `mock_${crypto.randomUUID()}`,
      amount: payload.amount,
      currency: payload.currency ?? "INR",
      receipt: payload.receipt,
    };
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
      ).toString("base64")}`,
    },
    body: JSON.stringify({
      amount: payload.amount,
      currency: payload.currency ?? "INR",
      receipt: payload.receipt,
      payment_capture: 1,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Razorpay order");
  }

  return (await response.json()) as RazorpayOrder;
};

export const verifyRazorpaySignature = (payload: {
  orderId: string;
  paymentId: string;
  signature: string;
}) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return true;
  }
  const body = `${payload.orderId}|${payload.paymentId}`;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return expected === payload.signature;
};
