import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/store/price-tag";

export default function CartPage() {
  return (
    <div className="container-page grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Your cart</h1>
          <p className="text-sm text-gray-500">2 items ready to checkout</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Rose Gold Anarkali Set</p>
              <p className="text-xs text-gray-500">Size M · Qty 1</p>
            </div>
            <PriceTag price={3499} mrp={4299} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Ivory Chiffon Saree</p>
              <p className="text-xs text-gray-500">Free size · Qty 1</p>
            </div>
            <PriceTag price={2899} mrp={3499} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Order summary</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>₹6,398</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>₹0</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span>₹6,398</span>
          </div>
          <Button className="w-full" asChild>
            <Link href="/checkout">Proceed to checkout</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
