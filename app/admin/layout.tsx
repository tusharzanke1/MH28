import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <Link href="/admin" className="text-lg font-semibold">
            Admin · MH28
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-600">
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/orders">Orders</Link>
            <Link href="/admin/customers">Customers</Link>
            <Link href="/admin/coupons">Coupons</Link>
            <Link href="/admin/content">Content</Link>
          </nav>
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}
