import { getAdminOrders } from "@/lib/data";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { StatusBadge } from "@/components/admin/status-badge";

export default async function AdminOrders() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <AdminDataTable
        headers={["Order", "Customer", "Total", "Status"]}
        rows={orders.map((order) => [
          order.id.slice(0, 8),
          order.user.email,
          `₹${order.totalAmount}`,
          <StatusBadge key={order.id} status={order.status} />,
        ])}
      />
    </div>
  );
}
