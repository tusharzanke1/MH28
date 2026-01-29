"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const orderSchema = z.object({
  userId: z.string().uuid(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      variantId: z.string().uuid(),
      quantity: z.number().int().positive(),
      price: z.number().int().nonnegative(),
    })
  ),
  totalAmount: z.number().int().nonnegative(),
});

export async function createOrder(input: z.infer<typeof orderSchema>) {
  const parsed = orderSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid order payload");
  }

  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: parsed.data.userId,
        totalAmount: parsed.data.totalAmount,
        items: {
          create: parsed.data.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return order;
  });
}
