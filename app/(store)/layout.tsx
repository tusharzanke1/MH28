import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold">
            MH28
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
            <Link href="/category/sarees">Sarees</Link>
            <Link href="/category/kurtas">Kurtas</Link>
            <Link href="/category/dresses">Dresses</Link>
            <Link href="/account">Account</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Wishlist</Button>
            <Button>Cart</Button>
          </div>
        </div>
      </header>
      <main className="py-8">{children}</main>
      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="container-page text-sm text-gray-500">
          © 2024 MH28 Atelier. Crafted with care in India.
        </div>
      </footer>
    </div>
  );
}
