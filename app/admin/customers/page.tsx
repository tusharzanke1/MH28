import { prisma } from "@/lib/prisma";
import { AdminDataTable } from "@/components/admin/admin-data-table";

export default async function AdminCustomers() {
  const customers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <AdminDataTable
        headers={["Name", "Email", "Role"]}
        rows={customers.map((customer) => [
          customer.name,
          customer.email,
          customer.role,
        ])}
      />
    </div>
  );
}
