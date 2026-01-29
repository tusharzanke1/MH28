import { prisma } from "@/lib/prisma";
import { AdminDataTable } from "@/components/admin/admin-data-table";

export default async function AdminContent() {
  const banners = await prisma.banner.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Home banners</h1>
      <AdminDataTable
        headers={["Title", "Subtitle", "Link"]}
        rows={banners.map((banner) => [banner.title, banner.subtitle, banner.linkUrl])}
      />
    </div>
  );
}
