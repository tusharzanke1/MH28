import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function AdminDashboard() {
  const [orders, products] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
  ]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Orders</h2>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{orders}</p>
          <p className="text-sm text-gray-500">This month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Products</h2>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{products}</p>
          <p className="text-sm text-gray-500">Active styles</p>
        </CardContent>
      </Card>
    </div>
  );
}
