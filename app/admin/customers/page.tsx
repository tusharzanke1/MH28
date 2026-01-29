import { getAdminCustomers } from "@/lib/data";
import { AdminDataTable } from "@/components/admin/admin-data-table";

export default async function AdminCustomers() {
  const customers = await getAdminCustomers();

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
