import { prisma } from "@/lib/prisma";
import { AdminDataTable } from "@/components/admin/admin-data-table";

export default async function AdminCoupons() {
  const coupons = await prisma.coupon.findMany({ orderBy: { expiresAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Coupons</h1>
      <AdminDataTable
        headers={["Code", "Type", "Value", "Expiry"]}
        rows={coupons.map((coupon) => [
          coupon.code,
          coupon.type,
          coupon.value,
          coupon.expiresAt.toDateString(),
        ])}
      />
    </div>
  );
}
