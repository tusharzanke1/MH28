import { searchProducts } from "@/lib/data";
import { ProductCard } from "@/components/store/product-card";
import { Input } from "@/components/ui/input";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q ?? "";
  const products = await searchProducts(query);

  return (
    <div className="container-page space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Search</h1>
        <Input placeholder="Search products" defaultValue={query} />
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
    </div>
  );
}
