import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/store/product-card";
import { Badge } from "@/components/ui/badge";

export default async function StoreHome() {
  const banners = await prisma.banner.findMany({ take: 2 });
  const products = await prisma.product.findMany({
    include: { images: true, variants: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-12">
      <section className="container-page grid gap-6 md:grid-cols-2">
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.linkUrl}
            className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-soft"
          >
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              width={600}
              height={400}
              className="h-72 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className="mb-2">Featured</Badge>
              <h2 className="text-2xl font-semibold">{banner.title}</h2>
              <p className="text-sm text-white/80">{banner.subtitle}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="container-page">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">New arrivals</h3>
            <p className="text-sm text-gray-500">
              Fresh styles curated for festive wardrobes.
            </p>
          </div>
          <Link href="/search" className="text-sm text-brand-600">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              title={product.title}
              brand={product.brand}
              image={product.images[0]?.url ?? ""}
              price={product.variants[0]?.price ?? 0}
              mrp={product.variants[0]?.mrp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
