import { getCategoryBySlug, getProductsByCategory } from "@/lib/data";
import { ProductCard } from "@/components/store/product-card";
import { FiltersSidebar } from "@/components/store/filters-sidebar";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);
  const products = await getProductsByCategory(category?.id);

  return (
    <div className="container-page grid gap-8 lg:grid-cols-[280px_1fr]">
      <FiltersSidebar />
      <div>
        <h1 className="text-2xl font-semibold">{category?.name ?? "Category"}</h1>
        <p className="text-sm text-gray-500">
          {products.length} styles available
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
