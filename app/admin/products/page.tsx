import { prisma } from "@/lib/prisma";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { Button } from "@/components/ui/button";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-gray-500">Manage catalog and inventory</p>
        </div>
        <Button>Add product</Button>
      </div>
      <AdminDataTable
        headers={["Title", "Category", "Status"]}
        rows={products.map((product) => [
          product.title,
          product.category.name,
          "Active",
        ])}
      />
    </div>
  );
}
