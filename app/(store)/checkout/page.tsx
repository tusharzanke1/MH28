import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  return (
    <div className="container-page grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <p className="text-sm text-gray-500">Secure payments + COD</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Full name" />
            <Input placeholder="Phone" />
            <Input placeholder="Address line 1" />
            <Input placeholder="City" />
            <Input placeholder="State" />
            <Input placeholder="Postal code" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Payment method</h3>
            <div className="flex gap-3">
              <Button variant="outline">Razorpay</Button>
              <Button variant="outline">Cash on Delivery</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Order summary</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total</span>
            <span>₹6,398</span>
          </div>
          <Button className="w-full">Place order</Button>
        </CardContent>
      </Card>
    </div>
  );
}
