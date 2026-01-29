import { NextResponse } from "next/server";
import { z } from "zod";
import { shippingAdapter } from "@/lib/shipping";

const schema = z.object({ trackingNumber: z.string().min(3) });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const events = await shippingAdapter.getTracking(parsed.data.trackingNumber);
  return NextResponse.json({ events });
}
